#!/usr/bin/env python3
"""
Druga cena, za poredjenje: Agoda.com -> agoda.json

ZASTO POSTOJI: Booking je jedini izvor cena i nema se sa cim uporediti. Probani su
Expedia (odmah captcha), Trivago (prazna JS skoljka, 116 kB) i Zenhotels (nema
stabilnu adresu regiona). Agoda jedina vraca cene u obican headless DOM dump, i to
u cistom atributu: data-element-name="fpc-room-price" data-fpc-value="€ 152".

PAZI NA DVE STVARI, obe su provereno tacne na dan pisanja:

1. Agodina cena je PO NOCI, ne za ceo boravak — suprotno od Booking-a. Provereno
   tako sto je ista pretraga povucena sa los=1 i los=8: odnos je 1,00-1,10, dakle
   broj se ne menja sa duzinom boravka. Zato se ovde mnozi sa NOCI, a rezultat je
   PROCENA (prosecna noc x 8), ne tacan zbir kao kod Booking-a.
2. Cena JESTE sa taksama — kartica pise "per night incl. taxes & fees". To je i
   masinski uslov: ako tog teksta na kartici nema, cena se NE uzima (vidi PROVERA).

Cene odavde NE ULAZE U BODOVE. Bodovanje ostaje na Booking-u — mesanje dva izvora
u jednu formulu je tiha greska koju posle niko ne primeti. Agoda sluzi samo da se
vidi je li negde jeftinije.

    ./agoda.py            # sva mesta
    ./agoda.py --svez     # ignorisi kes
    ./agoda.py --grad Becici
"""
import argparse, hashlib, json, pathlib, re, subprocess, sys, time, html as htmllib

DOLAZAK, NOCI, OSOBA = "2026-09-05", 8, 2
D = pathlib.Path(__file__).parent
KES = D / "kes-agoda"          # NAMERNO odvojeno od kes/ — to je Booking-ov kes
UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) "
      "Chrome/128.0.0.0 Safari/537.36")

# Agoda ne prima ime mesta u pretragu, nego svoj brojcani cityId. Jedini jeftin
# nacin da se dodje do njega je SEO strana mesta, koja u sebi nosi /search?city=N.
SLUGOVI = {
    "Becici": "becici", "Rafailovici": "rafailovici", "Budva": "budva",
    "Sveti Stefan": "sveti-stefan", "Przno": "przno",
    "Petrovac na Moru": "petrovac",
    "Herceg Novi": "herceg-novi", "Igalo": "igalo", "Njivice": "njivice",
    "Djenovici": "djenovici", "Kumbor": "kumbor",
}

# ZASTITE. Dve, jer su dve stvari mogle da odu naopako i obe bi dale pogresan broj
# bez ijedne greske u kodu:
#
#   proveri_takse()  — jesu li takse u ceni. Trazi se na NIVOU STRANE, ne kartice:
#     prvi pokusaj je trazio "per night incl. taxes & fees" u samoj kartici i pao je,
#     jer Agoda servira dve varijante DOM-a — na strani Becica taj tekst stoji u
#     svakoj kartici, na strani Budve ga u karticama NEMA uopste. Rezultat je bio
#     0 od 11 cena u Budvi i Prznu, a cene su bile tu.
#
#   proveri_po_noci() — je li broj po noci ili za ceo boravak. Ovo se ne moze
#     procitati iz teksta, pa se MERI: ista pretraga sa los=1 i sa los=8. Ako se
#     broj ne menja, cena je po noci (i mnozi se sa NOCI). Ako poraste ~NOCI puta,
#     Agoda je presla na ukupnu cenu i skripta STAJE — inace bi svaka cena na
#     strani bila osam puta veca nego sto jeste.
GRAD_PROVERE = "Becici"

# PANSION SE SA AGODE NE CITA — namerno. Prvi pokusaj je citao oznaku iz teksta
# kartice i Domador Rooms & Apartments (65 EUR/noc) je izasao kao "All-inclusive",
# jer Agoda u tudju karticu ubacuje link ka drugom hotelu:
#   /en-gb/iberostar-bellevue-all-inclusive/hotel/budva-me.html
# Oznaka pansiona nije vezana ni za jedan element kartice, pa se ne moze pouzdano
# ograniciti. Pansion dolazi iskljucivo sa Booking-a; Agoda daje samo cenu.


def tekst(s):
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", htmllib.unescape(s).replace("\xa0", " ")).strip()


def povuci(url, svez=False):
    KES.mkdir(exist_ok=True)
    put = KES / (hashlib.sha1(url.encode()).hexdigest()[:16] + ".html")
    if put.exists() and not svez:
        return put.read_text("utf-8"), True
    time.sleep(6)                                    # throttle
    r = subprocess.run(
        ["google-chrome", "--headless=new", "--disable-gpu", "--no-sandbox",
         "--hide-scrollbars", "--window-size=1400,4000", "--lang=en-GB",
         f"--user-agent={UA}", "--virtual-time-budget=30000", "--dump-dom", url],
        capture_output=True, text=True, timeout=180)
    put.write_text(r.stdout, "utf-8")
    return r.stdout, False


def city_id(slug, svez=False):
    """SEO strana mesta -> Agodin cityId. Nema ga u atributu, nego u /search?city=N."""
    dom, _ = povuci(f"https://www.agoda.com/en-gb/city/{slug}-me.html", svez)
    m = re.search(r"[?&]city=(\d+)", dom)
    return int(m.group(1)) if m else None


def uri(cid, los=NOCI):
    return (f"https://www.agoda.com/en-gb/search?city={cid}&checkIn={DOLAZAK}"
            f"&los={los}&rooms=1&adults={OSOBA}&children=0&currency=EUR")


def cene_po_imenu(dom):
    """{ime hotela: cena} iz jednog DOM-a — koristi i parser i samoprovera."""
    out = {}
    for blok in re.split(r'(?=data-element-name="ssr-property-card-title")', dom)[1:]:
        m = re.search(r">([^<]{3,90})<", blok)
        c = re.search(r'data-element-name="fpc-room-price"[^>]*data-fpc-value="€\s*([\d,]+)"', blok)
        if m and c:
            out[tekst(m.group(1))] = int(c.group(1).replace(",", ""))
    return out


def proveri_takse(dom, grad):
    """Jesu li takse u prikazanoj ceni. Agoda to pise na strani, ne u kartici."""
    if "excluding taxes" in dom.lower() or "excl. taxes" in dom.lower():
        raise SystemExit(
            f"\nPREKID: Agoda na strani za {grad} prikazuje cene BEZ taksi.\n"
            f"  Booking-ove cene su sa taksama, pa poredjenje ne bi valjalo.\n"
            f"  Vidi finalPriceView u URL-u pre nego sto se podaci objave.")
    if "incl. taxes" not in dom:
        raise SystemExit(
            f"\nPREKID: na strani za {grad} nema potvrde 'incl. taxes'.\n"
            f"  Agoda je promenila prikaz — proveri rucno pre objave.")


def proveri_po_noci(svez=False):
    """Izmeri je li Agodina cena po noci ili za ceo boravak: ista pretraga sa
    los=1 i los=8. Odnos ~1 = po noci, odnos ~NOCI = ukupno."""
    cid = city_id(SLUGOVI[GRAD_PROVERE], svez)
    if not cid:
        raise SystemExit(f"PREKID: ne mogu da nadjem Agoda cityId za {GRAD_PROVERE}.")
    a1 = cene_po_imenu(povuci(uri(cid, 1), svez)[0])
    a8 = cene_po_imenu(povuci(uri(cid, NOCI), svez)[0])
    zaj = set(a1) & set(a8)
    if not zaj:
        raise SystemExit("PREKID: samoprovera po noci nema nijedan zajednicki hotel.")
    odnos = sum(a8[k] / a1[k] for k in zaj) / len(zaj)
    if odnos > 2:
        raise SystemExit(
            f"\nPREKID: Agoda vise ne prikazuje cenu po noci.\n"
            f"  los=8 / los=1 = {odnos:.2f} (ocekivano ~1, {NOCI} bi znacilo ukupnu cenu).\n"
            f"  Skloni mnozenje sa NOCI u agoda.py pre nego sto se podaci objave.")
    print(f"  samoprovera: los={NOCI}/los=1 = {odnos:.2f} na {len(zaj)} hotela "
          f"u {GRAD_PROVERE} -> cena je po noci", file=sys.stderr)


def raspari(dom, grad):
    out = []
    for blok in re.split(r'(?=data-element-name="ssr-property-card-title")', dom)[1:]:
        m = re.search(r">([^<]{3,90})<", blok)
        if not m:
            continue
        ime = tekst(m.group(1))
        t = tekst(blok[:35000])

        cena = None
        c = re.search(r'data-element-name="fpc-room-price"[^>]*data-fpc-value="€\s*([\d,]+)"', blok)
        if c:
            cena = int(c.group(1).replace(",", ""))

        o = re.search(r"\b(\d[.,]\d)\b\s*(?:Exceptional|Superb|Excellent|Very good|Good|Pleasant)", t)
        link = ""
        # NE zavrsavati obrazac navodnikom: Agodin href uvek nosi ?countryId=...&...,
        # pa se sa [^"?]+" nikad ne poklopi i svi linkovi ispadnu prazni.
        l = re.search(r'href="(/en-gb/[^"?]+/hotel/[^"?]+\.html)', blok)
        if l:
            link = "https://www.agoda.com" + htmllib.unescape(l.group(1))

        out.append({"hotel": ime, "grad": grad, "cenaNoc": cena,
                    "cenaUkupno": cena * NOCI if cena else None,
                    "ocena": float(o.group(1).replace(",", ".")) if o else None,
                    "link": link})
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--svez", action="store_true")
    ap.add_argument("--grad")
    a = ap.parse_args()

    gradovi = [x.strip() for x in a.grad.split(",")] if a.grad else list(SLUGOVI)
    for g in gradovi:
        if g not in SLUGOVI:
            raise SystemExit(f"Nepoznato mesto: {g}. Poznata: {', '.join(SLUGOVI)}")

    proveri_po_noci(a.svez)

    svi, bez_id = [], []
    for grad in gradovi:
        cid = city_id(SLUGOVI[grad], a.svez)
        if not cid:
            bez_id.append(grad)
            print(f"  {grad:<16} nema Agoda stranu mesta — preskacem", file=sys.stderr)
            continue
        dom, kes = povuci(uri(cid), a.svez)
        proveri_takse(dom, grad)
        r = raspari(dom, grad)
        sa_cenom = [x for x in r if x["cenaNoc"]]
        svi += sa_cenom
        print(f"  {grad:<16} city={cid:<8} {len(sa_cenom):>3} sa cenom"
              f" (od {len(r)} kartica){'  (keš)' if kes else ''}", file=sys.stderr)

    put = D / "agoda.json"
    put.write_text(json.dumps({
        "prikupljeno": time.strftime("%Y-%m-%d %H:%M"),
        "dolazak": DOLAZAK, "noci": NOCI, "osoba": OSOBA,
        "izvor": "Agoda.com preko headless Chrome-a (samo cena — pansion se ne cita, vidi komentar u agoda.py)",
        "napomena": ("cenaNoc je Agodina cena PO NOCI sa taksama; cenaUkupno = cenaNoc x "
                     f"{NOCI} i zato je PROCENA, ne tacan zbir. Ne ulazi u bodovanje."),
        "bezId": bez_id, "ponude": svi,
    }, ensure_ascii=False, indent=1), "utf-8")
    print(f"\n{len(svi)} ponuda sa cenom -> {put}", file=sys.stderr)


if __name__ == "__main__":
    main()

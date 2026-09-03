#!/usr/bin/env python3
"""
Direktne ponude za odmor u Crnoj Gori 05.09-13.09.2026 (2 odrasle, 8 noci).

Cita STVARNE cene sa Booking.com preko headless Chrome-a (Booking blokira obican
curl - vrati 202 i praznu stranicu - ali normalan browser prolazi).

Licna upotreba. Throttle 6 s izmedju upita, opisan User-Agent, HTML se kesira u
kes/ pa se ponovni run ne obraca sajtu. Za bilo sta komercijalno - partner API.

    ./skrejper.py            # sva mesta, sva cetiri pansiona
    ./skrejper.py --svez     # ignoriši keš
    ./skrejper.py --grad Becici
"""
import argparse, hashlib, json, pathlib, re, subprocess, sys, time, html as htmllib
from urllib.parse import urlencode

DOLAZAK, ODLAZAK, NOCI, OSOBA = "2026-09-05", "2026-09-13", 8, 2
KES = pathlib.Path(__file__).parent / "kes"
UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) "
      "Chrome/128.0.0.0 Safari/537.36")

# Booking-ovi kodovi za pansion. PAZI: lako se zamene. Tacno mapiranje, procitano
# tako sto se uzme oznaka koja stoji POSLE <input value="mealplan=N"> u istom <label>:
#   1  = Breakfast included          (samo dorucak)
#   3  = All meals included          (pun pansion)
#   4  = All-inclusive
#   9  = Breakfast & dinner included (polupansion)
#   999= Self catering
# Prva verzija je koristila 1 za "polupansion" i 9 za "all inclusive" — oboje pogresno,
# pa su hoteli sa samo dorucakom bili oznaceni kao polupansion. Zato dole stoji
# samoprovera koja svaki put potvrdi znacenje koda iz same stranice.
PANSION = {"ND": ("1", "noćenje s doručkom", "Breakfast included"),
           "PP": ("9", "polupansion", "Breakfast & dinner included"),
           "FB": ("3", "pun pansion", "All meals included"),
           "AI": ("4", "all inclusive", "All-inclusive")}

# Mesta za Booking pretragu. Ranije je ovde stajala i km od Soluna; za Crnu Goru
# je kolona izbacena (primorje je kompaktno, pa udaljenost ne razlikuje ponude).
# Dva trazena mesta su Becici i Herceg Novi — ostalo su njihovi neposredni susedi,
# jer dva dana pred put uska pretraga ume da vrati skoro nista.
GRADOVI = [
    # Budvanska rivijera
    "Becici", "Rafailovici", "Budva", "Sveti Stefan", "Przno",
    # Boka, oko Herceg Novog
    "Herceg Novi", "Igalo", "Njivice", "Djenovici", "Kumbor",
]


def uri(grad, kod):
    q = {
        "ss": f"{grad}, Montenegro", "checkin": DOLAZAK, "checkout": ODLAZAK,
        "group_adults": OSOBA, "no_rooms": 1, "group_children": 0,
        "selected_currency": "EUR", "order": "price",
        "nflt": f"mealplan={kod}",
    }
    return "https://www.booking.com/searchresults.en-gb.html?" + urlencode(q)


def povuci(url, svez=False):
    KES.mkdir(exist_ok=True)
    put = KES / (hashlib.sha1(url.encode()).hexdigest()[:16] + ".html")
    if put.exists() and not svez:
        return put.read_text("utf-8"), True
    time.sleep(6)                                    # throttle
    r = subprocess.run(
        ["google-chrome", "--headless=new", "--disable-gpu", "--no-sandbox",
         "--hide-scrollbars", "--window-size=1400,4000", "--lang=en-GB",
         f"--user-agent={UA}", "--virtual-time-budget=25000", "--dump-dom", url],
        capture_output=True, text=True, timeout=180)
    put.write_text(r.stdout, "utf-8")
    return r.stdout, False


def proveri_kod(dom, kod, ocekivano):
    """Iz Booking-ovog filter menija procitaj sta kod ZAISTA znaci i uporedi.
    Oznaka stoji POSLE <input value="mealplan=N">, unutar istog <label>."""
    m = re.search(r'value="mealplan=%s"' % kod, dom)
    if not m:
        return None                      # filter meni nije u DOM-u, nema sta da se proveri
    lab = re.search(r'data-testid="filters-group-label-content"[^>]*>(.{0,200}?)</div>',
                    dom[m.end():m.end() + 4000], re.S)
    if not lab:
        return None
    stvarno = tekst(lab.group(1))
    if ocekivano.lower() not in stvarno.lower():
        raise SystemExit(
            f"\nPREKID: Booking je promenio kodove filtera.\n"
            f"  mealplan={kod} sada znaci: {stvarno!r}\n"
            f"  a ocekivano je: {ocekivano!r}\n"
            f"  Ispravi PANSION u skrejper.py pre nego sto se podaci objave.")
    return stvarno


def tekst(s):
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", htmllib.unescape(s).replace("\xa0", " ")).strip()


def raspari(dom, grad, pansion):
    """Iz DOM-a izvuci kartice. Booking-ovi data-testid atributi su stabilni,
    imena CSS klasa nisu - zato se nista ne vezuje na klase."""
    out = []
    delovi = re.split(r'(?=data-testid="property-card"[ >])', dom)[1:]
    for blok in delovi:
        kraj = blok.find('data-testid="property-card"', 5)      # granica do sledece kartice
        if kraj > 0:
            blok = blok[:kraj]

        m = re.search(r'data-testid="title"[^>]*>([^<]+)<', blok)
        if not m:
            continue
        ime = tekst(m.group(1))

        # Cena za ceo boravak. Ako ih je dve (precrtana + snizena), uzmi nizu.
        cena = None
        m = re.search(r'data-testid="price-and-discounted-price"(.{0,1200}?)'
                      r'data-testid="(?:taxes-and-charges|availability)', blok, re.S)
        if m:
            br = re.findall(r"\u20ac\s*([\d,]+)", tekst(m.group(1)))
            if br:
                cena = min(int(b.replace(",", "")) for b in br)

        # Ocena i broj ocena
        ocena = brOcena = None
        m = re.search(r'data-testid="review-score"(.{0,1400}?)</div></div></div>', blok, re.S)
        if m:
            t = tekst(m.group(1))
            o = re.search(r"Scored\s+(\d+[.,]?\d*)", t) or re.search(r"\b(\d[.,]\d)\b", t)
            b = re.search(r"([\d,]+)\s+review", t)
            if o: ocena = float(o.group(1).replace(",", "."))
            if b: brOcena = int(b.group(1).replace(",", ""))

        # Zvezdice stoje u aria-label-u pored naziva, ne u rating-stars bloku
        zvez = None
        m = re.search(r'aria-label="Property rating: (\d)', blok)
        if m: zvez = int(m.group(1))

        m = re.search(r'data-testid="distance"[^>]*>(?:<[^>]*>)*([^<]*km[^<]*|[^<]*m from[^<]*)<', blok)
        udalj = tekst(m.group(1)) if m else ""

        m = re.search(r'data-testid="recommended-units".{0,400}?<h4[^>]*>([^<]+)<', blok, re.S)
        soba = tekst(m.group(1)) if m else ""

        # Direktan link na hotel (bez tracking parametara)
        link = ""
        m = re.search(r'data-testid="availability-cta-btn"[^>]*href="([^"?]+)', blok)
        if not m:
            m = re.search(r'data-testid="title-link"[^>]*href="([^"?]+)', blok)
        if m:
            link = htmllib.unescape(m.group(1))

        # Pansion procitan sa SAME KARTICE, ne iz filtera — to je provera da filter
        # radi ono sto mislimo. Ako se ne poklapa, vidi se u podacima.
        ptekst = ""
        ru = re.search(r'data-testid="recommended-units"(.{0,3000}?)'
                       r'data-testid="(?:availability|price)', blok, re.S)
        if ru:
            t = tekst(ru.group(1))
            for oznaka in ("All-inclusive", "All inclusive", "Breakfast & dinner included",
                           "All meals included", "Half board", "Full board",
                           "Breakfast included", "Self catering"):
                if oznaka.lower() in t.lower():
                    ptekst = oznaka
                    break

        out.append({
            "hotel": ime, "grad": grad, "pansion": pansion,
            "pansionTekst": ptekst,
            "cena": cena, "ocena": ocena, "brOcena": brOcena, "zvezdice": zvez,
            "udaljenost": udalj, "soba": soba,
            # Booking u rezultate ubacuje i PRODATE objekte ("sold out ... you might like")
            # - bez ove provere bi se prikazala ponuda koje nema.
            "prodato": bool(re.search(r"[Ss]old ?[Oo]ut|SOLD OUT|no availability|"
                                      r"[Uu]navailable for your dates", blok)),
            "takseUkljucene": "Includes taxes and charges" in blok,
            "plazaBlizu": "Beach nearby" in blok or "Beachfront" in blok,
            "link": link,
        })
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--svez", action="store_true")
    ap.add_argument("--grad")
    a = ap.parse_args()

    gradovi = [x.strip() for x in a.grad.split(",")] if a.grad else list(GRADOVI)
    for g in gradovi:
        if g not in GRADOVI:
            raise SystemExit(f"Nepoznato mesto: {g}. Poznata: {', '.join(GRADOVI)}")
    svi, iz_kesa = [], 0
    for grad in gradovi:
        for kljuc, (kod, ime, oznaka) in PANSION.items():
            dom, kes = povuci(uri(grad, kod), a.svez)
            iz_kesa += kes
            proveri_kod(dom, kod, oznaka)
            r = raspari(dom, grad, kljuc)
            prodato = [x for x in r if x["prodato"]]
            r = [x for x in r if not x["prodato"] and x["cena"]]
            svi += r
            print(f"  {grad:<22} {ime:<14} {len(r):>3} slobodno"
                  f"{', ' + str(len(prodato)) + ' prodato' if prodato else ''}"
                  f"{'  (keš)' if kes else ''}", file=sys.stderr)

    put = pathlib.Path(__file__).parent / "ponude.json"
    put.write_text(json.dumps({
        "prikupljeno": time.strftime("%Y-%m-%d %H:%M"),
        "dolazak": DOLAZAK, "odlazak": ODLAZAK, "noci": NOCI, "osoba": OSOBA,
        "izvor": "Booking.com preko headless Chrome-a", "ponude": svi,
    }, ensure_ascii=False, indent=1), "utf-8")
    print(f"\n{len(svi)} ponuda -> {put}  ({iz_kesa} upita iz keša)", file=sys.stderr)


if __name__ == "__main__":
    main()

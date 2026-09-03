#!/usr/bin/env python3
"""
mesta.json (rucno) + ponude.json (skrejper.py) + agoda.json (agoda.py) -> podaci.js

Spaja ponude istog hotela iz sve cetiri pretrage po pansionu u jednu karticu,
dedupira hotele koji se pojave u pretrazi vise mesta (Booking siri radijus),
prilepi Agodinu cenu za poredjenje i doda linkove sa vec upisanim datumima.

Kolone km od polazista NEMA — izbacena je pri selidbi sa Grcke na Crnu Goru
(crnogorsko primorje je kompaktno, udaljenost ne razlikuje ponude medjusobno).
Zato je nema ni u mesta.json, ni u bodovanju, ni na strani.
"""
import json, pathlib, re, sys, urllib.parse as up

D = pathlib.Path(__file__).parent
BUDZET = 1100

mesta = {k: v for k, v in json.loads((D / "mesta.json").read_text("utf-8")).items()
         if not k.startswith("_")}
pon = json.loads((D / "ponude.json").read_text("utf-8"))
# Rucno pisani kontakti hotela (direktan kanal). Nema cena — vidi objasnjenje u direktno.json.
dir_put = D / "direktno.json"
dirk = {k: v for k, v in json.loads(dir_put.read_text("utf-8")).items()
        if not k.startswith("_")} if dir_put.exists() else {}

# Agodine cene za poredjenje. NE ulaze u bodovanje — vidi objasnjenje u agoda.py.
ag_put = D / "agoda.json"
AGODA = {}
if ag_put.exists():
    _ag = json.loads(ag_put.read_text("utf-8"))
    AGODA_PRIKUPLJENO = _ag["prikupljeno"]
    for x in _ag["ponude"]:
        k = re.sub(r"\W+", "", x["hotel"].lower())
        if x["cenaUkupno"] and (k not in AGODA or x["cenaUkupno"] < AGODA[k]["cenaUkupno"]):
            AGODA[k] = x
else:
    AGODA_PRIKUPLJENO = None

det_put = D / "detalji.json"
if not det_put.exists():
    print("UPOZORENJE: detalji.json ne postoji — strana bi ostala BEZ udaljenosti od plaže\n"
          "            i od centra. Pokreni prvo ./detalji.py, pa opet ovo.\n"
          "            (Nastavljam, ali nemoj to objaviti.)", file=sys.stderr)
    det = {}
else:
    det = json.loads(det_put.read_text("utf-8"))

# Booking-ov filter "Breakfast included" (mealplan=1) je NADSKUP: vraca i hotele
# cija je najjeftinija ponuda polupansion ili all inclusive, jer i oni ukljucuju
# dorucak. Zato se pansion NE izvodi iz filtera nego iz teksta na samoj kartici.
TEKST_U_PANSION = {
    "all-inclusive": "AI", "all inclusive": "AI",
    "all meals included": "FB", "full board": "FB",
    "breakfast & dinner included": "PP", "half board": "PP",
    "breakfast included": "ND",
    "self catering": "NA",
}


def pansion_od(p):
    """Pravi pansion ponude: prvo tekst sa kartice, pa filter kao rezerva."""
    t = (p.get("pansionTekst") or "").strip().lower()
    return TEKST_U_PANSION.get(t) or p["pansion"]


# --- spoji po hotelu -----------------------------------------------------------
h = {}
for p in pon["ponude"]:
    kljuc = re.sub(r"\W+", "", p["hotel"].lower())
    r = h.setdefault(kljuc, {
        "hotel": p["hotel"], "gradovi": {}, "cene": {},
        "ocena": p["ocena"], "brOcena": p["brOcena"], "zvezdice": p["zvezdice"],
        "plazaBlizu": False, "takseUkljucene": True, "link": p["link"], "soba": {},
    })
    # najbliza pretraga pobedjuje kao "mesto" hotela
    r["gradovi"][p["grad"]] = p["udaljenost"]
    c, pan = p["cena"], pansion_od(p)
    if c and (pan not in r["cene"] or c < r["cene"][pan]):
        r["cene"][pan] = c
        r["soba"][pan] = p["soba"]
    r["plazaBlizu"] |= p["plazaBlizu"]
    r["takseUkljucene"] &= p["takseUkljucene"]
    for f in ("ocena", "brOcena", "zvezdice"):
        if r[f] is None:
            r[f] = p[f]
    if p["link"] and not r["link"]:
        r["link"] = p["link"]


def daljina(s):
    """Booking-ov tekst 'X km from centre' / '150 m from centre' -> km."""
    m = re.search(r"([\d.]+)\s*km", s)
    if m: return float(m.group(1))
    m = re.search(r"(\d+)\s*m", s)
    return float(m.group(1)) / 1000 if m else 99


def km_ključ(rec):
    """Mesto hotela = ono cija je pretraga dala najmanju udaljenost od centra."""
    return min(rec["gradovi"], key=lambda g: daljina(rec["gradovi"][g]))


# Preko ovoliko km od centra pripisanog mesta hotel se NE racuna kao "u mestu".
# Booking pretraga jednog mesta redovno vrati i hotele iz sire okoline: strana za
# Becice ima 25 kartica, a sam Booking na njoj pise "Becici: 2 properties found".
U_MESTU_KM = 3.0

# Booking na strani hotela kaze "X m from the centre of <mesto>" — to je pouzdaniji
# podatak o mestu od pretrage (pretraga siri radijus). Nazivi se pisu i latinicom
# bez dijakritike i sa njom, pa se svode na klucove iz mesta.json.
ALIJASI = {
    # Budvanska rivijera
    "becici": "Becici", "bečići": "Becici", "becici beach": "Becici",
    "rafailovici": "Rafailovici", "rafailovići": "Rafailovici",
    "budva": "Budva", "budva riviera": "Budva",
    "sveti stefan": "Sveti Stefan", "st. stefan": "Sveti Stefan",
    "przno": "Przno", "pržno": "Przno", "przno beach": "Przno",
    # Boka
    "herceg novi": "Herceg Novi", "herceg-novi": "Herceg Novi",
    "igalo": "Igalo",
    "njivice": "Njivice",
    "djenovici": "Djenovici", "đenovići": "Djenovici", "denovici": "Djenovici",
    "kumbor": "Kumbor",
    # Nisu pretrazivani kao polazna mesta, ali ih je Booking prijavio kao pravo
    # mesto hotela nadjenih u susednoj pretrazi — i oba su unutar istog pojasa.
    "baosici": "Baosici", "baošići": "Baosici",
    # Booking-ove mrvice umeju da siđu na nivo kvarta, ne mesta: Španjola je
    # tvrđava i kraj IZNAD hercegnovskog starog grada, pod Herceg Novi County.
    "spanjola": "Herceg Novi", "španjola": "Herceg Novi",
    "suscepan": "Suscepan", "sušćepan": "Suscepan", "sušcepan": "Suscepan",
}


KVACICE = str.maketrans({"č": "c", "ć": "c", "š": "s", "ž": "z", "đ": "d",
                         "Č": "c", "Ć": "c", "Š": "s", "Ž": "z", "Đ": "d",
                         "ð": "d", "Ð": "d"})   # Booking Đ ume da posalje kao Ð/ð


def bez_kvacica(s):
    return s.translate(KVACICE).lower().replace("-", " ").strip()


def svedi(naziv, mesta):
    """Booking-ov naziv mesta -> ključ iz mesta.json, ili None ako se ne poznaje."""
    if not naziv:
        return None
    n = naziv.strip().lower()
    if naziv in mesta:
        return naziv
    if n in ALIJASI:
        return ALIJASI[n]
    for k, v in mesta.items():
        if n == k.lower() or n == v["ime"].lower():
            return k
    # Poslednja mreza: bez kvacica i bez crtice ("Herceg-Novi" -> "herceg novi",
    # "Ðenovići" -> "denovici"). Booking pise ista mesta na vise nacina.
    b = bez_kvacica(naziv)
    for k, v in mesta.items():
        if b in (bez_kvacica(k), bez_kvacica(v["ime"])):
            return k
    return ALIJASI.get(b)


def komparator(hotel, grad):
    q = up.quote_plus(f"{hotel} {mesta[grad]['ime']} Montenegro")
    return [
        {"naziv": "Google Hotels — uporedi sve", "url":
         f"https://www.google.com/travel/search?q={q}&qs=CAE&ap=MABoAA"},
        {"naziv": "Trivago", "url":
         f"https://www.trivago.com/en-US/srl?query={q}&dr-20260905-20260913=&rc-2="},
    ]


def skala(v, dobro, lose):
    """v=dobro -> 1.0, v=lose -> 0.0, linearno, odsečeno na [0,1]."""
    if v is None:
        return None
    return max(0.0, min(1.0, (lose - v) / (lose - dobro)))


# Tezine bodovanja. Zbir = 1.0. Objasnjeno je i na samoj strani.
TEZINE = {"ocena": 0.34, "cena": 0.18, "plaza": 0.18, "centar": 0.10,
          "zivost": 0.10, "pansion": 0.10}


# Koliko pansion vredi za njihov zadatak. Dorucak nije bezvredan (ostaje im budzet
# za taverne), ali polupansion i AI resavaju vecere — zato je stepenovano.
BOD_PANSION = {"AI": 1.0, "FB": 0.9, "PP": 0.7, "ND": 0.4, "NA": 0.25}


def preporuka(cena, ocena, brOcena, plazaM, centarM, zivost, imaAI, uBudzetu):
    d = {
        # 6.5 je "prolazno" na Booking-u, 9.6 je prakticni maksimum
        "ocena":   skala(ocena, 9.6, 6.5) if ocena else None,
        # 600 EUR je prakticno dno za 8 noci za dvoje; skuplje od budzeta -> 0
        "cena":    skala(cena, 600, BUDZET),
        "plaza":   skala(plazaM, 0, 800),
        "centar":  skala(centarM, 0, 1200),
        "zivost":  (zivost - 1) / 4,
        "pansion": imaAI,      # vec stepenovano u pozivu
    }
    # Nedostajuci podatak ne kaznjava i ne nagradjuje - dobija sredinu.
    bodovi = sum(TEZINE[k] * (0.5 if v is None else v) for k, v in d.items())
    if not uBudzetu:
        bodovi *= 0.45          # preko budzeta pada nisko, ali se ne krije
    if brOcena and brOcena < 40:
        bodovi *= 0.85          # malo ocena = manje pouzdana ocena
    return round(bodovi * 100), {k: (None if v is None else round(v * 100)) for k, v in d.items()}


NEPOZNATA = {}
out = []
for rec in h.values():
    if not rec["cene"]:
        continue
    grad = km_ključ(rec)
    m = mesta[grad]
    naj = min(rec["cene"].values())
    udaljTekst = rec["gradovi"][grad]      # zapamti PRE eventualne zamene mesta
    off = daljina(udaljTekst)

    hid = re.sub(r"[^a-z0-9]+", "-", rec["hotel"].lower()).strip("-")[:48]
    dd = det.get(hid, {})
    plazaM, centarM = dd.get("plazaM"), dd.get("centarM")

    # Booking na strani hotela kaze kog je mesta centar i koliko je od njega.
    # To je pouzdanije od pretrage: pretraga jednog mesta nadje i hotel koji je
    # 8 km od NJEGA a 300 m od svog sopstvenog mesta.
    # Redosled izvora za MESTO: Booking-ove mrvice (kanonske) pa FAQ pa pretraga.
    izvorMesta = dd.get("mestoMrvica") or dd.get("centarMesto")
    pravo = svedi(izvorMesta, mesta)
    if pravo:
        grad, m = pravo, mesta[pravo]
    elif izvorMesta:
        # Booking zna kog je mesta hotel, a to mesto NIJE na nasoj listi (Bijela,
        # Baosici, Petrovac, Kotor...). Ranije se takav hotel prikazivao pod imenom
        # mesta po kome ga je pretraga nasla — dakle sa POGRESNIM mestom. Sad ispada,
        # a naziv se ispise na kraju da se doda u ALIJASI ako je ipak nase.
        NEPOZNATA.setdefault(izvorMesta, []).append(rec["hotel"])
        continue

    # Odluka "u mestu ili ne": po Booking-ovom centru ako ga ima, inace po pretrazi.
    uMestu = (centarM <= U_MESTU_KM * 1000) if centarM is not None else (off <= U_MESTU_KM)
    if not uMestu:
        continue                 # hoteli van mesta se ne prikazuju (odluka korisnika)
    if centarM is None:
        centarM = round(off * 1000)
    najboljiPansion = max(rec["cene"], key=lambda k: BOD_PANSION.get(k, 0.3))
    bodovi, razrada = preporuka(naj, rec["ocena"], rec["brOcena"], plazaM,
                                centarM, m["zivost"],
                                BOD_PANSION.get(najboljiPansion, 0.3),
                                naj <= BUDZET)
    link = rec["link"] or f"https://www.booking.com/searchresults.html?ss={up.quote_plus(rec['hotel'])}"
    sep = "&" if "?" in link else "?"

    # Agodina cena za poredjenje. PROCENA (njena cena po noci x 8), ne tacan zbir
    # kao kod Booking-a, i ne zna se za koji je pansion — zato NE ulazi u bodove.
    ag = AGODA.get(re.sub(r"\W+", "", rec["hotel"].lower()))
    agoda = {"cenaNoc": ag["cenaNoc"], "cenaUkupno": ag["cenaUkupno"],
             "link": ag["link"], "ocena": ag["ocena"]} if ag else None
    out.append({
        "id": re.sub(r"[^a-z0-9]+", "-", rec["hotel"].lower()).strip("-")[:48],
        "hotel": rec["hotel"], "grad": grad, "mesto": m["ime"],
        "rivijera": m["rivijera"], "zivost": m["zivost"],
        "plazaM": plazaM, "centarM": centarM,
        # "Na plazi" = Booking-ova izmerena udaljenost do najblize plaze do 50 m.
        "naPlazi": plazaM is not None and plazaM <= 50,
        "centarMesto": dd.get("centarMesto"),
        "aerodromKm": dd.get("aerodromKm"),
        "bodovi": bodovi, "razrada": razrada,
        "direktno": dirk.get(re.sub(r"[^a-z0-9]+", "-", rec["hotel"].lower()).strip("-")[:48]),
        "zvezdice": rec["zvezdice"], "ocena": rec["ocena"], "brOcena": rec["brOcena"],
        "cene": rec["cene"], "najniza": naj, "soba": rec["soba"],
        "najboljiPansion": najboljiPansion,
        "udaljenostOdCentra": udaljTekst,
        "plazaBlizu": rec["plazaBlizu"], "takseUkljucene": rec["takseUkljucene"],
        "uBudzetu": naj <= BUDZET,
        "agoda": agoda,
        # "jeftinije na Agodi" tek ako je razlika veca od 3% — ispod toga je to sum
        # dva razlicita nacina racunanja, ne prava usteda.
        "jeftinijeAgoda": bool(agoda and agoda["cenaUkupno"] < naj * 0.97),
        "linkovi": [{"naziv": "Booking — datumi upisani", "url":
                     link + sep + "checkin=2026-09-05&checkout=2026-09-13"
                            "&group_adults=2&no_rooms=1&group_children=0"
                            "&selected_currency=EUR"}] + komparator(rec["hotel"], grad),
    })

out.sort(key=lambda r: -r["bodovi"])

# --- tragovi: ima na Agodi, nema na Booking-u ---------------------------------
# Ovi hoteli se NE mesaju sa glavnom listom i NE dobijaju bodove. O njima se zna
# samo ime, Agodina ocena i procenjena cena — nema pansiona (Agoda ga ne daje
# pouzdano), nema udaljenosti od plaze, a "mesto" je samo grad po kome ih je
# pretraga nasla, ne Booking-ov proveren podatak. Zato su odvojeni i tako oznaceni.
SAMO_AGODA_MIN_OCENA = 8.5
SAMO_AGODA_MAX = 3 * BUDZET      # 3x budzet: taman da stane Iberostar Bellevue (~2.440 EUR),
                                 # jedini veliki all inclusive u Becicima. Dalje od toga je sum.
_uBookingu = {re.sub(r"\W+", "", x["hotel"].lower()) for x in pon["ponude"]}
_imena_mesta = {k: v["ime"] for k, v in mesta.items()}
samoAgoda = sorted(
    (v for k, v in AGODA.items()
     if k not in _uBookingu and (v["ocena"] or 0) >= SAMO_AGODA_MIN_OCENA
     and v["cenaUkupno"] <= SAMO_AGODA_MAX),
    key=lambda v: (-(v["ocena"] or 0), v["cenaUkupno"]))
samoAgoda = [{"hotel": v["hotel"], "mesto": _imena_mesta.get(v["grad"], v["grad"]),
              "ocena": v["ocena"], "cenaNoc": v["cenaNoc"],
              "cenaUkupno": v["cenaUkupno"], "link": v["link"],
              # i trag moze da ima rucno proveren kontakt — kljuc je isti slug kao gore
              "direktno": dirk.get(re.sub(r"[^a-z0-9]+", "-", v["hotel"].lower()).strip("-")[:48])}
             for v in samoAgoda]

js = f"""// GENERISANO — ne menjaj rukom.
// Izvor: mesta.json + ponude.json (+ agoda.json), generator: napravi.py
//
// Cene su STVARNE cene sa Booking.com-a za 05.09.–13.09.2026, 2 odrasle, 1 soba, EUR,
// procitane {pon['prikupljeno']} pravim browserom (headless Chrome — Booking obicnom
// curl-u vrati 202 i praznu stranicu). Cena je UKUPNO ZA CEO BORAVAK ZA DVOJE, ne po osobi.
//
// STO OVO ZNACI ZA RASPOLOZIVOST: Booking pretraga sa upisanim datumima vraca samo ono sto
// je slobodno; objekti oznaceni "sold out" su prepoznati po kartici i IZBACENI. Znaci —
// prisustvo hotela na listi znaci da je 05.–13.09. stvarno bilo slobodno u trenutku
// citanja. Dva dana pred put to se menja iz sata u sat — pre uplate proveriti.
//
// Pansion (kodovi procitani iz Booking-ovog menija, nisu pogodjeni):
//   ND = mealplan=1  "Breakfast included"           samo dorucak
//   PP = mealplan=9  "Breakfast & dinner included"  polupansion
//   FB = mealplan=3  "All meals included"           pun pansion
//   AI = mealplan=4  "All-inclusive"
// Sam filter se koristi samo kao rezerva — pansion se cita sa kartice hotela, jer je
// filter "Breakfast included" NADSKUP i vraca i polupansion i all inclusive.
//
// AGODA: druga cena, samo za poredjenje. To je Agodina cena PO NOCI sa taksama
// pomnozena sa {pon['noci']}, dakle PROCENA, i ne zna se za koji je pansion. Zato NE ULAZI
// U BODOVE — bodovanje je iskljucivo na Booking-ovim brojevima.
//
// Google Hotels i Trivago linkovi imaju upisane datume, ali njihov sadrzaj NIJE
// masinski proveren — ucitavaju se JavaScript-om i u headless dump-u vrate praznu
// skoljku bez cena. Sluze za rucno uporedjivanje.

const KLJUC = "odmor-crnagora-2026-v1";
const DOLAZAK = "05.09.2026";
const ODLAZAK = "13.09.2026";
const NOCI = {pon['noci']};
const OSOBA = {pon['osoba']};
const BUDZET = {BUDZET};
const PRIKUPLJENO = "{pon['prikupljeno']}";
const AGODA_PRIKUPLJENO = {json.dumps(AGODA_PRIKUPLJENO)};

const TEZINE = {json.dumps(TEZINE, ensure_ascii=False)};

const MESTA = {json.dumps({m["ime"]: {"rivijera": m["rivijera"], "zivost": m["zivost"], "tekst": m["tekst"]} for k, m in mesta.items() if any(r["grad"] == k for r in out)}, ensure_ascii=False, indent=1)};

const HOTELI = {json.dumps(out, ensure_ascii=False, indent=1)};

// Tragovi sa Agode kojih na Booking-u NEMA. Bez pansiona, bez udaljenosti od plaze,
// mesto je samo Agodin grad pretrage. Ne ulaze u listu ni u bodove — vidi napravi.py.
const SAMO_AGODA = {json.dumps(samoAgoda, ensure_ascii=False, indent=1)};
"""
(D / "podaci.js").write_text(js, "utf-8")

# Zalepi verziju na podaci.js/app.js/stil.css u index.html. Bez ovoga pretrazivac
# servira stari podaci.js iz keša (GitHub Pages salje max-age=600) i strana pokazuje
# juceranje hotele — sto se i desilo: prikazivao je "Aris" i posle ispravke.
verzija = re.sub(r"\D", "", pon["prikupljeno"])
ih = D / "index.html"
html = ih.read_text("utf-8")
for fajl, atr in (("podaci.js", "src"), ("app.js", "src"), ("stil.css", "href")):
    html = re.sub(r'%s="%s(?:\?v=\d+)?"' % (atr, re.escape(fajl)),
                  '%s="%s?v=%s"' % (atr, fajl, verzija), html)
ih.write_text(html, "utf-8")

from collections import Counter
raspodela = Counter(k for r in out for k in r["cene"])
ai = [r for r in out if "AI" in r["cene"]]
bezPlaze = [r for r in out if r["plazaM"] is None]
print(f"podaci.js: {len(out)} hotela iz {len({r['grad'] for r in out})} mesta")
print(f"  u budžetu (≤{BUDZET} €): {sum(r['uBudzetu'] for r in out)}")
print(f"  ima all inclusive: {len(ai)}, od toga u budžetu: {sum(r['uBudzetu'] for r in ai)}")
print(f"  verzija zalepljena na index.html: ?v={verzija}")
print(f"  sa direktnim kontaktom: {sum(1 for r in out if r['direktno'])}")
print(f"  sa Agodinom cenom: {sum(1 for r in out if r['agoda'])}"
      f", jeftinije na Agodi: {sum(1 for r in out if r['jeftinijeAgoda'])}")
print(f"  tragovi (ima na Agodi, nema na Booking-u): {len(samoAgoda)}")
print(f"  po pansionu: " + ", ".join(f"{k}={v}" for k, v in sorted(raspodela.items())))
print(f"  bez podatka o plaži: {len(bezPlaze)}"
      + ("   <-- SVI! detalji.json nije uvezan" if len(bezPlaze) == len(out) else ""))
if NEPOZNATA:
    print("  MESTA KOJA NE POZNAJEM (dodaj u mesta.json ili ALIJASI):")
    for k, v in sorted(NEPOZNATA.items(), key=lambda x: -len(x[1])):
        print(f"    {k:<28} {len(v)} hotel(a): {', '.join(x[:26] for x in v[:3])}")
print(f"  top 5 po preporuci:")
for r in out[:5]:
    print(f"    {r['bodovi']:>3} bod  {r['najniza']:>5} €  oc {r['ocena']}  "
          f"plaža {r['plazaM']} m  {r['hotel'][:32]}  ({r['mesto']})")

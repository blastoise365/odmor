#!/usr/bin/env python3
"""
mesta.json (rucno) + ponude.json (skrejper.py) -> podaci.js

Spaja ponude istog hotela iz PP i AI pretrage u jednu karticu, dedupira hotele koji
se pojave u pretrazi vise mesta (Booking siri radijus), i dodaje linkove za
uporedjivanje cene (Google Hotels, Trivago) sa vec upisanim datumima.
"""
import json, pathlib, re, urllib.parse as up

D = pathlib.Path(__file__).parent
BUDZET = 1100

mesta = {k: v for k, v in json.loads((D / "mesta.json").read_text("utf-8")).items()
         if not k.startswith("_")}
pon = json.loads((D / "ponude.json").read_text("utf-8"))

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
    c = p["cena"]
    if c and (p["pansion"] not in r["cene"] or c < r["cene"][p["pansion"]]):
        r["cene"][p["pansion"]] = c
        r["soba"][p["pansion"]] = p["soba"]
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


# Preko ovoliko km od centra pripisanog mesta hotel se NE racuna kao "u mestu":
# tada km od Soluna nije poznata tacno, jer se ne zna u kom smeru je hotel.
U_MESTU_KM = 3.0


def komparator(hotel, grad):
    q = up.quote_plus(f"{hotel} {mesta[grad]['ime']} Greece")
    return [
        {"naziv": "Google Hotels — uporedi sve", "url":
         f"https://www.google.com/travel/search?q={q}&qs=CAE&ap=MABoAA"},
        {"naziv": "Trivago", "url":
         f"https://www.trivago.com/en-US/srl?query={q}&dr-20260905-20260913=&rc-2="},
    ]


out = []
for rec in h.values():
    if not rec["cene"]:
        continue
    grad = km_ključ(rec)
    m = mesta[grad]
    naj = min(rec["cene"].values())
    off = daljina(rec["gradovi"][grad])
    uMestu = off <= U_MESTU_KM
    # Ako je hotel izvan mesta, km od Soluna je raspon, ne broj — ne zna se smer.
    kmOpis = (f"{m['km']} km" if uMestu else
              f"{max(0, round(m['km'] - off))}\u2013{round(m['km'] + off)} km")
    link = rec["link"] or f"https://www.booking.com/searchresults.html?ss={up.quote_plus(rec['hotel'])}"
    sep = "&" if "?" in link else "?"
    out.append({
        "id": re.sub(r"[^a-z0-9]+", "-", rec["hotel"].lower()).strip("-")[:48],
        "hotel": rec["hotel"], "grad": grad, "mesto": m["ime"], "km": m["km"],
        "vozOko": m["vozOko"], "zivost": m["zivost"],
        "uMestu": uMestu, "odCentraKm": off, "kmOpis": kmOpis,
        "zvezdice": rec["zvezdice"], "ocena": rec["ocena"], "brOcena": rec["brOcena"],
        "cene": rec["cene"], "najniza": naj, "soba": rec["soba"],
        "udaljenostOdCentra": rec["gradovi"][grad],
        "plazaBlizu": rec["plazaBlizu"], "takseUkljucene": rec["takseUkljucene"],
        "uBudzetu": naj <= BUDZET,
        "linkovi": [{"naziv": "Booking — datumi upisani", "url":
                     link + sep + "checkin=2026-09-05&checkout=2026-09-13"
                            "&group_adults=2&no_rooms=1&group_children=0"
                            "&selected_currency=EUR"}] + komparator(rec["hotel"], grad),
    })

out.sort(key=lambda r: (not r["uBudzetu"], r["najniza"]))

js = f"""// GENERISANO — ne menjaj rukom. Izvor: mesta.json + ponude.json, generator: napravi.py
//
// Cene su STVARNE cene sa Booking.com-a za 05.09.–13.09.2026, 2 odrasle, 1 soba, EUR,
// procitane {pon['prikupljeno']} pravim browserom (headless Chrome — Booking obicnom
// curl-u vrati 202 i praznu stranicu). Cena je UKUPNO ZA CEO BORAVAK ZA DVOJE, ne po osobi.
//
// STO OVO ZNACI ZA RASPOLOZIVOST: Booking pretraga sa upisanim datumima vraca samo ono sto
// je slobodno; objekti oznaceni "sold out" su prepoznati po kartici i IZBACENI. Znaci —
// za razliku od agencijskih cenovnika, ovde prisustvo hotela znaci da je 05.–13.09.
// stvarno bilo slobodno u trenutku citanja. Cene i slobodne sobe se menjaju iz sata u sat.
//
// Pansion: PP = Booking filter "Breakfast & dinner included" (mealplan=1)
//          AI = Booking filter "All-inclusive" (mealplan=9)
// Kodovi filtera su procitani iz Booking-ovog menija, nisu pogodjeni.
//
// Google Hotels i Trivago linkovi imaju upisane datume, ali njihov sadrzaj NIJE
// masinski proveren — oni se ucitavaju JavaScript-om i u headless dump-u vrate praznu
// skoljku bez cena (Hotels.com odmah trazi captcha). Sluze za rucno uporedjivanje.

const KLJUC = "odmor-grcka-2026-v2";
const DOLAZAK = "05.09.2026";
const ODLAZAK = "13.09.2026";
const NOCI = {pon['noci']};
const OSOBA = {pon['osoba']};
const BUDZET = {BUDZET};
const PRIKUPLJENO = "{pon['prikupljeno']}";

const MESTA = {json.dumps({m["ime"]: {"km": m["km"], "vozOko": m["vozOko"], "zivost": m["zivost"], "tekst": m["tekst"]} for k, m in mesta.items() if any(r["grad"] == k for r in out)}, ensure_ascii=False, indent=1)};

const HOTELI = {json.dumps(out, ensure_ascii=False, indent=1)};
"""
(D / "podaci.js").write_text(js, "utf-8")

ai = [r for r in out if "AI" in r["cene"]]
uM = [r for r in out if r["uMestu"]]
print(f"podaci.js: {len(out)} hotela iz {len({r['grad'] for r in out})} mesta")
print(f"  u budžetu (≤{BUDZET} €): {sum(r['uBudzetu'] for r in out)}")
print(f"  ima all inclusive: {len(ai)}, od toga u budžetu: {sum(r['uBudzetu'] for r in ai)}")
print(f"  u samom mestu (\u22643 km od centra): {len(uM)}; okolina: {len(out) - len(uM)}")

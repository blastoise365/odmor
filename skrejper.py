#!/usr/bin/env python3
"""
Direktne ponude za odmor 05.09-13.09.2026 (2 odrasle, 8 noci).

Cita STVARNE cene sa Booking.com preko headless Chrome-a (Booking blokira obican
curl - vrati 202 i praznu stranicu - ali normalan browser prolazi).

Licna upotreba. Throttle 6 s izmedju upita, opisan User-Agent, HTML se kesira u
kes/ pa se ponovni run ne obraca sajtu. Za bilo sta komercijalno - partner API.

    ./skrejper.py            # svi gradovi, polupansion + all inclusive
    ./skrejper.py --svez     # ignoriši keš
    ./skrejper.py --grad Hanioti
"""
import argparse, hashlib, json, pathlib, re, subprocess, sys, time, html as htmllib
from urllib.parse import urlencode

DOLAZAK, ODLAZAK, NOCI, OSOBA = "2026-09-05", "2026-09-13", 8, 2
KES = pathlib.Path(__file__).parent / "kes"
UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) "
      "Chrome/128.0.0.0 Safari/537.36")

# Booking-ovi kodovi za pansion, procitani iz njihovog filter menija (ne pogodjeni):
PANSION = {"PP": ("1", "polupansion"), "AI": ("9", "all inclusive")}

# Mesta: naziv za Booking pretragu -> km od Soluna (izracunato OSRM-om, ne prepisano)
GRADOVI = {
    "Nea Kallikratia": 42, "Sozopoli": 48, "Nea Plagia": 50, "Nea Flogita": 55,
    "Nea Moudania": 61, "Nea Potidea": 68, "Paralia Katerinis": 73,
    "Nea Fokea": 81, "Sani": 84, "Metamorfosi": 85, "Kriopigi": 89,
    "Kallithea Halkidiki": 96, "Posidi": 104, "Polychrono": 105,
    "Hanioti": 109, "Nikiti": 110, "Pefkochori": 113,
}


def uri(grad, kod):
    q = {
        "ss": f"{grad}, Greece", "checkin": DOLAZAK, "checkout": ODLAZAK,
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

        out.append({
            "hotel": ime, "grad": grad, "km": GRADOVI[grad], "pansion": pansion,
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

    gradovi = [a.grad] if a.grad else list(GRADOVI)
    svi, iz_kesa = [], 0
    for grad in gradovi:
        for kljuc, (kod, ime) in PANSION.items():
            dom, kes = povuci(uri(grad, kod), a.svez)
            iz_kesa += kes
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

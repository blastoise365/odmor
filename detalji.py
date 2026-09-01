#!/usr/bin/env python3
"""
Cita Booking stranicu hotela i vadi:
  - udaljenost do najblize plaze (blok "Beaches in the neighbourhood")
  - udaljenost do centra mesta (Booking-ov FAQ)
  - "Beachfront" oznaku

Toga NEMA u rezultatima pretrage, samo na stranici hotela. Zato se ovo vrti posebno.

Cita ponude.json (ne podaci.js) — da nema kruzne zavisnosti sa napravi.py. Vuce
sve hotele do PRAG_KM od nekog pretrazivanog centra, sire od finalnog filtera od
3 km: Booking pretraga jednog mesta cesto nadje hotel koji je 8 km od NJEGA a
300 m od svog sopstvenog mesta. Pravu odluku "u mestu ili ne" posle donosi
napravi.py, na osnovu Booking-ovog "X m from the centre of <mesto>".

Rezultat: detalji.json. HTML se kesira u kes/, pa ponovni run ne ide na sajt.

    ./detalji.py            # svi u-mestu hoteli
    ./detalji.py --svez
"""
import argparse, hashlib, html, json, pathlib, re, subprocess, sys, time

D = pathlib.Path(__file__).parent
KES = D / "kes"
UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) "
      "Chrome/128.0.0.0 Safari/537.36")
PRAG_KM = 10.0
DATUMI = "?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&selected_currency=EUR"


def u_metre(broj, jedinica):
    """Booking na en-gb pise '1,000 m' — zapeta je razdvajac hiljada, NE decimalna.
    Tacka je decimalna ('2.3 km'). Zato se zapeta brise, tacka ostaje."""
    n = float(broj.replace(",", ""))
    return round(n * 1000) if jedinica.lower().startswith("km") else round(n)


def povuci(url, svez=False):
    KES.mkdir(exist_ok=True)
    put = KES / ("h" + hashlib.sha1(url.encode()).hexdigest()[:16] + ".html")
    if put.exists() and not svez:
        return put.read_text("utf-8"), True
    time.sleep(6)
    r = subprocess.run(
        ["google-chrome", "--headless=new", "--disable-gpu", "--no-sandbox",
         "--hide-scrollbars", "--window-size=1400,6000", "--lang=en-GB",
         f"--user-agent={UA}", "--virtual-time-budget=22000", "--dump-dom", url],
        capture_output=True, text=True, timeout=180)
    put.write_text(r.stdout, "utf-8")
    return r.stdout, False


def izvadi(dom):
    t = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", dom)))

    plaza = None
    # 1) blok "Beaches in the neighbourhood" - prva stavka je najbliza plaza
    m = re.search(r"Beaches? in the neighbou?rhood\s+(.{0,200})", t, re.I)
    if m:
        p = re.search(r"([A-Z][^0-9]{2,60}?)\s+([\d.,]+)\s*(km|m)\b", m.group(1))
        if p:
            plaza = u_metre(p.group(2), p.group(3))
    # 2) rezerva: Booking-ov FAQ
    if plaza is None:
        m = re.search(r"nearest beach is (?:just |only )?([\d.,]+)\s*(km|m)\b", t, re.I)
        if m:
            plaza = u_metre(m.group(1), m.group(2))
    # 3) rezerva: opis "Situated within 300 metres of ... Beach"
    if plaza is None:
        m = re.search(r"[Ss]ituated within ([\d.,]+)\s*(km|metre|meter|m)\w*\s+of\s+[^.]{0,40}Beach", t)
        if m:
            plaza = u_metre(m.group(1), "km" if m.group(2) == "km" else "m")

    # Centar mesta. Booking na istoj strani kaze i "85 km from the centre of Thessaloniki",
    # a pravi odgovor je u FAQ-u gde broj stoji POSLE pitanja:
    #   "How far is <hotel> from the centre of Hanioti? <hotel> is 1,000 m from the centre"
    centar, centarMesto = None, None
    m = re.search(r"from the (?:centre|center) of ([A-Z][^?]{1,40}?)\?"
                  r".{0,160}?\bis\s+([\d.,]+)\s*(km|m)\b", t, re.I)
    if m:
        centarMesto = m.group(1).strip()
        centar = u_metre(m.group(2), m.group(3))
    else:
        # Rezerva: "N km from the centre of X", ali NE ako je X Solun ili aerodrom.
        for broj, jed, mesto in re.findall(
                r"([\d.,]+)\s*(km|m)\b\s*from the (?:centre|center) of\s+([A-Za-z ]{2,30})", t, re.I):
            if re.search(r"thessalonik|airport", mesto, re.I):
                continue
            v = u_metre(broj, jed)
            if v <= 15000 and (centar is None or v < centar):
                centar, centarMesto = v, mesto.strip()

    aerodrom = None
    m = re.search(r"Thessaloniki Airport\s+([\d.,]+)\s*(km|m)\b", t, re.I)
    if m:
        aerodrom = u_metre(m.group(1), m.group(2))

    if plaza is not None and plaza > 15000:
        plaza = None
    return {"plazaM": plaza, "centarM": centar, "centarMesto": centarMesto,
            "aerodromKm": round(aerodrom / 1000) if aerodrom else None,
            "naPlazi": bool(re.search(r"\bBeachfront\b", t))}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--svez", action="store_true")
    a = ap.parse_args()

    pon = json.loads((D / "ponude.json").read_text("utf-8"))

    def daljina(t):
        m = re.search(r"([\d.]+)\s*km", t)
        if m: return float(m.group(1))
        m = re.search(r"(\d+)\s*m", t)
        return float(m.group(1)) / 1000 if m else 99

    # Grupisi po hotelu, uzmi najmanju udaljenost i prvi link.
    grupe = {}
    for x in pon["ponude"]:
        hid = re.sub(r"[^a-z0-9]+", "-", x["hotel"].lower()).strip("-")[:48]
        g = grupe.setdefault(hid, {"hotel": x["hotel"], "link": x["link"], "off": 99})
        g["off"] = min(g["off"], daljina(x["udaljenost"]))
        if x["link"] and not g["link"]:
            g["link"] = x["link"]
    ciljevi = [dict(id=k, **v) for k, v in grupe.items()
               if v["off"] <= PRAG_KM and v["link"]]
    ciljevi.sort(key=lambda x: x["off"])

    out, kesirano, bez = {}, 0, []
    for i, h in enumerate(ciljevi, 1):
        url = h["link"].split("?")[0] + DATUMI
        dom, kes = povuci(url, a.svez)
        kesirano += kes
        r = izvadi(dom)
        out[h["id"]] = r
        if r["plazaM"] is None:
            bez.append(h["hotel"])
        print(f"  {i:>3}/{len(ciljevi)}  {h['hotel'][:34]:<34} "
              f"plaža {str(r['plazaM'] or '?'):>5} m  centar {str(r['centarM'] or '?'):>5} m"
              f"{'  na plaži' if r['naPlazi'] else ''}{'  (keš)' if kes else ''}",
              file=sys.stderr)

    (D / "detalji.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), "utf-8")
    print(f"\n{len(out)} hotela -> detalji.json  ({kesirano} iz keša)", file=sys.stderr)
    if bez:
        print(f"bez podatka o plaži ({len(bez)}): {', '.join(bez[:8])}", file=sys.stderr)


if __name__ == "__main__":
    main()

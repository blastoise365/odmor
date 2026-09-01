# Odmor — Grčka, 05.–13.09.2026

Statička strana-pregled za roditelje, po istom šablonu kao `poslovi-graz`
(`index.html` + `stil.css` + `app.js` + `podaci.js`, kvačice u `localStorage`).
Razlika je što `podaci.js` nije pisan rukom — **generiše se iz stvarnih cena sa Booking-a.**

## Zadatak

| | |
|---|---|
| Termin | **05.09.2026 (subota) – 13.09.2026 (nedelja)**, 8 noći |
| Ljudi | 2 odrasle osobe, 1 soba |
| Budžet | ~1.100 € **samo smeštaj** |
| Prevoz | sopstveni auto |
| Traženo | Grčka, ne predaleko od Soluna; mesto **ne manje** od Nea Kalikratije (gde su već bili), da ima restorana; polupansion ili all inclusive |

> Napomena o datumima: 6.9.2026. je **nedelja**, ne subota. Izabrana je varijanta
> „drži se dana“ — subota 5.9. do nedelje 13.9. = 8 noći.

## Cevovod

    ./skrejper.py            # Booking -> ponude.json   (HTML se kešira u kes/)
    ./napravi.py             # mesta.json + ponude.json -> podaci.js
    ./pokreni.sh             # http://127.0.0.1:8766

- `skrejper.py` — čita Booking preko **headless Chrome-a**, 17 mesta × 2 pansiona.
  Booking običnom `curl`-u vraća 202 i praznu stranicu; pravi browser prolazi bez captcha.
  Throttle 6 s, opisan User-Agent, sve se kešira u `kes/` pa ponovni run ne ide na sajt.
  `--svez` ignoriše keš, `--grad Hanioti` radi samo jedno mesto.
- `mesta.json` — **ručno**: km od Soluna, opis mesta, ocena „živosti“. Skrejper ovo ne dira.
- `napravi.py` — spaja PP i AI ponudu istog hotela u jednu karticu, dedupira hotele koji se
  pojave u pretrazi više mesta (Booking širi radijus), dodaje linkove za upoređivanje.
- `podaci.js` — **generisano, ne menjati rukom.**

## Šta je provereno

- **Booking — mašinski.** Cena za ceo boravak za dvoje, ocena, broj ocena, zvezdice, tip sobe,
  udaljenost od centra. Filteri za pansion su Booking-ovi sopstveni — `mealplan=1`
  (*Breakfast & dinner included*) i `mealplan=9` (*All-inclusive*); kodovi su **pročitani iz
  njihovog filter menija, nisu pogođeni**.
- **Raspoloživost.** Booking pretraga sa upisanim datumima vraća samo slobodno, a objekte
  označene *sold out* skrejper prepoznaje po kartici i izbacuje. Zato prisustvo hotela na listi
  znači da je 05.–13.09. **stvarno bilo slobodno u trenutku čitanja** — to je jedina prava
  provera raspoloživosti u celom ovom poslu.
- **Kilometraža.** Izračunata OSRM-om (vožnja od centra Soluna), **nije prepisana sa sajtova
  hotela** — oni redovno pišu „85 km“ za mesta koja su realno 110.

## Šta NIJE provereno

1. **Google Hotels i Trivago.** Linkovi imaju upisane datume i rade u pregledaču, ali se te strane
   učitavaju JavaScript-om i u headless dump-u vrate praznu školjku bez cena (Hotels.com odmah
   traži captcha, Kayak vrati samo raspon filtera u dolarima). Zato se **nijedna cena na strani ne
   poziva na njih** — služe za ručno upoređivanje. Google Hotels je za to najbolji jer za jedan
   hotel prikaže cene svih posrednika.
2. **Genius popust.** Skrejper čita Booking neprijavljen, pa su cene **bez** Genius popusta —
   prijavljen bi deo hotela trebalo da bude jeftiniji nego što na strani piše.
3. **Grčki „Climate Resilience Fee“** (01.03–31.10, 5 €/noć za 3★, 10 € za 4★, 2 € za apartman)
   se često plaća na recepciji i pored oznake „takse uključene“. Za 8 noći 40 / 80 / 16 € —
   nije uračunato u prikazanu cenu, računati kao rezervu.

## Zašto agencije nisu na listi

Prva verzija je bila na srpskim agencijskim cenovnicima (argus.rs, dreamland.travel,
travelland.rs, grckainfo.com, lastminuteponude.com). Odbačeno jer:

- **Za polazak 05.09 kontingenti više nisu otvoreni** — kod većine hotela najraniji period u
  cenovniku počinje 09.09, 11.09 ili 14.09.
- **Grčka Info radi samo na upit** („Send a booking request“, 50% depozita), bez instant potvrde,
  i skoro sve su privatni apartmani bez polupansiona.
- Agencijske cene su „po osobi po danu“ za period, pa se ukupna cena mora računati, a raspoloživost
  se ne vidi bez telefona.

Usput odbačeno i: **Athos Palace / Pallini Beach** (Kalitea) — domen `athospalace.com` je
**kompromitovan** (servira tajlandske kockarske reklame), a `ghotels.gr` je „coming soon“
placeholder; status posle renoviranja se ne može potvrditi. Ne rezervisati preko tih strana.

## Održavanje

Cene stare za dan-dva. Osvežavanje:

    ./skrejper.py --svez && ./napravi.py && git add -A && git commit -m "osvežene cene" && git push

Novo mesto: dodaj u `GRADOVI` u `skrejper.py` (km izračunaj OSRM-om, ne prepisuj sa sajta hotela)
i u `mesta.json` (`ime`, `km`, `vozOko`, `zivost`, `tekst`).

`kes/` i `ponude.json` su međurezultati — ako ne treba da idu na GitHub, dodaj ih u `.gitignore`.

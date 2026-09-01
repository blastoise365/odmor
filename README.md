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

    ./skrejper.py            # Booking pretrage  -> ponude.json    (HTML se kešira u kes/)
    ./detalji.py             # stranice hotela   -> detalji.json   (plaža, centar, mesto)
    ./napravi.py             # + mesta.json      -> podaci.js
    ./pokreni.sh             # http://127.0.0.1:8766

Sva tri su nezavisna i idu u ovom redu — `detalji.py` čita `ponude.json`, ne `podaci.js`,
pa nema kružne zavisnosti i `napravi.py` se pokreće samo jednom.

- `skrejper.py` — čita Booking preko **headless Chrome-a**, 17 mesta × 2 pansiona.
  Booking običnom `curl`-u vraća 202 i praznu stranicu; pravi browser prolazi bez captcha.
  Throttle 6 s, opisan User-Agent, sve se kešira u `kes/` pa ponovni run ne ide na sajt.
  `--svez` ignoriše keš, `--grad Hanioti` radi samo jedno mesto.
- `mesta.json` — **ručno**: km od Soluna, opis mesta, ocena „živosti“. Skrejper ovo ne dira.
- `detalji.py` — čita **stranicu svakog hotela**, jer udaljenosti od plaže i od centra nema u
  rezultatima pretrage. Vadi blok *„Beaches in the neighbourhood“* (najbliža plaža), Booking-ov
  FAQ *„X m from the centre of &lt;mesto&gt;“* (i udaljenost **i ime pravog mesta**), i
  `Beachfront` oznaku. Vuče sve do `PRAG_KM = 10` od nekog pretraživanog centra — šire od
  finalnog filtera od 3 km, jer pretraga jednog mesta često nađe hotel koji je 8 km od *njega*
  a 300 m od svog sopstvenog mesta.
- `napravi.py` — spaja PP i AI ponudu istog hotela u jednu karticu, dedupira hotele koji se
  pojave u pretrazi više mesta (Booking širi radijus), **izbacuje hotele van mesta**, uvezuje
  detalje i računa bodove preporuke.
- `podaci.js` — **generisano, ne menjati rukom.**

## Bodovi preporuke

Lista **nije sortirana po ceni** — najjeftinije obično znači lošu ocenu ili hotel daleko od plaže.
Svaki hotel dobija 0–100 bodova, i razrada je vidljiva na kartici pod *„Zašto N bodova“*:

| Težina | Stavka |
|---|---|
| 34% | ocena gostiju (6,5 = nula, 9,6 = pun broj) |
| 18% | koliko je cena ispod budžeta (1.100 € = nula, 600 € = pun broj) |
| 18% | blizina plaže (0 m = pun broj, 800 m i dalje = nula) |
| 10% | blizina centra mesta (0 m = pun broj, 1,2 km i dalje = nula) |
| 10% | živost mesta (ručna ocena iz `mesta.json`) |
| 10% | pansion (all inclusive 1,0 · polupansion 0,65) |

Kažnjavanja: **preko budžeta → bodovi prepolovljeni** (hotel se vidi ali pada nisko);
**manje od 40 ocena → −15%**, jer ocena od 20 ljudi ne vredi kao ocena od 400.
Gde podatak ne postoji, stavka dobija sredinu — niti nagrađuje niti kažnjava.

Težine su u `TEZINE` u `napravi.py` i emituju se u `podaci.js`, pa ih strana sama ispisuje
u futeru — ne mogu da se raziđu sa stvarnom formulom.

## Hoteli van mesta se ne prikazuju

Booking na pretragu jednog mesta vraća i hotele iz šire okoline — jedan je bio 20 km od mesta po
kome je nađen. Za takve udaljenost od Soluna nije poznata (ne zna se u kom su smeru), pa su
**izbačeni**. Probano je i geokodiranje imena hotela preko Nominatim-a da bi im se izračunala
prava udaljenost — pogađa samo oko trećine imena, ne vredi.

**Ali odluka se NE donosi po pretrazi.** Prvo je donošena tako i to je bila greška: hotel Iris je
300 m od centra Nea Kalikratije, ali ga je našla pretraga Sozopolija (7,8 km) i zato je ispao —
a Nea Kalikratija je mesto u kome su roditelji već bili. Zato se sada uzima Booking-ov sopstveni
podatak sa strane hotela — *„X m from the centre of &lt;mesto&gt;“* — koji daje i **pravo mesto**
i **pravu udaljenost od njegovog centra**. Ime mesta se svodi na ključ iz `mesta.json` preko mape
`ALIJASI` u `napravi.py` (Polykhrono → Polychrono, Kallithea Halkidikis → Kallithea Halkidiki…);
ako se naziv ne poznaje, `napravi.py` to **ispiše na kraju** da se doda.

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
- **Udaljenost od plaže i od centra, i ime mesta** — pročitani sa stranice svakog hotela
  pojedinačno (u rezultatima pretrage ih nema).

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

    ./skrejper.py --svez && ./detalji.py --svez && ./napravi.py \
      && git add -A && git commit -m "osvežene cene" && git push

Novo mesto: dodaj u `GRADOVI` u `skrejper.py` (km izračunaj OSRM-om, ne prepisuj sa sajta hotela)
i u `mesta.json` (`ime`, `km`, `vozOko`, `zivost`, `tekst`).

`kes/`, `ponude.json` i `detalji.json` su međurezultati — ako ne treba da idu na GitHub, dodaj ih u `.gitignore`.

## Zamke na koje se naletelo

Sve su bile prave greške u podacima, ne u kodu — i sve su ostavile trag u skriptama:

- **`data-testid="property-card"` se ne sme deliti po prefiksu** — `property-card-container`
  počinje isto, pa se svaka kartica cepala na pola. Traži se tačno poklapanje.
- **Booking u rezultate ubacuje i PRODATE objekte** („sold out… you might like“). Bez provere po
  kartici prikazala bi se ponuda koje nema.
- **Zapeta je razdvajač hiljada, ne decimalna** — Booking na en-gb piše `1,000 m`. Prvo je
  parsirano kao 1 m, pa je hotel na kilometar od plaže izgledao kao hotel na plaži.
- **„85 km from the centre of Thessaloniki“** stoji na svakoj strani hotela. Naivni regex je to
  uzimao kao udaljenost od centra mesta. Pravi podatak je u FAQ-u, gde broj stoji *posle* pitanja.
- **`0 m` i `1 m` do plaže nisu greška** — Booking tako piše za hotele na samoj plaži. Strana to
  prikazuje rečima („na samoj plaži“).
- **Dva skrejpera nikad paralelno** — dele `kes/` i oba udaraju na Booking. Ako se prekidaju,
  proveriti veličinu keširanih strana (zdrava je 1,5–1,8 MB) i obrisati krnje.

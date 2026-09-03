# Odmor — Crna Gora, 05.–13.09.2026

Statička strana-pregled za roditelje (`index.html` + `stil.css` + `app.js` + `podaci.js`,
kvačice u `localStorage`). `podaci.js` nije pisan rukom — **generiše se iz stvarnih cena.**

Prva verzija ovog projekta bila je za **Grčku**, Halkidiki, sa istim datumima. Plan je
promenjen 03.09.2026. na Crnu Goru; grčka verzija stoji u git istoriji do commita
`dcf6034`. Šta je iz nje preneto a šta izbačeno piše niže.

## Zadatak

| | |
|---|---|
| Termin | **05.09.2026 (subota) – 13.09.2026 (nedelja)**, 8 noći |
| Ljudi | 2 odrasle osobe, 1 soba |
| Budžet | ~1.100 € **samo smeštaj** |
| Prevoz | sopstveni auto |
| Traženo | Crna Gora, **Bečići ili Herceg Novi**; all inclusive, pun pansion ili polupansion |
| Kad je traženo | **03.09.2026 — dva dana pred put** |

## Odgovor na pitanje o pansionu

Za ove datume, pročitano 03.09.2026:

| pansion | nađeno |
|---|---|
| **all inclusive** | **1 hotel** — HOTEL TALIA 4★, Herceg Novi/Igalo, **1.845 €**. Preko budžeta. |
| **pun pansion** | **nijedan slobodan** ni u jednom od 11 pretraženih mesta |
| **polupansion** | **3 hotela** — Hotel Podostrog **1.054 €** (jedini u budžetu), Hotel Rivijera 1.118 € (Petrovac, ali **ocena 5,1** od 312 gostiju) i Splendid 5★ 4.276 € |

Ostalih 38 su noćenje s doručkom. Doručak nije bezvredan — ostaje im budžet za večeru
napolju — ali treba znati da traženo nije nađeno u budžetu.

Uz to, na Agodi (ne na Booking-u) postoji i **Iberostar Waves Bellevue**, veliki all
inclusive na samoj plaži u Bečićima, ≈2.440 €. Na Booking-u ga za ove datume **nema
uopšte**. Vidi „Tragovi sa Agode" niže.

## Cevovod

    ./skrejper.py            # Booking pretrage    -> ponude.json    (HTML u kes/)
    ./agoda.py               # Agoda pretrage      -> agoda.json     (HTML u kes-agoda/)
    ./detalji.py             # stranice hotela     -> detalji.json   (plaža, centar, mesto)
    ./napravi.py             # + mesta.json        -> podaci.js
    ./pokreni.sh             # http://127.0.0.1:8766

Prva tri su nezavisna; `detalji.py` čita `ponude.json`, ne `podaci.js`, pa nema kružne
zavisnosti i `napravi.py` se pokreće samo jednom, na kraju.

- `skrejper.py` — Booking preko **headless Chrome-a**, 11 mesta × 4 pansiona = 44 pretrage.
  Booking običnom `curl`-u vraća 202 i praznu stranicu; pravi browser prolazi bez captcha.
  Throttle 6 s, opisan User-Agent, sve u `kes/`. Rezultat: **304 ponude, 77 hotela**.
- `agoda.py` — druga cena, za poređenje. Vidi celu sekciju niže. **88 ponuda sa cenom.**
- `mesta.json` — **ručno**: opis mesta i ocena „živosti". Skrejperi ovo ne diraju.
- `detalji.py` — čita **stranicu svakog hotela** (66 komada), jer udaljenosti od plaže,
  udaljenosti od centra i pravog mesta nema u rezultatima pretrage.
- `napravi.py` — spaja ponude istog hotela u jednu karticu, dedupira, izbacuje hotele van
  liste mesta, prilepi Agodinu cenu i računa bodove. Rezultat: **40 hotela iz 9 mesta,
  21 u budžetu, 8 u samim Bečićima ili Herceg Novom.**
- `podaci.js` — **generisano, ne menjati rukom.**

## Mesta

Traženi su Bečići i Herceg Novi. Dva dana pred put uska pretraga vraća skoro ništa, pa su
uzeti i njihovi neposredni susedi: **Bečići, Rafailovići, Budva, Sveti Stefan, Pržno**
(budvanska rivijera) i **Herceg Novi, Igalo, Njivice, Đenovići, Kumbor** (Boka), plus
**Petrovac** — vidi niže.

Naknadno su dodati **Baošići** i **Sušćepan**, koje pretraga nije gađala ali ih je Booking
prijavio kao pravo mesto nađenih hotela — Baošići su tačno u istom nizu između Đenovića i
Bijele, Sušćepan je selo iznad Herceg Novog.

**Petrovac na Moru je dodat naknadno i namerno se izdvaja od ostalih.** On *nije* susedno
mesto — 17 km je južno od Budve — i u prvoj verziji nije bio uzet. Ušao je na izričit zahtev,
zato što dva dana pred put polupansiona skoro da nema nigde, a u Petrovcu ga ima. Donosi
5 hotela, od toga jedan polupansion (Hotel Rivijera, 1.118 €, ali ocena 5,1). Ovo je jedini
izuzetak od pravila „samo Bečići, Herceg Novi i njihovi susedi" i ne treba ga širiti dalje
bez iste takve potrebe — komentar u `GRADOVI` u `skrejper.py` to i kaže.

**Nisu dodati** iako je pretraga tamo našla hotele: Tivat (7 hotela), Donja Lastva (1),
Kaluđerac (1), Čanj (1) i Virpazar (1, uopšte nije na moru nego na Skadarskom jezeru).

### Kolona „km" je izbačena

U grčkoj verziji je svaki hotel imao km od Soluna, i to je bio prvi filter — Halkidiki se
proteže 40–113 km od grada. Crnogorsko primorje je kompaktno i udaljenost od kuće ne
razlikuje ponude međusobno, pa je kolona izbačena **svuda**: iz `mesta.json`, iz
`napravi.py`, iz bodovanja (nikad je tamo nije ni bilo) i sa strane (klizač i sortiranje).

### Kako se određuje mesto hotela — i gde to i dalje škripi

Booking na pretragu jednog mesta vraća i hotele iz šire okoline: strana za Bečiće ima
25 kartica, a sam Booking na njoj piše *„Becici: 2 properties found"*. Zato se mesto **ne
određuje po pretrazi.** Redosled izvora je:

1. **Booking-ove mrvice** (`Home > Hotels > Montenegro > Herceg Novi County > Ðenovići`) —
   njegova kanonska hijerarhija mesta. Ovo je uvedeno u crnogorskoj verziji.
2. FAQ *„X m from the centre of &lt;mesto&gt;"* — daje i udaljenost, ali nekad meri od
   centra veće opštine.
3. Pretraga, kao poslednja rezerva.

Ako Booking zna mesto a ono **nije** na listi, hotel ispada i naziv se ispiše na kraju
(`MESTA KOJA NE POZNAJEM`), da se doda u `ALIJASI` ako je ipak naše. Nazivi se svode i
bez kvačica, jer Booking `Đ` ume da pošalje kao `Ð`.

**Ono što ostaje netačno, i namerno se ne popravlja:** velike hotele u Bečićima — Splendid
i Podostrog — Booking i po mrvicama vodi pod **Budvom**, iako im adresa piše Bečići.
Nijedan Booking-ov strukturirani podatak ne kaže Bečići. Strana prati Booking umesto da
premešta hotele na osnovu opisa; ime hotela i udaljenost od plaže stoje na kartici pa se
vidi o čemu je reč.

**Probano i odbačeno:** strukturirani `PostalAddress` sa iste strane. Njegov
`addressLocality` je kod većine hotela **ulica** („Blaža Jovanovića", „Maslinski put"),
a ne mesto — u trenutku provere, od 58 hotela samo par ih je imalo pravo mesto. Zavaralo je to što je baš
Splendid, na kome je ideja probana, imao `"addressLocality": "Bečići b.b."`.

## Pansion — ovde je bila najveća greška

Booking-ovi `mealplan` kodovi su **lako zamenljivi i prva verzija ih je imala pogrešno**:
koristila je `mealplan=1` kao „polupansion" i `mealplan=9` kao „all inclusive". Tačno je:

| kod | značenje |
|---|---|
| `mealplan=1` | Breakfast included — **samo doručak** |
| `mealplan=3` | All meals included (pun pansion) |
| `mealplan=4` | **All-inclusive** |
| `mealplan=9` | **Breakfast & dinner included** (polupansion) |
| `mealplan=999` | Self catering |

Posledica greške: hoteli sa samo doručkom bili su prikazani kao polupansion.

**Pansion se NE izvodi iz filtera nego iz teksta na kartici hotela.** Booking-ov
„Breakfast included" je **nadskup**: i polupansion i all inclusive uključuju doručak, pa ih
taj filter vraća. Upravo tako je i nađen jedini all inclusive — HOTEL TALIA je izašao kroz
`mealplan=1`, dok je `mealplan=4` u svim mestima vratio nulu slobodnih.

Dve zaštite da se ne ponovi:

1. `proveri_kod()` u `skrejper.py` na **svakoj** strani pročita šta kod zaista znači —
   oznaka koja stoji *posle* `<input value="mealplan=N">` u istom `<label>` — i **prekine
   rad** (`SystemExit`) ako se ne poklapa sa očekivanim.
2. Pansion se čita i **sa same kartice hotela** (`pansionTekst`), kao nezavisna potvrda.

Čipovi za pansion na strani prave se iz podataka, pa se nikad ne nudi filter koji daje nulu
— zato se čip za pun pansion i ne pojavljuje.

## Druga cena — Agoda

Booking je bio jedini izvor i nije se imao sa čim uporediti. Probano je pet kandidata,
jednim headless dump-om svaki:

| kandidat | ishod |
|---|---|
| Expedia | 112 kB, odmah captcha |
| Trivago | 116 kB, prazna JS školjka bez cena |
| Zenhotels | adresa regiona se ne da pogoditi (404) |
| adriatic.hr | 11 kB, nema crnogorsku pretragu na toj adresi |
| **Agoda** | **1 MB, cene u čistom atributu — prolazi** |

Agoda vraća `data-element-name="fpc-room-price" data-fpc-value="€ 152"`, isto onako
stabilno kao Booking-ovi `data-testid`. Adresa pretrage traži njen brojčani `cityId`,
koji se čita sa SEO strane mesta (`/en-gb/city/<slug>-me.html`). **Za tri mesta te strane
nema** — Rafailovići, Đenovići i Kumbor se preskaču.

### Dve zaštite, obe merene a ne pročitane

Dve stvari su mogle da daju pogrešan broj bez ijedne greške u kodu:

- **Je li cena po noći ili za ceo boravak?** Agoda ovo nigde ne kaže mašinski čitljivo, pa
  se **meri**: ista pretraga se povuče sa `los=1` i sa `los=8` i uporede se cene istih
  hotela. Odnos je **0,95** — cena se ne menja sa dužinom boravka, dakle **po noći**, i
  množi se sa 8. Ako odnos ikad poraste na ~8, `proveri_po_noci()` prekida rad; bez toga bi
  svaka cena na strani bila osam puta veća nego što jeste.
- **Jesu li takse unutra?** `proveri_takse()` traži potvrdu **na nivou strane**, ne kartice.
  Prvi pokušaj je tražio `„per night incl. taxes & fees"` u samoj kartici i pao je: Agoda
  servira **dve varijante DOM-a** — na strani Bečića taj tekst stoji u svakoj kartici, na
  strani Budve ga u karticama nema uopšte. Rezultat je bio 0 od 11 cena u Budvi i Pržnu,
  a cene su bile tu.

### Šta se sa Agode NE čita

**Pansion.** Prvi pokušaj ga je čitao iz teksta kartice i Domador Rooms & Apartments
(65 €/noć) je izašao kao „All-inclusive", jer Agoda u tuđu karticu ubacuje link ka drugom
hotelu: `/en-gb/iberostar-bellevue-all-inclusive/hotel/budva-me.html`. Oznaka pansiona nije
vezana ni za jedan element kartice i ne može se pouzdano ograničiti. Pansion dolazi
isključivo sa Booking-a.

### Agodina cena ne ulazi u bodove

Ona je **procena** (cena po noći × 8, ne tačan zbir kao kod Booking-a) i ne zna se za koji
je pansion. Mešanje dva izvora u jednu formulu je tiha greška koju posle niko ne primeti.
Zato stoji odvojeno na kartici, sa oznakom „jeftinije na Agodi" kad je razlika veća od 3% —
ispod toga je to šum dva različita načina računanja, ne prava ušteda. Trenutno: 8 hotela ima
i Agodinu cenu, 2 su jeftinija tamo.

### Tragovi: ima na Agodi, nema na Booking-u

**22 smeštaja** postoje na Agodi a ne pojavljuju se u Booking rezultatima. Prikazani su
**odvojeno, ispod glavne liste, bez bodova**, jer se o njima zna samo ime, Agodina ocena i
procenjena cena: nema pansiona, nema udaljenosti od plaže, a „mesto" je samo Agodin grad
pretrage — nije provereno kao gore. To je spisak tragova za proveru klikom, ne lista.
Filter: ocena ≥ 8,5 i procena ≤ 3× budžet (granica namerno postavljena tako da unutra stane
Iberostar Bellevue, jedini veliki all inclusive u Bečićima).

## Direktan kanal — kontakti, ne cene

`direktno.json` je **ručno pisan**, kontakti pročitani 03.09.2026. sa **zvaničnih sajtova
hotela**, ne sa posrednika: `talia.co.me`, `hotelpodostrog.com`, `montenegrostars.com`
(kroz headless Chrome — WebFetch dobija 403), `iberostar.com`. Gde podatak ne stoji na
zvaničnoj strani, **ovde ga nema** — radije rupa nego pogrešan broj. Zato Talia nema mejl
(sakriven je iza JavaScript-a) a Iberostar nema telefon.

Direktna **cena** se ne prikazuje. U grčkoj verziji je automatsko čitanje direktnih cena
probano i palo: WebHotelier (`reserve-online.net`) prima upit preko GET-a samo na nekim
instalacijama, domen se ne da pogoditi (0 pogodaka na 27 hotela), a gde je sistem odgovorio
sve je bilo zauzeto. Dva dana pred put telefon je ionako brži od svakog upita mejlom.

Hoteli bez upisanog kontakta imaju dugme „Traži hotel direktno" (Google pretraga), bez
ikakve tvrdnje o ceni.

## Bodovi preporuke

Lista **nije sortirana po ceni** — najjeftinije obično znači lošu ocenu ili hotel daleko od
plaže. Svaki hotel dobija 0–100 bodova, razrada je na kartici pod *„Zašto N bodova"*:

| Težina | Stavka |
|---|---|
| 34% | ocena gostiju (6,5 = nula, 9,6 = pun broj) |
| 18% | koliko je cena ispod budžeta (1.100 € = nula, 600 € = pun broj) |
| 18% | blizina plaže (0 m = pun broj, 800 m i dalje = nula) |
| 10% | blizina centra mesta (0 m = pun broj, 1,2 km i dalje = nula) |
| 10% | živost mesta (ručna ocena iz `mesta.json`) |
| 10% | pansion — all inclusive 1,0 · pun pansion 0,9 · polupansion 0,7 · samo doručak 0,4 |

Kažnjavanja: **preko budžeta → bodovi prepolovljeni**; **manje od 40 ocena → −15%**.
Gde podatak ne postoji, stavka dobija sredinu. Težine su u `TEZINE` u `napravi.py` i
emituju se u `podaci.js`, pa ih strana sama ispisuje u futeru — ne mogu da se raziđu sa
formulom.

## Podrazumevani filter

Strana se otvara sa **uključenim filterom „Samo u budžetu"** (do 1.100 €) — 21 od 40
hotela. Skuplji nisu izbačeni, samo sklonjeni; isključivanjem kućice se pojave svi, sa
oznakom „preko budžeta".

## Šta je provereno

- **Booking — mašinski.** Cena za ceo boravak za dvoje, ocena, broj ocena, zvezdice, tip
  sobe, pansion sa kartice. Kodovi filtera su **pročitani iz Booking-ovog menija na svakoj
  strani, nisu pogođeni**.
- **Raspoloživost.** Booking pretraga sa upisanim datumima vraća samo slobodno, a objekte
  označene *sold out* skrejper prepoznaje po kartici i izbacuje. Prisustvo hotela na listi
  znači da je 05.–13.09. **stvarno bilo slobodno u trenutku čitanja.** Dva dana pred put to
  se menja iz sata u sat.
- **Udaljenost od plaže i od centra, i mesto** — pročitani sa stranice svakog hotela
  pojedinačno (u rezultatima pretrage ih nema). Za 64 od 66 hotela ima podatak o plaži.
- **Agodina cena** — po noći, sa taksama; oboje potvrđeno mašinski, vidi gore.
- **Kontakti hotela** — sa zvaničnih sajtova, pojedinačno.
- **Boravišna taksa** — [budva.travel](https://budva.travel/registration-fee) kaže
  *„do 1.00 EUR po noćenju"* po odrasloj osobi, iskazuje se posebno na računu. Za dvoje za
  8 noći do **16 €**. Sitno, ali nije uračunato u prikazanu cenu.

## Šta NIJE provereno

1. **Google Hotels i Trivago.** Linkovi imaju upisane datume i rade u pregledaču, ali se te
   strane učitavaju JavaScript-om i u headless dump-u vrate praznu školjku bez cena. Zato se
   **nijedna cena na strani ne poziva na njih** — služe za ručno upoređivanje.
2. **Genius popust.** Skrejper čita Booking neprijavljen, pa su cene **bez** Genius popusta.
3. **Pansion na Agodi** — namerno se ne čita, vidi gore. Sve iz bloka „Tragovi sa Agode"
   treba proveriti klikom pre bilo kakve odluke.
4. **Iberostar Bellevue** — da je all inclusive piše na iberostar.com, ali da je slobodan
   za ove datume znamo samo iz Agodine pretrage; nije potvrđeno ni kod hotela ni na
   Booking-u (tamo ga za ove datume nema).

## Održavanje

Cene stare za sat-dva, ne za dan. Osvežavanje:

    ./skrejper.py --svez && ./agoda.py --svez && ./detalji.py --svez && ./napravi.py \
      && git add -A && git commit -m "osvežene cene" && git push

Novo mesto: dodaj u `GRADOVI` u `skrejper.py`, u `SLUGOVI` u `agoda.py` (ako Agoda ima
stranu tog mesta) i u `mesta.json` (`ime`, `rivijera`, `zivost`, `tekst`).

`napravi.py` lepi `?v=<datum prikupljanja>` na `podaci.js`, `app.js` i `stil.css` u
`index.html` — bez toga pretraživač servira stari `podaci.js` iz keša (Pages šalje
`max-age=600`) i strana pokazuje jučerašnje hotele.

Ako Pages zaglavi i ne rebuild-uje, proveri da `.nojekyll` postoji.

`mesta.json` i `direktno.json` su **ručni** — skrejperi ih ne diraju.
`kes/`, `kes-agoda/`, `ponude.json`, `detalji.json` i `agoda.json` su međurezultati i
u `.gitignore` su.

## Zamke na koje se naletelo

Sve su bile prave greške u podacima, ne u kodu — i sve su ostavile trag u skriptama:

- **Filter `mealplan=1` je nadskup, ne „samo doručak"** — vraća i polupansion i all
  inclusive. Pansion se mora čitati sa kartice, ne iz filtera po kome je hotel nađen.
- **Booking-ovi `mealplan` kodovi nisu ono što izgledaju** — vidi sekciju o pansionu.
  Oznaka je vađena iz prozora *ispred* poklapanja, pa su vrednosti bile zamenjene.
  Uvek uzimaj oznaku koja stoji POSLE inputa, u istom `<label>`.
- **Agodina cena je PO NOĆI, Booking-ova za CEO BORAVAK.** Suprotno od očekivanog i nigde
  ne piše. Utvrđeno merenjem `los=1` protiv `los=8`; sad se to meri pri svakom pokretanju.
- **Agoda servira dve varijante DOM-a.** Tekstualna potvrda koja postoji u karticama na
  jednoj strani ne postoji na drugoj. Provera na nivou strane, ne kartice.
- **Agoda u karticu ubacuje linkove ka drugim hotelima**, pa je pretraga oznake po tekstu
  kartice dala „All-inclusive" hotelu od 65 €/noć. Ako se oznaka ne može vezati za konkretan
  element, ne čita se uopšte.
- **Agodin `href` uvek nosi upitnik** (`?countryId=...`), pa obrazac `[^"?]+"` ne poklopi
  nijedan link — svi su ispali prazni.
- **Prozor za pretragu unutar kartice je bio preuzak.** „per night" stoji tek oko 10.000.
  karaktera kartice od 33 kB; prozor od 6.000 je odbacio sve cene kao nepotvrđene.
- **`addressLocality` na Booking strani hotela je uglavnom ULICA, ne mesto** — probano kao
  izvor mesta i odbačeno. Prvi testirani hotel je slučajno imao pravo mesto.
- **`data-testid="property-card"` se ne sme deliti po prefiksu** — `property-card-container`
  počinje isto, pa se svaka kartica cepala na pola. Traži se tačno poklapanje.
- **Booking u rezultate ubacuje i PRODATE objekte** („sold out… you might like").
- **Zapeta je razdvajač hiljada, ne decimalna** — Booking na en-gb piše `1,000 m`.
- **`0 m` i `1 m` do plaže nisu greška** — Booking tako piše za hotele na samoj plaži.
  Strana to prikazuje rečima („na samoj plaži").
- **Ne traži „Beachfront" u tekstu strane** — Booking na svakoj strani nosi rečnik prevoda,
  pa je ta reč uvek prisutna i oznaka je bila tačna za sve, dakle bezvredna.
- **`--grad` prepisuje ceo `ponude.json` samo tim mestom.** I `skrejper.py` i `agoda.py`
  na kraju pišu ceo fajl, pa run za jedno mesto obriše sve ostalo. Posle dodavanja mesta
  uvek ide **pun run** — sve ostalo je ionako u kešu, pa traje sekund.
- **Dva skrejpera nikad paralelno nad istim kešom.** `agoda.py` zato ima svoj `kes-agoda/`,
  ne deli `kes/` sa Booking-om.

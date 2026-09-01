// GENERISANO — ne menjaj rukom. Izvor: mesta.json + ponude.json, generator: napravi.py
//
// Cene su STVARNE cene sa Booking.com-a za 05.09.–13.09.2026, 2 odrasle, 1 soba, EUR,
// procitane 2026-09-01 19:50 pravim browserom (headless Chrome — Booking obicnom
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
const NOCI = 8;
const OSOBA = 2;
const BUDZET = 1100;
const PRIKUPLJENO = "2026-09-01 19:50";

const TEZINE = {"ocena": 0.34, "cena": 0.18, "plaza": 0.18, "centar": 0.1, "zivost": 0.1, "pansion": 0.1};

const MESTA = {
 "Paralia Katerinis": {
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "tekst": "Druga strana zaliva, Pierija, ispod Olimpa. Ogromna pešačka zona sa stotinama restorana, kafića i radnji — najveća vreva na celoj listi i tradicionalno puna naših ljudi, pa se svuda progovori srpski. Dve mane: more je plitko i manje prozirno nego na Kasandri, i hoteli su tu skoro svi noćenje s doručkom, malo ih je sa polupansionom ili all inclusive."
 },
 "Olimpik Bič": {
  "km": 76,
  "vozOko": "61 min",
  "zivost": 4,
  "tekst": "Olimpik Bič, produžetak Paralije Katerinis ka jugu i praktično isti kraj — šetnica sa restoranima i radnjama, mirnije i malo pristupačnije od same Paralije. Blizu Solunu (76 km) i puno naših ljudi. Isto ograničenje kao Paralija: more je plitko i manje prozirno nego na Kasandri."
 },
 "Metamorfosi": {
  "km": 85,
  "vozOko": "81 min",
  "zivost": 2,
  "tekst": "Početak Sitonije, borovi do same plaže, mirno i familijarno. Nekoliko taverni i osnovne radnje — tiše i manje od Nea Kalikratije."
 },
 "Afitos": {
  "km": 86,
  "vozOko": "78 min",
  "zivost": 4,
  "tekst": "Jedno od najlepših mesta na Kasandri i jedino koje je sačuvalo staru arhitekturu — kamene kuće, uske kaldrmisane ulice, i taverne na samoj ivici litice sa pogledom na more i Olimp u daljini. Selo je na visini, pa se do plaže silazi (i penje). Uveče je živo, puno restorana i kafića, ali bez bučnog noćnog života kao Kalitea. Po živosti otprilike kao Nea Kalikratija, a po lepoti mesta iznad svega ostalog na listi."
 },
 "Kalives": {
  "km": 87,
  "vozOko": "88 min",
  "zivost": 2,
  "tekst": "Mali primorski kraj pored Psakudije, pretežno hoteli i apartmani. Lepe plaže, ali mesta kao takvog skoro da nema — za restorane se ide u Psakudiju ili Gerakini."
 },
 "Psakoudia": {
  "km": 88,
  "vozOko": "89 min",
  "zivost": 2,
  "tekst": "Mirno letovalište na ulazu u Sitoniju, borovi i duga plaža, familijarno. Malo taverni, tiše i manje od Nea Kalikratije."
 },
 "Kriopigi": {
  "km": 89,
  "vozOko": "82 min",
  "zivost": 3,
  "tekst": "Selo na brdu iznad obale, sa lepim pogledom i tavernama u gornjem delu. Šarmantno, ali između hotela na plaži i sela je ozbiljan uspon — nije za svakodnevnu šetnju gore-dole peške."
 },
 "Kalitea": {
  "km": 96,
  "vozOko": "103 min",
  "zivost": 5,
  "tekst": "Jedno od najživljih mesta na Kasandri — gust centar sa restoranima, barovima i noćnim životom, u sezoni veće i bučnije od Nea Kalikratije. Dobro ako se traži vreva, loše ako se traži tišina."
 },
 "Polihrono": {
  "km": 105,
  "vozOko": "99 min",
  "zivost": 3,
  "tekst": "Srednje veliko letovalište sa dugom plažom i solidnim izborom taverni, mirnije od Haniotija i Kalitee ali nikako dosadno. Dobar kompromis između vreve i mira."
 },
 "Nea Skioni": {
  "km": 108,
  "vozOko": "104 min",
  "zivost": 3,
  "tekst": "Ribarsko selo na jugozapadu Kasandre sa lučicom i nekoliko taverni uz more. Mirnije i manje od Nea Kalikratije, ali ima svoj centar i život — nije samo hotelski kraj. Voda je ovde bistra, plaže mnogo lepše nego u Termajskom zalivu."
 },
 "Hanioti": {
  "km": 109,
  "vozOko": "103 min",
  "zivost": 5,
  "tekst": "Verovatno najbolje mesto po kriterijumu „da ima restorana i da nije dosadno“: glavna pešačka ulica je puna restorana, poslastičarnica, pekara i radnji, uveče se šeta do ponoći, a plaža je velika i peščana. Sigurno ŽIVLJE od Nea Kalikratije. Mana je jedino udaljenost — 109 km i skoro dva sata do Soluna."
 },
 "Paliouri": {
  "km": 116,
  "vozOko": "117 min",
  "zivost": 2,
  "tekst": "Malo tradicionalno selo na jugu Kasandre, iznad obale. Mirno, sa par taverni; za veći izbor se ide u Pefkohori. Jedno od najdaljih mesta na listi."
 }
};

const HOTELI = [
 {
  "id": "rahoni-cronwell-hotel-by-diomedes-group",
  "hotel": "Rahoni Cronwell Hotel by Diomedes Group",
  "grad": "Nea Skioni",
  "mesto": "Nea Skioni",
  "km": 108,
  "vozOko": "104 min",
  "zivost": 3,
  "plazaM": 350,
  "centarM": 400,
  "naPlazi": true,
  "centarMesto": "Nea Skioni",
  "aerodromKm": 94,
  "bodovi": 51,
  "razrada": {
   "ocena": 55,
   "cena": 24,
   "plaza": 56,
   "centar": 67,
   "zivost": 50,
   "pansion": 65
  },
  "zvezdice": 5,
  "ocena": 8.2,
  "brOcena": 131,
  "cene": {
   "PP": 981
  },
  "najniza": 981,
  "soba": {
   "PP": "Family Room"
  },
  "udaljenostOdCentra": "7 km from Hanioti",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/rahoni-cronwell-by-diomedes-group.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Rahoni+Cronwell+Hotel+by+Diomedes+Group+Nea+Skioni+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Rahoni+Cronwell+Hotel+by+Diomedes+Group+Nea+Skioni+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "haris-hotel-by-diomedes-group",
  "hotel": "Haris Hotel by Diomedes Group",
  "grad": "Hanioti",
  "mesto": "Hanioti",
  "km": 109,
  "vozOko": "103 min",
  "zivost": 5,
  "plazaM": 350,
  "centarM": 800,
  "naPlazi": true,
  "centarMesto": "Hanioti",
  "aerodromKm": 86,
  "bodovi": 43,
  "razrada": {
   "ocena": 13,
   "cena": 46,
   "plaza": 56,
   "centar": 33,
   "zivost": 100,
   "pansion": 65
  },
  "zvezdice": 3,
  "ocena": 6.9,
  "brOcena": 274,
  "cene": {
   "PP": 868
  },
  "najniza": 868,
  "soba": {
   "PP": "Family Room with Terrace"
  },
  "udaljenostOdCentra": "0.9 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/haris-khalkidike.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Haris+Hotel+by+Diomedes+Group+Hanioti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Haris+Hotel+by+Diomedes+Group+Hanioti+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "theo-bungalows-boutique-hotel",
  "hotel": "Theo Bungalows Boutique Hotel",
  "grad": "Kriopigi",
  "mesto": "Kriopigi",
  "km": 89,
  "vozOko": "82 min",
  "zivost": 3,
  "plazaM": 950,
  "centarM": 600,
  "naPlazi": true,
  "centarMesto": "Kriopigi",
  "aerodromKm": 78,
  "bodovi": 38,
  "razrada": {
   "ocena": 55,
   "cena": 16,
   "plaza": 0,
   "centar": 50,
   "zivost": 50,
   "pansion": 65
  },
  "zvezdice": 3,
  "ocena": 8.2,
  "brOcena": 304,
  "cene": {
   "PP": 1022
  },
  "najniza": 1022,
  "soba": {
   "PP": "Deluxe Double Room with Sea View"
  },
  "udaljenostOdCentra": "0.6 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/theo-bubgalows.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Theo+Bungalows+Boutique+Hotel+Kriopigi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Theo+Bungalows+Boutique+Hotel+Kriopigi+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "zoi-girni-seaside-hotel",
  "hotel": "ZOI Girni - Seaside Hotel",
  "grad": "Olympiaki Akti",
  "mesto": "Olimpik Bič",
  "km": 76,
  "vozOko": "61 min",
  "zivost": 4,
  "plazaM": 50,
  "centarM": 200,
  "naPlazi": true,
  "centarMesto": "Olympiaki Akti",
  "aerodromKm": 94,
  "bodovi": 30,
  "razrada": {
   "ocena": 81,
   "cena": 0,
   "plaza": 94,
   "centar": 83,
   "zivost": 75,
   "pansion": 65
  },
  "zvezdice": 3,
  "ocena": 9.0,
  "brOcena": 47,
  "cene": {
   "PP": 1767
  },
  "najniza": 1767,
  "soba": {
   "PP": "Suite with Sea View"
  },
  "udaljenostOdCentra": "3.1 km from Paralia Katerinis",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/girni-olympic-olumpiake-akte.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=ZOI+Girni+-+Seaside+Hotel+Olimpik+Bi%C4%8D+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=ZOI+Girni+-+Seaside+Hotel+Olimpik+Bi%C4%8D+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "mirror-hotel",
  "hotel": "Mirror Hotel",
  "grad": "Polychrono",
  "mesto": "Polihrono",
  "km": 105,
  "vozOko": "99 min",
  "zivost": 3,
  "plazaM": 200,
  "centarM": 50,
  "naPlazi": true,
  "centarMesto": "Polykhrono",
  "aerodromKm": 83,
  "bodovi": 30,
  "razrada": {
   "ocena": 94,
   "cena": 0,
   "plaza": 75,
   "centar": 96,
   "zivost": 50,
   "pansion": 65
  },
  "zvezdice": 4,
  "ocena": 9.4,
  "brOcena": 424,
  "cene": {
   "PP": 2070
  },
  "najniza": 2070,
  "soba": {
   "PP": "Deluxe Double Room (2 Adults + 1 Child)"
  },
  "udaljenostOdCentra": "50 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/mirror-polichrono.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Mirror+Hotel+Polihrono+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Mirror+Hotel+Polihrono+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "meravia-leonardo-limited-edition-adults-only",
  "hotel": "MERAVIA Leonardo Limited Edition - Adults Only",
  "grad": "Afitos",
  "mesto": "Afitos",
  "km": 86,
  "vozOko": "78 min",
  "zivost": 4,
  "plazaM": 100,
  "centarM": 2300,
  "naPlazi": true,
  "centarMesto": "Afitos",
  "aerodromKm": 67,
  "bodovi": 30,
  "razrada": {
   "ocena": 97,
   "cena": 0,
   "plaza": 88,
   "centar": 0,
   "zivost": 75,
   "pansion": 100
  },
  "zvezdice": 5,
  "ocena": 9.5,
  "brOcena": 1611,
  "cene": {
   "AI": 5132
  },
  "najniza": 5132,
  "soba": {
   "AI": "One bedroom suite Sea View Private Pool"
  },
  "udaljenostOdCentra": "2.4 km from Nea Fokea",
  "plazaBlizu": false,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/meravia-leonardo-limited-edition-adults-only-booking.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=MERAVIA+Leonardo+Limited+Edition+-+Adults+Only+Afitos+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=MERAVIA+Leonardo+Limited+Edition+-+Adults+Only+Afitos+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "elinotel-sermilia-resort",
  "hotel": "Elinotel Sermilia Resort",
  "grad": "Psakoudia",
  "mesto": "Psakoudia",
  "km": 88,
  "vozOko": "89 min",
  "zivost": 2,
  "plazaM": 10,
  "centarM": 200,
  "naPlazi": true,
  "centarMesto": "Psakoudia",
  "aerodromKm": 67,
  "bodovi": 26,
  "razrada": {
   "ocena": 55,
   "cena": 0,
   "plaza": 99,
   "centar": 83,
   "zivost": 25,
   "pansion": 100
  },
  "zvezdice": 5,
  "ocena": 8.2,
  "brOcena": 313,
  "cene": {
   "AI": 1978
  },
  "najniza": 1978,
  "soba": {
   "AI": "Budget Double Room"
  },
  "udaljenostOdCentra": "9.7 km from Metamorfosi",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/cronwell-resort-sermilia.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Elinotel+Sermilia+Resort+Psakoudia+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Elinotel+Sermilia+Resort+Psakoudia+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "sea-level-hotel-by-diomedes-group",
  "hotel": "Sea Level Hotel by Diomedes Group",
  "grad": "Polychrono",
  "mesto": "Polihrono",
  "km": 105,
  "vozOko": "99 min",
  "zivost": 3,
  "plazaM": 20,
  "centarM": 400,
  "naPlazi": true,
  "centarMesto": "Polykhrono",
  "aerodromKm": 82,
  "bodovi": 26,
  "razrada": {
   "ocena": 65,
   "cena": 0,
   "plaza": 98,
   "centar": 67,
   "zivost": 50,
   "pansion": 65
  },
  "zvezdice": 4,
  "ocena": 8.5,
  "brOcena": 843,
  "cene": {
   "PP": 1735
  },
  "najniza": 1735,
  "soba": {
   "PP": "Double Room"
  },
  "udaljenostOdCentra": "450 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/sea-level-polukhrono.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Sea+Level+Hotel+by+Diomedes+Group+Polihrono+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Sea+Level+Hotel+by+Diomedes+Group+Polihrono+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "amari-hotel",
  "hotel": "Amari Hotel",
  "grad": "Metamorfosi",
  "mesto": "Metamorfosi",
  "km": 85,
  "vozOko": "81 min",
  "zivost": 2,
  "plazaM": 400,
  "centarM": 900,
  "naPlazi": true,
  "centarMesto": "Metamorfosi",
  "aerodromKm": 78,
  "bodovi": 25,
  "razrada": {
   "ocena": 100,
   "cena": 0,
   "plaza": 50,
   "centar": 25,
   "zivost": 25,
   "pansion": 65
  },
  "zvezdice": 3,
  "ocena": 9.6,
  "brOcena": 134,
  "cene": {
   "PP": 1417
  },
  "najniza": 1417,
  "soba": {
   "PP": "One-Bedroom Apartment (2 - 4 Adults)"
  },
  "udaljenostOdCentra": "1 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/amari.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Amari+Hotel+Metamorfosi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Amari+Hotel+Metamorfosi+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "elinotel-apolamare-hotel",
  "hotel": "Elinotel Apolamare Hotel",
  "grad": "Hanioti",
  "mesto": "Hanioti",
  "km": 109,
  "vozOko": "103 min",
  "zivost": 5,
  "plazaM": 20,
  "centarM": 500,
  "naPlazi": true,
  "centarMesto": "Hanioti",
  "aerodromKm": 87,
  "bodovi": 25,
  "razrada": {
   "ocena": 39,
   "cena": 0,
   "plaza": 98,
   "centar": 58,
   "zivost": 100,
   "pansion": 100
  },
  "zvezdice": 5,
  "ocena": 7.7,
  "brOcena": 347,
  "cene": {
   "PP": 2077,
   "AI": 2333
  },
  "najniza": 2077,
  "soba": {
   "PP": "Double Room with Garden View",
   "AI": "Double Room with Garden View"
  },
  "udaljenostOdCentra": "0.5 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/elinotel-apolamare.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Elinotel+Apolamare+Hotel+Hanioti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Elinotel+Apolamare+Hotel+Hanioti+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "royal-hotel-and-suites",
  "hotel": "Royal Hotel and Suites",
  "grad": "Polychrono",
  "mesto": "Polihrono",
  "km": 105,
  "vozOko": "99 min",
  "zivost": 3,
  "plazaM": 450,
  "centarM": 500,
  "naPlazi": true,
  "centarMesto": "Polykhrono",
  "aerodromKm": 82,
  "bodovi": 23,
  "razrada": {
   "ocena": 68,
   "cena": 0,
   "plaza": 44,
   "centar": 58,
   "zivost": 50,
   "pansion": 100
  },
  "zvezdice": 4,
  "ocena": 8.6,
  "brOcena": 155,
  "cene": {
   "PP": 1967,
   "AI": 2211
  },
  "najniza": 1967,
  "soba": {
   "PP": "Family Room",
   "AI": "Family Room"
  },
  "udaljenostOdCentra": "0.5 km from centre",
  "plazaBlizu": false,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/apartments-royal.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Royal+Hotel+and+Suites+Polihrono+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Royal+Hotel+and+Suites+Polihrono+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "hotel-simeon",
  "hotel": "Hotel Simeon",
  "grad": "Metamorfosi",
  "mesto": "Metamorfosi",
  "km": 85,
  "vozOko": "81 min",
  "zivost": 2,
  "plazaM": 350,
  "centarM": 50,
  "naPlazi": true,
  "centarMesto": "Metamorfosi",
  "aerodromKm": 77,
  "bodovi": 22,
  "razrada": {
   "ocena": 61,
   "cena": 0,
   "plaza": 56,
   "centar": 96,
   "zivost": 25,
   "pansion": 65
  },
  "zvezdice": 3,
  "ocena": 8.4,
  "brOcena": 522,
  "cene": {
   "PP": 1868
  },
  "najniza": 1868,
  "soba": {
   "PP": "Double or Twin Room"
  },
  "udaljenostOdCentra": "50 m from centre",
  "plazaBlizu": false,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/simeon-halkidiki.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+Simeon+Metamorfosi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+Simeon+Metamorfosi+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "cosmopolitan-hotel-by-ghh",
  "hotel": "Cosmopolitan Hotel by GHH",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "plazaM": 550,
  "centarM": 800,
  "naPlazi": true,
  "centarMesto": "Paralia Katerinis",
  "aerodromKm": 90,
  "bodovi": 22,
  "razrada": {
   "ocena": 68,
   "cena": 0,
   "plaza": 31,
   "centar": 33,
   "zivost": 100,
   "pansion": 65
  },
  "zvezdice": 4,
  "ocena": 8.6,
  "brOcena": 426,
  "cene": {
   "PP": 1743
  },
  "najniza": 1743,
  "soba": {
   "PP": "Family Room"
  },
  "udaljenostOdCentra": "0.9 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/cosmopolitan-paralia-katerinis.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Cosmopolitan+Hotel+by+GHH+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Cosmopolitan+Hotel+by+GHH+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "laguna-resort-by-diomedes-group",
  "hotel": "Laguna Resort by Diomedes Group",
  "grad": "Hanioti",
  "mesto": "Hanioti",
  "km": 109,
  "vozOko": "103 min",
  "zivost": 5,
  "plazaM": 450,
  "centarM": 1900,
  "naPlazi": true,
  "centarMesto": "Hanioti",
  "aerodromKm": 85,
  "bodovi": 22,
  "razrada": {
   "ocena": 71,
   "cena": 0,
   "plaza": 44,
   "centar": 0,
   "zivost": 100,
   "pansion": 65
  },
  "zvezdice": null,
  "ocena": 8.7,
  "brOcena": 180,
  "cene": {
   "PP": 1888
  },
  "najniza": 1888,
  "soba": {
   "PP": "Superior Double Room"
  },
  "udaljenostOdCentra": "1.9 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/laguna-resort.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Laguna+Resort+by+Diomedes+Group+Hanioti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Laguna+Resort+by+Diomedes+Group+Hanioti+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "zeus-eleva-kassandra-lagoon",
  "hotel": "Zeus Eleva Kassandra Lagoon",
  "grad": "Hanioti",
  "mesto": "Hanioti",
  "km": 109,
  "vozOko": "103 min",
  "zivost": 5,
  "plazaM": 500,
  "centarM": 1000,
  "naPlazi": true,
  "centarMesto": "Hanioti",
  "aerodromKm": 88,
  "bodovi": 21,
  "razrada": {
   "ocena": 87,
   "cena": 0,
   "plaza": 38,
   "centar": 17,
   "zivost": 100,
   "pansion": 65
  },
  "zvezdice": 5,
  "ocena": 9.2,
  "brOcena": 23,
  "cene": {
   "PP": 3358
  },
  "najniza": 3358,
  "soba": {
   "PP": "Sea View Horizon Retreat"
  },
  "udaljenostOdCentra": "1 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/zeus-kassandra-lagoon.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Zeus+Eleva+Kassandra+Lagoon+Hanioti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Zeus+Eleva+Kassandra+Lagoon+Hanioti+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "blue-lagoon-queen",
  "hotel": "Blue Lagoon Queen",
  "grad": "Kalyves Poligirou",
  "mesto": "Kalives",
  "km": 87,
  "vozOko": "88 min",
  "zivost": 2,
  "plazaM": 550,
  "centarM": 1300,
  "naPlazi": true,
  "centarMesto": "Kalyves Poligirou",
  "aerodromKm": 56,
  "bodovi": 20,
  "razrada": {
   "ocena": 81,
   "cena": 0,
   "plaza": 31,
   "centar": 0,
   "zivost": 25,
   "pansion": 100
  },
  "zvezdice": null,
  "ocena": 9.0,
  "brOcena": 236,
  "cene": {
   "AI": 3875
  },
  "najniza": 3875,
  "soba": {
   "AI": "Family Room with Private Bathroom"
  },
  "udaljenostOdCentra": "9.8 km from Nea Moudania",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/blue-lagoon-queen.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Blue+Lagoon+Queen+Kalives+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Blue+Lagoon+Queen+Kalives+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "golden-beach-hotel",
  "hotel": "Golden Beach Hotel",
  "grad": "Metamorfosi",
  "mesto": "Metamorfosi",
  "km": 85,
  "vozOko": "81 min",
  "zivost": 2,
  "plazaM": 350,
  "centarM": 100,
  "naPlazi": true,
  "centarMesto": "Metamorfosi",
  "aerodromKm": 77,
  "bodovi": 20,
  "razrada": {
   "ocena": 45,
   "cena": 0,
   "plaza": 56,
   "centar": 92,
   "zivost": 25,
   "pansion": 65
  },
  "zvezdice": 3,
  "ocena": 7.9,
  "brOcena": 44,
  "cene": {
   "PP": 1496
  },
  "najniza": 1496,
  "soba": {
   "PP": "One-Bedroom Family Apartment"
  },
  "udaljenostOdCentra": "200 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/golden-beach-metamorfosi.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Golden+Beach+Hotel+Metamorfosi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Golden+Beach+Hotel+Metamorfosi+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "arya-hotel",
  "hotel": "Arya Hotel",
  "grad": "Hanioti",
  "mesto": "Hanioti",
  "km": 109,
  "vozOko": "103 min",
  "zivost": 5,
  "plazaM": 750,
  "centarM": 700,
  "naPlazi": true,
  "centarMesto": "Hanioti",
  "aerodromKm": 88,
  "bodovi": 20,
  "razrada": {
   "ocena": 68,
   "cena": 0,
   "plaza": 6,
   "centar": 42,
   "zivost": 100,
   "pansion": 65
  },
  "zvezdice": 3,
  "ocena": 8.6,
  "brOcena": 448,
  "cene": {
   "PP": 1278
  },
  "najniza": 1278,
  "soba": {
   "PP": "Deluxe Double Room"
  },
  "udaljenostOdCentra": "0.8 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/arya.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Arya+Hotel+Hanioti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Arya+Hotel+Hanioti+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "hotel-paradise",
  "hotel": "Hotel Paradise",
  "grad": "Kriopigi",
  "mesto": "Kriopigi",
  "km": 89,
  "vozOko": "82 min",
  "zivost": 3,
  "plazaM": 300,
  "centarM": 1300,
  "naPlazi": true,
  "centarMesto": "Kriopigi",
  "aerodromKm": 77,
  "bodovi": 19,
  "razrada": {
   "ocena": 55,
   "cena": 0,
   "plaza": 62,
   "centar": 0,
   "zivost": 50,
   "pansion": 65
  },
  "zvezdice": 3,
  "ocena": 8.2,
  "brOcena": 229,
  "cene": {
   "PP": 1440
  },
  "najniza": 1440,
  "soba": {
   "PP": "Quadruple Room with Sea View"
  },
  "udaljenostOdCentra": "1.3 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/paradise-kriopigi-halkidiki.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+Paradise+Kriopigi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+Paradise+Kriopigi+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "aegean-melathron-thalasso-spa-hotel",
  "hotel": "Aegean Melathron Thalasso Spa Hotel",
  "grad": "Kallithea Halkidiki",
  "mesto": "Kalitea",
  "km": 96,
  "vozOko": "103 min",
  "zivost": 5,
  "plazaM": 1200,
  "centarM": 2000,
  "naPlazi": true,
  "centarMesto": "Kallithea Halkidikis",
  "aerodromKm": 74,
  "bodovi": 19,
  "razrada": {
   "ocena": 77,
   "cena": 0,
   "plaza": 0,
   "centar": 0,
   "zivost": 100,
   "pansion": 65
  },
  "zvezdice": 5,
  "ocena": 8.9,
  "brOcena": 1767,
  "cene": {
   "PP": 10198
  },
  "najniza": 10198,
  "soba": {
   "PP": "Suite with Private Pool"
  },
  "udaljenostOdCentra": "2 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/aegean-melathron.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Aegean+Melathron+Thalasso+Spa+Hotel+Kalitea+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Aegean+Melathron+Thalasso+Spa+Hotel+Kalitea+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "kappa-resort",
  "hotel": "Kappa Resort",
  "grad": "Paliouri",
  "mesto": "Paliouri",
  "km": 116,
  "vozOko": "117 min",
  "zivost": 2,
  "plazaM": 450,
  "centarM": 2600,
  "naPlazi": true,
  "centarMesto": "Paliouri",
  "aerodromKm": null,
  "bodovi": 18,
  "razrada": {
   "ocena": 68,
   "cena": 0,
   "plaza": 44,
   "centar": 0,
   "zivost": 25,
   "pansion": 65
  },
  "zvezdice": 4,
  "ocena": 8.6,
  "brOcena": 227,
  "cene": {
   "PP": 4193
  },
  "najniza": 4193,
  "soba": {
   "PP": "Exclusive Suite - 2 Bedroom with private pool"
  },
  "udaljenostOdCentra": "9.1 km from Pefkohori",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/k-villas.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Kappa+Resort+Paliouri+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Kappa+Resort+Paliouri+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "village-mare",
  "hotel": "Village Mare",
  "grad": "Metamorfosi",
  "mesto": "Metamorfosi",
  "km": 85,
  "vozOko": "81 min",
  "zivost": 2,
  "plazaM": 1100,
  "centarM": 1700,
  "naPlazi": true,
  "centarMesto": "Metamorfosi",
  "aerodromKm": 77,
  "bodovi": 11,
  "razrada": {
   "ocena": 35,
   "cena": 0,
   "plaza": 0,
   "centar": 0,
   "zivost": 25,
   "pansion": 100
  },
  "zvezdice": 4,
  "ocena": 7.6,
  "brOcena": 58,
  "cene": {
   "AI": 3347
  },
  "najniza": 3347,
  "soba": {
   "AI": "Apartment - Split Level"
  },
  "udaljenostOdCentra": "1.7 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/village-mare.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Village+Mare+Metamorfosi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Village+Mare+Metamorfosi+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 }
];

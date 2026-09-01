// GENERISANO — ne menjaj rukom. Izvor: mesta.json + ponude.json, generator: napravi.py
//
// Cene su STVARNE cene sa Booking.com-a za 05.09.–13.09.2026, 2 odrasle, 1 soba, EUR,
// procitane 2026-09-01 19:58 pravim browserom (headless Chrome — Booking obicnom
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
const PRIKUPLJENO = "2026-09-01 19:58";

const TEZINE = {"ocena": 0.34, "cena": 0.18, "plaza": 0.18, "centar": 0.1, "zivost": 0.1, "pansion": 0.1};

const MESTA = {
 "Nea Kalikratija": {
  "km": 42,
  "vozOko": "42 min",
  "zivost": 4,
  "tekst": "Mesto u kome su već bili i mera za sve ostalo. Pravo naselje koje živi i van sezone: duga šetnica uz more, puno taverni, pekara i kafića, ambulanta, pijaca. Najbliže Solunu od svega na listi — može se otići u grad na pola dana i vratiti na spavanje. Plaže su korektne ali ne kao na Kasandri: voda je u Termajskom zalivu, plića i manje prozirna."
 },
 "Nea Potidea": {
  "km": 68,
  "vozOko": "63 min",
  "zivost": 2,
  "tekst": "Na samom grlu Kasandre, kod prokopanog kanala iz antike — kanal i ostaci Potidejinog zida su lepa kratka šetnja. Selo je malo, ali TU SU VELIKI ALL INCLUSIVE HOTELI, i to je jedini all inclusive kraj koji je realno blizu Solunu (68 km umesto 110). Van hotela nema mnogo restorana — život je u hotelu, što uz all inclusive i nije mana."
 },
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
 "Sani": {
  "km": 84,
  "vozOko": "83 min",
  "zivost": 1,
  "tekst": "Nije selo nego resort kraj (Sani Resort i marina). Nema mesta u koje se izlazi na večeru, sve je unutar hotela, i cene su najviše na Kasandri. Za njihov budžet i kriterijume ne dolazi u obzir."
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
 "Mola Kaliva": {
  "km": 86,
  "vozOko": "78 min",
  "zivost": 2,
  "tekst": "Obalni deo ispod Afitosa — plaže i hoteli, bez pravog centra. Prednost je što je Afitos, jedno od najlepših sela na Kasandri, na par minuta autom."
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
 "Fourka": {
  "km": 95,
  "vozOko": "101 min",
  "zivost": 2,
  "tekst": "Malo mesto na zapadnoj obali Kasandre, uglavnom apartmani i nekoliko taverni. Duga peščana plaža i mirnije veče — manje od Nea Kalikratije."
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
 "Nikiti": {
  "km": 110,
  "vozOko": "111 min",
  "zivost": 4,
  "tekst": "Pravo mesto sa starim gornjim selom od kamenih kuća, dugom plažom i dobrim izborom taverni — po veličini i živosti otprilike kao Nea Kalikratija ili malo iznad. Odatle su najlepši izleti po Sitoniji."
 },
 "Ormos Panagias": {
  "km": 112,
  "vozOko": "110 min",
  "zivost": 2,
  "tekst": "Mala luka u Sitoniji odakle idu brodići na krstarenje oko Svete Gore — to je glavni razlog da se dođe. Nekoliko riblјih taverni na vodi, inače mirno."
 },
 "Pefkohori": {
  "km": 113,
  "vozOko": "107 min",
  "zivost": 5,
  "tekst": "Po karakteru gotovo isto što i Hanioti — duga plaža, živa šetnica, puno restorana i kafića. Najdalje mesto na listi. Iz njega su lepi izleti do juga poluostrva (Hruso, Loutra)."
 },
 "Paliouri": {
  "km": 116,
  "vozOko": "117 min",
  "zivost": 2,
  "tekst": "Malo tradicionalno selo na jugu Kasandre, iznad obale. Mirno, sa par taverni; za veći izbor se ide u Pefkohori. Jedno od najdaljih mesta na listi."
 },
 "Vourvourou": {
  "km": 116,
  "vozOko": "114 min",
  "zivost": 2,
  "tekst": "Jedan od najlepših delova Sitonije — plitka bistra laguna i ostrvca Dijaporos. Mesto je malo i raštrkano, sa par taverni; dolazi se zbog vode i prirode, ne zbog vreve."
 }
};

const HOTELI = [
 {
  "id": "aris",
  "hotel": "Aris",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "plazaM": 1,
  "centarM": 300,
  "naPlazi": true,
  "centarMesto": "Paralia Katerinis",
  "aerodromKm": 91,
  "bodovi": 76,
  "razrada": {
   "ocena": 100,
   "cena": 15,
   "plaza": 100,
   "centar": 75,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 2,
  "ocena": 9.6,
  "brOcena": 90,
  "cene": {
   "ND": 1023
  },
  "najniza": 1023,
  "soba": {
   "ND": "Triple Room with Garden View"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "300 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/aris-paralia-katerinis.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Aris+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Aris+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "hanioti-hotel",
  "hotel": "Hanioti hotel",
  "grad": "Hanioti",
  "mesto": "Hanioti",
  "km": 109,
  "vozOko": "103 min",
  "zivost": 5,
  "plazaM": 100,
  "centarM": 50,
  "naPlazi": false,
  "centarMesto": "Hanioti",
  "aerodromKm": 87,
  "bodovi": 75,
  "razrada": {
   "ocena": 90,
   "cena": 27,
   "plaza": 88,
   "centar": 96,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": {
   "sajt": "https://www.haniotihotel.gr/en/",
   "email": "info@haniotihotel.gr",
   "telefon": "+30 23740 51323",
   "napomena": "Mali familijarni hotel u samom Haniotiju."
  },
  "zvezdice": 2,
  "ocena": 9.3,
  "brOcena": 375,
  "cene": {
   "ND": 967
  },
  "najniza": 967,
  "soba": {
   "ND": "Twin Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "50 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/hanioti.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hanioti+hotel+Hanioti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hanioti+hotel+Hanioti+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "parthenon-art-executive-wing-seaside-collection",
  "hotel": "Parthenon Art Executive Wing-Seaside Collection",
  "grad": "Olympiaki Akti",
  "mesto": "Olimpik Bič",
  "km": 76,
  "vozOko": "61 min",
  "zivost": 4,
  "plazaM": 50,
  "centarM": 100,
  "naPlazi": true,
  "centarMesto": "Olympiaki Akti",
  "aerodromKm": 98,
  "bodovi": 70,
  "razrada": {
   "ocena": 94,
   "cena": 4,
   "plaza": 94,
   "centar": 92,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": {
   "sajt": "https://parthenonarthotel.reserve-online.net/about",
   "telefon": "+30 23510 63322",
   "napomena": "Ima svoj booking sistem, ali ne prima upit preko linka — zvati ili pisati."
  },
  "zvezdice": 1,
  "ocena": 9.4,
  "brOcena": 63,
  "cene": {
   "ND": 1078
  },
  "najniza": 1078,
  "soba": {
   "ND": "Superior Triple Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "3.3 km from Paralia Katerinis",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/parthenon-art-boutique-apartments.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Parthenon+Art+Executive+Wing-Seaside+Collection+Olimpik+Bi%C4%8D+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Parthenon+Art+Executive+Wing-Seaside+Collection+Olimpik+Bi%C4%8D+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "hotel-vizantio",
  "hotel": "Hotel Vizantio",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "plazaM": 450,
  "centarM": 100,
  "naPlazi": false,
  "centarMesto": "Paralia Katerinis",
  "aerodromKm": 91,
  "bodovi": 69,
  "razrada": {
   "ocena": 87,
   "cena": 45,
   "plaza": 44,
   "centar": 92,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": {
   "sajt": "https://hotel-vizantio.gr/en/",
   "email": "villa@hotel-vizantio.gr",
   "telefon": "+30 2351 063173",
   "napomena": "Familijarni hotel, par koraka od peščane plaže."
  },
  "zvezdice": 3,
  "ocena": 9.2,
  "brOcena": 242,
  "cene": {
   "ND": 873
  },
  "najniza": 873,
  "soba": {
   "ND": "Studio Ground Floor"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "150 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/bizantio.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+Vizantio+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+Vizantio+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "olympus-jankaea",
  "hotel": "Olympus Jankaea",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "plazaM": 350,
  "centarM": 200,
  "naPlazi": false,
  "centarMesto": "Paralia Katerinis",
  "aerodromKm": 91,
  "bodovi": 69,
  "razrada": {
   "ocena": 100,
   "cena": 16,
   "plaza": 56,
   "centar": 83,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 9.6,
  "brOcena": 44,
  "cene": {
   "ND": 1021
  },
  "najniza": 1021,
  "soba": {
   "ND": "Deluxe Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "250 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/olympus-jankaea.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Olympus+Jankaea+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Olympus+Jankaea+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "hotel-helios",
  "hotel": "Hotel Helios",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "plazaM": 200,
  "centarM": 100,
  "naPlazi": false,
  "centarMesto": "Paralia Katerinis",
  "aerodromKm": 91,
  "bodovi": 68,
  "razrada": {
   "ocena": 58,
   "cena": 66,
   "plaza": 75,
   "centar": 92,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 2,
  "ocena": 8.3,
  "brOcena": 214,
  "cene": {
   "ND": 771
  },
  "najniza": 771,
  "soba": {
   "ND": "Basic Triple Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "150 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/helios.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+Helios+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+Helios+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "delfini",
  "hotel": "Delfini",
  "grad": "Kallithea Halkidiki",
  "mesto": "Kalitea",
  "km": 96,
  "vozOko": "103 min",
  "zivost": 5,
  "plazaM": 0,
  "centarM": 700,
  "naPlazi": true,
  "centarMesto": "Kallithea Halkidikis",
  "aerodromKm": 71,
  "bodovi": 64,
  "razrada": {
   "ocena": 71,
   "cena": 21,
   "plaza": 100,
   "centar": 42,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 2,
  "ocena": 8.7,
  "brOcena": 281,
  "cene": {
   "ND": 994
  },
  "najniza": 994,
  "soba": {
   "ND": "Twin Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "0.7 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/delfini-kallithea-halkidikis.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Delfini+Kalitea+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Delfini+Kalitea+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "iris-hotel",
  "hotel": "Iris Hotel",
  "grad": "Nea Kallikratia",
  "mesto": "Nea Kalikratija",
  "km": 42,
  "vozOko": "42 min",
  "zivost": 4,
  "plazaM": 250,
  "centarM": 300,
  "naPlazi": false,
  "centarMesto": "Nea Kalikratia",
  "aerodromKm": 26,
  "bodovi": 60,
  "razrada": {
   "ocena": 55,
   "cena": 57,
   "plaza": 69,
   "centar": 75,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 2,
  "ocena": 8.2,
  "brOcena": 152,
  "cene": {
   "ND": 813
  },
  "najniza": 813,
  "soba": {
   "ND": "Triple Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "7.8 km from Sozopoli",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/iris-na-c-a-kallikra-tia.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Iris+Hotel+Nea+Kalikratija+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Iris+Hotel+Nea+Kalikratija+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "simotel-ermis",
  "hotel": "SimOtel Ermis",
  "grad": "Hanioti",
  "mesto": "Hanioti",
  "km": 109,
  "vozOko": "103 min",
  "zivost": 5,
  "plazaM": 200,
  "centarM": 50,
  "naPlazi": false,
  "centarMesto": "Hanioti",
  "aerodromKm": 87,
  "bodovi": 60,
  "razrada": {
   "ocena": 42,
   "cena": 49,
   "plaza": 75,
   "centar": 96,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 7.8,
  "brOcena": 116,
  "cene": {
   "ND": 856
  },
  "najniza": 856,
  "soba": {
   "ND": "Superior Double Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "30 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/simotel-hanioti.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=SimOtel+Ermis+Hanioti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=SimOtel+Ermis+Hanioti+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "villa-cariatis",
  "hotel": "VILLA CARIATIS",
  "grad": "Nea Kallikratia",
  "mesto": "Nea Kalikratija",
  "km": 42,
  "vozOko": "42 min",
  "zivost": 4,
  "plazaM": 150,
  "centarM": 300,
  "naPlazi": false,
  "centarMesto": "Nea Kalikratia",
  "aerodromKm": 27,
  "bodovi": 57,
  "razrada": {
   "ocena": 58,
   "cena": 18,
   "plaza": 81,
   "centar": 75,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 2,
  "ocena": 8.3,
  "brOcena": 330,
  "cene": {
   "ND": 1010
  },
  "najniza": 1010,
  "soba": {
   "ND": "Standard Double or Twin Room with Balcony"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "7.7 km from Sozopoli",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/villa-cariatis-nea-kallikratia1.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=VILLA+CARIATIS+Nea+Kalikratija+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=VILLA+CARIATIS+Nea+Kalikratija+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "alexandrina",
  "hotel": "Alexandrina",
  "grad": "Mola Kalyva",
  "mesto": "Mola Kaliva",
  "km": 86,
  "vozOko": "78 min",
  "zivost": 2,
  "plazaM": 150,
  "centarM": 2600,
  "naPlazi": false,
  "centarMesto": "Mola Kalyva",
  "aerodromKm": 89,
  "bodovi": 57,
  "razrada": {
   "ocena": 100,
   "cena": 11,
   "plaza": 81,
   "centar": 0,
   "zivost": 25,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.7,
  "brOcena": 161,
  "cene": {
   "ND": 1046
  },
  "najniza": 1046,
  "soba": {
   "ND": "Standard Double Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "6.6 km from Polykhrono",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/alexandrina.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Alexandrina+Mola+Kaliva+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Alexandrina+Mola+Kaliva+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "hotel-calypso",
  "hotel": "Hotel Calypso",
  "grad": "Hanioti",
  "mesto": "Hanioti",
  "km": 109,
  "vozOko": "103 min",
  "zivost": 5,
  "plazaM": 350,
  "centarM": 100,
  "naPlazi": false,
  "centarMesto": "Hanioti",
  "aerodromKm": 87,
  "bodovi": 57,
  "razrada": {
   "ocena": 42,
   "cena": 53,
   "plaza": 56,
   "centar": 92,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 2,
  "ocena": 7.8,
  "brOcena": 357,
  "cene": {
   "ND": 837
  },
  "najniza": 837,
  "soba": {
   "ND": "Double Room with Sea or Pool View"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "150 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/calypso-hanioti.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+Calypso+Hanioti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+Calypso+Hanioti+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
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
  "naPlazi": false,
  "centarMesto": "Nea Skioni",
  "aerodromKm": 94,
  "bodovi": 52,
  "razrada": {
   "ocena": 55,
   "cena": 24,
   "plaza": 56,
   "centar": 67,
   "zivost": 50,
   "pansion": 70
  },
  "direktno": {
   "sajt": "https://rahoni.cronwell.gr/en/",
   "email": "salesgreece@cronwell.com",
   "telefon": "+30 23740 71977",
   "napomena": "Adults Only — za njih dvoje prednost, nema dečje vreve."
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
  "najboljiPansion": "PP",
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
  "id": "hotel-giannoulis",
  "hotel": "Hotel Giannoulis",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "plazaM": 650,
  "centarM": 2300,
  "naPlazi": false,
  "centarMesto": "Paralia Katerinis",
  "aerodromKm": 93,
  "bodovi": 49,
  "razrada": {
   "ocena": 87,
   "cena": 14,
   "plaza": 19,
   "centar": 0,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 9.2,
  "brOcena": 377,
  "cene": {
   "ND": 1032
  },
  "najniza": 1032,
  "soba": {
   "ND": "Economy Double Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "2.3 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/giannoulis-paralia.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+Giannoulis+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+Giannoulis+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "lemon-garden",
  "hotel": "Lemon Garden",
  "grad": "Pefkochori",
  "mesto": "Pefkohori",
  "km": 113,
  "vozOko": "107 min",
  "zivost": 5,
  "plazaM": 550,
  "centarM": 300,
  "naPlazi": false,
  "centarMesto": "Pefkohori",
  "aerodromKm": 91,
  "bodovi": 45,
  "razrada": {
   "ocena": 42,
   "cena": 22,
   "plaza": 31,
   "centar": 75,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 7.8,
  "brOcena": 53,
  "cene": {
   "ND": 988
  },
  "najniza": 988,
  "soba": {
   "ND": "Studio (2 Adults)"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "300 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/lemon-garden.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Lemon+Garden+Pefkohori+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Lemon+Garden+Pefkohori+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "melite-luxury-rooms-apartments",
  "hotel": "Melite Luxury Rooms & Apartments",
  "grad": "Paliouri",
  "mesto": "Paliouri",
  "km": 116,
  "vozOko": "117 min",
  "zivost": 2,
  "plazaM": 2300,
  "centarM": 300,
  "naPlazi": false,
  "centarMesto": "Paliouri",
  "aerodromKm": null,
  "bodovi": 45,
  "razrada": {
   "ocena": 90,
   "cena": 2,
   "plaza": 0,
   "centar": 75,
   "zivost": 25,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.3,
  "brOcena": 363,
  "cene": {
   "ND": 1090
  },
  "najniza": 1090,
  "soba": {
   "ND": "Deluxe Semi-Basement Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "6.8 km from Pefkohori",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/melite-luxury-paliouri.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Melite+Luxury+Rooms+%26+Apartments+Paliouri+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Melite+Luxury+Rooms+%26+Apartments+Paliouri+Greece&dr-20260905-20260913=&rc-2="
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
  "naPlazi": false,
  "centarMesto": "Hanioti",
  "aerodromKm": 86,
  "bodovi": 43,
  "razrada": {
   "ocena": 13,
   "cena": 46,
   "plaza": 56,
   "centar": 33,
   "zivost": 100,
   "pansion": 70
  },
  "direktno": {
   "sajt": "https://harishotel.gr/",
   "email": "info@harishotel.gr",
   "telefon": "+30 2374 020520",
   "napomena": "300 m do plaže, prilaz mostićem pod glavnim putem."
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
  "najboljiPansion": "PP",
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
  "id": "pefkon-suites",
  "hotel": "Pefkon Suites",
  "grad": "Afitos",
  "mesto": "Afitos",
  "km": 86,
  "vozOko": "78 min",
  "zivost": 4,
  "plazaM": 700,
  "centarM": 1600,
  "naPlazi": false,
  "centarMesto": "Afitos",
  "aerodromKm": 67,
  "bodovi": 42,
  "razrada": {
   "ocena": 61,
   "cena": 42,
   "plaza": 12,
   "centar": 0,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": null,
  "ocena": 8.4,
  "brOcena": 388,
  "cene": {
   "ND": 890
  },
  "najniza": 890,
  "soba": {
   "ND": "Double Room with Balcony and Sea View"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "3 km from Nea Fokea",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/pefkon.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Pefkon+Suites+Afitos+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Pefkon+Suites+Afitos+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "giannis-foteini",
  "hotel": "Giannis & Foteini",
  "grad": "Afitos",
  "mesto": "Afitos",
  "km": 86,
  "vozOko": "78 min",
  "zivost": 4,
  "plazaM": 650,
  "centarM": 500,
  "naPlazi": false,
  "centarMesto": "Afitos",
  "aerodromKm": 69,
  "bodovi": 41,
  "razrada": {
   "ocena": 32,
   "cena": 52,
   "plaza": 19,
   "centar": 58,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 1,
  "ocena": 7.5,
  "brOcena": 240,
  "cene": {
   "ND": 839
  },
  "najniza": 839,
  "soba": {
   "ND": "Double Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "2.7 km from Kallithea Halkidikis",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/giannis.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Giannis+%26+Foteini+Afitos+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Giannis+%26+Foteini+Afitos+Greece&dr-20260905-20260913=&rc-2="
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
  "naPlazi": false,
  "centarMesto": "Kriopigi",
  "aerodromKm": 78,
  "bodovi": 38,
  "razrada": {
   "ocena": 55,
   "cena": 16,
   "plaza": 0,
   "centar": 50,
   "zivost": 50,
   "pansion": 70
  },
  "direktno": {
   "sajt": "https://www.theo-bungalows.com/",
   "email": "info@theo-bungalows.com",
   "telefon": "+30 698 150 0050",
   "napomena": "Sajt izričito navodi polupansion — pitati cenu direktno."
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
  "najboljiPansion": "PP",
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
  "id": "aristotelis-hotel",
  "hotel": "Aristotelis Hotel",
  "grad": "Fourka",
  "mesto": "Fourka",
  "km": 95,
  "vozOko": "101 min",
  "zivost": 2,
  "plazaM": 450,
  "centarM": 2500,
  "naPlazi": false,
  "centarMesto": "Fourka",
  "aerodromKm": 81,
  "bodovi": 34,
  "razrada": {
   "ocena": 45,
   "cena": 24,
   "plaza": 44,
   "centar": 0,
   "zivost": 25,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 1,
  "ocena": 7.9,
  "brOcena": 178,
  "cene": {
   "ND": 982
  },
  "najniza": 982,
  "soba": {
   "ND": "Double Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "8.3 km from Kriopigi",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/aristoteles.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Aristotelis+Hotel+Fourka+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Aristotelis+Hotel+Fourka+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "aqua-mare-luxury-apartments",
  "hotel": "Aqua Mare Luxury Apartments",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "plazaM": 0,
  "centarM": 600,
  "naPlazi": true,
  "centarMesto": "Paralia Katerinis",
  "aerodromKm": 91,
  "bodovi": 32,
  "razrada": {
   "ocena": 100,
   "cena": 0,
   "plaza": 100,
   "centar": 50,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.6,
  "brOcena": 278,
  "cene": {
   "ND": 1516
  },
  "najniza": 1516,
  "soba": {
   "ND": "Double Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "0.7 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/aqua-mare-paralia-katerinis.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Aqua+Mare+Luxury+Apartments+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Aqua+Mare+Luxury+Apartments+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "akteon-girni",
  "hotel": "AKTEON GIRNI",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "plazaM": 0,
  "centarM": 300,
  "naPlazi": true,
  "centarMesto": "Paralia Katerinis",
  "aerodromKm": 92,
  "bodovi": 32,
  "razrada": {
   "ocena": 94,
   "cena": 0,
   "plaza": 100,
   "centar": 75,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 9.4,
  "brOcena": 368,
  "cene": {
   "ND": 1951
  },
  "najniza": 1951,
  "soba": {
   "ND": "Family Room with Sea View"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "350 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/akteon-girni.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=AKTEON+GIRNI+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=AKTEON+GIRNI+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "ostria-sea-side-hotel",
  "hotel": "Ostria Sea Side Hotel",
  "grad": "Hanioti",
  "mesto": "Hanioti",
  "km": 109,
  "vozOko": "103 min",
  "zivost": 5,
  "plazaM": 40,
  "centarM": 200,
  "naPlazi": true,
  "centarMesto": "Hanioti",
  "aerodromKm": 87,
  "bodovi": 32,
  "razrada": {
   "ocena": 90,
   "cena": 0,
   "plaza": 95,
   "centar": 83,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.3,
  "brOcena": 427,
  "cene": {
   "ND": 2702
  },
  "najniza": 2702,
  "soba": {
   "ND": "FAMILY SUITE GARDEN VIEW"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "300 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/ostria-sea-side.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Ostria+Sea+Side+Hotel+Hanioti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Ostria+Sea+Side+Hotel+Hanioti+Greece&dr-20260905-20260913=&rc-2="
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
  "naPlazi": false,
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
  "direktno": null,
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
  "najboljiPansion": "AI",
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
  "id": "hotel-alkyon",
  "hotel": "Hotel Alkyon",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "plazaM": 0,
  "centarM": 200,
  "naPlazi": true,
  "centarMesto": "Paralia Katerinis",
  "aerodromKm": 91,
  "bodovi": 30,
  "razrada": {
   "ocena": 81,
   "cena": 0,
   "plaza": 100,
   "centar": 83,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 9.0,
  "brOcena": 392,
  "cene": {
   "ND": 1400
  },
  "najniza": 1400,
  "soba": {
   "ND": "Triple Room with Side Seaview and Square view"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "250 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/alkyon-paralia.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+Alkyon+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+Alkyon+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
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
   "pansion": 70
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 9.0,
  "brOcena": 47,
  "cene": {
   "ND": 1535,
   "PP": 1767
  },
  "najniza": 1535,
  "soba": {
   "ND": "Suite with Sea View",
   "PP": "Suite with Sea View"
  },
  "najboljiPansion": "PP",
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
  "naPlazi": false,
  "centarMesto": "Polykhrono",
  "aerodromKm": 83,
  "bodovi": 30,
  "razrada": {
   "ocena": 94,
   "cena": 0,
   "plaza": 75,
   "centar": 96,
   "zivost": 50,
   "pansion": 70
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.4,
  "brOcena": 424,
  "cene": {
   "PP": 2070,
   "ND": 1809
  },
  "najniza": 1809,
  "soba": {
   "PP": "Deluxe Double Room (2 Adults + 1 Child)",
   "ND": "Deluxe Double Room (2 Adults + 1 Child)"
  },
  "najboljiPansion": "PP",
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
  "id": "secret-paradise-hotel-spa",
  "hotel": "Secret Paradise Hotel & Spa",
  "grad": "Nea Kallikratia",
  "mesto": "Nea Kalikratija",
  "km": 42,
  "vozOko": "42 min",
  "zivost": 4,
  "plazaM": 100,
  "centarM": 400,
  "naPlazi": false,
  "centarMesto": "Nea Kalikratia",
  "aerodromKm": 27,
  "bodovi": 29,
  "razrada": {
   "ocena": 87,
   "cena": 0,
   "plaza": 88,
   "centar": 67,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.2,
  "brOcena": 525,
  "cene": {
   "ND": 2152
  },
  "najniza": 2152,
  "soba": {
   "ND": "Standard Family Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "7.5 km from Sozopoli",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/mykonos-paradise.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Secret+Paradise+Hotel+%26+Spa+Nea+Kalikratija+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Secret+Paradise+Hotel+%26+Spa+Nea+Kalikratija+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "peloton-inn",
  "hotel": "Peloton Inn",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "plazaM": 450,
  "centarM": 600,
  "naPlazi": false,
  "centarMesto": "Paralia Katerinis",
  "aerodromKm": 91,
  "bodovi": 27,
  "razrada": {
   "ocena": 100,
   "cena": 0,
   "plaza": 44,
   "centar": 50,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 9.7,
  "brOcena": 201,
  "cene": {
   "ND": 1230
  },
  "najniza": 1230,
  "soba": {
   "ND": "Superior Family Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "0.7 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/peloton-inn.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Peloton+Inn+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Peloton+Inn+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "asteras-studios",
  "hotel": "ASTERAS STUDIOS",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "plazaM": 200,
  "centarM": 600,
  "naPlazi": false,
  "centarMesto": "Paralia Katerinis",
  "aerodromKm": 91,
  "bodovi": 27,
  "razrada": {
   "ocena": 81,
   "cena": 0,
   "plaza": 75,
   "centar": 50,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.0,
  "brOcena": 201,
  "cene": {
   "ND": 1321
  },
  "najniza": 1321,
  "soba": {
   "ND": "Triple Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "0.7 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/asteras-studios.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=ASTERAS+STUDIOS+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=ASTERAS+STUDIOS+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "sun-hotel",
  "hotel": "Sun Hotel",
  "grad": "Polychrono",
  "mesto": "Polihrono",
  "km": 105,
  "vozOko": "99 min",
  "zivost": 3,
  "plazaM": 100,
  "centarM": 100,
  "naPlazi": false,
  "centarMesto": "Polykhrono",
  "aerodromKm": 83,
  "bodovi": 27,
  "razrada": {
   "ocena": 74,
   "cena": 0,
   "plaza": 88,
   "centar": 92,
   "zivost": 50,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 8.8,
  "brOcena": 266,
  "cene": {
   "ND": 1108
  },
  "najniza": 1108,
  "soba": {
   "ND": "Family Room with Bunk Bed"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "150 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/sunset-ouranoupolis.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Sun+Hotel+Polihrono+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Sun+Hotel+Polihrono+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "sun-residence-exclusive-seaside-suites",
  "hotel": "SUN RESIDENCE Exclusive Seaside Suites",
  "grad": "Polychrono",
  "mesto": "Polihrono",
  "km": 105,
  "vozOko": "99 min",
  "zivost": 3,
  "plazaM": 50,
  "centarM": 1400,
  "naPlazi": true,
  "centarMesto": "Polykhrono",
  "aerodromKm": 81,
  "bodovi": 27,
  "razrada": {
   "ocena": 100,
   "cena": 0,
   "plaza": 94,
   "centar": 0,
   "zivost": 50,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.6,
  "brOcena": 67,
  "cene": {
   "ND": 2440
  },
  "najniza": 2440,
  "soba": {
   "ND": "Superior Executive Suite"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "1.4 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/sun-residence.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=SUN+RESIDENCE+Exclusive+Seaside+Suites+Polihrono+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=SUN+RESIDENCE+Exclusive+Seaside+Suites+Polihrono+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "palm-boutique-suites",
  "hotel": "Palm Boutique Suites",
  "grad": "Pefkochori",
  "mesto": "Pefkohori",
  "km": 113,
  "vozOko": "107 min",
  "zivost": 5,
  "plazaM": 550,
  "centarM": 300,
  "naPlazi": false,
  "centarMesto": "Pefkohori",
  "aerodromKm": 91,
  "bodovi": 27,
  "razrada": {
   "ocena": 97,
   "cena": 0,
   "plaza": 31,
   "centar": 75,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 2,
  "ocena": 9.5,
  "brOcena": 205,
  "cene": {
   "ND": 1683
  },
  "najniza": 1683,
  "soba": {
   "ND": "One-Bedroom Apartment with Spa Bath"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "350 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/palm-boutique-suites.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Palm+Boutique+Suites+Pefkohori+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Palm+Boutique+Suites+Pefkohori+Greece&dr-20260905-20260913=&rc-2="
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
  "direktno": null,
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
  "najboljiPansion": "AI",
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
  "id": "evripidis-hotel-afitos",
  "hotel": "Evripidis Hotel Afitos",
  "grad": "Afitos",
  "mesto": "Afitos",
  "km": 86,
  "vozOko": "78 min",
  "zivost": 4,
  "plazaM": 30,
  "centarM": 2300,
  "naPlazi": true,
  "centarMesto": "Afitos",
  "aerodromKm": 71,
  "bodovi": 26,
  "razrada": {
   "ocena": 87,
   "cena": 0,
   "plaza": 96,
   "centar": 0,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 1,
  "ocena": 9.2,
  "brOcena": 84,
  "cene": {
   "ND": 1578
  },
  "najniza": 1578,
  "soba": {
   "ND": "One-Bedroom Apartment with Balcony and Sea View"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "0.9 km from Kallithea Halkidikis",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/ksenodokheio-euripides.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Evripidis+Hotel+Afitos+Afitos+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Evripidis+Hotel+Afitos+Afitos+Greece&dr-20260905-20260913=&rc-2="
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
   "pansion": 70
  },
  "direktno": null,
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
  "najboljiPansion": "PP",
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
  "id": "hotel-pilalidis",
  "hotel": "Hotel Pilalidis",
  "grad": "Pefkochori",
  "mesto": "Pefkohori",
  "km": 113,
  "vozOko": "107 min",
  "zivost": 5,
  "plazaM": 400,
  "centarM": 600,
  "naPlazi": false,
  "centarMesto": "Pefkohori",
  "aerodromKm": 91,
  "bodovi": 26,
  "razrada": {
   "ocena": 90,
   "cena": 0,
   "plaza": 50,
   "centar": 50,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 9.3,
  "brOcena": 504,
  "cene": {
   "ND": 1360
  },
  "najniza": 1360,
  "soba": {
   "ND": "Superior Double Room with Garden View"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "0.7 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/pilalidis.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+Pilalidis+Pefkohori+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+Pilalidis+Pefkohori+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "meli-boutique-afitos",
  "hotel": "Meli Boutique Afitos",
  "grad": "Afitos",
  "mesto": "Afitos",
  "km": 86,
  "vozOko": "78 min",
  "zivost": 4,
  "plazaM": 700,
  "centarM": 50,
  "naPlazi": false,
  "centarMesto": "Afitos",
  "aerodromKm": 68,
  "bodovi": 25,
  "razrada": {
   "ocena": 97,
   "cena": 0,
   "plaza": 12,
   "centar": 96,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 9.5,
  "brOcena": 75,
  "cene": {
   "ND": 1325
  },
  "najniza": 1325,
  "soba": {
   "ND": "Deluxe Double Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "3.3 km from Kallithea Halkidikis",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/meli-boutique-afitos.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Meli+Boutique+Afitos+Afitos+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Meli+Boutique+Afitos+Afitos+Greece&dr-20260905-20260913=&rc-2="
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
  "naPlazi": false,
  "centarMesto": "Metamorfosi",
  "aerodromKm": 78,
  "bodovi": 25,
  "razrada": {
   "ocena": 100,
   "cena": 0,
   "plaza": 50,
   "centar": 25,
   "zivost": 25,
   "pansion": 70
  },
  "direktno": null,
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
  "najboljiPansion": "PP",
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
  "direktno": null,
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
  "najboljiPansion": "AI",
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
  "id": "sarantis-hotel",
  "hotel": "Sarantis Hotel",
  "grad": "Hanioti",
  "mesto": "Hanioti",
  "km": 109,
  "vozOko": "103 min",
  "zivost": 5,
  "plazaM": 500,
  "centarM": 200,
  "naPlazi": false,
  "centarMesto": "Hanioti",
  "aerodromKm": 87,
  "bodovi": 24,
  "razrada": {
   "ocena": 71,
   "cena": 0,
   "plaza": 38,
   "centar": 83,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 8.7,
  "brOcena": 340,
  "cene": {
   "ND": 1273
  },
  "najniza": 1273,
  "soba": {
   "ND": "Twin Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "250 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/sarantis.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Sarantis+Hotel+Hanioti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Sarantis+Hotel+Hanioti+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "crystal-villas-suites",
  "hotel": "Crystal villas & suites",
  "grad": "Polychrono",
  "mesto": "Polihrono",
  "km": 105,
  "vozOko": "99 min",
  "zivost": 3,
  "plazaM": 150,
  "centarM": 1500,
  "naPlazi": false,
  "centarMesto": "Polykhrono",
  "aerodromKm": 81,
  "bodovi": 24,
  "razrada": {
   "ocena": 87,
   "cena": 0,
   "plaza": 81,
   "centar": 0,
   "zivost": 50,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.2,
  "brOcena": 163,
  "cene": {
   "ND": 5017
  },
  "najniza": 5017,
  "soba": {
   "ND": "Villa with Sea View"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "1.5 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/crystal-villas-amp-suites.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Crystal+villas+%26+suites+Polihrono+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Crystal+villas+%26+suites+Polihrono+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "akritas-hotel-pefkochori",
  "hotel": "Akritas Hotel Pefkochori",
  "grad": "Pefkochori",
  "mesto": "Pefkohori",
  "km": 113,
  "vozOko": "107 min",
  "zivost": 5,
  "plazaM": 550,
  "centarM": 300,
  "naPlazi": false,
  "centarMesto": "Pefkohori",
  "aerodromKm": 91,
  "bodovi": 24,
  "razrada": {
   "ocena": 77,
   "cena": 0,
   "plaza": 31,
   "centar": 75,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 8.9,
  "brOcena": 644,
  "cene": {
   "ND": 1506
  },
  "najniza": 1506,
  "soba": {
   "ND": "Family Room with Bathroom"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "350 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/akritas-pefkohori.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Akritas+Hotel+Pefkochori+Pefkohori+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Akritas+Hotel+Pefkochori+Pefkohori+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "kassandra-village-resort",
  "hotel": "Kassandra Village Resort",
  "grad": "Pefkochori",
  "mesto": "Pefkohori",
  "km": 113,
  "vozOko": "107 min",
  "zivost": 5,
  "plazaM": 700,
  "centarM": 400,
  "naPlazi": false,
  "centarMesto": "Pefkohori",
  "aerodromKm": 91,
  "bodovi": 24,
  "razrada": {
   "ocena": 87,
   "cena": 0,
   "plaza": 12,
   "centar": 67,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.2,
  "brOcena": 211,
  "cene": {
   "ND": 2944
  },
  "najniza": 2944,
  "soba": {
   "ND": "Superior Two-Bedroom Apartment"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "400 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/kassandra-village-resort.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Kassandra+Village+Resort+Pefkohori+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Kassandra+Village+Resort+Pefkohori+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "pomegranate-wellness-spa-hotel",
  "hotel": "Pomegranate Wellness Spa Hotel",
  "grad": "Nea Potidea",
  "mesto": "Nea Potidea",
  "km": 68,
  "vozOko": "63 min",
  "zivost": 2,
  "plazaM": 350,
  "centarM": 1400,
  "naPlazi": false,
  "centarMesto": "Nea Potidaea",
  "aerodromKm": 52,
  "bodovi": 23,
  "razrada": {
   "ocena": 94,
   "cena": 0,
   "plaza": 56,
   "centar": 0,
   "zivost": 25,
   "pansion": 70
  },
  "direktno": null,
  "zvezdice": 5,
  "ocena": 9.4,
  "brOcena": 511,
  "cene": {
   "ND": 6589,
   "PP": 4734
  },
  "najniza": 4734,
  "soba": {
   "ND": "Standard Suite",
   "PP": "Suite Standard"
  },
  "najboljiPansion": "PP",
  "udaljenostOdCentra": "4.9 km from Nea Moudania",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/pomegranate-spa.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Pomegranate+Wellness+Spa+Hotel+Nea+Potidea+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Pomegranate+Wellness+Spa+Hotel+Nea+Potidea+Greece&dr-20260905-20260913=&rc-2="
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
  "naPlazi": false,
  "centarMesto": "Metamorfosi",
  "aerodromKm": 77,
  "bodovi": 23,
  "razrada": {
   "ocena": 61,
   "cena": 0,
   "plaza": 56,
   "centar": 96,
   "zivost": 25,
   "pansion": 70
  },
  "direktno": null,
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
  "najboljiPansion": "PP",
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
  "id": "royal-hotel-and-suites",
  "hotel": "Royal Hotel and Suites",
  "grad": "Polychrono",
  "mesto": "Polihrono",
  "km": 105,
  "vozOko": "99 min",
  "zivost": 3,
  "plazaM": 450,
  "centarM": 500,
  "naPlazi": false,
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
  "direktno": null,
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
  "najboljiPansion": "AI",
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
  "id": "angelina-hotel",
  "hotel": "Angelina Hotel",
  "grad": "Ormos Panagias",
  "mesto": "Ormos Panagias",
  "km": 112,
  "vozOko": "110 min",
  "zivost": 2,
  "plazaM": 1,
  "centarM": 100,
  "naPlazi": true,
  "centarMesto": "Ormos Panagias",
  "aerodromKm": 90,
  "bodovi": 23,
  "razrada": {
   "ocena": 52,
   "cena": 0,
   "plaza": 100,
   "centar": 92,
   "zivost": 25,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 2,
  "ocena": 8.1,
  "brOcena": 131,
  "cene": {
   "ND": 1350
  },
  "najniza": 1350,
  "soba": {
   "ND": "Triple Room with Garden View"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "5.5 km from Nikiti",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/aggelos-ormos-panagias.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Angelina+Hotel+Ormos+Panagias+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Angelina+Hotel+Ormos+Panagias+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "stratos-hotel",
  "hotel": "Stratos Hotel",
  "grad": "Afitos",
  "mesto": "Afitos",
  "km": 86,
  "vozOko": "78 min",
  "zivost": 4,
  "plazaM": 850,
  "centarM": 100,
  "naPlazi": false,
  "centarMesto": "Afitos",
  "aerodromKm": 69,
  "bodovi": 22,
  "razrada": {
   "ocena": 84,
   "cena": 0,
   "plaza": 0,
   "centar": 92,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 9.1,
  "brOcena": 383,
  "cene": {
   "ND": 1312
  },
  "najniza": 1312,
  "soba": {
   "ND": "Family Suite"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "3.1 km from Kallithea Halkidikis",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/stratos.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Stratos+Hotel+Afitos+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Stratos+Hotel+Afitos+Greece&dr-20260905-20260913=&rc-2="
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
  "naPlazi": false,
  "centarMesto": "Paralia Katerinis",
  "aerodromKm": 90,
  "bodovi": 22,
  "razrada": {
   "ocena": 68,
   "cena": 0,
   "plaza": 31,
   "centar": 33,
   "zivost": 100,
   "pansion": 70
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 8.6,
  "brOcena": 426,
  "cene": {
   "ND": 1444,
   "PP": 1743
  },
  "najniza": 1444,
  "soba": {
   "ND": "Family Room",
   "PP": "Family Room"
  },
  "najboljiPansion": "PP",
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
  "id": "lagaria-apartments",
  "hotel": "Lagaria Apartments",
  "grad": "Afitos",
  "mesto": "Afitos",
  "km": 86,
  "vozOko": "78 min",
  "zivost": 4,
  "plazaM": 600,
  "centarM": 600,
  "naPlazi": false,
  "centarMesto": "Afitos",
  "aerodromKm": 69,
  "bodovi": 22,
  "razrada": {
   "ocena": 81,
   "cena": 0,
   "plaza": 25,
   "centar": 50,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.0,
  "brOcena": 85,
  "cene": {
   "ND": 2376
  },
  "najniza": 2376,
  "soba": {
   "ND": "Two-Bedroom Apartment"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "2.6 km from Kallithea Halkidikis",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/lagaria-palace-apartments.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Lagaria+Apartments+Afitos+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Lagaria+Apartments+Afitos+Greece&dr-20260905-20260913=&rc-2="
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
  "naPlazi": false,
  "centarMesto": "Hanioti",
  "aerodromKm": 85,
  "bodovi": 22,
  "razrada": {
   "ocena": 71,
   "cena": 0,
   "plaza": 44,
   "centar": 0,
   "zivost": 100,
   "pansion": 70
  },
  "direktno": null,
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
  "najboljiPansion": "PP",
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
  "id": "domus-hospitality",
  "hotel": "domus hospitality",
  "grad": "Vourvourou",
  "mesto": "Vourvourou",
  "km": 116,
  "vozOko": "114 min",
  "zivost": 2,
  "plazaM": 250,
  "centarM": 2100,
  "naPlazi": false,
  "centarMesto": "Vourvourou",
  "aerodromKm": 96,
  "bodovi": 22,
  "razrada": {
   "ocena": 90,
   "cena": 0,
   "plaza": 69,
   "centar": 0,
   "zivost": 25,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.3,
  "brOcena": 442,
  "cene": {
   "ND": 1804
  },
  "najniza": 1804,
  "soba": {
   "ND": "One-Bedroom Apartment"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "9.9 km from Nikiti",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/domus-hospitality.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=domus+hospitality+Vourvourou+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=domus+hospitality+Vourvourou+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "lagaria-hotel",
  "hotel": "Lagaria Hotel",
  "grad": "Afitos",
  "mesto": "Afitos",
  "km": 86,
  "vozOko": "78 min",
  "zivost": 4,
  "plazaM": 600,
  "centarM": 600,
  "naPlazi": false,
  "centarMesto": "Afitos",
  "aerodromKm": 69,
  "bodovi": 21,
  "razrada": {
   "ocena": 77,
   "cena": 0,
   "plaza": 25,
   "centar": 50,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 8.9,
  "brOcena": 652,
  "cene": {
   "ND": 1319
  },
  "najniza": 1319,
  "soba": {
   "ND": "Flexible Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "2.6 km from Kallithea Halkidikis",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/lagaria-palace.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Lagaria+Hotel+Afitos+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Lagaria+Hotel+Afitos+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "old-nikiti-s-hotel",
  "hotel": "Old Nikiti's Hotel",
  "grad": "Nikiti",
  "mesto": "Nikiti",
  "km": 110,
  "vozOko": "111 min",
  "zivost": 4,
  "plazaM": 1200,
  "centarM": 400,
  "naPlazi": false,
  "centarMesto": "Nikiti",
  "aerodromKm": 83,
  "bodovi": 21,
  "razrada": {
   "ocena": 81,
   "cena": 0,
   "plaza": 0,
   "centar": 67,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 2,
  "ocena": 9.0,
  "brOcena": 110,
  "cene": {
   "ND": 1666
  },
  "najniza": 1666,
  "soba": {
   "ND": "Quadruple Room with Balcony"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "400 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/old-nikitis.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Old+Nikiti%27s+Hotel+Nikiti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Old+Nikiti%27s+Hotel+Nikiti+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "core-hotel",
  "hotel": "Core Hotel",
  "grad": "Polychrono",
  "mesto": "Polihrono",
  "km": 105,
  "vozOko": "99 min",
  "zivost": 3,
  "plazaM": 250,
  "centarM": 100,
  "naPlazi": false,
  "centarMesto": "Polykhrono",
  "aerodromKm": 83,
  "bodovi": 21,
  "razrada": {
   "ocena": 45,
   "cena": 0,
   "plaza": 69,
   "centar": 92,
   "zivost": 50,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 7.9,
  "brOcena": 193,
  "cene": {
   "ND": 1370
  },
  "najniza": 1370,
  "soba": {
   "ND": "Classic One-Bedroom Suite"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "150 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/core-resorts.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Core+Hotel+Polihrono+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Core+Hotel+Polihrono+Greece&dr-20260905-20260913=&rc-2="
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
  "naPlazi": false,
  "centarMesto": "Hanioti",
  "aerodromKm": 88,
  "bodovi": 21,
  "razrada": {
   "ocena": 87,
   "cena": 0,
   "plaza": 38,
   "centar": 17,
   "zivost": 100,
   "pansion": 70
  },
  "direktno": null,
  "zvezdice": 5,
  "ocena": 9.2,
  "brOcena": 23,
  "cene": {
   "PP": 3358,
   "ND": 2510
  },
  "najniza": 2510,
  "soba": {
   "PP": "Sea View Horizon Retreat",
   "ND": "Sea View Horizon Retreat"
  },
  "najboljiPansion": "PP",
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
  "id": "aloni-hotel-pefkochori",
  "hotel": "Aloni Hotel Pefkochori",
  "grad": "Pefkochori",
  "mesto": "Pefkohori",
  "km": 113,
  "vozOko": "107 min",
  "zivost": 5,
  "plazaM": 600,
  "centarM": 500,
  "naPlazi": false,
  "centarMesto": "Pefkohori",
  "aerodromKm": 91,
  "bodovi": 21,
  "razrada": {
   "ocena": 65,
   "cena": 0,
   "plaza": 25,
   "centar": 58,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 8.5,
  "brOcena": 335,
  "cene": {
   "ND": 1283
  },
  "najniza": 1283,
  "soba": {
   "ND": "Superior Triple Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "0.6 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/aloni-pefkohori-halkidiki.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Aloni+Hotel+Pefkochori+Pefkohori+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Aloni+Hotel+Pefkochori+Pefkohori+Greece&dr-20260905-20260913=&rc-2="
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
  "naPlazi": false,
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
  "direktno": null,
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
  "najboljiPansion": "AI",
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
  "naPlazi": false,
  "centarMesto": "Metamorfosi",
  "aerodromKm": 77,
  "bodovi": 20,
  "razrada": {
   "ocena": 45,
   "cena": 0,
   "plaza": 56,
   "centar": 92,
   "zivost": 25,
   "pansion": 70
  },
  "direktno": null,
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
  "najboljiPansion": "PP",
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
  "id": "alkion-hotel",
  "hotel": "Alkion Hotel",
  "grad": "Kriopigi",
  "mesto": "Kriopigi",
  "km": 89,
  "vozOko": "82 min",
  "zivost": 3,
  "plazaM": 1600,
  "centarM": 100,
  "naPlazi": false,
  "centarMesto": "Kriopigi",
  "aerodromKm": 77,
  "bodovi": 20,
  "razrada": {
   "ocena": 74,
   "cena": 0,
   "plaza": 0,
   "centar": 92,
   "zivost": 50,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 8.8,
  "brOcena": 164,
  "cene": {
   "ND": 1605
  },
  "najniza": 1605,
  "soba": {
   "ND": "Superior Double Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "100 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/alkion-kriopigi.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Alkion+Hotel+Kriopigi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Alkion+Hotel+Kriopigi+Greece&dr-20260905-20260913=&rc-2="
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
  "naPlazi": false,
  "centarMesto": "Hanioti",
  "aerodromKm": 88,
  "bodovi": 20,
  "razrada": {
   "ocena": 68,
   "cena": 0,
   "plaza": 6,
   "centar": 42,
   "zivost": 100,
   "pansion": 70
  },
  "direktno": null,
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
  "najboljiPansion": "PP",
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
  "id": "kyma-boutique",
  "hotel": "ĪKYMA Boutique",
  "grad": "Polychrono",
  "mesto": "Polihrono",
  "km": 105,
  "vozOko": "99 min",
  "zivost": 3,
  "plazaM": 10,
  "centarM": 2900,
  "naPlazi": true,
  "centarMesto": "Polykhrono",
  "aerodromKm": 80,
  "bodovi": 20,
  "razrada": {
   "ocena": 52,
   "cena": 0,
   "plaza": 99,
   "centar": 0,
   "zivost": 50,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": null,
  "ocena": 8.1,
  "brOcena": 514,
  "cene": {
   "ND": 2182
  },
  "najniza": 2182,
  "soba": {
   "ND": "Double Room with Pool View"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "3 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/ikyma-boutique.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=%C4%AAKYMA+Boutique+Polihrono+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=%C4%AAKYMA+Boutique+Polihrono+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "terra-olivia-luxury-villas-and-suites",
  "hotel": "Terra Olivia Luxury Villas and Suites",
  "grad": "Paliouri",
  "mesto": "Paliouri",
  "km": 116,
  "vozOko": "117 min",
  "zivost": 2,
  "plazaM": 2200,
  "centarM": 500,
  "naPlazi": false,
  "centarMesto": "Paliouri",
  "aerodromKm": 99,
  "bodovi": 20,
  "razrada": {
   "ocena": 97,
   "cena": 0,
   "plaza": 0,
   "centar": 58,
   "zivost": 25,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.5,
  "brOcena": 182,
  "cene": {
   "ND": 2038
  },
  "najniza": 2038,
  "soba": {
   "ND": "One-Bedroom Villa"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "6.4 km from Pefkohori",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/paliouri-luxury-villas.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Terra+Olivia+Luxury+Villas+and+Suites+Paliouri+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Terra+Olivia+Luxury+Villas+and+Suites+Paliouri+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "sunway-hotel",
  "hotel": "Sunway Hotel",
  "grad": "Kallithea Halkidiki",
  "mesto": "Kalitea",
  "km": 96,
  "vozOko": "103 min",
  "zivost": 5,
  "plazaM": 950,
  "centarM": 500,
  "naPlazi": false,
  "centarMesto": "Kallithea Halkidikis",
  "aerodromKm": 73,
  "bodovi": 19,
  "razrada": {
   "ocena": 65,
   "cena": 0,
   "plaza": 0,
   "centar": 58,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": null,
  "ocena": 8.5,
  "brOcena": 131,
  "cene": {
   "ND": 1237
  },
  "najniza": 1237,
  "soba": {
   "ND": "Economy Twin Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "0.6 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/sunway-kallithea-khalkidikes12.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Sunway+Hotel+Kalitea+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Sunway+Hotel+Kalitea+Greece&dr-20260905-20260913=&rc-2="
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
  "naPlazi": false,
  "centarMesto": "Kriopigi",
  "aerodromKm": 77,
  "bodovi": 19,
  "razrada": {
   "ocena": 55,
   "cena": 0,
   "plaza": 62,
   "centar": 0,
   "zivost": 50,
   "pansion": 70
  },
  "direktno": null,
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
  "najboljiPansion": "PP",
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
  "naPlazi": false,
  "centarMesto": "Kallithea Halkidikis",
  "aerodromKm": 74,
  "bodovi": 19,
  "razrada": {
   "ocena": 77,
   "cena": 0,
   "plaza": 0,
   "centar": 0,
   "zivost": 100,
   "pansion": 70
  },
  "direktno": null,
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
  "najboljiPansion": "PP",
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
  "id": "coco-ns-suites-villas-fourka",
  "hotel": "Cocoοns Suites & Villas Fourka",
  "grad": "Fourka",
  "mesto": "Fourka",
  "km": 95,
  "vozOko": "101 min",
  "zivost": 2,
  "plazaM": 500,
  "centarM": 2500,
  "naPlazi": false,
  "centarMesto": "Fourka",
  "aerodromKm": 81,
  "bodovi": 19,
  "razrada": {
   "ocena": 87,
   "cena": 0,
   "plaza": 38,
   "centar": 0,
   "zivost": 25,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": null,
  "ocena": 9.2,
  "brOcena": 528,
  "cene": {
   "ND": 1837
  },
  "najniza": 1837,
  "soba": {
   "ND": "Junior Suite with Balcony"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "9.7 km from Kallithea Halkidikis",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/cocoons.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Coco%CE%BFns+Suites+%26+Villas+Fourka+Fourka+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Coco%CE%BFns+Suites+%26+Villas+Fourka+Fourka+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "blue-sea-boutique-apartments",
  "hotel": "Blue Sea Boutique Apartments",
  "grad": "Olympiaki Akti",
  "mesto": "Olimpik Bič",
  "km": 76,
  "vozOko": "61 min",
  "zivost": 4,
  "plazaM": 450,
  "centarM": 50,
  "naPlazi": false,
  "centarMesto": "Olympiaki Akti",
  "aerodromKm": 98,
  "bodovi": 18,
  "razrada": {
   "ocena": 55,
   "cena": 0,
   "plaza": 44,
   "centar": 96,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 8.2,
  "brOcena": 26,
  "cene": {
   "ND": 1237
  },
  "najniza": 1237,
  "soba": {
   "ND": "Deluxe Triple Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "3.2 km from Paralia Katerinis",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/marianna-rooms.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Blue+Sea+Boutique+Apartments+Olimpik+Bi%C4%8D+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Blue+Sea+Boutique+Apartments+Olimpik+Bi%C4%8D+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "ampelia-hotel-kassandra",
  "hotel": "Ampelia Hotel Kassandra",
  "grad": "Hanioti",
  "mesto": "Hanioti",
  "km": 109,
  "vozOko": "103 min",
  "zivost": 5,
  "plazaM": 1100,
  "centarM": 1000,
  "naPlazi": false,
  "centarMesto": "Hanioti",
  "aerodromKm": 88,
  "bodovi": 18,
  "razrada": {
   "ocena": 74,
   "cena": 0,
   "plaza": 0,
   "centar": 17,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 8.8,
  "brOcena": 201,
  "cene": {
   "ND": 1154
  },
  "najniza": 1154,
  "soba": {
   "ND": "Comfort Room with Balcony"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "1 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/ampelia-studios.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Ampelia+Hotel+Kassandra+Hanioti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Ampelia+Hotel+Kassandra+Hanioti+Greece&dr-20260905-20260913=&rc-2="
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
  "naPlazi": false,
  "centarMesto": "Paliouri",
  "aerodromKm": null,
  "bodovi": 18,
  "razrada": {
   "ocena": 68,
   "cena": 0,
   "plaza": 44,
   "centar": 0,
   "zivost": 25,
   "pansion": 70
  },
  "direktno": null,
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
  "najboljiPansion": "PP",
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
  "id": "sani-verde",
  "hotel": "Sani Verde",
  "grad": "Sani",
  "mesto": "Sani",
  "km": 84,
  "vozOko": "83 min",
  "zivost": 1,
  "plazaM": 2600,
  "centarM": 2100,
  "naPlazi": false,
  "centarMesto": "Sani Beach",
  "aerodromKm": 67,
  "bodovi": 17,
  "razrada": {
   "ocena": 100,
   "cena": 0,
   "plaza": 0,
   "centar": 0,
   "zivost": 0,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.6,
  "brOcena": 345,
  "cene": {
   "ND": 2177
  },
  "najniza": 2177,
  "soba": {
   "ND": "Superior Apartment"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "2.1 km from centre",
  "plazaBlizu": false,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/sani-verde.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Sani+Verde+Sani+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Sani+Verde+Sani+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "sani-polyastron-hotel-spa",
  "hotel": "Sani Polyastron Hotel & Spa",
  "grad": "Sani",
  "mesto": "Sani",
  "km": 84,
  "vozOko": "83 min",
  "zivost": 1,
  "plazaM": 1800,
  "centarM": 1000,
  "naPlazi": false,
  "centarMesto": "Sani Beach",
  "aerodromKm": 69,
  "bodovi": 16,
  "razrada": {
   "ocena": 87,
   "cena": 0,
   "plaza": 0,
   "centar": 17,
   "zivost": 0,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.2,
  "brOcena": 214,
  "cene": {
   "ND": 1945
  },
  "najniza": 1945,
  "soba": {
   "ND": "Deluxe Suite"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "1.1 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/polyastron-place.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Sani+Polyastron+Hotel+%26+Spa+Sani+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Sani+Polyastron+Hotel+%26+Spa+Sani+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "ohana-hotel",
  "hotel": "Ohana Hotel",
  "grad": "Kriopigi",
  "mesto": "Kriopigi",
  "km": 89,
  "vozOko": "82 min",
  "zivost": 3,
  "plazaM": 800,
  "centarM": 1100,
  "naPlazi": false,
  "centarMesto": "Kriopigi",
  "aerodromKm": 76,
  "bodovi": 16,
  "razrada": {
   "ocena": 77,
   "cena": 0,
   "plaza": 0,
   "centar": 8,
   "zivost": 50,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 8.9,
  "brOcena": 319,
  "cene": {
   "ND": 1806
  },
  "najniza": 1806,
  "soba": {
   "ND": "Two-Bedroom Family Apartment"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "1.1 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/ohana-kriopigi.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Ohana+Hotel+Kriopigi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Ohana+Hotel+Kriopigi+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "avatel-eco-lodge",
  "hotel": "Avatel Eco Lodge",
  "grad": "Kriopigi",
  "mesto": "Kriopigi",
  "km": 89,
  "vozOko": "82 min",
  "zivost": 3,
  "plazaM": 1100,
  "centarM": 1200,
  "naPlazi": false,
  "centarMesto": "Kriopigi",
  "aerodromKm": 79,
  "bodovi": 16,
  "razrada": {
   "ocena": 81,
   "cena": 0,
   "plaza": 0,
   "centar": 0,
   "zivost": 50,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.0,
  "brOcena": 356,
  "cene": {
   "ND": 1709
  },
  "najniza": 1709,
  "soba": {
   "ND": "Deluxe Family Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "1.3 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/avatel-eco-lodge.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Avatel+Eco+Lodge+Kriopigi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Avatel+Eco+Lodge+Kriopigi+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "maria-s-house-hotel",
  "hotel": "Maria's House Hotel",
  "grad": "Metamorfosi",
  "mesto": "Metamorfosi",
  "km": 85,
  "vozOko": "81 min",
  "zivost": 2,
  "plazaM": 900,
  "centarM": 800,
  "naPlazi": false,
  "centarMesto": "Metamorfosi",
  "aerodromKm": 78,
  "bodovi": 15,
  "razrada": {
   "ocena": 68,
   "cena": 0,
   "plaza": 0,
   "centar": 33,
   "zivost": 25,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 8.6,
  "brOcena": 132,
  "cene": {
   "ND": 1199
  },
  "najniza": 1199,
  "soba": {
   "ND": "Standard Twin Room (2-3 Adults)"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "0.9 km from centre",
  "plazaBlizu": false,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/maria-s-hous.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Maria%27s+House+Hotel+Metamorfosi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Maria%27s+House+Hotel+Metamorfosi+Greece&dr-20260905-20260913=&rc-2="
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
  "naPlazi": false,
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
  "direktno": null,
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
  "najboljiPansion": "AI",
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
 },
 {
  "id": "home-for-8-in-sane-greece",
  "hotel": "Home for 8 in Sane, Greece",
  "grad": "Sani",
  "mesto": "Sani",
  "km": 84,
  "vozOko": "83 min",
  "zivost": 1,
  "plazaM": 850,
  "centarM": 1100,
  "naPlazi": false,
  "centarMesto": "Sani Beach",
  "aerodromKm": 68,
  "bodovi": 2,
  "razrada": {
   "ocena": 0,
   "cena": 0,
   "plaza": 0,
   "centar": 8,
   "zivost": 0,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": null,
  "ocena": 1.0,
  "brOcena": 1,
  "cene": {
   "ND": 3061
  },
  "najniza": 3061,
  "soba": {
   "ND": "Villa"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "1.2 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/home-for-8-in-sane-greece.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Home+for+8+in+Sane%2C+Greece+Sani+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Home+for+8+in+Sane%2C+Greece+Sani+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 }
];

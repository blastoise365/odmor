// GENERISANO — ne menjaj rukom. Izvor: mesta.json + ponude.json, generator: napravi.py
//
// Cene su STVARNE cene sa Booking.com-a za 05.09.–13.09.2026, 2 odrasle, 1 soba, EUR,
// procitane 2026-09-01 18:28 pravim browserom (headless Chrome — Booking obicnom
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
const PRIKUPLJENO = "2026-09-01 18:28";

const MESTA = {
 "Sozopoli": {
  "km": 48,
  "vozOko": "47 min",
  "zivost": 2,
  "tekst": "Malo primorsko naselje pored Nea Plagije, uglavnom apartmani i vile, po nekoliko taverni. Mirno i blizu Solunu, ali MANJE od Nea Kalikratije — pada na kriterijumu „da im ne bude dosadno“."
 },
 "Nea Moudania": {
  "km": 61,
  "vozOko": "56 min",
  "zivost": 5,
  "tekst": "Pravi gradić (oko 10.000 ljudi), najveće naselje na ulazu u Halkidiki. Najbolji izbor restorana, kafića i radnji od svih mesta na listi, radi cele godine. Ali to je grad a ne letovalište — plaža je osrednja i nije glavna stvar mesta. Dobra baza za auto, slabije za „sedi na plaži 8 dana“."
 },
 "Paralia Katerinis": {
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "tekst": "Druga strana zaliva, Pierija, ispod Olimpa. Ogromna pešačka zona sa stotinama restorana, kafića i radnji — najveća vreva na celoj listi i tradicionalno puna naših ljudi, pa se svuda progovori srpski. Dve mane: more je plitko i manje prozirno nego na Kasandri, i hoteli su tu skoro svi noćenje s doručkom, malo ih je sa polupansionom ili all inclusive."
 },
 "Nea Fokea": {
  "km": 81,
  "vozOko": "76 min",
  "zivost": 2,
  "tekst": "Malo selo sa vizantijskom kulom na rtu i simpatičnom lučicom — lepo za oko, ali mirno i manje od Nea Kalikratije."
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
 "Pefkohori": {
  "km": 113,
  "vozOko": "107 min",
  "zivost": 5,
  "tekst": "Po karakteru gotovo isto što i Hanioti — duga plaža, živa šetnica, puno restorana i kafića. Najdalje mesto na listi. Iz njega su lepi izleti do juga poluostrva (Hruso, Loutra)."
 }
};

const HOTELI = [
 {
  "id": "viraggas-traditional-hotel",
  "hotel": "Viraggas Traditional hotel",
  "grad": "Metamorfosi",
  "mesto": "Metamorfosi",
  "km": 85,
  "vozOko": "81 min",
  "zivost": 2,
  "uMestu": false,
  "odCentraKm": 16.9,
  "kmOpis": "68–102 km",
  "zvezdice": 4,
  "ocena": 9.4,
  "brOcena": 94,
  "cene": {
   "PP": 716
  },
  "najniza": 716,
  "soba": {
   "PP": "Double Room with Terrace"
  },
  "udaljenostOdCentra": "16.9 km from Metamorfosi",
  "plazaBlizu": false,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/viraggas.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Viraggas+Traditional+hotel+Metamorfosi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Viraggas+Traditional+hotel+Metamorfosi+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.15,
  "kmOpis": "73 km",
  "zvezdice": 2,
  "ocena": 8.3,
  "brOcena": 214,
  "cene": {
   "PP": 771
  },
  "najniza": 771,
  "soba": {
   "PP": "Basic Triple Room"
  },
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
  "id": "olympus-mediterranean-boutique-hotel",
  "hotel": "Olympus Mediterranean Boutique Hotel",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 20.0,
  "kmOpis": "53–93 km",
  "zvezdice": 4,
  "ocena": 8.4,
  "brOcena": 849,
  "cene": {
   "PP": 785
  },
  "najniza": 785,
  "soba": {
   "PP": "Double or Twin Room"
  },
  "udaljenostOdCentra": "20 km from Paralia Katerinis",
  "plazaBlizu": false,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/olympus-mediterranean.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Olympus+Mediterranean+Boutique+Hotel+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Olympus+Mediterranean+Boutique+Hotel+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "coral-blue-beach-hotel-gerakini",
  "hotel": "Coral Blue Beach Hotel Gerakini",
  "grad": "Nea Moudania",
  "mesto": "Nea Moudania",
  "km": 61,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 13.2,
  "kmOpis": "48–74 km",
  "zvezdice": 3,
  "ocena": 5.5,
  "brOcena": 245,
  "cene": {
   "PP": 795,
   "AI": 1008
  },
  "najniza": 795,
  "soba": {
   "PP": "Superior Double or Twin Room",
   "AI": "Superior Double or Twin Room"
  },
  "udaljenostOdCentra": "13.2 km from Nea Moudania",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/coral-blue-beach.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Coral+Blue+Beach+Hotel+Gerakini+Nea+Moudania+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Coral+Blue+Beach+Hotel+Gerakini+Nea+Moudania+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "iris-hotel",
  "hotel": "Iris Hotel",
  "grad": "Sozopoli",
  "mesto": "Sozopoli",
  "km": 48,
  "vozOko": "47 min",
  "zivost": 2,
  "uMestu": false,
  "odCentraKm": 7.8,
  "kmOpis": "40–56 km",
  "zvezdice": 2,
  "ocena": 8.2,
  "brOcena": 152,
  "cene": {
   "PP": 813
  },
  "najniza": 813,
  "soba": {
   "PP": "Triple Room"
  },
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
    "url": "https://www.google.com/travel/search?q=Iris+Hotel+Sozopoli+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Iris+Hotel+Sozopoli+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.15,
  "kmOpis": "109 km",
  "zvezdice": 2,
  "ocena": 7.8,
  "brOcena": 357,
  "cene": {
   "PP": 837
  },
  "najniza": 837,
  "soba": {
   "PP": "Double Room with Sea or Pool View"
  },
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
  "id": "giannis-foteini",
  "hotel": "Giannis & Foteini",
  "grad": "Kallithea Halkidiki",
  "mesto": "Kalitea",
  "km": 96,
  "vozOko": "103 min",
  "zivost": 5,
  "uMestu": true,
  "odCentraKm": 2.7,
  "kmOpis": "96 km",
  "zvezdice": 1,
  "ocena": 7.5,
  "brOcena": 240,
  "cene": {
   "PP": 839
  },
  "najniza": 839,
  "soba": {
   "PP": "Double Room"
  },
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
    "url": "https://www.google.com/travel/search?q=Giannis+%26+Foteini+Kalitea+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Giannis+%26+Foteini+Kalitea+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.03,
  "kmOpis": "109 km",
  "zvezdice": 3,
  "ocena": 7.8,
  "brOcena": 116,
  "cene": {
   "PP": 856
  },
  "najniza": 856,
  "soba": {
   "PP": "Superior Double Room"
  },
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
  "id": "haris-hotel-by-diomedes-group",
  "hotel": "Haris Hotel by Diomedes Group",
  "grad": "Hanioti",
  "mesto": "Hanioti",
  "km": 109,
  "vozOko": "103 min",
  "zivost": 5,
  "uMestu": true,
  "odCentraKm": 0.9,
  "kmOpis": "109 km",
  "zvezdice": 3,
  "ocena": 6.9,
  "brOcena": 274,
  "cene": {
   "AI": 868,
   "PP": 868
  },
  "najniza": 868,
  "soba": {
   "AI": "Family Room with Terrace",
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
  "id": "hotel-vizantio",
  "hotel": "Hotel Vizantio",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": true,
  "odCentraKm": 0.15,
  "kmOpis": "73 km",
  "zvezdice": 3,
  "ocena": 9.2,
  "brOcena": 242,
  "cene": {
   "PP": 873
  },
  "najniza": 873,
  "soba": {
   "PP": "Studio Ground Floor"
  },
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
  "id": "blue-dream-poseidi",
  "hotel": "Blue Dream Poseidi",
  "grad": "Sani",
  "mesto": "Sani",
  "km": 84,
  "vozOko": "83 min",
  "zivost": 1,
  "uMestu": false,
  "odCentraKm": 15.5,
  "kmOpis": "68–100 km",
  "zvezdice": 3,
  "ocena": 9.2,
  "brOcena": 38,
  "cene": {
   "PP": 886
  },
  "najniza": 886,
  "soba": {
   "PP": "One-Bedroom Apartment"
  },
  "udaljenostOdCentra": "15.5 km from Sani Beach",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/blue-dream-poseidi.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Blue+Dream+Poseidi+Sani+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Blue+Dream+Poseidi+Sani+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "pefkon-suites",
  "hotel": "Pefkon Suites",
  "grad": "Nea Fokea",
  "mesto": "Nea Fokea",
  "km": 81,
  "vozOko": "76 min",
  "zivost": 2,
  "uMestu": true,
  "odCentraKm": 3.0,
  "kmOpis": "81 km",
  "zvezdice": null,
  "ocena": 8.4,
  "brOcena": 388,
  "cene": {
   "PP": 890
  },
  "najniza": 890,
  "soba": {
   "PP": "Double Room with Balcony and Sea View"
  },
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
    "url": "https://www.google.com/travel/search?q=Pefkon+Suites+Nea+Fokea+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Pefkon+Suites+Nea+Fokea+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.05,
  "kmOpis": "109 km",
  "zvezdice": 2,
  "ocena": 9.3,
  "brOcena": 375,
  "cene": {
   "PP": 967
  },
  "najniza": 967,
  "soba": {
   "PP": "Twin Room"
  },
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
  "id": "rahoni-cronwell-hotel-by-diomedes-group",
  "hotel": "Rahoni Cronwell Hotel by Diomedes Group",
  "grad": "Hanioti",
  "mesto": "Hanioti",
  "km": 109,
  "vozOko": "103 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 7.0,
  "kmOpis": "102–116 km",
  "zvezdice": 5,
  "ocena": 8.2,
  "brOcena": 131,
  "cene": {
   "AI": 981,
   "PP": 1083
  },
  "najniza": 981,
  "soba": {
   "AI": "Family Room",
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
    "url": "https://www.google.com/travel/search?q=Rahoni+Cronwell+Hotel+by+Diomedes+Group+Hanioti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Rahoni+Cronwell+Hotel+by+Diomedes+Group+Hanioti+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "aristotelis-hotel",
  "hotel": "Aristotelis Hotel",
  "grad": "Kriopigi",
  "mesto": "Kriopigi",
  "km": 89,
  "vozOko": "82 min",
  "zivost": 3,
  "uMestu": false,
  "odCentraKm": 8.3,
  "kmOpis": "81–97 km",
  "zvezdice": 1,
  "ocena": 7.9,
  "brOcena": 178,
  "cene": {
   "PP": 982
  },
  "najniza": 982,
  "soba": {
   "PP": "Double Room"
  },
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
    "url": "https://www.google.com/travel/search?q=Aristotelis+Hotel+Kriopigi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Aristotelis+Hotel+Kriopigi+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.3,
  "kmOpis": "113 km",
  "zvezdice": 3,
  "ocena": 7.8,
  "brOcena": 53,
  "cene": {
   "PP": 988
  },
  "najniza": 988,
  "soba": {
   "PP": "Studio (2 Adults)"
  },
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
  "id": "skion-palace-beach-hotel",
  "hotel": "Skion Palace Beach Hotel",
  "grad": "Polychrono",
  "mesto": "Polihrono",
  "km": 105,
  "vozOko": "99 min",
  "zivost": 3,
  "uMestu": false,
  "odCentraKm": 6.7,
  "kmOpis": "98–112 km",
  "zvezdice": 4,
  "ocena": 4.5,
  "brOcena": 93,
  "cene": {
   "PP": 992
  },
  "najniza": 992,
  "soba": {
   "PP": "Double Room with Garden View"
  },
  "udaljenostOdCentra": "6.7 km from Polykhrono",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/skion-palace-beach-nea-skioni.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Skion+Palace+Beach+Hotel+Polihrono+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Skion+Palace+Beach+Hotel+Polihrono+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.7,
  "kmOpis": "96 km",
  "zvezdice": 2,
  "ocena": 8.7,
  "brOcena": 281,
  "cene": {
   "PP": 994
  },
  "najniza": 994,
  "soba": {
   "PP": "Twin Room"
  },
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
  "id": "villa-cariatis",
  "hotel": "VILLA CARIATIS",
  "grad": "Sozopoli",
  "mesto": "Sozopoli",
  "km": 48,
  "vozOko": "47 min",
  "zivost": 2,
  "uMestu": false,
  "odCentraKm": 7.7,
  "kmOpis": "40–56 km",
  "zvezdice": 2,
  "ocena": 8.3,
  "brOcena": 330,
  "cene": {
   "PP": 1010
  },
  "najniza": 1010,
  "soba": {
   "PP": "Standard Double or Twin Room with Balcony"
  },
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
    "url": "https://www.google.com/travel/search?q=VILLA+CARIATIS+Sozopoli+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=VILLA+CARIATIS+Sozopoli+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "koukos-inn",
  "hotel": "Koukos Inn",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 13.9,
  "kmOpis": "59–87 km",
  "zvezdice": 3,
  "ocena": 9.2,
  "brOcena": 26,
  "cene": {
   "PP": 1018
  },
  "najniza": 1018,
  "soba": {
   "PP": "Deluxe Bungalow"
  },
  "udaljenostOdCentra": "13.9 km from Paralia Katerinis",
  "plazaBlizu": false,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/koukos-inn.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Koukos+Inn+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Koukos+Inn+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.25,
  "kmOpis": "73 km",
  "zvezdice": 3,
  "ocena": 9.6,
  "brOcena": 44,
  "cene": {
   "PP": 1021
  },
  "najniza": 1021,
  "soba": {
   "PP": "Deluxe Room"
  },
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
  "id": "theo-bungalows-boutique-hotel",
  "hotel": "Theo Bungalows Boutique Hotel",
  "grad": "Kriopigi",
  "mesto": "Kriopigi",
  "km": 89,
  "vozOko": "82 min",
  "zivost": 3,
  "uMestu": true,
  "odCentraKm": 0.6,
  "kmOpis": "89 km",
  "zvezdice": 3,
  "ocena": 8.2,
  "brOcena": 304,
  "cene": {
   "PP": 1022,
   "AI": 1022
  },
  "najniza": 1022,
  "soba": {
   "PP": "Deluxe Double Room with Sea View",
   "AI": "Deluxe Double Room with Sea View"
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
  "id": "aris",
  "hotel": "Aris",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": true,
  "odCentraKm": 0.3,
  "kmOpis": "73 km",
  "zvezdice": 2,
  "ocena": 9.6,
  "brOcena": 90,
  "cene": {
   "PP": 1023
  },
  "najniza": 1023,
  "soba": {
   "PP": "Triple Room with Garden View"
  },
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
  "id": "hotel-dias-apartment",
  "hotel": "Hotel Dias Apartment",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 16.2,
  "kmOpis": "57–89 km",
  "zvezdice": 1,
  "ocena": 8.0,
  "brOcena": 274,
  "cene": {
   "PP": 1030
  },
  "najniza": 1030,
  "soba": {
   "PP": "Suite with Sea View"
  },
  "udaljenostOdCentra": "16.2 km from Paralia Katerinis",
  "plazaBlizu": false,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/dias-makrigialos.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+Dias+Apartment+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+Dias+Apartment+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 2.3,
  "kmOpis": "73 km",
  "zvezdice": 3,
  "ocena": 9.2,
  "brOcena": 377,
  "cene": {
   "PP": 1032
  },
  "najniza": 1032,
  "soba": {
   "PP": "Economy Double Room"
  },
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
  "id": "alexandrina",
  "hotel": "Alexandrina",
  "grad": "Polychrono",
  "mesto": "Polihrono",
  "km": 105,
  "vozOko": "99 min",
  "zivost": 3,
  "uMestu": false,
  "odCentraKm": 6.6,
  "kmOpis": "98–112 km",
  "zvezdice": 4,
  "ocena": 9.7,
  "brOcena": 161,
  "cene": {
   "PP": 1046
  },
  "najniza": 1046,
  "soba": {
   "PP": "Standard Double Room"
  },
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
    "url": "https://www.google.com/travel/search?q=Alexandrina+Polihrono+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Alexandrina+Polihrono+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "parthenon-art-executive-wing-seaside-collection",
  "hotel": "Parthenon Art Executive Wing-Seaside Collection",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 3.3,
  "kmOpis": "70–76 km",
  "zvezdice": 1,
  "ocena": 9.4,
  "brOcena": 63,
  "cene": {
   "PP": 1078
  },
  "najniza": 1078,
  "soba": {
   "PP": "Superior Triple Room"
  },
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
    "url": "https://www.google.com/travel/search?q=Parthenon+Art+Executive+Wing-Seaside+Collection+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Parthenon+Art+Executive+Wing-Seaside+Collection+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "estelle-hotel",
  "hotel": "Estelle Hotel",
  "grad": "Nea Moudania",
  "mesto": "Nea Moudania",
  "km": 61,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 14.2,
  "kmOpis": "47–75 km",
  "zvezdice": 2,
  "ocena": 9.6,
  "brOcena": 65,
  "cene": {
   "PP": 1085
  },
  "najniza": 1085,
  "soba": {
   "PP": "Triple Room"
  },
  "udaljenostOdCentra": "14.2 km from Nea Moudania",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/estelle.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Estelle+Hotel+Nea+Moudania+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Estelle+Hotel+Nea+Moudania+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "melite-luxury-rooms-apartments",
  "hotel": "Melite Luxury Rooms & Apartments",
  "grad": "Pefkochori",
  "mesto": "Pefkohori",
  "km": 113,
  "vozOko": "107 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 6.8,
  "kmOpis": "106–120 km",
  "zvezdice": 4,
  "ocena": 9.3,
  "brOcena": 363,
  "cene": {
   "PP": 1090
  },
  "najniza": 1090,
  "soba": {
   "PP": "Deluxe Semi-Basement Room"
  },
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
    "url": "https://www.google.com/travel/search?q=Melite+Luxury+Rooms+%26+Apartments+Pefkohori+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Melite+Luxury+Rooms+%26+Apartments+Pefkohori+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.15,
  "kmOpis": "105 km",
  "zvezdice": 3,
  "ocena": 8.8,
  "brOcena": 266,
  "cene": {
   "PP": 1108
  },
  "najniza": 1108,
  "soba": {
   "PP": "Family Room with Bunk Bed"
  },
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
  "id": "xenios-port-marina-hotel",
  "hotel": "Xenios Port Marina Hotel",
  "grad": "Pefkochori",
  "mesto": "Pefkohori",
  "km": 113,
  "vozOko": "107 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 3.7,
  "kmOpis": "109–117 km",
  "zvezdice": 3,
  "ocena": 6.9,
  "brOcena": 276,
  "cene": {
   "AI": 1118,
   "PP": 1230
  },
  "najniza": 1118,
  "soba": {
   "AI": "Double Room with Sea View",
   "PP": "Double Room with Sea View"
  },
  "udaljenostOdCentra": "3.7 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/port-marina.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Xenios+Port+Marina+Hotel+Pefkohori+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Xenios+Port+Marina+Hotel+Pefkohori+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "loutra-beach-hotel",
  "hotel": "Loutra Beach Hotel",
  "grad": "Pefkochori",
  "mesto": "Pefkohori",
  "km": 113,
  "vozOko": "107 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 7.2,
  "kmOpis": "106–120 km",
  "zvezdice": 3,
  "ocena": 8.3,
  "brOcena": 62,
  "cene": {
   "PP": 1127
  },
  "najniza": 1127,
  "soba": {
   "PP": "Family Room"
  },
  "udaljenostOdCentra": "7.2 km from Pefkohori",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/loutra-beach-loutra-agias-paraskeues1.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Loutra+Beach+Hotel+Pefkohori+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Loutra+Beach+Hotel+Pefkohori+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "calda-resort",
  "hotel": "Calda Resort",
  "grad": "Nea Moudania",
  "mesto": "Nea Moudania",
  "km": 61,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 10.5,
  "kmOpis": "50–72 km",
  "zvezdice": 4,
  "ocena": 9.2,
  "brOcena": 270,
  "cene": {
   "PP": 1145
  },
  "najniza": 1145,
  "soba": {
   "PP": "Deluxe Quadruple Room"
  },
  "udaljenostOdCentra": "10.5 km from Nea Moudania",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/calda-resort.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Calda+Resort+Nea+Moudania+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Calda+Resort+Nea+Moudania+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 1.0,
  "kmOpis": "109 km",
  "zvezdice": 3,
  "ocena": 8.8,
  "brOcena": 201,
  "cene": {
   "PP": 1154
  },
  "najniza": 1154,
  "soba": {
   "PP": "Comfort Room with Balcony"
  },
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
  "id": "xenios-dolphin-beach-hotel",
  "hotel": "Xenios Dolphin Beach Hotel",
  "grad": "Kriopigi",
  "mesto": "Kriopigi",
  "km": 89,
  "vozOko": "82 min",
  "zivost": 3,
  "uMestu": false,
  "odCentraKm": 11.3,
  "kmOpis": "78–100 km",
  "zvezdice": 3,
  "ocena": 6.7,
  "brOcena": 219,
  "cene": {
   "PP": 1299,
   "AI": 1181
  },
  "najniza": 1181,
  "soba": {
   "PP": "Superior Double Room with Side Sea View",
   "AI": "Superior Double Room with Side Sea View"
  },
  "udaljenostOdCentra": "11.3 km from Kriopigi",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/dolphin-beach.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Xenios+Dolphin+Beach+Hotel+Kriopigi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Xenios+Dolphin+Beach+Hotel+Kriopigi+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "g-mare-boutique-hotel",
  "hotel": "G Mare Boutique Hotel",
  "grad": "Nikiti",
  "mesto": "Nikiti",
  "km": 110,
  "vozOko": "111 min",
  "zivost": 4,
  "uMestu": false,
  "odCentraKm": 17.6,
  "kmOpis": "92–128 km",
  "zvezdice": 3,
  "ocena": 9.4,
  "brOcena": 167,
  "cene": {
   "PP": 1183
  },
  "najniza": 1183,
  "soba": {
   "PP": "Standard Double Room"
  },
  "udaljenostOdCentra": "17.6 km from Nikiti",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/g-mare-boutique.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=G+Mare+Boutique+Hotel+Nikiti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=G+Mare+Boutique+Hotel+Nikiti+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.9,
  "kmOpis": "85 km",
  "zvezdice": 3,
  "ocena": 8.6,
  "brOcena": 132,
  "cene": {
   "PP": 1199
  },
  "najniza": 1199,
  "soba": {
   "PP": "Standard Twin Room (2-3 Adults)"
  },
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
  "id": "xenios-possidi-paradise-hotel",
  "hotel": "Xenios Possidi Paradise Hotel",
  "grad": "Kriopigi",
  "mesto": "Kriopigi",
  "km": 89,
  "vozOko": "82 min",
  "zivost": 3,
  "uMestu": false,
  "odCentraKm": 11.2,
  "kmOpis": "78–100 km",
  "zvezdice": 4,
  "ocena": 6.4,
  "brOcena": 160,
  "cene": {
   "AI": 1227,
   "PP": 1227
  },
  "najniza": 1227,
  "soba": {
   "AI": "Family Room No View",
   "PP": "Family Room No View"
  },
  "udaljenostOdCentra": "11.2 km from Kriopigi",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/possidi-paradise.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Xenios+Possidi+Paradise+Hotel+Kriopigi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Xenios+Possidi+Paradise+Hotel+Kriopigi+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.7,
  "kmOpis": "73 km",
  "zvezdice": 3,
  "ocena": 9.7,
  "brOcena": 201,
  "cene": {
   "PP": 1230
  },
  "najniza": 1230,
  "soba": {
   "PP": "Superior Family Room"
  },
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
  "id": "sunway-hotel",
  "hotel": "Sunway Hotel",
  "grad": "Kallithea Halkidiki",
  "mesto": "Kalitea",
  "km": 96,
  "vozOko": "103 min",
  "zivost": 5,
  "uMestu": true,
  "odCentraKm": 0.6,
  "kmOpis": "96 km",
  "zvezdice": null,
  "ocena": 8.5,
  "brOcena": 131,
  "cene": {
   "PP": 1237
  },
  "najniza": 1237,
  "soba": {
   "PP": "Economy Twin Room"
  },
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
  "id": "blue-sea-boutique-apartments",
  "hotel": "Blue Sea Boutique Apartments",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 3.2,
  "kmOpis": "70–76 km",
  "zvezdice": 3,
  "ocena": 8.2,
  "brOcena": 26,
  "cene": {
   "PP": 1237
  },
  "najniza": 1237,
  "soba": {
   "PP": "Deluxe Triple Room"
  },
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
    "url": "https://www.google.com/travel/search?q=Blue+Sea+Boutique+Apartments+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Blue+Sea+Boutique+Apartments+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "hotel-sweet-home",
  "hotel": "Hotel Sweet Home",
  "grad": "Nikiti",
  "mesto": "Nikiti",
  "km": 110,
  "vozOko": "111 min",
  "zivost": 4,
  "uMestu": false,
  "odCentraKm": 17.2,
  "kmOpis": "93–127 km",
  "zvezdice": 4,
  "ocena": 9.3,
  "brOcena": 259,
  "cene": {
   "PP": 1256
  },
  "najniza": 1256,
  "soba": {
   "PP": "Deluxe Double or Twin Room"
  },
  "udaljenostOdCentra": "17.2 km from Nikiti",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/hotel-sweet-home.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+Sweet+Home+Nikiti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+Sweet+Home+Nikiti+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "simon-king",
  "hotel": "Simon King",
  "grad": "Nikiti",
  "mesto": "Nikiti",
  "km": 110,
  "vozOko": "111 min",
  "zivost": 4,
  "uMestu": false,
  "odCentraKm": 11.6,
  "kmOpis": "98–122 km",
  "zvezdice": 3,
  "ocena": 8.1,
  "brOcena": 301,
  "cene": {
   "PP": 1258
  },
  "najniza": 1258,
  "soba": {
   "PP": "One-Bedroom Apartment (5 Adults) - Ground Floor"
  },
  "udaljenostOdCentra": "11.6 km from Nikiti",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/simon-king.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Simon+King+Nikiti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Simon+King+Nikiti+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.25,
  "kmOpis": "109 km",
  "zvezdice": 3,
  "ocena": 8.7,
  "brOcena": 340,
  "cene": {
   "PP": 1273
  },
  "najniza": 1273,
  "soba": {
   "PP": "Twin Room"
  },
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
  "id": "arya-hotel",
  "hotel": "Arya Hotel",
  "grad": "Hanioti",
  "mesto": "Hanioti",
  "km": 109,
  "vozOko": "103 min",
  "zivost": 5,
  "uMestu": true,
  "odCentraKm": 0.8,
  "kmOpis": "109 km",
  "zvezdice": 3,
  "ocena": 8.6,
  "brOcena": 448,
  "cene": {
   "AI": 1278,
   "PP": 1406
  },
  "najniza": 1278,
  "soba": {
   "AI": "Deluxe Double Room",
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
  "id": "aloni-hotel-pefkochori",
  "hotel": "Aloni Hotel Pefkochori",
  "grad": "Pefkochori",
  "mesto": "Pefkohori",
  "km": 113,
  "vozOko": "107 min",
  "zivost": 5,
  "uMestu": true,
  "odCentraKm": 0.6,
  "kmOpis": "113 km",
  "zvezdice": 4,
  "ocena": 8.5,
  "brOcena": 335,
  "cene": {
   "PP": 1283
  },
  "najniza": 1283,
  "soba": {
   "PP": "Superior Triple Room"
  },
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
  "id": "isalos-gerakini",
  "hotel": "ISALOS GERAKiNi",
  "grad": "Metamorfosi",
  "mesto": "Metamorfosi",
  "km": 85,
  "vozOko": "81 min",
  "zivost": 2,
  "uMestu": false,
  "odCentraKm": 13.7,
  "kmOpis": "71–99 km",
  "zvezdice": null,
  "ocena": 9.5,
  "brOcena": 147,
  "cene": {
   "PP": 1284
  },
  "najniza": 1284,
  "soba": {
   "PP": "Family Studio"
  },
  "udaljenostOdCentra": "13.7 km from Metamorfosi",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/isalos-paralia-gerakinis.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=ISALOS+GERAKiNi+Metamorfosi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=ISALOS+GERAKiNi+Metamorfosi+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "stratos-hotel",
  "hotel": "Stratos Hotel",
  "grad": "Kallithea Halkidiki",
  "mesto": "Kalitea",
  "km": 96,
  "vozOko": "103 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 3.1,
  "kmOpis": "93–99 km",
  "zvezdice": 3,
  "ocena": 9.1,
  "brOcena": 383,
  "cene": {
   "PP": 1312
  },
  "najniza": 1312,
  "soba": {
   "PP": "Family Suite"
  },
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
    "url": "https://www.google.com/travel/search?q=Stratos+Hotel+Kalitea+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Stratos+Hotel+Kalitea+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "lagaria-hotel",
  "hotel": "Lagaria Hotel",
  "grad": "Kallithea Halkidiki",
  "mesto": "Kalitea",
  "km": 96,
  "vozOko": "103 min",
  "zivost": 5,
  "uMestu": true,
  "odCentraKm": 2.6,
  "kmOpis": "96 km",
  "zvezdice": 4,
  "ocena": 8.9,
  "brOcena": 652,
  "cene": {
   "PP": 1319
  },
  "najniza": 1319,
  "soba": {
   "PP": "Flexible Room"
  },
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
    "url": "https://www.google.com/travel/search?q=Lagaria+Hotel+Kalitea+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Lagaria+Hotel+Kalitea+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.7,
  "kmOpis": "73 km",
  "zvezdice": 4,
  "ocena": 9.0,
  "brOcena": 201,
  "cene": {
   "PP": 1321
  },
  "najniza": 1321,
  "soba": {
   "PP": "Triple Room"
  },
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
  "id": "meli-boutique-afitos",
  "hotel": "Meli Boutique Afitos",
  "grad": "Kallithea Halkidiki",
  "mesto": "Kalitea",
  "km": 96,
  "vozOko": "103 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 3.3,
  "kmOpis": "93–99 km",
  "zvezdice": 3,
  "ocena": 9.5,
  "brOcena": 75,
  "cene": {
   "PP": 1325
  },
  "najniza": 1325,
  "soba": {
   "PP": "Deluxe Double Room"
  },
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
    "url": "https://www.google.com/travel/search?q=Meli+Boutique+Afitos+Kalitea+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Meli+Boutique+Afitos+Kalitea+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "angelina-hotel",
  "hotel": "Angelina Hotel",
  "grad": "Nikiti",
  "mesto": "Nikiti",
  "km": 110,
  "vozOko": "111 min",
  "zivost": 4,
  "uMestu": false,
  "odCentraKm": 5.5,
  "kmOpis": "104–116 km",
  "zvezdice": 2,
  "ocena": 8.1,
  "brOcena": 131,
  "cene": {
   "PP": 1350
  },
  "najniza": 1350,
  "soba": {
   "PP": "Triple Room with Garden View"
  },
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
    "url": "https://www.google.com/travel/search?q=Angelina+Hotel+Nikiti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Angelina+Hotel+Nikiti+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.7,
  "kmOpis": "113 km",
  "zvezdice": 3,
  "ocena": 9.3,
  "brOcena": 504,
  "cene": {
   "PP": 1360
  },
  "najniza": 1360,
  "soba": {
   "PP": "Superior Double Room with Garden View"
  },
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
  "id": "alterra-vita",
  "hotel": "Alterra Vita",
  "grad": "Nikiti",
  "mesto": "Nikiti",
  "km": 110,
  "vozOko": "111 min",
  "zivost": 4,
  "uMestu": false,
  "odCentraKm": 16.1,
  "kmOpis": "94–126 km",
  "zvezdice": 3,
  "ocena": 9.6,
  "brOcena": 55,
  "cene": {
   "PP": 1362
  },
  "najniza": 1362,
  "soba": {
   "PP": "Double Room"
  },
  "udaljenostOdCentra": "16.1 km from Nikiti",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/alterra-vita.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Alterra+Vita+Nikiti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Alterra+Vita+Nikiti+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.15,
  "kmOpis": "105 km",
  "zvezdice": 4,
  "ocena": 7.9,
  "brOcena": 193,
  "cene": {
   "PP": 1370
  },
  "najniza": 1370,
  "soba": {
   "PP": "Classic One-Bedroom Suite"
  },
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
  "id": "georgalas-sun-beach-resort",
  "hotel": "Georgalas Sun Beach Resort",
  "grad": "Sozopoli",
  "mesto": "Sozopoli",
  "km": 48,
  "vozOko": "47 min",
  "zivost": 2,
  "uMestu": false,
  "odCentraKm": 4.4,
  "kmOpis": "44–52 km",
  "zvezdice": 3,
  "ocena": 8.9,
  "brOcena": 824,
  "cene": {
   "PP": 1386
  },
  "najniza": 1386,
  "soba": {
   "PP": "Superior Double Room"
  },
  "udaljenostOdCentra": "4.4 km from Sozopoli",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/georgalas-chalkidiki.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Georgalas+Sun+Beach+Resort+Sozopoli+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Georgalas+Sun+Beach+Resort+Sozopoli+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.25,
  "kmOpis": "73 km",
  "zvezdice": 3,
  "ocena": 9.0,
  "brOcena": 392,
  "cene": {
   "PP": 1400
  },
  "najniza": 1400,
  "soba": {
   "PP": "Triple Room with Side Seaview and Square view"
  },
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
  "id": "xenios-anastasia-resort-spa",
  "hotel": "Xenios Anastasia Resort & Spa",
  "grad": "Polychrono",
  "mesto": "Polihrono",
  "km": 105,
  "vozOko": "99 min",
  "zivost": 3,
  "uMestu": false,
  "odCentraKm": 6.6,
  "kmOpis": "98–112 km",
  "zvezdice": 5,
  "ocena": 6.0,
  "brOcena": 228,
  "cene": {
   "AI": 1405,
   "PP": 1538
  },
  "najniza": 1405,
  "soba": {
   "AI": "Double Room Limited Mountain View",
   "PP": "Double Room Limited Mountain View"
  },
  "udaljenostOdCentra": "6.6 km from Polykhrono",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/anastasia-resort-amp-spa.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Xenios+Anastasia+Resort+%26+Spa+Polihrono+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Xenios+Anastasia+Resort+%26+Spa+Polihrono+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 1.0,
  "kmOpis": "85 km",
  "zvezdice": 3,
  "ocena": 9.6,
  "brOcena": 134,
  "cene": {
   "PP": 1417,
   "AI": 1417
  },
  "najniza": 1417,
  "soba": {
   "PP": "One-Bedroom Apartment (2 - 4 Adults)",
   "AI": "One-Bedroom Apartment (2 - 4 Adults)"
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
  "id": "hotel-paradise",
  "hotel": "Hotel Paradise",
  "grad": "Kriopigi",
  "mesto": "Kriopigi",
  "km": 89,
  "vozOko": "82 min",
  "zivost": 3,
  "uMestu": true,
  "odCentraKm": 1.3,
  "kmOpis": "89 km",
  "zvezdice": 3,
  "ocena": 8.2,
  "brOcena": 229,
  "cene": {
   "PP": 1440,
   "AI": 1440
  },
  "najniza": 1440,
  "soba": {
   "PP": "Quadruple Room with Sea View",
   "AI": "Quadruple Room with Sea View"
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
  "id": "falena-luxury-rooms",
  "hotel": "Falena Luxury Rooms",
  "grad": "Nea Moudania",
  "mesto": "Nea Moudania",
  "km": 61,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 10.8,
  "kmOpis": "50–72 km",
  "zvezdice": 4,
  "ocena": 9.5,
  "brOcena": 131,
  "cene": {
   "PP": 1444
  },
  "najniza": 1444,
  "soba": {
   "PP": "Double Room"
  },
  "udaljenostOdCentra": "10.8 km from Nea Moudania",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/falena-luxury-rooms.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Falena+Luxury+Rooms+Nea+Moudania+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Falena+Luxury+Rooms+Nea+Moudania+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.9,
  "kmOpis": "73 km",
  "zvezdice": 4,
  "ocena": 8.6,
  "brOcena": 426,
  "cene": {
   "PP": 1444,
   "AI": 1743
  },
  "najniza": 1444,
  "soba": {
   "PP": "Family Room",
   "AI": "Family Room"
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
  "id": "hotel-villa-sevasti",
  "hotel": "Hotel Villa Sevasti",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 10.8,
  "kmOpis": "62–84 km",
  "zvezdice": 4,
  "ocena": 9.4,
  "brOcena": 74,
  "cene": {
   "PP": 1463
  },
  "najniza": 1463,
  "soba": {
   "PP": "Deluxe Triple Room with Sea View"
  },
  "udaljenostOdCentra": "10.8 km from Paralia Katerinis",
  "plazaBlizu": false,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/villa-sevasti.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+Villa+Sevasti+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+Villa+Sevasti+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.2,
  "kmOpis": "85 km",
  "zvezdice": 3,
  "ocena": 7.9,
  "brOcena": 44,
  "cene": {
   "PP": 1496,
   "AI": 1496
  },
  "najniza": 1496,
  "soba": {
   "PP": "One-Bedroom Family Apartment",
   "AI": "One-Bedroom Family Apartment"
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
  "id": "possidi-hiliadou-boutique-resort",
  "hotel": "Possidi Hiliadou Boutique Resort",
  "grad": "Sani",
  "mesto": "Sani",
  "km": 84,
  "vozOko": "83 min",
  "zivost": 1,
  "uMestu": false,
  "odCentraKm": 14.3,
  "kmOpis": "70–98 km",
  "zvezdice": 4,
  "ocena": 9.6,
  "brOcena": 90,
  "cene": {
   "PP": 1496
  },
  "najniza": 1496,
  "soba": {
   "PP": "Deluxe Family Room"
  },
  "udaljenostOdCentra": "14.3 km from Sani Beach",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/possidi-hiliadou.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Possidi+Hiliadou+Boutique+Resort+Sani+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Possidi+Hiliadou+Boutique+Resort+Sani+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.35,
  "kmOpis": "113 km",
  "zvezdice": 3,
  "ocena": 8.9,
  "brOcena": 644,
  "cene": {
   "PP": 1506
  },
  "najniza": 1506,
  "soba": {
   "PP": "Family Room with Bathroom"
  },
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
  "id": "aqua-mare-luxury-apartments",
  "hotel": "Aqua Mare Luxury Apartments",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": true,
  "odCentraKm": 0.7,
  "kmOpis": "73 km",
  "zvezdice": 4,
  "ocena": 9.6,
  "brOcena": 278,
  "cene": {
   "PP": 1516
  },
  "najniza": 1516,
  "soba": {
   "PP": "Double Room"
  },
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
  "id": "zoi-girni-seaside-hotel",
  "hotel": "ZOI Girni - Seaside Hotel",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 3.1,
  "kmOpis": "70–76 km",
  "zvezdice": 3,
  "ocena": 9.0,
  "brOcena": 47,
  "cene": {
   "PP": 1535,
   "AI": 1767
  },
  "najniza": 1535,
  "soba": {
   "PP": "Suite with Sea View",
   "AI": "Suite with Sea View"
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
    "url": "https://www.google.com/travel/search?q=ZOI+Girni+-+Seaside+Hotel+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=ZOI+Girni+-+Seaside+Hotel+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "krotiri-resort",
  "hotel": "Krotiri Resort",
  "grad": "Nikiti",
  "mesto": "Nikiti",
  "km": 110,
  "vozOko": "111 min",
  "zivost": 4,
  "uMestu": false,
  "odCentraKm": 7.6,
  "kmOpis": "102–118 km",
  "zvezdice": 5,
  "ocena": 8.8,
  "brOcena": 208,
  "cene": {
   "PP": 1570
  },
  "najniza": 1570,
  "soba": {
   "PP": "Superior Double Room"
  },
  "udaljenostOdCentra": "7.6 km from Nikiti",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/krotiri-resort.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Krotiri+Resort+Nikiti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Krotiri+Resort+Nikiti+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "evripidis-hotel-afitos",
  "hotel": "Evripidis Hotel Afitos",
  "grad": "Kallithea Halkidiki",
  "mesto": "Kalitea",
  "km": 96,
  "vozOko": "103 min",
  "zivost": 5,
  "uMestu": true,
  "odCentraKm": 0.9,
  "kmOpis": "96 km",
  "zvezdice": 1,
  "ocena": 9.2,
  "brOcena": 84,
  "cene": {
   "PP": 1578
  },
  "najniza": 1578,
  "soba": {
   "PP": "One-Bedroom Apartment with Balcony and Sea View"
  },
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
    "url": "https://www.google.com/travel/search?q=Evripidis+Hotel+Afitos+Kalitea+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Evripidis+Hotel+Afitos+Kalitea+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "athos-cape",
  "hotel": "ATHOS CAPE",
  "grad": "Nikiti",
  "mesto": "Nikiti",
  "km": 110,
  "vozOko": "111 min",
  "zivost": 4,
  "uMestu": false,
  "odCentraKm": 13.1,
  "kmOpis": "97–123 km",
  "zvezdice": 3,
  "ocena": 8.8,
  "brOcena": 119,
  "cene": {
   "PP": 1589
  },
  "najniza": 1589,
  "soba": {
   "PP": "Studio with Sea View"
  },
  "udaljenostOdCentra": "13.1 km from Nikiti",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/athos-cape.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=ATHOS+CAPE+Nikiti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=ATHOS+CAPE+Nikiti+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.1,
  "kmOpis": "89 km",
  "zvezdice": 4,
  "ocena": 8.8,
  "brOcena": 164,
  "cene": {
   "PP": 1605
  },
  "najniza": 1605,
  "soba": {
   "PP": "Superior Double Room"
  },
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
  "id": "old-nikiti-s-hotel",
  "hotel": "Old Nikiti's Hotel",
  "grad": "Nikiti",
  "mesto": "Nikiti",
  "km": 110,
  "vozOko": "111 min",
  "zivost": 4,
  "uMestu": true,
  "odCentraKm": 0.4,
  "kmOpis": "110 km",
  "zvezdice": 2,
  "ocena": 9.0,
  "brOcena": 110,
  "cene": {
   "PP": 1666
  },
  "najniza": 1666,
  "soba": {
   "PP": "Quadruple Room with Balcony"
  },
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
  "id": "palm-boutique-suites",
  "hotel": "Palm Boutique Suites",
  "grad": "Pefkochori",
  "mesto": "Pefkohori",
  "km": 113,
  "vozOko": "107 min",
  "zivost": 5,
  "uMestu": true,
  "odCentraKm": 0.35,
  "kmOpis": "113 km",
  "zvezdice": 2,
  "ocena": 9.5,
  "brOcena": 205,
  "cene": {
   "PP": 1683
  },
  "najniza": 1683,
  "soba": {
   "PP": "One-Bedroom Apartment with Spa Bath"
  },
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
  "id": "avatel-eco-lodge",
  "hotel": "Avatel Eco Lodge",
  "grad": "Kriopigi",
  "mesto": "Kriopigi",
  "km": 89,
  "vozOko": "82 min",
  "zivost": 3,
  "uMestu": true,
  "odCentraKm": 1.3,
  "kmOpis": "89 km",
  "zvezdice": 4,
  "ocena": 9.0,
  "brOcena": 356,
  "cene": {
   "PP": 1709
  },
  "najniza": 1709,
  "soba": {
   "PP": "Deluxe Family Room"
  },
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
  "id": "olympiada-girni-suites",
  "hotel": "OLYMPIADA GIRNI Suites",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 4.4,
  "kmOpis": "69–77 km",
  "zvezdice": 3,
  "ocena": 8.4,
  "brOcena": 85,
  "cene": {
   "PP": 1710
  },
  "najniza": 1710,
  "soba": {
   "PP": "Superior Studio"
  },
  "udaljenostOdCentra": "4.4 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/olympiada-girni-suites.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=OLYMPIADA+GIRNI+Suites+Paralia+Katerinis+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=OLYMPIADA+GIRNI+Suites+Paralia+Katerinis+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.45,
  "kmOpis": "105 km",
  "zvezdice": 4,
  "ocena": 8.5,
  "brOcena": 843,
  "cene": {
   "AI": 1735,
   "PP": 1907
  },
  "najniza": 1735,
  "soba": {
   "AI": "Double Room",
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
  "id": "domus-hospitality",
  "hotel": "domus hospitality",
  "grad": "Nikiti",
  "mesto": "Nikiti",
  "km": 110,
  "vozOko": "111 min",
  "zivost": 4,
  "uMestu": false,
  "odCentraKm": 9.9,
  "kmOpis": "100–120 km",
  "zvezdice": 4,
  "ocena": 9.3,
  "brOcena": 442,
  "cene": {
   "PP": 1804
  },
  "najniza": 1804,
  "soba": {
   "PP": "One-Bedroom Apartment"
  },
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
    "url": "https://www.google.com/travel/search?q=domus+hospitality+Nikiti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=domus+hospitality+Nikiti+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 1.1,
  "kmOpis": "89 km",
  "zvezdice": 4,
  "ocena": 8.9,
  "brOcena": 319,
  "cene": {
   "PP": 1806
  },
  "najniza": 1806,
  "soba": {
   "PP": "Two-Bedroom Family Apartment"
  },
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
  "id": "mirror-hotel",
  "hotel": "Mirror Hotel",
  "grad": "Polychrono",
  "mesto": "Polihrono",
  "km": 105,
  "vozOko": "99 min",
  "zivost": 3,
  "uMestu": true,
  "odCentraKm": 0.05,
  "kmOpis": "105 km",
  "zvezdice": 4,
  "ocena": 9.4,
  "brOcena": 424,
  "cene": {
   "AI": 2070,
   "PP": 1809
  },
  "najniza": 1809,
  "soba": {
   "AI": "Deluxe Double Room (2 Adults + 1 Child)",
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
  "id": "coco-ns-suites-villas-fourka",
  "hotel": "Cocoοns Suites & Villas Fourka",
  "grad": "Kallithea Halkidiki",
  "mesto": "Kalitea",
  "km": 96,
  "vozOko": "103 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 9.7,
  "kmOpis": "86–106 km",
  "zvezdice": null,
  "ocena": 9.2,
  "brOcena": 528,
  "cene": {
   "PP": 1837
  },
  "najniza": 1837,
  "soba": {
   "PP": "Junior Suite with Balcony"
  },
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
    "url": "https://www.google.com/travel/search?q=Coco%CE%BFns+Suites+%26+Villas+Fourka+Kalitea+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Coco%CE%BFns+Suites+%26+Villas+Fourka+Kalitea+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.05,
  "kmOpis": "85 km",
  "zvezdice": 3,
  "ocena": 8.4,
  "brOcena": 522,
  "cene": {
   "AI": 1868,
   "PP": 1888
  },
  "najniza": 1868,
  "soba": {
   "AI": "Double or Twin Room",
   "PP": "Standard Family Room"
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
  "id": "laguna-resort-by-diomedes-group",
  "hotel": "Laguna Resort by Diomedes Group",
  "grad": "Hanioti",
  "mesto": "Hanioti",
  "km": 109,
  "vozOko": "103 min",
  "zivost": 5,
  "uMestu": true,
  "odCentraKm": 1.9,
  "kmOpis": "109 km",
  "zvezdice": null,
  "ocena": 8.7,
  "brOcena": 180,
  "cene": {
   "AI": 1888,
   "PP": 2082
  },
  "najniza": 1888,
  "soba": {
   "AI": "Superior Double Room",
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
  "id": "sani-polyastron-hotel-spa",
  "hotel": "Sani Polyastron Hotel & Spa",
  "grad": "Sani",
  "mesto": "Sani",
  "km": 84,
  "vozOko": "83 min",
  "zivost": 1,
  "uMestu": true,
  "odCentraKm": 1.1,
  "kmOpis": "84 km",
  "zvezdice": 4,
  "ocena": 9.2,
  "brOcena": 214,
  "cene": {
   "PP": 1945
  },
  "najniza": 1945,
  "soba": {
   "PP": "Deluxe Suite"
  },
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
  "id": "akteon-girni",
  "hotel": "AKTEON GIRNI",
  "grad": "Paralia Katerinis",
  "mesto": "Paralia Katerinis",
  "km": 73,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": true,
  "odCentraKm": 0.35,
  "kmOpis": "73 km",
  "zvezdice": 3,
  "ocena": 9.4,
  "brOcena": 368,
  "cene": {
   "PP": 1951
  },
  "najniza": 1951,
  "soba": {
   "PP": "Family Room with Sea View"
  },
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
  "id": "villa-askamnia-and-suites",
  "hotel": "Villa Askamnia and Suites",
  "grad": "Metamorfosi",
  "mesto": "Metamorfosi",
  "km": 85,
  "vozOko": "81 min",
  "zivost": 2,
  "uMestu": true,
  "odCentraKm": 0.6,
  "kmOpis": "85 km",
  "zvezdice": 4,
  "ocena": 9.4,
  "brOcena": 83,
  "cene": {
   "PP": 1961
  },
  "najniza": 1961,
  "soba": {
   "PP": "Junior Suite with Pool View"
  },
  "udaljenostOdCentra": "0.6 km from Metamorfosi",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/villa-askamnia.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Villa+Askamnia+and+Suites+Metamorfosi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Villa+Askamnia+and+Suites+Metamorfosi+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.5,
  "kmOpis": "105 km",
  "zvezdice": 4,
  "ocena": 8.6,
  "brOcena": 155,
  "cene": {
   "AI": 1967,
   "PP": 1967
  },
  "najniza": 1967,
  "soba": {
   "AI": "Family Room",
   "PP": "Family Room"
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
  "id": "terra-olivia-luxury-villas-and-suites",
  "hotel": "Terra Olivia Luxury Villas and Suites",
  "grad": "Pefkochori",
  "mesto": "Pefkohori",
  "km": 113,
  "vozOko": "107 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 6.4,
  "kmOpis": "107–119 km",
  "zvezdice": 4,
  "ocena": 9.5,
  "brOcena": 182,
  "cene": {
   "PP": 2038
  },
  "najniza": 2038,
  "soba": {
   "PP": "One-Bedroom Villa"
  },
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
    "url": "https://www.google.com/travel/search?q=Terra+Olivia+Luxury+Villas+and+Suites+Pefkohori+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Terra+Olivia+Luxury+Villas+and+Suites+Pefkohori+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "elinotel-sermilia-resort",
  "hotel": "Elinotel Sermilia Resort",
  "grad": "Metamorfosi",
  "mesto": "Metamorfosi",
  "km": 85,
  "vozOko": "81 min",
  "zivost": 2,
  "uMestu": false,
  "odCentraKm": 9.7,
  "kmOpis": "75–95 km",
  "zvezdice": 5,
  "ocena": 8.2,
  "brOcena": 313,
  "cene": {
   "PP": 2063
  },
  "najniza": 2063,
  "soba": {
   "PP": "Budget Double Room"
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
    "url": "https://www.google.com/travel/search?q=Elinotel+Sermilia+Resort+Metamorfosi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Elinotel+Sermilia+Resort+Metamorfosi+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.5,
  "kmOpis": "109 km",
  "zvezdice": 5,
  "ocena": 7.7,
  "brOcena": 347,
  "cene": {
   "AI": 2077,
   "PP": 2280
  },
  "najniza": 2077,
  "soba": {
   "AI": "Double Room with Garden View",
   "PP": "Double Room with Garden View"
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
  "id": "secret-paradise-hotel-spa",
  "hotel": "Secret Paradise Hotel & Spa",
  "grad": "Sozopoli",
  "mesto": "Sozopoli",
  "km": 48,
  "vozOko": "47 min",
  "zivost": 2,
  "uMestu": false,
  "odCentraKm": 7.5,
  "kmOpis": "40–56 km",
  "zvezdice": 4,
  "ocena": 9.2,
  "brOcena": 525,
  "cene": {
   "PP": 2152
  },
  "najniza": 2152,
  "soba": {
   "PP": "Standard Family Room"
  },
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
    "url": "https://www.google.com/travel/search?q=Secret+Paradise+Hotel+%26+Spa+Sozopoli+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Secret+Paradise+Hotel+%26+Spa+Sozopoli+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 2.1,
  "kmOpis": "84 km",
  "zvezdice": 4,
  "ocena": 9.6,
  "brOcena": 345,
  "cene": {
   "PP": 2177
  },
  "najniza": 2177,
  "soba": {
   "PP": "Superior Apartment"
  },
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
  "id": "kyma-boutique",
  "hotel": "ĪKYMA Boutique",
  "grad": "Polychrono",
  "mesto": "Polihrono",
  "km": 105,
  "vozOko": "99 min",
  "zivost": 3,
  "uMestu": true,
  "odCentraKm": 3.0,
  "kmOpis": "105 km",
  "zvezdice": null,
  "ocena": 8.1,
  "brOcena": 514,
  "cene": {
   "PP": 2182
  },
  "najniza": 2182,
  "soba": {
   "PP": "Double Room with Pool View"
  },
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
  "id": "lagaria-apartments",
  "hotel": "Lagaria Apartments",
  "grad": "Kallithea Halkidiki",
  "mesto": "Kalitea",
  "km": 96,
  "vozOko": "103 min",
  "zivost": 5,
  "uMestu": true,
  "odCentraKm": 2.6,
  "kmOpis": "96 km",
  "zvezdice": 4,
  "ocena": 9.0,
  "brOcena": 85,
  "cene": {
   "PP": 2376
  },
  "najniza": 2376,
  "soba": {
   "PP": "Two-Bedroom Apartment"
  },
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
    "url": "https://www.google.com/travel/search?q=Lagaria+Apartments+Kalitea+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Lagaria+Apartments+Kalitea+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 1.4,
  "kmOpis": "105 km",
  "zvezdice": 4,
  "ocena": 9.6,
  "brOcena": 67,
  "cene": {
   "PP": 2440
  },
  "najniza": 2440,
  "soba": {
   "PP": "Superior Executive Suite"
  },
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
  "id": "porfi-beach-hotel",
  "hotel": "Porfi Beach Hotel",
  "grad": "Metamorfosi",
  "mesto": "Metamorfosi",
  "km": 85,
  "vozOko": "81 min",
  "zivost": 2,
  "uMestu": true,
  "odCentraKm": 2.4,
  "kmOpis": "85 km",
  "zvezdice": 3,
  "ocena": 8.4,
  "brOcena": 648,
  "cene": {
   "AI": 2769,
   "PP": 2479
  },
  "najniza": 2479,
  "soba": {
   "AI": "Family Suite",
   "PP": "Family Suite"
  },
  "udaljenostOdCentra": "2.4 km from Metamorfosi",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/porfi-beach.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Porfi+Beach+Hotel+Metamorfosi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Porfi+Beach+Hotel+Metamorfosi+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 1.0,
  "kmOpis": "109 km",
  "zvezdice": 5,
  "ocena": 9.2,
  "brOcena": 23,
  "cene": {
   "AI": 3358,
   "PP": 2510
  },
  "najniza": 2510,
  "soba": {
   "AI": "Sea View Horizon Retreat",
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
  "id": "ostria-sea-side-hotel",
  "hotel": "Ostria Sea Side Hotel",
  "grad": "Hanioti",
  "mesto": "Hanioti",
  "km": 109,
  "vozOko": "103 min",
  "zivost": 5,
  "uMestu": true,
  "odCentraKm": 0.3,
  "kmOpis": "109 km",
  "zvezdice": 4,
  "ocena": 9.3,
  "brOcena": 427,
  "cene": {
   "PP": 2702
  },
  "najniza": 2702,
  "soba": {
   "PP": "FAMILY SUITE GARDEN VIEW"
  },
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
  "id": "philoxenia-hotel",
  "hotel": "Philoxenia Hotel",
  "grad": "Metamorfosi",
  "mesto": "Metamorfosi",
  "km": 85,
  "vozOko": "81 min",
  "zivost": 2,
  "uMestu": false,
  "odCentraKm": 10.1,
  "kmOpis": "75–95 km",
  "zvezdice": 4,
  "ocena": 8.8,
  "brOcena": 203,
  "cene": {
   "PP": 2834,
   "AI": 2979
  },
  "najniza": 2834,
  "soba": {
   "PP": "Junior Suite with Garden View",
   "AI": "Suite with Private Pool"
  },
  "udaljenostOdCentra": "10.1 km from Metamorfosi",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/philoxenia-bungalows.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Philoxenia+Hotel+Metamorfosi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Philoxenia+Hotel+Metamorfosi+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 0.4,
  "kmOpis": "113 km",
  "zvezdice": 4,
  "ocena": 9.2,
  "brOcena": 211,
  "cene": {
   "PP": 2944
  },
  "najniza": 2944,
  "soba": {
   "PP": "Superior Two-Bedroom Apartment"
  },
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
  "id": "home-for-8-in-sane-greece",
  "hotel": "Home for 8 in Sane, Greece",
  "grad": "Sani",
  "mesto": "Sani",
  "km": 84,
  "vozOko": "83 min",
  "zivost": 1,
  "uMestu": true,
  "odCentraKm": 1.2,
  "kmOpis": "84 km",
  "zvezdice": null,
  "ocena": 1.0,
  "brOcena": 1,
  "cene": {
   "PP": 3061
  },
  "najniza": 3061,
  "soba": {
   "PP": "Villa"
  },
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
 },
 {
  "id": "acrotel-athena-pallas-residence",
  "hotel": "Acrotel Athena Pallas & Residence",
  "grad": "Nikiti",
  "mesto": "Nikiti",
  "km": 110,
  "vozOko": "111 min",
  "zivost": 4,
  "uMestu": false,
  "odCentraKm": 8.4,
  "kmOpis": "102–118 km",
  "zvezdice": 5,
  "ocena": 9.2,
  "brOcena": 520,
  "cene": {
   "PP": 3170,
   "AI": 3686
  },
  "najniza": 3170,
  "soba": {
   "PP": "Maisonette Front Pool",
   "AI": "Maisonette Front Pool"
  },
  "udaljenostOdCentra": "8.4 km from Nikiti",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/athena-pallas-village.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Acrotel+Athena+Pallas+%26+Residence+Nikiti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Acrotel+Athena+Pallas+%26+Residence+Nikiti+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 1.7,
  "kmOpis": "85 km",
  "zvezdice": 4,
  "ocena": 7.6,
  "brOcena": 58,
  "cene": {
   "PP": 3347
  },
  "najniza": 3347,
  "soba": {
   "PP": "Apartment - Split Level"
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
 },
 {
  "id": "medite-kassandra-resort",
  "hotel": "Medite Kassandra Resort",
  "grad": "Nea Moudania",
  "mesto": "Nea Moudania",
  "km": 61,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 3.6,
  "kmOpis": "57–65 km",
  "zvezdice": 5,
  "ocena": 6.0,
  "brOcena": 1,
  "cene": {
   "PP": 3824,
   "AI": 3824
  },
  "najniza": 3824,
  "soba": {
   "PP": "Double Room with Pool View",
   "AI": "Double Room with Pool View"
  },
  "udaljenostOdCentra": "3.6 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/medite-kassandra-resort.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Medite+Kassandra+Resort+Nea+Moudania+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Medite+Kassandra+Resort+Nea+Moudania+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "blue-lagoon-queen",
  "hotel": "Blue Lagoon Queen",
  "grad": "Nea Moudania",
  "mesto": "Nea Moudania",
  "km": 61,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 9.8,
  "kmOpis": "51–71 km",
  "zvezdice": null,
  "ocena": 9.0,
  "brOcena": 236,
  "cene": {
   "PP": 3875
  },
  "najniza": 3875,
  "soba": {
   "PP": "Family Room with Private Bathroom"
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
    "url": "https://www.google.com/travel/search?q=Blue+Lagoon+Queen+Nea+Moudania+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Blue+Lagoon+Queen+Nea+Moudania+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "sea-coast-resort-halkidiki",
  "hotel": "Sea Coast Resort Halkidiki",
  "grad": "Nea Moudania",
  "mesto": "Nea Moudania",
  "km": 61,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 13.6,
  "kmOpis": "47–75 km",
  "zvezdice": 5,
  "ocena": 9.1,
  "brOcena": 288,
  "cene": {
   "PP": 3881
  },
  "najniza": 3881,
  "soba": {
   "PP": "Superior Triple Room with Sea View"
  },
  "udaljenostOdCentra": "13.6 km from Nea Moudania",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/sea-coast.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Sea+Coast+Resort+Halkidiki+Nea+Moudania+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Sea+Coast+Resort+Halkidiki+Nea+Moudania+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "kappa-resort",
  "hotel": "Kappa Resort",
  "grad": "Pefkochori",
  "mesto": "Pefkohori",
  "km": 113,
  "vozOko": "107 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 9.1,
  "kmOpis": "104–122 km",
  "zvezdice": 4,
  "ocena": 8.6,
  "brOcena": 227,
  "cene": {
   "AI": 4193
  },
  "najniza": 4193,
  "soba": {
   "AI": "Exclusive Suite - 2 Bedroom with private pool"
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
    "url": "https://www.google.com/travel/search?q=Kappa+Resort+Pefkohori+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Kappa+Resort+Pefkohori+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "miraggio-thermal-spa-resort",
  "hotel": "Miraggio Thermal Spa Resort",
  "grad": "Pefkochori",
  "mesto": "Pefkohori",
  "km": 113,
  "vozOko": "107 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 10.5,
  "kmOpis": "102–124 km",
  "zvezdice": 5,
  "ocena": 8.9,
  "brOcena": 1182,
  "cene": {
   "AI": 4288
  },
  "najniza": 4288,
  "soba": {
   "AI": "Family Garden View Room"
  },
  "udaljenostOdCentra": "10.5 km from Pefkohori",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/miraggio-thermal-spa-resort.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Miraggio+Thermal+Spa+Resort+Pefkohori+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Miraggio+Thermal+Spa+Resort+Pefkohori+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "anthemus-sea-beach-hotel-and-spa",
  "hotel": "Anthemus Sea Beach Hotel and Spa",
  "grad": "Nikiti",
  "mesto": "Nikiti",
  "km": 110,
  "vozOko": "111 min",
  "zivost": 4,
  "uMestu": false,
  "odCentraKm": 10.5,
  "kmOpis": "100–120 km",
  "zvezdice": 5,
  "ocena": 9.3,
  "brOcena": 251,
  "cene": {
   "AI": 4329,
   "PP": 4335
  },
  "najniza": 4329,
  "soba": {
   "AI": "Deluxe Suite with Sea View or Pool View",
   "PP": "Deluxe Suite with Sea View or Pool View"
  },
  "udaljenostOdCentra": "10.5 km from Nikiti",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/anthemus-sea.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Anthemus+Sea+Beach+Hotel+and+Spa+Nikiti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Anthemus+Sea+Beach+Hotel+and+Spa+Nikiti+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "lagomandra-luxury-suites-with-private-pools",
  "hotel": "Lagomandra Luxury Suites with Private Pools",
  "grad": "Nikiti",
  "mesto": "Nikiti",
  "km": 110,
  "vozOko": "111 min",
  "zivost": 4,
  "uMestu": false,
  "odCentraKm": 11.7,
  "kmOpis": "98–122 km",
  "zvezdice": null,
  "ocena": 9.4,
  "brOcena": 16,
  "cene": {
   "AI": 4617,
   "PP": 4617
  },
  "najniza": 4617,
  "soba": {
   "AI": "Deluxe Apartment",
   "PP": "Deluxe Apartment"
  },
  "udaljenostOdCentra": "11.7 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/lagomandra-luxury-suites-amp-private-pool.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Lagomandra+Luxury+Suites+with+Private+Pools+Nikiti+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Lagomandra+Luxury+Suites+with+Private+Pools+Nikiti+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "pomegranate-wellness-spa-hotel",
  "hotel": "Pomegranate Wellness Spa Hotel",
  "grad": "Nea Moudania",
  "mesto": "Nea Moudania",
  "km": 61,
  "vozOko": "56 min",
  "zivost": 5,
  "uMestu": false,
  "odCentraKm": 4.9,
  "kmOpis": "56–66 km",
  "zvezdice": 5,
  "ocena": 9.4,
  "brOcena": 511,
  "cene": {
   "PP": 4734,
   "AI": 4734
  },
  "najniza": 4734,
  "soba": {
   "PP": "Suite Standard",
   "AI": "Suite Standard"
  },
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
    "url": "https://www.google.com/travel/search?q=Pomegranate+Wellness+Spa+Hotel+Nea+Moudania+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Pomegranate+Wellness+Spa+Hotel+Nea+Moudania+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 1.5,
  "kmOpis": "105 km",
  "zvezdice": 4,
  "ocena": 9.2,
  "brOcena": 163,
  "cene": {
   "PP": 5017
  },
  "najniza": 5017,
  "soba": {
   "PP": "Villa with Sea View"
  },
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
  "id": "meravia-leonardo-limited-edition-adults-only",
  "hotel": "MERAVIA Leonardo Limited Edition - Adults Only",
  "grad": "Nea Fokea",
  "mesto": "Nea Fokea",
  "km": 81,
  "vozOko": "76 min",
  "zivost": 2,
  "uMestu": true,
  "odCentraKm": 2.4,
  "kmOpis": "81 km",
  "zvezdice": 5,
  "ocena": 9.5,
  "brOcena": 1611,
  "cene": {
   "PP": 5132
  },
  "najniza": 5132,
  "soba": {
   "PP": "One bedroom suite Sea View Private Pool"
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
    "url": "https://www.google.com/travel/search?q=MERAVIA+Leonardo+Limited+Edition+-+Adults+Only+Nea+Fokea+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=MERAVIA+Leonardo+Limited+Edition+-+Adults+Only+Nea+Fokea+Greece&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "the-danai",
  "hotel": "The Danai",
  "grad": "Metamorfosi",
  "mesto": "Metamorfosi",
  "km": 85,
  "vozOko": "81 min",
  "zivost": 2,
  "uMestu": true,
  "odCentraKm": 2.0,
  "kmOpis": "85 km",
  "zvezdice": 5,
  "ocena": 9.7,
  "brOcena": 59,
  "cene": {
   "PP": 8253
  },
  "najniza": 8253,
  "soba": {
   "PP": "Suite"
  },
  "udaljenostOdCentra": "2 km from Metamorfosi",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/gr/danai-beach-resort-villas.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=The+Danai+Metamorfosi+Greece&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=The+Danai+Metamorfosi+Greece&dr-20260905-20260913=&rc-2="
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
  "uMestu": true,
  "odCentraKm": 2.0,
  "kmOpis": "96 km",
  "zvezdice": 5,
  "ocena": 8.9,
  "brOcena": 1767,
  "cene": {
   "PP": 10198,
   "AI": 10198
  },
  "najniza": 10198,
  "soba": {
   "PP": "Suite with Private Pool",
   "AI": "Suite with Private Pool"
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
 }
];

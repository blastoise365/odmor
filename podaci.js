// GENERISANO — ne menjaj rukom.
// Izvor: mesta.json + ponude.json (+ agoda.json), generator: napravi.py
//
// Cene su STVARNE cene sa Booking.com-a za 05.09.–13.09.2026, 2 odrasle, 1 soba, EUR,
// procitane 2026-09-03 13:00 pravim browserom (headless Chrome — Booking obicnom
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
// pomnozena sa 8, dakle PROCENA, i ne zna se za koji je pansion. Zato NE ULAZI
// U BODOVE — bodovanje je iskljucivo na Booking-ovim brojevima.
//
// Google Hotels i Trivago linkovi imaju upisane datume, ali njihov sadrzaj NIJE
// masinski proveren — ucitavaju se JavaScript-om i u headless dump-u vrate praznu
// skoljku bez cena. Sluze za rucno uporedjivanje.

const KLJUC = "odmor-crnagora-2026-v1";
const DOLAZAK = "05.09.2026";
const ODLAZAK = "13.09.2026";
const NOCI = 8;
const OSOBA = 2;
const BUDZET = 1100;
const PRIKUPLJENO = "2026-09-03 13:00";
const AGODA_PRIKUPLJENO = "2026-09-03 13:01";

const TEZINE = {"ocena": 0.34, "cena": 0.18, "plaza": 0.18, "centar": 0.1, "zivost": 0.1, "pansion": 0.1};

const MESTA = {
 "Bečići": {
  "rivijera": "Budvanska rivijera",
  "zivost": 4,
  "tekst": "Jedno od dva tražena mesta. Dva kilometra duge plaže — sitan šljunak i peskovit deo, najbolja plaža na budvanskoj rivijeri i za kupanje mnogo bolja od svega u Boki. Mesto je u suštini niz hotela i apartmana duž šetnice: ima restorana, pekara i prodavnica, ali nema pravi stari centar — to je letovalište, ne varoš. Do Budve se stigne šetnicom uz more za nekih pola sata, ili autom 3 km. Voda je otvoreno more, ne zaliv."
 },
 "Rafailovići": {
  "rivijera": "Budvanska rivijera",
  "zivost": 3,
  "tekst": "Nastavak bečićke plaže ka jugu, staro ribarsko selo koje je sraslo sa Bečićima — pešači se iz jednog u drugo za deset minuta. Poznato po ribljim restoranima uz samu vodu i mirnije je od Bečića, ali je i uže: uska ulica između kuća i mora, parking je muka. Ista plaža i isto more kao Bečići."
 },
 "Budva": {
  "rivijera": "Budvanska rivijera",
  "zivost": 5,
  "tekst": "Najživlje mesto na celom crnogorskom primorju i mera za sve ostalo na ovoj listi. Stari grad, stotine restorana i kafića, sve radi do kasno. Dve mane, obe krupne za mirno letovanje: buka noću (splavovi i klubovi rade do jutra) i gužva — Slovenska plaža je preko leta prepuna, a parking se plaća i teško nalazi. Dobra baza ako se ide u obilaske, slabija za osam dana odmora na plaži."
 },
 "Sveti Stefan": {
  "rivijera": "Budvanska rivijera",
  "zivost": 2,
  "tekst": "Ostrvce sa razglednice je zatvoren luksuzni resort i NE može se posetiti — vidi se samo spolja. Naselje na kopnu je malo, skupo i tiho, sa nekoliko restorana. Plaže sa obe strane prevlake su lepe, ali je veći deo pod ležaljkama koje se plaćaju. Mirno i slikovito; za osam dana može biti dosadno bez auta."
 },
 "Herceg Novi": {
  "rivijera": "Boka Kotorska",
  "zivost": 4,
  "tekst": "Drugo traženo mesto. Prava varoš koja živi cele godine — stari grad, pijaca, gradska šetnica Pet Danica duga sedam kilometara uz samo more, puno kafana i kafića. Dve stvari treba znati unapred. Prvo: grad je sagrađen na strmini i pun je stepenica — od gornjeg dela do mora se silazi desetinama stepenika, pa treba gledati gde je tačno hotel. Drugo: ovo je zaliv, ne otvoreno more — voda je mirna i topla, ali su plaže betonske platforme i krupan šljunak, nema peska kao u Bečićima."
 },
 "Đenovići": {
  "rivijera": "Boka Kotorska",
  "zivost": 2,
  "tekst": "Malo primorsko naselje na severnoj obali Boke, ravna šetnica uz more i nekoliko konoba. Tiho, pretežno apartmani i manji hoteli. Do Herceg Novog 8 km autom."
 },
 "Baošići": {
  "rivijera": "Boka Kotorska",
  "zivost": 2,
  "tekst": "Selo na severnoj obali Boke, tačno između Đenovića i Bijele — dakle u istom nizu kao Kumbor i Đenovići, na putu Herceg Novi–Kotor. Šljunkovite plaže, šetnica uz more, nekoliko konoba i prodavnica; inače mirno i pretežno apartmansko. Do Herceg Novog 10 km autom."
 },
 "Sušćepan": {
  "rivijera": "Boka Kotorska (zaleđe)",
  "zivost": 1,
  "tekst": "Selo IZNAD Herceg Novog, četiri kilometra od mora i uzbrdo — nije primorsko mesto. Mirno i zeleno, ali se do plaže mora autom i van sela nema skoro ničega. Na listi je jer je smeštaj tu osetno jeftiniji; udaljenost od plaže stoji na kartici, gledati je."
 },
 "Petrovac": {
  "rivijera": "Budvanska rivijera",
  "zivost": 4,
  "tekst": "Nije susedno mesto ni Bečićima ni Herceg Novom — 17 km je južno od Budve — i na listi je zato što polupansiona drugde skoro da nema. Malo mesto sa borovima do same vode, crvenkastim šljunkom, mletačkom tvrđavicom Kastio i dugom šetnicom punom restorana. Mirnije i porodičnije od Budve, tradicionalno puno naših ljudi, ali radi sve što treba: pijaca, apoteka, prodavnice. Glavna plaža je kratka i preko leta zna da bude puna; Lučice su pet minuta hoda dalje i lepše."
 }
};

const HOTELI = [
 {
  "id": "guesthouse-vila-tamburic",
  "hotel": "Guesthouse Vila Tamburic",
  "grad": "Becici",
  "mesto": "Bečići",
  "rivijera": "Budvanska rivijera",
  "zivost": 4,
  "plazaM": 300,
  "centarM": 1200,
  "naPlazi": false,
  "centarMesto": "Becici",
  "aerodromKm": 26,
  "bodovi": 65,
  "razrada": {
   "ocena": 87,
   "cena": 68,
   "plaza": 62,
   "centar": 0,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 9.2,
  "brOcena": 127,
  "cene": {
   "ND": 760
  },
  "najniza": 760,
  "soba": {
   "ND": "Duplex Quadruple Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "200 m from Rafailovici",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/vila-tamburic.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Guesthouse+Vila+Tamburic+Be%C4%8Di%C4%87i+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Guesthouse+Vila+Tamburic+Be%C4%8Di%C4%87i+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "guesthouse-villa-stari-grad",
  "hotel": "Guesthouse Villa Stari Grad",
  "grad": "Herceg Novi",
  "mesto": "Herceg Novi",
  "rivijera": "Boka Kotorska",
  "zivost": 4,
  "plazaM": 400,
  "centarM": 50,
  "naPlazi": false,
  "centarMesto": "Herceg-Novi",
  "aerodromKm": 23,
  "bodovi": 65,
  "razrada": {
   "ocena": 68,
   "cena": 64,
   "plaza": 50,
   "centar": 96,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 8.6,
  "brOcena": 316,
  "cene": {
   "ND": 778
  },
  "najniza": 778,
  "soba": {
   "ND": "Deluxe Double Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "50 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/vila-stari-grad.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Guesthouse+Villa+Stari+Grad+Herceg+Novi+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Guesthouse+Villa+Stari+Grad+Herceg+Novi+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "for-a-apartmani",
  "hotel": "FOR-A Apartmani",
  "grad": "Becici",
  "mesto": "Bečići",
  "rivijera": "Budvanska rivijera",
  "zivost": 4,
  "plazaM": 750,
  "centarM": 100,
  "naPlazi": false,
  "centarMesto": "Becici",
  "aerodromKm": 24,
  "bodovi": 64,
  "razrada": {
   "ocena": 77,
   "cena": 87,
   "plaza": 6,
   "centar": 92,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 8.9,
  "brOcena": 245,
  "cene": {
   "ND": 664
  },
  "najniza": 664,
  "soba": {
   "ND": "Double Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "200 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/for-a.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=FOR-A+Apartmani+Be%C4%8Di%C4%87i+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=FOR-A+Apartmani+Be%C4%8Di%C4%87i+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "portico-djenovici",
  "hotel": "Portico Djenovici",
  "grad": "Djenovici",
  "mesto": "Đenovići",
  "rivijera": "Boka Kotorska",
  "zivost": 2,
  "plazaM": 30,
  "centarM": 1900,
  "naPlazi": true,
  "centarMesto": null,
  "aerodromKm": 16,
  "bodovi": 64,
  "razrada": {
   "ocena": 97,
   "cena": 41,
   "plaza": 96,
   "centar": 0,
   "zivost": 25,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 9.5,
  "brOcena": 99,
  "cene": {
   "ND": 896
  },
  "najniza": 896,
  "soba": {
   "ND": "Double Room with Sea View"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "1.9 km from Kumbor",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/portico.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Portico+Djenovici+%C4%90enovi%C4%87i+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Portico+Djenovici+%C4%90enovi%C4%87i+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "apartmani-luka-vila-brzulovic",
  "hotel": "Apartmani Luka - Vila Brzulovic",
  "grad": "Rafailovici",
  "mesto": "Rafailovići",
  "rivijera": "Budvanska rivijera",
  "zivost": 3,
  "plazaM": 50,
  "centarM": 50,
  "naPlazi": true,
  "centarMesto": "Rafailovici",
  "aerodromKm": 26,
  "bodovi": 59,
  "razrada": {
   "ocena": 45,
   "cena": 46,
   "plaza": 94,
   "centar": 96,
   "zivost": 50,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 7.9,
  "brOcena": 152,
  "cene": {
   "ND": 870
  },
  "najniza": 870,
  "soba": {
   "ND": "Standard Triple Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "100 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/apartmani-luka-vila-brzulovic.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Apartmani+Luka+-+Vila+Brzulovic+Rafailovi%C4%87i+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Apartmani+Luka+-+Vila+Brzulovic+Rafailovi%C4%87i+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "suhepan",
  "hotel": "Suhepan",
  "grad": "Suscepan",
  "mesto": "Sušćepan",
  "rivijera": "Boka Kotorska (zaleđe)",
  "zivost": 1,
  "plazaM": 2400,
  "centarM": 100,
  "naPlazi": false,
  "centarMesto": "Sušćepan",
  "aerodromKm": 24,
  "bodovi": 55,
  "razrada": {
   "ocena": 100,
   "cena": 100,
   "plaza": 0,
   "centar": 92,
   "zivost": 0,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": null,
  "ocena": 10.0,
  "brOcena": 1,
  "cene": {
   "ND": 424
  },
  "najniza": 424,
  "soba": {
   "ND": "Double Room with Private Bathroom"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "0.9 km from Igalo",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/suhepan.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Suhepan+Su%C5%A1%C4%87epan+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Suhepan+Su%C5%A1%C4%87epan+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "hotel-max",
  "hotel": "Hotel Max",
  "grad": "Baosici",
  "mesto": "Baošići",
  "rivijera": "Boka Kotorska",
  "zivost": 2,
  "plazaM": 0,
  "centarM": 200,
  "naPlazi": true,
  "centarMesto": "Baošići",
  "aerodromKm": 13,
  "bodovi": 55,
  "razrada": {
   "ocena": 90,
   "cena": 9,
   "plaza": 100,
   "centar": 83,
   "zivost": 25,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 9.3,
  "brOcena": 30,
  "cene": {
   "ND": 1056
  },
  "najniza": 1056,
  "soba": {
   "ND": "Twin Room with Balcony"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "3.8 km from Kumbor",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": {
   "cenaNoc": 132,
   "cenaUkupno": 1056,
   "link": "https://www.agoda.com/en-gb/hotel-max-h74351982/hotel/all/herceg-novi-me.html",
   "ocena": 9.0
  },
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/max-baoshitshi1.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+Max+Bao%C5%A1i%C4%87i+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+Max+Bao%C5%A1i%C4%87i+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "hotel-podostrog-new-comfort-2026",
  "hotel": "Hotel Podostrog - New Comfort 2026",
  "grad": "Budva",
  "mesto": "Budva",
  "rivijera": "Budvanska rivijera",
  "zivost": 5,
  "plazaM": 600,
  "centarM": 1500,
  "naPlazi": false,
  "centarMesto": "Budva",
  "aerodromKm": 23,
  "bodovi": 53,
  "razrada": {
   "ocena": 58,
   "cena": 63,
   "plaza": 25,
   "centar": 0,
   "zivost": 100,
   "pansion": 70
  },
  "direktno": {
   "sajt": "https://hotelpodostrog.com/",
   "email": "info@hotelpodostrog.com",
   "telefon": "+382 67 631 578",
   "napomena": "Najjeftiniji polupansion na listi. Recepcija ima svoj broj: +382 67 062 172."
  },
  "zvezdice": 3,
  "ocena": 8.3,
  "brOcena": 87,
  "cene": {
   "ND": 784,
   "PP": 1054
  },
  "najniza": 784,
  "soba": {
   "ND": "Double Room",
   "PP": "Double Room"
  },
  "najboljiPansion": "PP",
  "udaljenostOdCentra": "1.4 km from Becici",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/podostrog.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+Podostrog+-+New+Comfort+2026+Budva+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+Podostrog+-+New+Comfort+2026+Budva+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "hotel-danica",
  "hotel": "Hotel Danica",
  "grad": "Petrovac na Moru",
  "mesto": "Petrovac",
  "rivijera": "Budvanska rivijera",
  "zivost": 4,
  "plazaM": 150,
  "centarM": 500,
  "naPlazi": false,
  "centarMesto": "Petrovac na Moru",
  "aerodromKm": 40,
  "bodovi": 53,
  "razrada": {
   "ocena": 48,
   "cena": 27,
   "plaza": 81,
   "centar": 58,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 8.0,
  "brOcena": 123,
  "cene": {
   "ND": 964
  },
  "najniza": 964,
  "soba": {
   "ND": "Double Room with Balcony (2 Adults + 1 Child)"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "0.6 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/danica.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+Danica+Petrovac+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+Danica+Petrovac+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "hotel-apartments-hec-residence",
  "hotel": "Hotel & Apartments HEC Residence",
  "grad": "Sveti Stefan",
  "mesto": "Sveti Stefan",
  "rivijera": "Budvanska rivijera",
  "zivost": 2,
  "plazaM": 300,
  "centarM": 1500,
  "naPlazi": false,
  "centarMesto": "Sveti Stefan",
  "aerodromKm": 28,
  "bodovi": 52,
  "razrada": {
   "ocena": 52,
   "cena": 95,
   "plaza": 62,
   "centar": 0,
   "zivost": 25,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 8.1,
  "brOcena": 278,
  "cene": {
   "ND": 627
  },
  "najniza": 627,
  "soba": {
   "ND": "Economy Double Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "150 m from Pržno",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/residence.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+%26+Apartments+HEC+Residence+Sveti+Stefan+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+%26+Apartments+HEC+Residence+Sveti+Stefan+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "villa-roselina-by-beatrix",
  "hotel": "Villa Roselina By Beatrix",
  "grad": "Budva",
  "mesto": "Budva",
  "rivijera": "Budvanska rivijera",
  "zivost": 5,
  "plazaM": 550,
  "centarM": 800,
  "naPlazi": false,
  "centarMesto": "Budva",
  "aerodromKm": 21,
  "bodovi": 52,
  "razrada": {
   "ocena": 61,
   "cena": 48,
   "plaza": 31,
   "centar": 33,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 8.4,
  "brOcena": 468,
  "cene": {
   "ND": 861
  },
  "najniza": 861,
  "soba": {
   "ND": "King Studio"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "0.9 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/villa-beatrix.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Villa+Roselina+By+Beatrix+Budva+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Villa+Roselina+By+Beatrix+Budva+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "peace-2-apartments-with-parking",
  "hotel": "Peace 2 Apartments with parking",
  "grad": "Budva",
  "mesto": "Budva",
  "rivijera": "Budvanska rivijera",
  "zivost": 5,
  "plazaM": 950,
  "centarM": 1200,
  "naPlazi": false,
  "centarMesto": "Budva",
  "aerodromKm": 21,
  "bodovi": 50,
  "razrada": {
   "ocena": 100,
   "cena": 14,
   "plaza": 0,
   "centar": 0,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.6,
  "brOcena": 419,
  "cene": {
   "ND": 1032
  },
  "najniza": 1032,
  "soba": {
   "ND": "Apartment with Balcony"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "1.2 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/peace-2-apartment-budva1.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Peace+2+Apartments+with+parking+Budva+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Peace+2+Apartments+with+parking+Budva+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "apartments-belani-zelenika",
  "hotel": "Apartments Belani Zelenika",
  "grad": "Herceg Novi",
  "mesto": "Herceg Novi",
  "rivijera": "Boka Kotorska",
  "zivost": 4,
  "plazaM": 550,
  "centarM": 1600,
  "naPlazi": false,
  "centarMesto": null,
  "aerodromKm": 19,
  "bodovi": 50,
  "razrada": {
   "ocena": 52,
   "cena": 86,
   "plaza": 31,
   "centar": 0,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 8.1,
  "brOcena": 385,
  "cene": {
   "ND": 669
  },
  "najniza": 669,
  "soba": {
   "ND": "Standard Twin Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "1.6 km from Kumbor",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": {
   "cenaNoc": 92,
   "cenaUkupno": 736,
   "link": "https://www.agoda.com/en-gb/savina_2/hotel/all/herceg-novi-me.html",
   "ocena": 8.1
  },
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/garni-belani.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Apartments+Belani+Zelenika+Herceg+Novi+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Apartments+Belani+Zelenika+Herceg+Novi+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "b-b-apart-hotel-pa-trovski-konak",
  "hotel": "B&B Apart Hotel Paštrovski Konak",
  "grad": "Sveti Stefan",
  "mesto": "Sveti Stefan",
  "rivijera": "Budvanska rivijera",
  "zivost": 2,
  "plazaM": 3800,
  "centarM": 3000,
  "naPlazi": false,
  "centarMesto": "Sveti Stefan",
  "aerodromKm": 31,
  "bodovi": 49,
  "razrada": {
   "ocena": 81,
   "cena": 86,
   "plaza": 0,
   "centar": 0,
   "zivost": 25,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 9.0,
  "brOcena": 355,
  "cene": {
   "ND": 669
  },
  "najniza": 669,
  "soba": {
   "ND": "Duplex One-Bedroom Apartment with Sea View and Terrace"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "1.9 km from Pržno",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/pastrovski-konak.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=B%26B+Apart+Hotel+Pa%C5%A1trovski+Konak+Sveti+Stefan+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=B%26B+Apart+Hotel+Pa%C5%A1trovski+Konak+Sveti+Stefan+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "vistamar-aparthotel",
  "hotel": "Vistamar Aparthotel",
  "grad": "Budva",
  "mesto": "Budva",
  "rivijera": "Budvanska rivijera",
  "zivost": 5,
  "plazaM": 1700,
  "centarM": 2300,
  "naPlazi": false,
  "centarMesto": "Budva",
  "aerodromKm": 23,
  "bodovi": 46,
  "razrada": {
   "ocena": 81,
   "cena": 24,
   "plaza": 0,
   "centar": 0,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.0,
  "brOcena": 373,
  "cene": {
   "ND": 982
  },
  "najniza": 982,
  "soba": {
   "ND": "One-Bedroom Apartment"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "2 km from Becici",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/vista-mar-apartments.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Vistamar+Aparthotel+Budva+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Vistamar+Aparthotel+Budva+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "city-suites-budva",
  "hotel": "City Suites Budva",
  "grad": "Budva",
  "mesto": "Budva",
  "rivijera": "Budvanska rivijera",
  "zivost": 5,
  "plazaM": 1300,
  "centarM": 1500,
  "naPlazi": false,
  "centarMesto": "Budva",
  "aerodromKm": 22,
  "bodovi": 45,
  "razrada": {
   "ocena": 84,
   "cena": 12,
   "plaza": 0,
   "centar": 0,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": null,
  "ocena": 9.1,
  "brOcena": 66,
  "cene": {
   "ND": 1042
  },
  "najniza": 1042,
  "soba": {
   "ND": "Superior Triple Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "1.6 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": {
   "cenaNoc": 130,
   "cenaUkupno": 1040,
   "link": "https://www.agoda.com/en-gb/apartmani-aleks/hotel/all/budva-me.html",
   "ocena": null
  },
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/city-suites-budva.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=City+Suites+Budva+Budva+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=City+Suites+Budva+Budva+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "hotel-rivijera",
  "hotel": "Hotel Rivijera",
  "grad": "Petrovac na Moru",
  "mesto": "Petrovac",
  "rivijera": "Budvanska rivijera",
  "zivost": 4,
  "plazaM": 100,
  "centarM": 200,
  "naPlazi": false,
  "centarMesto": "Petrovac na Moru",
  "aerodromKm": 40,
  "bodovi": 45,
  "razrada": {
   "ocena": 0,
   "cena": 35,
   "plaza": 88,
   "centar": 83,
   "zivost": 75,
   "pansion": 70
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 5.1,
  "brOcena": 312,
  "cene": {
   "PP": 1118,
   "ND": 927
  },
  "najniza": 927,
  "soba": {
   "PP": "Standard Double Room with Balcony",
   "ND": "Double Standard"
  },
  "najboljiPansion": "PP",
  "udaljenostOdCentra": "250 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": {
   "cenaNoc": 117,
   "cenaUkupno": 936,
   "link": "https://www.agoda.com/en-gb/hotel-wgrand/hotel/petrovac-me.html",
   "ocena": 7.0
  },
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/rivijera.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+Rivijera+Petrovac+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+Rivijera+Petrovac+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "apartments-pod-lozom-with-seaview",
  "hotel": "Apartments Pod Lozom with Seaview",
  "grad": "Petrovac na Moru",
  "mesto": "Petrovac",
  "rivijera": "Budvanska rivijera",
  "zivost": 4,
  "plazaM": null,
  "centarM": 250,
  "naPlazi": false,
  "centarMesto": null,
  "aerodromKm": null,
  "bodovi": 45,
  "razrada": {
   "ocena": 58,
   "cena": 25,
   "plaza": null,
   "centar": 79,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 8.3,
  "brOcena": 19,
  "cene": {
   "ND": 976
  },
  "najniza": 976,
  "soba": {
   "ND": "Superior Apartment with Sea View"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "250 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/apartments-pod-lozom.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Apartments+Pod+Lozom+with+Seaview+Petrovac+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Apartments+Pod+Lozom+with+Seaview+Petrovac+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "dolce-vita",
  "hotel": "Dolce Vita",
  "grad": "Budva",
  "mesto": "Budva",
  "rivijera": "Budvanska rivijera",
  "zivost": 5,
  "plazaM": 450,
  "centarM": 2300,
  "naPlazi": false,
  "centarMesto": "Budva",
  "aerodromKm": 24,
  "bodovi": 43,
  "razrada": {
   "ocena": 26,
   "cena": 67,
   "plaza": 44,
   "centar": 0,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 7.3,
  "brOcena": 154,
  "cene": {
   "ND": 765
  },
  "najniza": 765,
  "soba": {
   "ND": "Standard Triple Room With Terrace"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "100 m from Becici",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/dolcevita.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Dolce+Vita+Budva+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Dolce+Vita+Budva+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "hotel-pierina",
  "hotel": "Hotel Pierina",
  "grad": "Budva",
  "mesto": "Budva",
  "rivijera": "Budvanska rivijera",
  "zivost": 5,
  "plazaM": 950,
  "centarM": 900,
  "naPlazi": false,
  "centarMesto": "Budva",
  "aerodromKm": 22,
  "bodovi": 41,
  "razrada": {
   "ocena": 42,
   "cena": 55,
   "plaza": 0,
   "centar": 25,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": null,
  "ocena": 7.8,
  "brOcena": 462,
  "cene": {
   "ND": 824
  },
  "najniza": 824,
  "soba": {
   "ND": "Double or Twin Room with Side Sea View"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "0.9 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/pierina.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+Pierina+Budva+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+Pierina+Budva+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "apartments-v",
  "hotel": "Apartments Vé",
  "grad": "Budva",
  "mesto": "Budva",
  "rivijera": "Budvanska rivijera",
  "zivost": 5,
  "plazaM": 1100,
  "centarM": 1500,
  "naPlazi": false,
  "centarMesto": "Budva",
  "aerodromKm": 22,
  "bodovi": 37,
  "razrada": {
   "ocena": null,
   "cena": 33,
   "plaza": 0,
   "centar": 0,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": null,
  "ocena": null,
  "brOcena": null,
  "cene": {
   "ND": 934
  },
  "najniza": 934,
  "soba": {
   "ND": "One-Bedroom Apartment"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "1.6 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": true,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/apartments-ve.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Apartments+V%C3%A9+Budva+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Apartments+V%C3%A9+Budva+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "piazza-apartments-1",
  "hotel": "Piazza Apartments 1",
  "grad": "Petrovac na Moru",
  "mesto": "Petrovac",
  "rivijera": "Budvanska rivijera",
  "zivost": 4,
  "plazaM": 0,
  "centarM": 200,
  "naPlazi": true,
  "centarMesto": "Petrovac na Moru",
  "aerodromKm": 40,
  "bodovi": 32,
  "razrada": {
   "ocena": 97,
   "cena": 0,
   "plaza": 100,
   "centar": 83,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.5,
  "brOcena": 60,
  "cene": {
   "ND": 1328
  },
  "najniza": 1328,
  "soba": {
   "ND": "Superior One-Bedroom Apartment"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "300 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/vukotic-obala.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Piazza+Apartments+1+Petrovac+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Piazza+Apartments+1+Petrovac+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "splendid-conference-spa-resort",
  "hotel": "Splendid Conference & Spa Resort",
  "grad": "Budva",
  "mesto": "Budva",
  "rivijera": "Budvanska rivijera",
  "zivost": 5,
  "plazaM": 50,
  "centarM": 2300,
  "naPlazi": true,
  "centarMesto": "Budva",
  "aerodromKm": 24,
  "bodovi": 28,
  "razrada": {
   "ocena": 84,
   "cena": 0,
   "plaza": 94,
   "centar": 0,
   "zivost": 100,
   "pansion": 70
  },
  "direktno": {
   "sajt": "https://montenegrostars.com/en/hotel-splendid",
   "email": "reservations@montenegrostars.com",
   "telefon": "+382 33 773 777",
   "napomena": "Montenegro Stars grupa, 5*, na samoj plazi u Becicima. Ima polupansion ali daleko preko budzeta."
  },
  "zvezdice": 5,
  "ocena": 9.1,
  "brOcena": 3644,
  "cene": {
   "PP": 4276
  },
  "najniza": 4276,
  "soba": {
   "PP": "Superior Room with Sea View"
  },
  "najboljiPansion": "PP",
  "udaljenostOdCentra": "300 m from Becici",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": {
   "cenaNoc": 509,
   "cenaUkupno": 4072,
   "link": "https://www.agoda.com/en-gb/splendid-conference-spa-resort/hotel/budva-me.html",
   "ocena": 9.0
  },
  "jeftinijeAgoda": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/splendid-confetence-spa-resort.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Splendid+Conference+%26+Spa+Resort+Budva+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Splendid+Conference+%26+Spa+Resort+Budva+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "villa-geba-boutique-hotel",
  "hotel": "Villa Geba Boutique Hotel",
  "grad": "Sveti Stefan",
  "mesto": "Sveti Stefan",
  "rivijera": "Budvanska rivijera",
  "zivost": 2,
  "plazaM": 100,
  "centarM": 400,
  "naPlazi": false,
  "centarMesto": "Sveti Stefan",
  "aerodromKm": 30,
  "bodovi": 28,
  "razrada": {
   "ocena": 100,
   "cena": 0,
   "plaza": 88,
   "centar": 67,
   "zivost": 25,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 5,
  "ocena": 9.6,
  "brOcena": 42,
  "cene": {
   "ND": 14372
  },
  "najniza": 14372,
  "soba": {
   "ND": "Suite with Terrace"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "450 m from centre",
  "plazaBlizu": false,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/villa-geba.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Villa+Geba+Boutique+Hotel+Sveti+Stefan+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Villa+Geba+Boutique+Hotel+Sveti+Stefan+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "perla-apartments",
  "hotel": "PERLA Apartments",
  "grad": "Budva",
  "mesto": "Budva",
  "rivijera": "Budvanska rivijera",
  "zivost": 5,
  "plazaM": 100,
  "centarM": 300,
  "naPlazi": false,
  "centarMesto": "Budva",
  "aerodromKm": 22,
  "bodovi": 27,
  "razrada": {
   "ocena": 65,
   "cena": 0,
   "plaza": 88,
   "centar": 75,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 8.5,
  "brOcena": 52,
  "cene": {
   "ND": 1616
  },
  "najniza": 1616,
  "soba": {
   "ND": "Deluxe King Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "350 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/perla-apartment-budva.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=PERLA+Apartments+Budva+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=PERLA+Apartments+Budva+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "ambassador-apartments",
  "hotel": "Ambassador Apartments",
  "grad": "Petrovac na Moru",
  "mesto": "Petrovac",
  "rivijera": "Budvanska rivijera",
  "zivost": 4,
  "plazaM": 0,
  "centarM": 400,
  "naPlazi": true,
  "centarMesto": "Petrovac na Moru",
  "aerodromKm": 40,
  "bodovi": 27,
  "razrada": {
   "ocena": 68,
   "cena": 0,
   "plaza": 100,
   "centar": 67,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 8.6,
  "brOcena": 260,
  "cene": {
   "ND": 1564
  },
  "najniza": 1564,
  "soba": {
   "ND": "Two-Bedroom Apartment"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "450 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/ambassador-apartments.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Ambassador+Apartments+Petrovac+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Ambassador+Apartments+Petrovac+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "guest-house-aria",
  "hotel": "Guest House Aria",
  "grad": "Herceg Novi",
  "mesto": "Herceg Novi",
  "rivijera": "Boka Kotorska",
  "zivost": 4,
  "plazaM": 150,
  "centarM": 1200,
  "naPlazi": false,
  "centarMesto": "Herceg-Novi",
  "aerodromKm": 21,
  "bodovi": 27,
  "razrada": {
   "ocena": 97,
   "cena": 0,
   "plaza": 81,
   "centar": 0,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.5,
  "brOcena": 447,
  "cene": {
   "ND": 1288
  },
  "najniza": 1288,
  "soba": {
   "ND": "Suite with Balcony and Sea View"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "1.2 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/guesthouse-aria.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Guest+House+Aria+Herceg+Novi+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Guest+House+Aria+Herceg+Novi+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "hotel-talia",
  "hotel": "HOTEL TALIA",
  "grad": "Herceg Novi",
  "mesto": "Herceg Novi",
  "rivijera": "Boka Kotorska",
  "zivost": 4,
  "plazaM": 100,
  "centarM": 1500,
  "naPlazi": false,
  "centarMesto": "Herceg-Novi",
  "aerodromKm": 24,
  "bodovi": 27,
  "razrada": {
   "ocena": 77,
   "cena": 0,
   "plaza": 88,
   "centar": 0,
   "zivost": 75,
   "pansion": 100
  },
  "direktno": {
   "sajt": "https://talia.co.me/",
   "telefon": "+382 68 14 99 99",
   "napomena": "JEDINI all inclusive na listi. Igalo, 29. Decembra 2-4. Mejl na sajtu stoji sakriven iza JavaScript-a, pa ga ovde nema — zvati (broj radi i za Viber i WhatsApp)."
  },
  "zvezdice": 4,
  "ocena": 8.9,
  "brOcena": 842,
  "cene": {
   "AI": 1845
  },
  "najniza": 1845,
  "soba": {
   "AI": "Superior Double or Twin Room"
  },
  "najboljiPansion": "AI",
  "udaljenostOdCentra": "0.7 km from Igalo",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/talia.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=HOTEL+TALIA+Herceg+Novi+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=HOTEL+TALIA+Herceg+Novi+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "lazure-hotel-marina",
  "hotel": "Lazure Hotel & Marina",
  "grad": "Herceg Novi",
  "mesto": "Herceg Novi",
  "rivijera": "Boka Kotorska",
  "zivost": 4,
  "plazaM": 150,
  "centarM": 1800,
  "naPlazi": false,
  "centarMesto": "Herceg-Novi",
  "aerodromKm": 21,
  "bodovi": 27,
  "razrada": {
   "ocena": 97,
   "cena": 0,
   "plaza": 81,
   "centar": 0,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 5,
  "ocena": 9.5,
  "brOcena": 519,
  "cene": {
   "ND": 6967
  },
  "najniza": 6967,
  "soba": {
   "ND": "Venetian Two-Bedroom Suite - Historical Building"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "1.8 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": {
   "cenaNoc": 651,
   "cenaUkupno": 5208,
   "link": "https://www.agoda.com/en-gb/lazure-hotel-marina/hotel/all/herceg-novi-me.html",
   "ocena": 9.5
  },
  "jeftinijeAgoda": true,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/lazure-marina.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Lazure+Hotel+%26+Marina+Herceg+Novi+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Lazure+Hotel+%26+Marina+Herceg+Novi+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "arka-budva",
  "hotel": "Arka Budva",
  "grad": "Budva",
  "mesto": "Budva",
  "rivijera": "Budvanska rivijera",
  "zivost": 5,
  "plazaM": 350,
  "centarM": 400,
  "naPlazi": false,
  "centarMesto": "Budva",
  "aerodromKm": 22,
  "bodovi": 24,
  "razrada": {
   "ocena": 68,
   "cena": 0,
   "plaza": 56,
   "centar": 67,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 3,
  "ocena": 8.6,
  "brOcena": 516,
  "cene": {
   "ND": 1197
  },
  "najniza": 1197,
  "soba": {
   "ND": "Apartment with Balcony"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "500 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/boutique-arka.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Arka+Budva+Budva+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Arka+Budva+Budva+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "hotel-tq-plaza",
  "hotel": "Hotel TQ Plaza",
  "grad": "Budva",
  "mesto": "Budva",
  "rivijera": "Budvanska rivijera",
  "zivost": 5,
  "plazaM": 250,
  "centarM": 700,
  "naPlazi": false,
  "centarMesto": "Budva",
  "aerodromKm": 21,
  "bodovi": 24,
  "razrada": {
   "ocena": 65,
   "cena": 0,
   "plaza": 69,
   "centar": 42,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 8.5,
  "brOcena": 429,
  "cene": {
   "ND": 1435
  },
  "najniza": 1435,
  "soba": {
   "ND": "Standard Room with City View"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "0.7 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/plaza-budva1.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+TQ+Plaza+Budva+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+TQ+Plaza+Budva+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "royal-holiday-apartments-sveti-stefan",
  "hotel": "Royal Holiday Apartments Sveti Stefan",
  "grad": "Sveti Stefan",
  "mesto": "Sveti Stefan",
  "rivijera": "Budvanska rivijera",
  "zivost": 2,
  "plazaM": 3,
  "centarM": 500,
  "naPlazi": true,
  "centarMesto": "Sveti Stefan",
  "aerodromKm": 31,
  "bodovi": 24,
  "razrada": {
   "ocena": 68,
   "cena": 0,
   "plaza": 100,
   "centar": 58,
   "zivost": 25,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 8.6,
  "brOcena": 91,
  "cene": {
   "ND": 1353
  },
  "najniza": 1353,
  "soba": {
   "ND": "Apartment with Sea View"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "0.5 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/villa-sveti-stefan.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Royal+Holiday+Apartments+Sveti+Stefan+Sveti+Stefan+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Royal+Holiday+Apartments+Sveti+Stefan+Sveti+Stefan+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "azimut-hotel",
  "hotel": "AZIMUT Hotel",
  "grad": "Sveti Stefan",
  "mesto": "Sveti Stefan",
  "rivijera": "Budvanska rivijera",
  "zivost": 2,
  "plazaM": 20,
  "centarM": 400,
  "naPlazi": true,
  "centarMesto": "Sveti Stefan",
  "aerodromKm": 31,
  "bodovi": 24,
  "razrada": {
   "ocena": 68,
   "cena": 0,
   "plaza": 98,
   "centar": 67,
   "zivost": 25,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 8.6,
  "brOcena": 477,
  "cene": {
   "ND": 2614
  },
  "najniza": 2614,
  "soba": {
   "ND": "Duplex Suite"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "400 m from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/azimut-85315.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=AZIMUT+Hotel+Sveti+Stefan+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=AZIMUT+Hotel+Sveti+Stefan+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "gufo-apart",
  "hotel": "Gufo Apart",
  "grad": "Budva",
  "mesto": "Budva",
  "rivijera": "Budvanska rivijera",
  "zivost": 5,
  "plazaM": 250,
  "centarM": 500,
  "naPlazi": false,
  "centarMesto": "Budva",
  "aerodromKm": 22,
  "bodovi": 23,
  "razrada": {
   "ocena": 55,
   "cena": 0,
   "plaza": 69,
   "centar": 58,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 8.2,
  "brOcena": 791,
  "cene": {
   "ND": 1472
  },
  "najniza": 1472,
  "soba": {
   "ND": "Deluxe Apartment"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "0.5 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/gufo-apart.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Gufo+Apart+Budva+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Gufo+Apart+Budva+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "hotel-bono",
  "hotel": "Hotel Bono",
  "grad": "Budva",
  "mesto": "Budva",
  "rivijera": "Budvanska rivijera",
  "zivost": 5,
  "plazaM": 650,
  "centarM": 2200,
  "naPlazi": false,
  "centarMesto": "Budva",
  "aerodromKm": 24,
  "bodovi": 22,
  "razrada": {
   "ocena": 90,
   "cena": 0,
   "plaza": 19,
   "centar": 0,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.3,
  "brOcena": 412,
  "cene": {
   "ND": 1141
  },
  "najniza": 1141,
  "soba": {
   "ND": "Budget Double Room"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "2.3 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/bono.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+Bono+Budva+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+Bono+Budva+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "turkuaz-boutique-hotel",
  "hotel": "Turkuaz Boutique Hotel",
  "grad": "Sveti Stefan",
  "mesto": "Sveti Stefan",
  "rivijera": "Budvanska rivijera",
  "zivost": 2,
  "plazaM": 350,
  "centarM": 600,
  "naPlazi": false,
  "centarMesto": "Sveti Stefan",
  "aerodromKm": 30,
  "bodovi": 21,
  "razrada": {
   "ocena": 71,
   "cena": 0,
   "plaza": 56,
   "centar": 50,
   "zivost": 25,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 8.7,
  "brOcena": 199,
  "cene": {
   "ND": 1156
  },
  "najniza": 1156,
  "soba": {
   "ND": "Three-Bedroom Apartment with Sea View"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "0.6 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": {
   "cenaNoc": 145,
   "cenaUkupno": 1160,
   "link": "https://www.agoda.com/en-gb/turkuaz-boutique-hotel/hotel/all/budva-me.html",
   "ocena": 8.8
  },
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/turkuaz-boutique.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Turkuaz+Boutique+Hotel+Sveti+Stefan+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Turkuaz+Boutique+Hotel+Sveti+Stefan+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "azzurro-vista",
  "hotel": "Azzurro Vista",
  "grad": "Budva",
  "mesto": "Budva",
  "rivijera": "Budvanska rivijera",
  "zivost": 5,
  "plazaM": 1500,
  "centarM": 2200,
  "naPlazi": false,
  "centarMesto": "Budva",
  "aerodromKm": 24,
  "bodovi": 21,
  "razrada": {
   "ocena": 97,
   "cena": 0,
   "plaza": 0,
   "centar": 0,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 9.5,
  "brOcena": 106,
  "cene": {
   "ND": 1216
  },
  "najniza": 1216,
  "soba": {
   "ND": "Superior Studio"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "300 m from Becici",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": {
   "cenaNoc": 152,
   "cenaUkupno": 1216,
   "link": "https://www.agoda.com/en-gb/azzurro-vista/hotel/all/budva-me.html",
   "ocena": 9.5
  },
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/azzurro-vista.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Azzurro+Vista+Budva+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Azzurro+Vista+Budva+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "forte-rose-hotel",
  "hotel": "Forte Rose Hotel",
  "grad": "Herceg Novi",
  "mesto": "Herceg Novi",
  "rivijera": "Boka Kotorska",
  "zivost": 4,
  "plazaM": 10,
  "centarM": 2900,
  "naPlazi": true,
  "centarMesto": "Herceg-Novi",
  "aerodromKm": 22,
  "bodovi": 19,
  "razrada": {
   "ocena": 39,
   "cena": 0,
   "plaza": 99,
   "centar": 0,
   "zivost": 75,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 7.7,
  "brOcena": 196,
  "cene": {
   "ND": 2040
  },
  "najniza": 2040,
  "soba": {
   "ND": "Stone Villa"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "2.8 km from Kumbor",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/forte-rose.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Forte+Rose+Hotel+Herceg+Novi+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Forte+Rose+Hotel+Herceg+Novi+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "hotel-resort-slovenska-plaza",
  "hotel": "Hotel resort Slovenska plaza",
  "grad": "Budva",
  "mesto": "Budva",
  "rivijera": "Budvanska rivijera",
  "zivost": 5,
  "plazaM": 400,
  "centarM": 1000,
  "naPlazi": false,
  "centarMesto": "Budva",
  "aerodromKm": 22,
  "bodovi": 17,
  "razrada": {
   "ocena": 39,
   "cena": 0,
   "plaza": 50,
   "centar": 17,
   "zivost": 100,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 4,
  "ocena": 7.7,
  "brOcena": 76,
  "cene": {
   "ND": 1116
  },
  "najniza": 1116,
  "soba": {
   "ND": "Standard Double or Twin Room with Balcony"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "1.1 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/slovenska-plaza-budva1.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=Hotel+resort+Slovenska+plaza+Budva+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=Hotel+resort+Slovenska+plaza+Budva+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 },
 {
  "id": "nanti-resort-residences-beach-club-the-leading-h",
  "hotel": "ĀNANTI Resort, Residences & Beach Club - The Leading Hotels of the World",
  "grad": "Sveti Stefan",
  "mesto": "Sveti Stefan",
  "rivijera": "Budvanska rivijera",
  "zivost": 2,
  "plazaM": 850,
  "centarM": 3000,
  "naPlazi": false,
  "centarMesto": "Sveti Stefan",
  "aerodromKm": 33,
  "bodovi": 15,
  "razrada": {
   "ocena": 77,
   "cena": 0,
   "plaza": 0,
   "centar": 0,
   "zivost": 25,
   "pansion": 40
  },
  "direktno": null,
  "zvezdice": 5,
  "ocena": 8.9,
  "brOcena": 92,
  "cene": {
   "ND": 6393
  },
  "najniza": 6393,
  "soba": {
   "ND": "One-Bedroom Apartment"
  },
  "najboljiPansion": "ND",
  "udaljenostOdCentra": "3.1 km from centre",
  "plazaBlizu": true,
  "takseUkljucene": true,
  "uBudzetu": false,
  "agoda": null,
  "jeftinijeAgoda": false,
  "linkovi": [
   {
    "naziv": "Booking — datumi upisani",
    "url": "https://www.booking.com/hotel/me/ananti-resort-residences-amp-beach-club.en-gb.html?checkin=2026-09-05&checkout=2026-09-13&group_adults=2&no_rooms=1&group_children=0&selected_currency=EUR"
   },
   {
    "naziv": "Google Hotels — uporedi sve",
    "url": "https://www.google.com/travel/search?q=%C4%80NANTI+Resort%2C+Residences+%26+Beach+Club+-+The+Leading+Hotels+of+the+World+Sveti+Stefan+Montenegro&qs=CAE&ap=MABoAA"
   },
   {
    "naziv": "Trivago",
    "url": "https://www.trivago.com/en-US/srl?query=%C4%80NANTI+Resort%2C+Residences+%26+Beach+Club+-+The+Leading+Hotels+of+the+World+Sveti+Stefan+Montenegro&dr-20260905-20260913=&rc-2="
   }
  ]
 }
];

// Tragovi sa Agode kojih na Booking-u NEMA. Bez pansiona, bez udaljenosti od plaze,
// mesto je samo Agodin grad pretrage. Ne ulaze u listu ni u bodove — vidi napravi.py.
const SAMO_AGODA = [
 {
  "hotel": "Apartman Vera",
  "mesto": "Herceg Novi",
  "ocena": 9.9,
  "cenaNoc": 52,
  "cenaUkupno": 416,
  "link": "https://www.agoda.com/en-gb/vera/hotel/all/herceg-novi-me.html",
  "direktno": null
 },
 {
  "hotel": "Apartment Jelaca",
  "mesto": "Herceg Novi",
  "ocena": 9.8,
  "cenaNoc": 83,
  "cenaUkupno": 664,
  "link": "https://www.agoda.com/en-gb/apartment-jelaca/hotel/all/herceg-novi-me.html",
  "direktno": null
 },
 {
  "hotel": "Hotel Petrovac",
  "mesto": "Petrovac",
  "ocena": 9.8,
  "cenaNoc": 153,
  "cenaUkupno": 1224,
  "link": "https://www.agoda.com/en-gb/hotel-zeta/hotel/all/budva-me.html",
  "direktno": null
 },
 {
  "hotel": "Guest House Cvoro",
  "mesto": "Igalo",
  "ocena": 9.6,
  "cenaNoc": 50,
  "cenaUkupno": 400,
  "link": "",
  "direktno": null
 },
 {
  "hotel": "Sunny side Wellness Resort & Spa - Cascade",
  "mesto": "Bečići",
  "ocena": 9.5,
  "cenaNoc": 71,
  "cenaUkupno": 568,
  "link": "https://www.agoda.com/en-gb/sunny-side-3-wellness-resort-spa/hotel/all/budva-me.html",
  "direktno": null
 },
 {
  "hotel": "Apartmani Aleks",
  "mesto": "Budva",
  "ocena": 9.5,
  "cenaNoc": 87,
  "cenaUkupno": 696,
  "link": "https://www.agoda.com/en-gb/beatrix-suites/hotel/all/budva-me.html",
  "direktno": null
 },
 {
  "hotel": "Vile MonteMar",
  "mesto": "Herceg Novi",
  "ocena": 9.4,
  "cenaNoc": 95,
  "cenaUkupno": 760,
  "link": "https://www.agoda.com/en-gb/montemar/hotel/all/herceg-novi-me.html",
  "direktno": null
 },
 {
  "hotel": "Apartments Ivan",
  "mesto": "Petrovac",
  "ocena": 9.3,
  "cenaNoc": 84,
  "cenaUkupno": 672,
  "link": "https://www.agoda.com/en-gb/apartments-villa-relax/hotel/all/petrovac-me.html",
  "direktno": null
 },
 {
  "hotel": "Apartments Boka Vista",
  "mesto": "Herceg Novi",
  "ocena": 9.3,
  "cenaNoc": 184,
  "cenaUkupno": 1472,
  "link": "https://www.agoda.com/en-gb/apartments-boka-vista/hotel/all/herceg-novi-me.html",
  "direktno": null
 },
 {
  "hotel": "Olive Terrace Apartments 3 Rafailovici",
  "mesto": "Sveti Stefan",
  "ocena": 9.2,
  "cenaNoc": 67,
  "cenaUkupno": 536,
  "link": "https://www.agoda.com/en-gb/olive-terrace-apartments-3/hotel/all/budva-me.html",
  "direktno": null
 },
 {
  "hotel": "Villas Valentina",
  "mesto": "Herceg Novi",
  "ocena": 9.2,
  "cenaNoc": 146,
  "cenaUkupno": 1168,
  "link": "https://www.agoda.com/en-gb/villas-valentina/hotel/all/herceg-novi-me.html",
  "direktno": null
 },
 {
  "hotel": "WGrand hotel",
  "mesto": "Petrovac",
  "ocena": 9.1,
  "cenaNoc": 93,
  "cenaUkupno": 744,
  "link": "https://www.agoda.com/en-gb/apartment-alexandra/hotel/all/petrovac-me.html",
  "direktno": null
 },
 {
  "hotel": "Zemunella Guest House",
  "mesto": "Herceg Novi",
  "ocena": 8.9,
  "cenaNoc": 37,
  "cenaUkupno": 296,
  "link": "https://www.agoda.com/en-gb/vera/hotel/all/herceg-novi-me.html",
  "direktno": null
 },
 {
  "hotel": "Mahakala Center",
  "mesto": "Petrovac",
  "ocena": 8.9,
  "cenaNoc": 98,
  "cenaUkupno": 784,
  "link": "https://www.agoda.com/en-gb/hotel-petrovac/hotel/all/petrovac-na-moru-me.html",
  "direktno": null
 },
 {
  "hotel": "Apartments Visi Monte",
  "mesto": "Budva",
  "ocena": 8.9,
  "cenaNoc": 152,
  "cenaUkupno": 1216,
  "link": "https://www.agoda.com/en-gb/adria-h8785990/hotel/budva-me.html",
  "direktno": null
 },
 {
  "hotel": "Hotel Swiss Holiday",
  "mesto": "Sveti Stefan",
  "ocena": 8.8,
  "cenaNoc": 78,
  "cenaUkupno": 624,
  "link": "https://www.agoda.com/en-gb/hotel-swiss-holiday/hotel/budva-me.html",
  "direktno": null
 },
 {
  "hotel": "Goran Apartmani",
  "mesto": "Herceg Novi",
  "ocena": 8.8,
  "cenaNoc": 102,
  "cenaUkupno": 816,
  "link": "https://www.agoda.com/en-gb/goran-apartmani/hotel/all/herceg-novi-me.html",
  "direktno": null
 },
 {
  "hotel": "Beatrix Suites",
  "mesto": "Budva",
  "ocena": 8.7,
  "cenaNoc": 109,
  "cenaUkupno": 872,
  "link": "",
  "direktno": null
 },
 {
  "hotel": "Hotel Plaza",
  "mesto": "Budva",
  "ocena": 8.7,
  "cenaNoc": 180,
  "cenaUkupno": 1440,
  "link": "https://www.agoda.com/en-gb/dukley-hotel-resort/hotel/budva-me.html",
  "direktno": null
 },
 {
  "hotel": "Iberostar Waves Bellevue",
  "mesto": "Bečići",
  "ocena": 8.7,
  "cenaNoc": 305,
  "cenaUkupno": 2440,
  "link": "https://www.agoda.com/en-gb/iberostar-bellevue-all-inclusive/hotel/budva-me.html",
  "direktno": {
   "sajt": "https://www.iberostar.com/en/hotels/budva/iberostar-waves-bellevue/",
   "email": "bellevue@iberostar.com",
   "napomena": "Veliki all inclusive na samoj plazi u Becicima. Na Booking-u ga za ove datume NEMA uopste, na Agodi se pojavljuje — vredi pitati direktno. Telefon nije objavljen na iberostar.com; po strukovnim spiskovima je +382 33 425 100, ali to NIJE provereno na izvoru."
  }
 },
 {
  "hotel": "Apartment Sandra",
  "mesto": "Bečići",
  "ocena": 8.5,
  "cenaNoc": 42,
  "cenaUkupno": 336,
  "link": "https://www.agoda.com/en-gb/apartment-sandra_2/hotel/all/budva-me.html",
  "direktno": null
 },
 {
  "hotel": "Apartments and Rooms Levantin Inn",
  "mesto": "Sveti Stefan",
  "ocena": 8.5,
  "cenaNoc": 106,
  "cenaUkupno": 848,
  "link": "https://www.agoda.com/en-gb/apartments-and-rooms-levantin-inn/hotel/all/budva-me.html",
  "direktno": null
 }
];

// Logika strane. podaci.js (generisan) definiše KLJUC, HOTELI, MESTA, TEZINE, NOCI, BUDZET.

let stanje = {};
try { stanje = JSON.parse(localStorage.getItem(KLJUC)) || {}; } catch (e) { stanje = {}; }

const obradjen = (h) => !!stanje[h.id];
const snimi = () => { try { localStorage.setItem(KLJUC, JSON.stringify(stanje)); } catch (e) {} };

let tab = "aktivno";

const el  = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const eur = (n) => n.toLocaleString("sr-RS") + " €";
const PANSION_IME = { ND: "samo doručak", PP: "polupansion",
                      FB: "PUN PANSION", AI: "ALL INCLUSIVE", NA: "bez obroka" };
const RAZRADA_IME = {
  ocena: "ocena gostiju", cena: "cena ispod budžeta", plaza: "blizina plaže",
  centar: "blizina centra", zivost: "živost mesta", pansion: "pansion",
};

// Booking za hotele na plaži piše 0 m ili 1 m — to nije greška, prikaži rečima.
const metri = (m) => m == null ? "nema podatka"
  : m <= 20   ? "na samoj plaži"
  : m >= 1000 ? (m / 1000).toFixed(1).replace(".", ",") + " km"
  : m + " m";
const metriC = (m) => m == null ? "nema podatka"
  : m <= 20   ? "u samom centru"
  : m >= 1000 ? (m / 1000).toFixed(1).replace(".", ",") + " km"
  : m + " m";
const nivo = (c) => c <= BUDZET * 0.8 ? "dobro" : c <= BUDZET ? "granica" : "lose";
const bodNivo = (b) => b >= 62 ? "dobro" : b >= 48 ? "granica" : "lose";

function kartica(h) {
  const done = obradjen(h);
  const m = MESTA[h.mesto] || {};
  const red = [];

  const cene = Object.entries(h.cene).sort((a, b) => a[1] - b[1]);
  red.push([`Cena za dvoje<br><span class="mini">cela ${NOCI} noći</span>`,
    cene.map(([p, c]) =>
      `<strong class="suma ${nivo(c)}">${eur(c)}</strong> — ${esc(PANSION_IME[p])}` +
      (h.soba[p] ? `<br><span class="mini">${esc(h.soba[p])}</span>` : "")
    ).join("<br>") +
    (Object.keys(h.cene).length > 1
      ? `<br><span class="mini">razlika ${eur(Math.max(...Object.values(h.cene)) - Math.min(...Object.values(h.cene)))} između opcija</span>`
      : "")]);

  if (h.ocena) red.push(["Ocena gostiju",
    `<strong>${h.ocena}</strong>/10${h.brOcena ? ` <span class="mini">(${h.brOcena} ocena)</span>` : ""}` +
    (h.brOcena && h.brOcena < 40 ? ` <span class="mini">— malo ocena, manje pouzdano</span>` : "")]);

  red.push(["Do plaže", `<strong>${metri(h.plazaM)}</strong>` +
    (h.naPlazi ? ' <span class="mini">— Booking je vodi kao „na plaži“</span>' : "")]);
  red.push(["Do centra mesta", `<strong>${metriC(h.centarM)}</strong>` +
    (h.centarMesto && h.centarMesto !== h.mesto
      ? ` <span class="mini">— Booking centar računa od ${esc(h.centarMesto)}</span>` : "")]);
  // Agodina cena je PROCENA (njena cena po noći × broj noći) i ne zna se za koji
  // je pansion — zato stoji odvojeno od Booking-ovih cena i ne ulazi u bodove.
  if (h.agoda) red.push(["Za poređenje — Agoda",
    `<strong class="${h.jeftinijeAgoda ? "suma dobro" : ""}">≈ ${eur(h.agoda.cenaUkupno)}</strong>` +
    ` <span class="mini">(${eur(h.agoda.cenaNoc)} po noći × ${NOCI})</span>` +
    `<br><span class="mini">procena, sa taksama; ne zna se koji pansion — proveriti klikom</span>`]);

  const raz = Object.entries(h.razrada)
    .map(([k, v]) => `<div class="stub"><span>${esc(RAZRADA_IME[k])}</span>` +
      `<span class="mini">težina ${Math.round(TEZINE[k] * 100)}%</span>` +
      `<b>${v == null ? "?" : v}</b></div>`).join("");

  if (h.direktno) {
    const dd = h.direktno;
    red.push(["Direktno kod hotela",
      (dd.email ? `<a href="mailto:${esc(dd.email)}">${esc(dd.email)}</a><br>` : "") +
      (dd.telefon ? `<a href="tel:${esc(dd.telefon.replace(/[^+\d]/g, ""))}">${esc(dd.telefon)}</a><br>` : "") +
      `<span class="mini">${esc(dd.napomena || "")}</span>`]);
  }

  const maps = `https://www.google.com/maps/search/${encodeURIComponent(h.hotel + ", " + h.mesto + ", Montenegro")}`;
  const trazi = `https://www.google.com/search?q=${encodeURIComponent('"' + h.hotel + '" ' + h.mesto + " Montenegro zvanični sajt")}`;

  return `
  <div class="card${done ? " done" : ""}">
    <input type="checkbox" data-id="${esc(h.id)}" ${done ? "checked" : ""}
           aria-label="Označi kao obrađeno">
    <div class="body">
      <p class="pos">
        <span class="bod ${bodNivo(h.bodovi)}" title="Bodovi preporuke, vidi objašnjenje na dnu">${h.bodovi}</span>
        ${esc(h.hotel)} ${h.zvezdice ? `<span class="stars">${"★".repeat(h.zvezdice)}</span>` : ""}</p>
      <p class="firma">${esc(h.mesto)} — ${esc(h.rivijera)}</p>

      <div class="badges">
        ${Object.keys(h.cene).map(p => `<span class="badge p-${p}">${esc(PANSION_IME[p])}</span>`).join("")}
        <span class="badge ${h.uBudzetu ? "ok" : "bad"}">${h.uBudzetu ? "u budžetu" : "preko budžeta"}</span>
        ${h.naPlazi ? '<span class="badge ok">na plaži</span>' : ""}
        ${h.direktno ? '<span class="badge">ima direktan kontakt</span>' : ""}
        ${h.jeftinijeAgoda ? '<span class="badge ok">jeftinije na Agodi</span>' : ""}
        ${h.takseUkljucene ? '<span class="badge">takse uključene</span>' : '<span class="badge warn">takse se doplaćuju</span>'}
      </div>

      <dl>${red.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>

      <details class="mesto">
        <summary>O mestu: ${esc(h.mesto)}
          <span class="mini">(${"●".repeat(h.zivost)}${"○".repeat(5 - h.zivost)} živost)</span></summary>
        <p>${esc(m.tekst || "")}</p>
      </details>

      <details class="mesto">
        <summary>Zašto ${h.bodovi} bodova <span class="mini">(0–100)</span></summary>
        <div class="stubovi">${raz}</div>
        ${h.uBudzetu ? "" : '<p class="mini">Preko budžeta — ukupni bodovi su prepolovljeni.</p>'}
      </details>

      <div class="links">
        ${h.linkovi.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.naziv)} ↗</a>`).join("")}
        ${h.direktno && h.direktno.sajt
          ? `<a href="${esc(h.direktno.sajt)}" target="_blank" rel="noopener">Sajt hotela ↗</a>`
          : `<a href="${trazi}" target="_blank" rel="noopener">Traži hotel direktno ↗</a>`}
        ${h.agoda ? `<a href="${esc(h.agoda.link)}" target="_blank" rel="noopener">Agoda ↗</a>` : ""}
        <a href="${maps}" target="_blank" rel="noopener">Na mapi ↗</a>
      </div>
    </div>
  </div>`;
}

// Čipovi za pansion se prave iz podataka — da se nikad ne nudi filter koji daje nulu.
// (Pun pansion npr. za ove datume nema ni jedan slobodan hotel, pa se čip i ne pojavi.)
(function cipovi() {
  const ima = ["AI", "FB", "PP", "ND", "NA"].filter(p => HOTELI.some(h => h.cene[p]));
  el("pansion-filter").innerHTML = ima.map(p =>
    `<label><input type="checkbox" value="${p}"> ${PANSION_IME[p]}</label>`).join("");
})();

const aktivniPansioni = () =>
  [...document.querySelectorAll(".pansion-filter input:checked")].map(i => i.value);

function crtaj() {
  const q = el("q").value.trim().toLowerCase();
  const s = el("sort").value;
  const pans = aktivniPansioni();
  const minOcena = Number(el("ocena").value);
  const maxPlaza = Number(el("plaza").value);
  const maxCentar = Number(el("centar").value);
  const samoBudzet = el("samo-budzet").checked;

  let lista = HOTELI.filter(h => obradjen(h) === (tab === "obradjeno"));

  const cenaZa = (h) => {
    const k = pans.length ? pans.filter(p => h.cene[p]) : Object.keys(h.cene);
    return k.length ? Math.min(...k.map(p => h.cene[p])) : Infinity;
  };

  if (pans.length) lista = lista.filter(h => pans.some(p => h.cene[p]));
  lista = lista.filter(h => !minOcena || (h.ocena || 0) >= minOcena);
  // Hotel bez podatka o plaži se ne izbacuje filterom — bolje ga videti pa proveriti.
  if (maxPlaza < 1500) lista = lista.filter(h => h.plazaM == null || h.plazaM <= maxPlaza);
  if (maxCentar < 2500) lista = lista.filter(h => h.centarM == null || h.centarM <= maxCentar);
  if (samoBudzet) lista = lista.filter(h => cenaZa(h) <= BUDZET);
  if (q) lista = lista.filter(h =>
    [h.hotel, h.mesto, MESTA[h.mesto]?.tekst].filter(Boolean).join(" ").toLowerCase().includes(q));

  lista.sort((a, b) =>
      s === "cena"   ? cenaZa(a) - cenaZa(b)
    : s === "ocena"  ? (b.ocena || 0) - (a.ocena || 0) || b.bodovi - a.bodovi
    : s === "plaza"  ? (a.plazaM ?? 9999) - (b.plazaM ?? 9999) || b.bodovi - a.bodovi
    : s === "centar" ? (a.centarM ?? 9999) - (b.centarM ?? 9999) || b.bodovi - a.bodovi
    : s === "zivost" ? b.zivost - a.zivost || b.bodovi - a.bodovi
    : b.bodovi - a.bodovi);

  el("lista").innerHTML = lista.length
    ? lista.map(kartica).join("")
    : `<p class="empty">${tab === "obradjeno"
        ? "Još nijedan hotel nije obrađen."
        : "Nema hotela koji prolaze ove filtere. Otpusti neki filter."}</p>`;

  const brA = HOTELI.filter(h => !obradjen(h)).length;
  el("c-aktivno").textContent   = `(${brA})`;
  el("c-obradjeno").textContent = `(${HOTELI.length - brA})`;
  el("ocena-vrednost").textContent = minOcena ? `od ${minOcena.toFixed(1)}` : "sve";
  el("plaza-vrednost").textContent = maxPlaza >= 1500 ? "bez granice" : `do ${maxPlaza} m`;
  el("centar-vrednost").textContent = maxCentar >= 2500 ? "bez granice" : `do ${maxCentar} m`;
  el("broj").textContent = `${lista.length} od ${HOTELI.length}`;
  el("reset").hidden = tab !== "obradjeno";
}

el("lista").addEventListener("change", e => {
  const cb = e.target.closest("input[type=checkbox]");
  if (!cb || !cb.dataset.id) return;
  stanje[cb.dataset.id] = cb.checked;
  snimi();
  // Tragovi sa Agode. Namerno odvojeno od HOTELI i od bodovanja — vidi napravi.py.
(function agodaBlok() {
  if (typeof SAMO_AGODA === "undefined" || !SAMO_AGODA.length) return;
  el("agoda-blok").hidden = false;
  el("agoda-lista").innerHTML = `<table class="tragovi">
    <thead><tr><th>Smeštaj</th><th>Mesto <span class="mini">(Agodino)</span></th>
      <th>Ocena</th><th>Procena za ${NOCI} noći</th><th></th></tr></thead>
    <tbody>${SAMO_AGODA.map(a => `<tr>
      <td>${esc(a.hotel)}</td>
      <td>${esc(a.mesto)}</td>
      <td>${a.ocena ?? "—"}</td>
      <td class="${a.cenaUkupno <= BUDZET ? "suma dobro" : ""}">≈ ${eur(a.cenaUkupno)}
        <span class="mini">(${eur(a.cenaNoc)}/noć)</span></td>
      <td>${a.link ? `<a href="${esc(a.link)}" target="_blank" rel="noopener">Agoda ↗</a>` : ""}
        ${a.direktno ? `<br><a href="${esc(a.direktno.sajt)}" target="_blank" rel="noopener">Sajt ↗</a>
          ${a.direktno.telefon ? `<br><a href="tel:${esc(a.direktno.telefon.replace(/[^+\d]/g, ""))}">${esc(a.direktno.telefon)}</a>` : ""}
          ${a.direktno.email ? `<br><a href="mailto:${esc(a.direktno.email)}">${esc(a.direktno.email)}</a>` : ""}
          <br><span class="mini">${esc(a.direktno.napomena || "")}</span>` : ""}</td>
    </tr>`).join("")}</tbody></table>`;
})();

crtaj();
});

for (const [id, val] of [["tab-aktivno", "aktivno"], ["tab-obradjeno", "obradjeno"]]) {
  el(id).addEventListener("click", () => {
    tab = val;
    el("tab-aktivno").setAttribute("aria-selected", String(val === "aktivno"));
    el("tab-obradjeno").setAttribute("aria-selected", String(val === "obradjeno"));
    // Tragovi sa Agode. Namerno odvojeno od HOTELI i od bodovanja — vidi napravi.py.
(function agodaBlok() {
  if (typeof SAMO_AGODA === "undefined" || !SAMO_AGODA.length) return;
  el("agoda-blok").hidden = false;
  el("agoda-lista").innerHTML = `<table class="tragovi">
    <thead><tr><th>Smeštaj</th><th>Mesto <span class="mini">(Agodino)</span></th>
      <th>Ocena</th><th>Procena za ${NOCI} noći</th><th></th></tr></thead>
    <tbody>${SAMO_AGODA.map(a => `<tr>
      <td>${esc(a.hotel)}</td>
      <td>${esc(a.mesto)}</td>
      <td>${a.ocena ?? "—"}</td>
      <td class="${a.cenaUkupno <= BUDZET ? "suma dobro" : ""}">≈ ${eur(a.cenaUkupno)}
        <span class="mini">(${eur(a.cenaNoc)}/noć)</span></td>
      <td>${a.link ? `<a href="${esc(a.link)}" target="_blank" rel="noopener">Agoda ↗</a>` : ""}
        ${a.direktno ? `<br><a href="${esc(a.direktno.sajt)}" target="_blank" rel="noopener">Sajt ↗</a>
          ${a.direktno.telefon ? `<br><a href="tel:${esc(a.direktno.telefon.replace(/[^+\d]/g, ""))}">${esc(a.direktno.telefon)}</a>` : ""}
          ${a.direktno.email ? `<br><a href="mailto:${esc(a.direktno.email)}">${esc(a.direktno.email)}</a>` : ""}
          <br><span class="mini">${esc(a.direktno.napomena || "")}</span>` : ""}</td>
    </tr>`).join("")}</tbody></table>`;
})();

crtaj();
  });
}

el("q").addEventListener("input", crtaj);
el("sort").addEventListener("change", crtaj);
for (const id of ["ocena", "plaza", "centar"]) el(id).addEventListener("input", crtaj);
el("samo-budzet").addEventListener("change", crtaj);
document.querySelectorAll(".pansion-filter input").forEach(i => i.addEventListener("change", crtaj));
el("reset").addEventListener("click", () => {
  if (!confirm("Vratiti sve hotele u „Aktivno“?")) return;
  stanje = {}; snimi(); // Tragovi sa Agode. Namerno odvojeno od HOTELI i od bodovanja — vidi napravi.py.
(function agodaBlok() {
  if (typeof SAMO_AGODA === "undefined" || !SAMO_AGODA.length) return;
  el("agoda-blok").hidden = false;
  el("agoda-lista").innerHTML = `<table class="tragovi">
    <thead><tr><th>Smeštaj</th><th>Mesto <span class="mini">(Agodino)</span></th>
      <th>Ocena</th><th>Procena za ${NOCI} noći</th><th></th></tr></thead>
    <tbody>${SAMO_AGODA.map(a => `<tr>
      <td>${esc(a.hotel)}</td>
      <td>${esc(a.mesto)}</td>
      <td>${a.ocena ?? "—"}</td>
      <td class="${a.cenaUkupno <= BUDZET ? "suma dobro" : ""}">≈ ${eur(a.cenaUkupno)}
        <span class="mini">(${eur(a.cenaNoc)}/noć)</span></td>
      <td>${a.link ? `<a href="${esc(a.link)}" target="_blank" rel="noopener">Agoda ↗</a>` : ""}
        ${a.direktno ? `<br><a href="${esc(a.direktno.sajt)}" target="_blank" rel="noopener">Sajt ↗</a>
          ${a.direktno.telefon ? `<br><a href="tel:${esc(a.direktno.telefon.replace(/[^+\d]/g, ""))}">${esc(a.direktno.telefon)}</a>` : ""}
          ${a.direktno.email ? `<br><a href="mailto:${esc(a.direktno.email)}">${esc(a.direktno.email)}</a>` : ""}
          <br><span class="mini">${esc(a.direktno.napomena || "")}</span>` : ""}</td>
    </tr>`).join("")}</tbody></table>`;
})();

crtaj();
});

// Tragovi sa Agode. Namerno odvojeno od HOTELI i od bodovanja — vidi napravi.py.
(function agodaBlok() {
  if (typeof SAMO_AGODA === "undefined" || !SAMO_AGODA.length) return;
  el("agoda-blok").hidden = false;
  el("agoda-lista").innerHTML = `<table class="tragovi">
    <thead><tr><th>Smeštaj</th><th>Mesto <span class="mini">(Agodino)</span></th>
      <th>Ocena</th><th>Procena za ${NOCI} noći</th><th></th></tr></thead>
    <tbody>${SAMO_AGODA.map(a => `<tr>
      <td>${esc(a.hotel)}</td>
      <td>${esc(a.mesto)}</td>
      <td>${a.ocena ?? "—"}</td>
      <td class="${a.cenaUkupno <= BUDZET ? "suma dobro" : ""}">≈ ${eur(a.cenaUkupno)}
        <span class="mini">(${eur(a.cenaNoc)}/noć)</span></td>
      <td>${a.link ? `<a href="${esc(a.link)}" target="_blank" rel="noopener">Agoda ↗</a>` : ""}
        ${a.direktno ? `<br><a href="${esc(a.direktno.sajt)}" target="_blank" rel="noopener">Sajt ↗</a>
          ${a.direktno.telefon ? `<br><a href="tel:${esc(a.direktno.telefon.replace(/[^+\d]/g, ""))}">${esc(a.direktno.telefon)}</a>` : ""}
          ${a.direktno.email ? `<br><a href="mailto:${esc(a.direktno.email)}">${esc(a.direktno.email)}</a>` : ""}
          <br><span class="mini">${esc(a.direktno.napomena || "")}</span>` : ""}</td>
    </tr>`).join("")}</tbody></table>`;
})();

crtaj();

// Logika strane. podaci.js (generisan) definiše KLJUC, HOTELI, MESTA, TEZINE, NOCI, BUDZET.

let stanje = {};
try { stanje = JSON.parse(localStorage.getItem(KLJUC)) || {}; } catch (e) { stanje = {}; }

const obradjen = (h) => !!stanje[h.id];
const snimi = () => { try { localStorage.setItem(KLJUC, JSON.stringify(stanje)); } catch (e) {} };

let tab = "aktivno";

const el  = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const eur = (n) => n.toLocaleString("sr-RS") + " €";
const PANSION_IME = { PP: "polupansion", AI: "ALL INCLUSIVE" };
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
    ).join("<br>")]);

  if (h.ocena) red.push(["Ocena gostiju",
    `<strong>${h.ocena}</strong>/10${h.brOcena ? ` <span class="mini">(${h.brOcena} ocena)</span>` : ""}` +
    (h.brOcena && h.brOcena < 40 ? ` <span class="mini">— malo ocena, manje pouzdano</span>` : "")]);

  red.push(["Do plaže", `<strong>${metri(h.plazaM)}</strong>` +
    (h.naPlazi ? ' <span class="mini">— Booking je vodi kao „na plaži“</span>' : "")]);
  red.push(["Do centra mesta", `<strong>${metriC(h.centarM)}</strong>` +
    (h.centarMesto && h.centarMesto !== h.mesto
      ? ` <span class="mini">— Booking centar računa od ${esc(h.centarMesto)}</span>` : "")]);
  red.push(["Od Soluna", `${h.km} km, vožnja oko ${esc(h.vozOko)}`]);

  const raz = Object.entries(h.razrada)
    .map(([k, v]) => `<div class="stub"><span>${esc(RAZRADA_IME[k])}</span>` +
      `<span class="mini">težina ${Math.round(TEZINE[k] * 100)}%</span>` +
      `<b>${v == null ? "?" : v}</b></div>`).join("");

  const maps = `https://www.google.com/maps/dir/Thessaloniki/${encodeURIComponent(h.hotel + ", " + h.mesto + ", Greece")}`;

  return `
  <div class="card${done ? " done" : ""}">
    <input type="checkbox" data-id="${esc(h.id)}" ${done ? "checked" : ""}
           aria-label="Označi kao obrađeno">
    <div class="body">
      <p class="pos">
        <span class="bod ${bodNivo(h.bodovi)}" title="Bodovi preporuke, vidi objašnjenje na dnu">${h.bodovi}</span>
        ${esc(h.hotel)} ${h.zvezdice ? `<span class="stars">${"★".repeat(h.zvezdice)}</span>` : ""}</p>
      <p class="firma">${esc(h.mesto)} — ${h.km} km od Soluna</p>

      <div class="badges">
        ${Object.keys(h.cene).map(p => `<span class="badge p-${p}">${esc(PANSION_IME[p])}</span>`).join("")}
        <span class="badge ${h.uBudzetu ? "ok" : "bad"}">${h.uBudzetu ? "u budžetu" : "preko budžeta"}</span>
        ${h.naPlazi ? '<span class="badge ok">na plaži</span>' : ""}
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
        <a href="${maps}" target="_blank" rel="noopener">Ruta od Soluna ↗</a>
      </div>
    </div>
  </div>`;
}

const aktivniPansioni = () =>
  [...document.querySelectorAll(".pansion-filter input:checked")].map(i => i.value);

function crtaj() {
  const q = el("q").value.trim().toLowerCase();
  const s = el("sort").value;
  const pans = aktivniPansioni();
  const maxKm = Number(el("km").value);
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
  lista = lista.filter(h => h.km <= maxKm);
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
    : s === "km"     ? a.km - b.km || b.bodovi - a.bodovi
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
  el("km-vrednost").textContent    = maxKm >= 125 ? "bez granice" : `do ${maxKm} km`;
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
  crtaj();
});

for (const [id, val] of [["tab-aktivno", "aktivno"], ["tab-obradjeno", "obradjeno"]]) {
  el(id).addEventListener("click", () => {
    tab = val;
    el("tab-aktivno").setAttribute("aria-selected", String(val === "aktivno"));
    el("tab-obradjeno").setAttribute("aria-selected", String(val === "obradjeno"));
    crtaj();
  });
}

el("q").addEventListener("input", crtaj);
el("sort").addEventListener("change", crtaj);
for (const id of ["km", "ocena", "plaza", "centar"]) el(id).addEventListener("input", crtaj);
el("samo-budzet").addEventListener("change", crtaj);
document.querySelectorAll(".pansion-filter input").forEach(i => i.addEventListener("change", crtaj));
el("reset").addEventListener("click", () => {
  if (!confirm("Vratiti sve hotele u „Aktivno“?")) return;
  stanje = {}; snimi(); crtaj();
});

crtaj();

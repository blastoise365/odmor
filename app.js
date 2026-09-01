// Logika strane. podaci.js (generisan) definiše KLJUC, HOTELI, MESTA, NOCI, OSOBA, BUDZET.

let stanje = {};
try { stanje = JSON.parse(localStorage.getItem(KLJUC)) || {}; } catch (e) { stanje = {}; }

const obradjen = (h) => !!stanje[h.id];
const snimi = () => { try { localStorage.setItem(KLJUC, JSON.stringify(stanje)); } catch (e) {} };

let tab = "aktivno";

const el  = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const eur = (n) => n.toLocaleString("sr-RS") + " €";
const PANSION_IME = { PP: "polupansion", AI: "ALL INCLUSIVE" };

// Boja cene: zeleno lepo ispod budžeta, žuto na granici, crveno preko.
function nivo(c) {
  if (c <= BUDZET * 0.8) return "dobro";
  if (c <= BUDZET)       return "granica";
  return "lose";
}

function kartica(h) {
  const done = obradjen(h);
  const m = MESTA[h.mesto] || {};
  const red = [];

  // Cene po pansionu, od najjeftinije
  const cene = Object.entries(h.cene).sort((a, b) => a[1] - b[1]);
  red.push(["Cena za dvoje<br><span class=\"mini\">cela " + NOCI + " noći</span>",
    cene.map(([p, c]) =>
      `<strong class="suma ${nivo(c)}">${eur(c)}</strong> — ${esc(PANSION_IME[p])}` +
      (h.soba[p] ? `<br><span class="mini">${esc(h.soba[p])}</span>` : "")
    ).join("<br>")]);

  if (h.ocena) red.push(["Ocena gostiju",
    `<strong>${h.ocena}</strong>/10${h.brOcena ? ` <span class="mini">(${h.brOcena} ocena)</span>` : ""}`]);
  red.push(["Položaj", esc(h.udaljenostOdCentra) + (h.plazaBlizu ? " · plaža u blizini" : "")]);
  red.push(["Od Soluna", h.uMestu
    ? `${h.km} km, vožnja oko ${esc(h.vozOko)}`
    : `<strong>${esc(h.kmOpis)}</strong> <span class="mini">— raspon, jer je hotel ` +
      `${esc(h.udaljenostOdCentra)}, pa se ne zna u kom smeru. ${h.km} km je do centra ` +
      `${esc(h.mesto)}.</span>`]);

  const maps = `https://www.google.com/maps/dir/Thessaloniki/${encodeURIComponent(h.hotel + ", " + h.mesto + ", Greece")}`;

  return `
  <div class="card${done ? " done" : ""}">
    <input type="checkbox" data-id="${esc(h.id)}" ${done ? "checked" : ""}
           aria-label="Označi kao obrađeno">
    <div class="body">
      <p class="pos">${esc(h.hotel)} ${h.zvezdice ? `<span class="stars">${"★".repeat(h.zvezdice)}</span>` : ""}</p>
      <p class="firma">${h.uMestu ? esc(h.mesto) : "okolina " + esc(h.mesto)} — ${esc(h.kmOpis)} od Soluna</p>

      <div class="badges">
        ${Object.keys(h.cene).map(p => `<span class="badge p-${p}">${esc(PANSION_IME[p])}</span>`).join("")}
        <span class="badge ${h.uBudzetu ? "ok" : "bad"}">${h.uBudzetu ? "u budžetu" : "preko budžeta"}</span>
        ${h.takseUkljucene ? '<span class="badge ok">takse uključene</span>' : '<span class="badge warn">takse se doplaćuju</span>'}
        ${h.plazaBlizu ? '<span class="badge">plaža u blizini</span>' : ""}
        ${h.uMestu ? "" : '<span class="badge warn">okolina, ne samo mesto</span>'}
      </div>

      <dl>${red.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>

      <details class="mesto">
        <summary>O mestu: ${esc(h.mesto)}
          <span class="mini">(${"●".repeat(h.zivost)}${"○".repeat(5 - h.zivost)} živost)</span></summary>
        <p>${esc(m.tekst || "")}</p>
        ${h.uMestu ? "" : `<p class="mini"><strong>Pazi:</strong> ovaj hotel nije u samom mestu —
          ${esc(h.udaljenostOdCentra)}. Opis gore se odnosi na ${esc(h.mesto)}; da bi se išlo na
          večeru u mesto, treba auto.</p>`}
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
  const samoBudzet = el("samo-budzet").checked;
  const samoUMestu = el("samo-u-mestu").checked;

  let lista = HOTELI.filter(h => obradjen(h) === (tab === "obradjeno"));

  // Kad je pansion izabran, cena za rangiranje je cena TOG pansiona.
  const cenaZa = (h) => {
    const k = pans.length ? pans.filter(p => h.cene[p]) : Object.keys(h.cene);
    return k.length ? Math.min(...k.map(p => h.cene[p])) : Infinity;
  };

  if (pans.length) lista = lista.filter(h => pans.some(p => h.cene[p]));
  lista = lista.filter(h => h.km <= maxKm);
  lista = lista.filter(h => !minOcena || (h.ocena || 0) >= minOcena);
  if (samoBudzet) lista = lista.filter(h => cenaZa(h) <= BUDZET);
  if (samoUMestu) lista = lista.filter(h => h.uMestu);
  if (q) lista = lista.filter(h =>
    [h.hotel, h.mesto, MESTA[h.mesto]?.tekst].filter(Boolean).join(" ").toLowerCase().includes(q));

  lista.sort((a, b) =>
      s === "km"     ? a.km - b.km || cenaZa(a) - cenaZa(b)
    : s === "ocena"  ? (b.ocena || 0) - (a.ocena || 0) || cenaZa(a) - cenaZa(b)
    : s === "zivost" ? b.zivost - a.zivost || cenaZa(a) - cenaZa(b)
    : cenaZa(a) - cenaZa(b));

  el("lista").innerHTML = lista.length
    ? lista.map(kartica).join("")
    : `<p class="empty">${tab === "obradjeno"
        ? "Još nijedan hotel nije obrađen."
        : "Nema hotela koji prolaze ove filtere. Otpusti neki filter."}</p>`;

  const brA = HOTELI.filter(h => !obradjen(h)).length;
  el("c-aktivno").textContent   = `(${brA})`;
  el("c-obradjeno").textContent = `(${HOTELI.length - brA})`;
  el("km-vrednost").textContent = maxKm >= 115 ? "bez granice" : `do ${maxKm} km`;
  el("ocena-vrednost").textContent = minOcena ? `od ${minOcena.toFixed(1)}` : "sve";
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
el("km").addEventListener("input", crtaj);
el("ocena").addEventListener("input", crtaj);
el("samo-budzet").addEventListener("change", crtaj);
el("samo-u-mestu").addEventListener("change", crtaj);
document.querySelectorAll(".pansion-filter input").forEach(i => i.addEventListener("change", crtaj));
el("reset").addEventListener("click", () => {
  if (!confirm("Vratiti sve hotele u „Aktivno“?")) return;
  stanje = {}; snimi(); crtaj();
});

crtaj();

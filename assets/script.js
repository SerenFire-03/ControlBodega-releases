/* ============================================================
   Control Bodega — Script de releases
   Muestra la última versión destacada con botones v8a/v7a y
   las anteriores plegadas. Carga datos desde la API de GitHub.
   ============================================================ */

const RELEASES_URL = `https://api.github.com/repos/${window.CONFIG.repo}/releases`;

function formatearFecha(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("es-VE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatearBytes(bytes) {
  if (!bytes || isNaN(bytes)) return "";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function esApk(name) {
  return (name || "").toLowerCase().endsWith(".apk");
}

// Detecta si el APK es de 64 bits (v8a) o de 32 bits (v7a)
function detectarArquitectura(name) {
  const n = (name || "").toLowerCase();
  if (n.includes("arm64-v8a"))
    return { clave: "v8a", orden: 1, label: "v8a", detalle: "64 bits" };
  if (n.includes("armeabi-v7a"))
    return { clave: "v7a", orden: 2, label: "v7a", detalle: "32 bits" };
  if (n.includes("x86_64"))
    return { clave: "x86_64", orden: 3, label: "x86_64", detalle: "Emulador" };
  return { clave: "universal", orden: 4, label: "Universal", detalle: "Cualquier Android" };
}

function crearBotonDescarga(asset) {
  const arq = detectarArquitectura(asset.name);
  const btn = document.createElement("a");
  btn.className = `asset-link arq-${arq.clave}`;
  btn.href = asset.browser_download_url;
  btn.target = "_blank";
  btn.rel = "noopener";
  btn.innerHTML =
    `<span class="arq-label">${arq.label}</span>` +
    `<span class="arq-detail">${arq.detalle}</span>` +
    `<span class="arq-size">${formatearBytes(asset.size)}</span>`;
  return btn;
}

function apksOrdenados(release) {
  return (release.assets || [])
    .filter((a) => esApk(a.name))
    .map((asset) => ({ asset, arq: detectarArquitectura(asset.name) }))
    .sort((a, b) => a.arq.orden - b.arq.orden || a.asset.name.localeCompare(b.asset.name));
}

// Tarjeta grande para la ÚLTIMA versión
function crearTarjetaUltima(release) {
  const el = document.createElement("div");
  el.className = "release release-latest-box";

  const head = document.createElement("div");
  head.className = "release-head";
  const tag = document.createElement("span");
  tag.className = "release-tag";
  tag.textContent = release.tag_name || "Última versión";
  const badge = document.createElement("span");
  badge.className = "release-latest";
  badge.textContent = "Última";
  head.append(tag, badge);
  el.appendChild(head);

  const date = document.createElement("div");
  date.className = "release-date";
  date.textContent = formatearFecha(release.published_at);
  el.appendChild(date);

  if (release.body) {
    const notes = document.createElement("div");
    notes.className = "release-notes";
    notes.textContent = release.body.trim();
    el.appendChild(notes);
  }

  const apks = apksOrdenados(release);
  if (apks.length) {
    const box = document.createElement("div");
    box.className = "release-assets latest-assets";
    apks.forEach(({ asset }) => box.appendChild(crearBotonDescarga(asset)));
    el.appendChild(box);
  } else {
    const no = document.createElement("div");
    no.className = "no-releases";
    no.textContent = "Esta versión no tiene APK adjunto.";
    el.appendChild(no);
  }

  return el;
}

// Fila compacta para VERSIONES ANTERIORES
function crearFilaAnterior(release) {
  const fila = document.createElement("div");
  fila.className = "release-old";

  const info = document.createElement("div");
  info.className = "release-old-info";
  const tag = document.createElement("span");
  tag.className = "release-old-tag";
  tag.textContent = release.tag_name || "Release";
  const fecha = document.createElement("span");
  fecha.className = "release-date";
  fecha.textContent = formatearFecha(release.published_at);
  info.append(tag, fecha);
  fila.appendChild(info);

  const links = document.createElement("div");
  links.className = "release-old-links";
  const apks = apksOrdenados(release);
  if (apks.length) {
    apks.forEach(({ asset, arq }) => {
      const a = document.createElement("a");
      a.className = `mini-link arq-${arq.clave}`;
      a.href = asset.browser_download_url;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = `${arq.label} · ${formatearBytes(asset.size)}`;
      links.appendChild(a);
    });
  } else {
    links.textContent = "Sin APK";
    links.className += " muted";
  }
  fila.appendChild(links);

  return fila;
}

async function cargarReleases() {
  const cont = document.getElementById("releases");
  cont.innerHTML = '<div class="loading">Cargando versiones…</div>';

  try {
    const res = await fetch(RELEASES_URL, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) {
      if (res.status === 404)
        throw new Error("No se encontró el repositorio. Revisa assets/config.js.");
      throw new Error(`Error al leer GitHub (${res.status}).`);
    }

    const releases = await res.json();
    cont.innerHTML = "";

    if (!releases.length) {
      const msg = document.createElement("div");
      msg.className = "no-releases";
      msg.textContent = "Aún no hay versiones publicadas. ¡Pronto habrá novedades!";
      cont.appendChild(msg);
      const span = document.getElementById("latest-version");
      if (span) span.textContent = "próximamente";
      return;
    }

    const limit = window.CONFIG.maxReleases || 10;
    const mostrar = releases.slice(0, limit);

    cont.appendChild(crearTarjetaUltima(mostrar[0]));

    const span = document.getElementById("latest-version");
    if (span) span.textContent = mostrar[0].tag_name;

    // Versiones anteriores → plegadas detrás de un botón pequeño
    const anteriores = mostrar.slice(1);
    if (anteriores.length) {
      const toggle = document.createElement("button");
      toggle.className = "btn-older";
      toggle.type = "button";
      toggle.textContent = `▾ Versiones anteriores (${anteriores.length})`;

      const box = document.createElement("div");
      box.className = "older-releases";
      box.hidden = true;
      anteriores.forEach((release) => box.appendChild(crearFilaAnterior(release)));

      toggle.addEventListener("click", () => {
        const estaOculta = box.hidden;
        box.hidden = !estaOculta;
        toggle.textContent = estaOculta
          ? `▴ Versiones anteriores (${anteriores.length})`
          : `▾ Versiones anteriores (${anteriores.length})`;
      });

      cont.appendChild(toggle);
      cont.appendChild(box);
    }
  } catch (err) {
    const msg = document.createElement("div");
    msg.className = "error-releases";
    msg.textContent = "No se pudieron cargar las versiones: " + err.message;
    cont.innerHTML = "";
    cont.appendChild(msg);
    const span = document.getElementById("latest-version");
    if (span) span.textContent = "consultar";
  }
}

document.addEventListener("DOMContentLoaded", cargarReleases);
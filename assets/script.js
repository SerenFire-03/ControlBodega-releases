/* ============================================================
   Control Bodega — Script de releases
   Carga las versiones publicadas desde la API de GitHub.
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
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function crearTarjeta(release, esUltima) {
  const el = document.createElement("div");
  el.className = "release";

  const head = document.createElement("div");
  head.className = "release-head";

  const tag = document.createElement("span");
  tag.className = "release-tag";
  tag.textContent = release.tag_name || "Release";

  head.appendChild(tag);
  if (esUltima) {
    const badge = document.createElement("span");
    badge.className = "release-latest";
    badge.textContent = "Última";
    head.appendChild(badge);
  }

  const date = document.createElement("span");
  date.className = "release-date";
  date.textContent = formatearFecha(release.published_at);
  head.appendChild(date);

  el.appendChild(head);

  if (release.body) {
    const notes = document.createElement("div");
    notes.className = "release-notes";
    notes.textContent = release.body.trim();
    el.appendChild(notes);
  }

  const assets = (release.assets || []).filter((a) =>
    a.name.toLowerCase().endsWith(".apk")
  );

  if (assets.length > 0) {
    const box = document.createElement("div");
    box.className = "release-assets";
    assets.forEach((asset) => {
      const link = document.createElement("a");
      link.className = "asset-link";
      link.href = asset.browser_download_url;
      link.target = "_blank";
      link.rel = "noopener";
      link.innerHTML = `⬇ ${
        asset.name
      } <span class="asset-size">${formatearBytes(asset.size)}</span>`;
      box.appendChild(link);
    });
    el.appendChild(box);
  } else {
    const noAsset = document.createElement("div");
    noAsset.className = "no-releases";
    noAsset.textContent = "Esta versión no tiene archivo APK adjunto.";
    el.appendChild(noAsset);
  }

  return el;
}

async function cargarReleases() {
  const cont = document.getElementById("releases");
  cont.innerHTML = '<div class="loading">Cargando versiones…</div>';

  try {
    const res = await fetch(RELEASES_URL, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(
          "No se encontró el repositorio. Revisa assets/config.js."
        );
      }
      throw new Error(`Error al leer GitHub (${res.status}).`);
    }

    const releases = await res.json();
    cont.innerHTML = "";

    if (!releases.length) {
      const msg = document.createElement("div");
      msg.className = "no-releases";
      msg.textContent =
        "Aún no hay versiones publicadas. ¡Pronto habrá novedades!";
      cont.appendChild(msg);
      const span = document.getElementById("latest-version");
      if (span) span.textContent = "próximamente";
      return;
    }

    const limit = window.CONFIG.maxReleases || 10;
    const mostrar = releases.slice(0, limit);
    mostrar.forEach((release, i) => {
      cont.appendChild(crearTarjeta(release, i === 0));
    });

    const span = document.getElementById("latest-version");
    if (span) span.textContent = releases[0].tag_name;
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
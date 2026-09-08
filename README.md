# app_bodega (releases)

Página web **gratuita** publicada con **GitHub Pages** que muestra la app
**Control Bodega**, sus características y todas las versiones (APK) publicadas
como **GitHub Releases**.

## Estructura

```
app_bodega (releases)/
├── index.html              # Página principal (hero, características, descargas, FAQ)
├── empresa.html            # Página de la empresa (Elijos Tech, tema oscuro violeta)
├── assets/
│   ├── icon.png            # Logo de la app (Control Bodega)
│   ├── logo.png            # Logo real de la empresa (blanco, transparente)
│   ├── styles.css          # Estilos base teal #117D7A (home / app)
│   ├── empresa.css         # Estilos dark violeta #7C3CFF (empresa.html)
│   ├── empresa.js          # Nav/menú móvil/reveal de empresa.html
│   ├── config.js           # Configuración: repo + nombre de la app
│   └── script.js           # Carga los releases desde la API de GitHub
├── subir_release.sh        # Script para compilar el APK y publicar el release
└── README.md
```

## Cómo publicar la web (GitHub Pages)

El contenido vive en el repositorio público **`SerenFire-03/ControlBodega-releases`**
(rama `main`, carpeta raíz). Para que la web quede online:

1. Crea una copia local del repo y añade los archivos:
   ```bash
   git clone https://github.com/SerenFire-03/ControlBodega-releases.git
   # copia aquí: index.html y la carpeta assets/
   git add .
   git commit -m "Pagina web de releases de Control Bodega"
   git push
   ```
2. En GitHub: **Settings → Pages** → Source: **Deploy from a branch** →
   rama **main** → carpeta **/ (root)** → **Save**.
3. La web queda disponible en:
   `https://SerenFire-03.github.io/ControlBodega-releases/`

### Configuración

En `assets/config.js` está el repo público donde se publican los APK (y donde
vive la propia web):

```js
repo: "SerenFire-03/ControlBodega-releases",
```

> La página usa la API pública de GitHub (sin clave), por eso el repo debe ser
> **público**. Ya hay un release `0.8.3` que la web mostrará automáticamente.

## Cómo publicar un nuevo release del APK

### Opción A — Con GitHub CLI (recomendado)

```bash
# 1 vez: instalar y autenticar
sudo apt install gh
gh auth login

# Para cada versión nueva:
./subir_release.sh "Novedades de esta versión"
```

El script:
1. Compila la versión del proyecto `app_bodega (Fenix)` con `flutter build apk --release --split-per-abi`,
   que genera un APK por arquitectura:
   - `app-arm64-v8a-release.apk` → **v8a · 64 bits**
   - `app-armeabi-v7a-release.apk` → **v7a · 32 bits**
2. Lee la versión de `pubspec.yaml` (ej. `0.8.7`).
3. Crea el release con tag `v0.8.7` y adjunta **ambos** APK.

> En la web, la última versión sale con **v8a (64 bits)** como descarga
> predeterminada (botón grande) y **v7a (32 bits)** como opción secundaria más
> pequeña, para teléfonos baratos con Android de 32 bits (p. ej. Redmi 9A o
> Motorolas de gama baja con Android 10). Hay un aviso que indica usar v7a si
> falla la instalación de v8a. Las versiones anteriores quedan ocultas bajo el
> botón pequeño **"Versiones anteriores"**.

### Opción B — Manual desde el navegador

1. Verifica que la última versión del proyecto `app_bodega (Fenix)` esté subida a GitHub.
2. En el repo público de releases: **Releases → Create a new release**.
3. Crea el tag `vX.Y.Z` (debe coincidir con la versión de `pubspec.yaml`).
4. Escribe las notas/changelog y adjunta los dos APK:
   - `build/app/outputs/flutter-apk/app-arm64-v8a-release.apk` (64 bits)
   - `build/app/outputs/flutter-apk/app-armeabi-v7a-release.apk` (32 bits)

En unos segundos la web mostrará la nueva versión con sus botones v8a/v7a.

## Versión y tagline de la app

`pubspec.yaml`: `name: Control_Bodega`, `version: 0.8.7`.
Fuente de contexto completa: `CONTEXT.md` en el proyecto `app_bodega (Fenix)`.
# Identidad Visual — Control Bodega / Elijos Tech

> Guía de referencia para mantener coherencia visual entre la app Flutter, la web de releases y cualquier material de la marca.

---

## 0. Doble identidad

| Página / Producto | Paleta |
|---|---|
| **App Control Bodega** (Flutter) y **home `index.html`** | **Teal** claro (`#117D7A` / `#0A4C4C`) |
| **Página de la empresa** (`empresa.html`) | **Dark violeta** (`#07070b` / `#7C3CFF`) según el prototipo oficial |

La web separa los dos estilos en dos CSS completamente independientes:
- `assets/styles.css` → paleta **teal** (home `index.html`).
- `assets/empresa.css` → **dark violeta**, exclusiva de `empresa.html` (no usa el CSS del home).

---

## 1. Colores

### Paleta de la app / home (teal) — `index.html`

| Token | HEX | Uso |
|---|---|---|
| `primaryDark` | `#0A4C4C` | Footer, gradiente hero profundo, hover de botones |
| `primary` | `#117D7A` | Botones, links, iconos activos, badges |
| `primarySoft` | `#14A19B` | Acentos vivos, pulse dot, detalles |
| `primaryLight` | `#E6F4F2` | Fondos suaves, chips, badges claros |
| `bg` | `#F4F7F7` | Fondo general de la web |
| `surface` | `#FFFFFF` | Cards, paneles, modales |
| `textMain` | `#1F2937` | Texto principal |
| `textSecondary` | `#6B7280` | Texto secundario / descripciones |
| `textMuted` | `#9CA3AF` | Texto apagado / placeholders |
| `danger` | `#E74C3C` | Errores, eliminar, alertas |
| `success` | `#4CAF50` | Confirmaciones, stock OK |
| `warning` | `#F59E0B` | Advertencias, badges dorados |
| `border` | `#E5E7EB` | Bordes sutiles de cards y separadores |

**Gradientes teal:**
- **Hero:** `linear-gradient(150deg, #063B3B 0%, #0A4C4C 45%, #117D7A 100%)`.
- **CTA panel:** `linear-gradient(140deg, var(--primary-dark), var(--primary))`.
- **Tarjeta empresa (descargas):** `linear-gradient(135deg, #0D5554, #0A4C4C)`.

### Paleta de la empresa (dark violeta) — `empresa.html`

| Token | HEX | Uso |
|---|---|---|
| `bg` | `#07070b` | Fondo global con glows radiales violeta |
| `panel / panel2` | `#0e0f16` / `#131420` | Menú móvil, cards con gradiente |
| `violet` | `#7C3CFF` | Acabados violeta, glows, dots |
| `violet2` | `#A36BFF` | Acentos de texto (span de h1) |
| `text` | `#F5F5F7` | Texto principal (blanco) |
| `muted` | `#A5A7B4` | Texto secundario / descripciones |
| `line` | `rgba(255,255,255,.10)` | Bordes de cards y separadores |
| `eyebrow` | `#B990FF` | Kickers en mayúscula |

**Gradientes y fondos violeta (dark):**
- **Body:** `radial-gradient(circle at 80% 10%, rgba(124,60,255,.16), transparent 28%)` + `var(--bg)`.
- **Cards:** `linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.018))`.
- **Feature boxes:** `linear-gradient(135deg, rgba(124,60,255,.15), rgba(255,255,255,.025))`.
- **Logo card:** `linear-gradient(145deg, rgba(255,255,255,.07), rgba(255,255,255,.015))` + glow `0 0 80px rgba(124,60,255,.12)`.
- **Hero:** `linear-gradient(150deg, #160A4D 0%, #2A1490 45%, #5F2CE5 100%)`.
- **CTA panel:** `linear-gradient(140deg, var(--primary-dark), var(--primary))`.
- **Hero glows:** `rgba(124,77,255,0.5)` y `rgba(27,11,72,0.9)`.

### Regla de uso

- La **app y su home** usan siempre **teal claro**; la **empresa** usa **dark violeta**.
- La página de empresa es **100% oscura**: fondo `#07070b`, texto blanco, acentos violeta `#7C3CFF`.
- El **logo de la empresa** (`logo.png`) es **blanco sobre transparente**: se muestra sobre fondos oscuros o dentro de contenedores negros.
- Los colores de **alerta** (rojo, verde, amarillo) se usan solo para feedback específico, nunca como color de marca.

---

## 2. Tipografía

| Fuente | Peso | Uso |
|---|---|---|
| **Plus Jakarta Sans** | 700–800 | Títulos, headlines, numeraciones grandes |
| **Inter** | 400–600 | Cuerpo de texto, descripciones, navegación |

- **Tamaños de referencia (web):**
  - Hero title: `clamp(2.6rem, 6vw, 4.2rem)`
  - Section title: `clamp(1.8rem, 4vw, 2.4rem)`
  - Body: `0.95rem` – `1rem`
  - Small / kicker: `0.72rem` – `0.8rem`, uppercase, `letter-spacing: 1.4px`

- **Interlineado:** `1.6` para cuerpo, `1.1`–`1.2` para títulos grandes.

---

## 3. Logo

### Logo de la app (`icon.png`)

- **Archivo:** `assets/icon.png` (también `icon-nobg.png` para fondos transparentes).
- **Uso:** favicon, nav brand, footer, splash, login, registro, about, launcher Android.
- **Presentación en web:** dentro de `.brand-logo` con `width: 40px; border-radius: 12px; box-shadow`.
- **En hero (home):** dentro de `.hero-logo-wrap` (fondo blanco, sombra, `border-radius: 28px`, tamaño `76px`).

### Logo de la empresa (`logo.png`)

- **Archivo:** `assets/logo.png` (1254×1254, **blanco sobre transparente**, el real del prototipo).
- **Uso:** marca de `empresa.html` (nav + logo card), sección "La empresa" del home, tarjeta de descargas.
- **Presentación en home:** dentro de `.about-logo` (140px, fondo negro, `border-radius: 26px`, padding 12px) y `.empresa-logo` (96px, fondo negro, `border-radius: 20px`, padding 8px) — el logo blanco requiere fondo oscuro.
- **Presentación en empresa.html:** en la `.logo-card` (superficie oscura glass con glow violeta) y en la nav (42px).

### Reglas generales

- El logo **nunca** se distorsiona: siempre `object-fit: contain`.
- Como es **blanco sobre transparente**, solo se muestra sobre fondos **oscuros** (body dark, contenedores negros, hero teal).
- **No** se agrega borde adicional al logo (el `box-shadow` ya genera separación visual).

---

## 4. Espaciado y radios

| Token | Valor |
|---|---|
| `pad` | `16px` |
| `gap` | `12px` |
| `radiusSm` | `10px` |
| `radiusMd` | `14px` |
| `radiusLg` | `20px` |

- Cards principales: `radiusLg` (20px).
- Botones: `radiusMd` (14px) en desktop, `radiusLg` (20px) en móvil.
- Chips / badges: `999px` (totalmente redondeados).
- Inputs: `radiusMd` (14px).

---

## 5. Sombras

| Nombre | Valor |
|---|---|
| `shadow-sm` | `0 2px 8px rgba(0,0,0,0.04)` |
| `shadow` | `0 6px 24px rgba(0,0,0,0.06)` |
| `shadow-lg` | `0 12px 40px rgba(0,0,0,0.10)` |
| `shadow-card` | Teal: `rgba(17,125,122,0.10)` |
| glow violeta (empresa) | `0 0 80px rgba(124,60,255,.12)` |

- Cards del home usan `shadow` por defecto.
- Hero logo del home usa `shadow-lg`.
- Botón primario del home: hover `rgba(17,125,122,0.30)`.
- **Empresa (dark):** iluminación con **glows** violeta (`rgba(124,60,255,.13)` blurred) en vez de sombras teal.

---

## 6. Componentes clave

### Botones del home (teal)

| Clase | Estilo |
|---|---|
| `.btn-primary` | Fondo teal `#117D7A`, texto blanco, sombra teal hover |
| `.btn-ghost` | Sin fondo, borde `border`, texto `textMain` |
| `.btn-lg` | Padding `16px 36px`, font-size `1rem` |
| `.btn-light` | Fondo blanco, texto teal (fondo oscuro) |

### Botones de la empresa (dark)

| Clase | Estilo |
|---|---|
| `.btn.primary` | **Blanco**, texto `#09090c`, hover con glow blanco |
| `.btn.secondary` | Fondo `rgba(255,255,255,.035)`, borde `line`, hover borde violeta `rgba(163,107,255,.6)` |

### Cards

- **Home (claro):** fondo blanco `surface`, borde `1px solid var(--border)`, sombra `var(--shadow)`.
- **Empresa (dark):** `linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.018))`, borde `var(--line)`, hover elevate + borde violeta.

### Chips / Badges (home)

- `.chip-v8a`: fondo `primaryLight`, texto `primary`, borde `primary`.
- `.chip-v7a`: fondo `#FEF3C7`, texto `#92400E`, borde `#F59E0B`.
- `.badge`: fondo `primary`, texto blanco, `border-radius: 999px`.

---

## 7. Íconos

- **App Flutter:** paquete **RemixIcon** (remixicon).
- **Web:** SVGs inline de Lucide Icons (mismo estilo que Remix: stroke-based, 24×24, `stroke-width: 1.8`).
- Los íconos en tarjetas de features usan fondo `primaryLight` y color `primary`.

---

## 8. Responsive

| Página | Comportamiento |
|---|---|
| Home (`styles.css`) | `>960px` nav horizontal · `≤640px` menú hamburguesa, todo en columna |
| Empresa (`empresa.css`) | `>850px` links visibles · `≤850px` menú hamburguesa, logo-card al top, grids a 1 columna |

- El hero de la empresa usa `min-height:100vh` y en móvil el logo se muestra primero (`hero-logo{order:-1}`).
- Los botones de descarga del home se apilan verticalmente en móvil.

---

## 9. Archivos de referencia

| Archivo | Contiene |
|---|---|
| `lib/theme.dart` | Paleta completa de la app Flutter (`AppTheme`, teal) |
| `assets/styles.css` | Paleta teal + componentes del home (`index.html`) |
| `assets/empresa.css` | Paleta dark violeta + componentes de `empresa.html` |
| `assets/icon.png` | Logo de la app |
| `assets/logo.png` | Logo de la empresa (blanco, transparente — de `~/Descargas/elijos_tech_web.zip`) |

---

*Última actualización: septiembre 2026*

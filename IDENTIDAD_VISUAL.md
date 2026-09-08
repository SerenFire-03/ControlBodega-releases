# Identidad Visual — Control Bodega / Elijos Tech

> Guía de referencia para mantener coherencia visual entre la app Flutter, la web de releases y cualquier material de la marca.

---

## 1. Colores

### Paleta principal (App + Web)

| Token | HEX | Uso |
|---|---|---|
| `primaryDark` | `#0A4C4C` | Header, gradiente hero, acentos profundos |
| `primary` | `#117D7A` | Botones, links, iconos activos, badges |
| `primaryLight` | `#E6F4F2` | Fondos suaves, chips, badges claros |
| `bg` | `#F4F7F7` | Fondo general de la app |
| `surface` | `#FFFFFF` | Cards, paneles, modales |
| `textMain` | `#1F2937` | Texto principal |
| `textSecondary` | `#6B7280` | Texto secundario / descripciones |
| `textMuted` | `#9CA3AF` | Texto apagado / placeholders |
| `danger` | `#E74C3C` | Errores, eliminar, alertas |
| `success` | `#4CAF50` | Confirmaciones, stock OK |
| `warning` | `#F59E0B` | Advertencias, badges dorados |
| `border` | `#E5E7EB` | Bordes sutiles de cards y separadores |

### Gradientes

- **Hero / tarjetas admin:** `linear-gradient(135deg, #0D5554, #0A4C4C)` → el gradiente teal profundo.
- **CTA panel:** `linear-gradient(135deg, #0D5554, #117D7A)` → gradiente con glow sutil.
- **Hero glows:** dos elipses semitransparentes `rgba(17,125,122,0.12)` y `rgba(109,216,201,0.10)` superpuestas con `position: absolute`.

### Regla de uso

- El **teal** es el color dominante. Se usa en headers, botones principales, badges y acentos.
- El **blanco** se reserva para cards sobre fondo claro.
- El **fondo** (`#F4F7F7`) solo se ve detrás de las cards, nunca como color de botón.
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

### Logo de la empresa (`logo-empresa.png`)

- **Archivo:** `assets/logo-empresa.png` (569×613, fondo negro, JPEG original convertido a PNG).
- **Uso:** sección "La empresa" en home, hero de `empresa.html`.
- **Presentación en home:** dentro de `.about-logo` (140px, fondo negro, `border-radius: 26px`, padding 12px).
- **Presentación en empresa.html:** dentro de `.hero-logo-wrap` (mismo estilo que el hero del home).
- **En tarjeta de descargas:** dentro de `.empresa-logo` (96px, fondo negro, `border-radius: 20px`, padding 8px).

### Reglas generales

- El logo **nunca** se distorsiona: siempre `object-fit: contain`.
- Sobre fondos claros, el logo se envuelve en un contenedor con fondo oscuro (negro o teal).
- Sobre fondos oscuros (hero teal), el logo se envuelve en `.hero-logo-wrap` con fondo blanco.
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
| `shadow-card` | `0 4px 20px rgba(17,125,122,0.10)` |

- Cards usan `shadow` por defecto.
- Hero logo usa `shadow-lg`.
- Botón primario hover: `0 10px 32px rgba(17,125,122,0.30)`.

---

## 6. Componentes clave

### Botones

| Clase | Estilo |
|---|---|
| `.btn-primary` | Fondo teal `#117D7A`, texto blanco, sombra teal hover |
| `.btn-ghost` | Sin fondo, borde `border`, texto `textMain` |
| `.btn-lg` | Padding `16px 36px`, font-size `1rem` |
| `.btn-light` | Fondo blanco, texto teal (para uso sobre fondos oscuros) |

### Cards

- Fondo: `var(--surface)` blanco.
- Borde: `1px solid var(--border)`.
- Sombra: `var(--shadow)`.
- Padding: `clamp(26px, 4vw, 42px)`.

### Chips / Badges

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

| Breakpoint | Comportamiento |
|---|---|
| `>960px` | Nav horizontal, grid de features 2-3 columnas |
| `641–960px` | Nav horizontal, features 2 columnas |
| `≤640px` | Menú hamburguesa, todo en columna, font-sizes reducidos |

- El logo en `.about-card` se apila verticalmente en móvil.
- Los botones de descarga se apilan verticalmente en móvil.
- El hero usa `flex-direction: column` en móvil.

---

## 9. Archivos de referencia

| Archivo | Contiene |
|---|---|
| `lib/theme.dart` | Paleta completa de la app Flutter (`AppTheme`) |
| `assets/styles.css` | Paleta CSS + componentes de la web |
| `assets/icon.png` | Logo de la app |
| `assets/logo-empresa.png` | Logo de la empresa (Elijos Tech) |

---

*Última actualización: septiembre 2026*

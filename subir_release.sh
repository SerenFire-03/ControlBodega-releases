#!/usr/bin/env bash
# ============================================================
# Control Bodega — Publicar un Release (APK de Android)
#
# Uso:
#   ./subir_release.sh 1.0.0 "Descripción de los cambios"
#
# Requisitos:
#   - Flutter instalado y en el PATH
#   - GitHub CLI (gh) instalado y con sesión iniciada:
#       sudo apt install gh && gh auth login
#   - Correr desde la carpeta de este repositorio (releases)
# ============================================================
set -euo pipefail

APP_DIR="../app_bodega (Fenix)"
RELEASE_REPO="${1:-}"
NOTES="${2:-}"

if [[ -z "$RELEASE_REPO" ]]; then
  echo "Uso: $0 <usuario/repo> \"<notas del release>\""
  echo "Ejemplo: $0 SerenFire-03/ControlBodega-Releases \"v1.0.0: correcciones y mejoras\""
  exit 1
fi

echo "→ Entrando a la carpeta de la app: $APP_DIR"
cd "$APP_DIR"

echo "→ Compilando APK release..."
flutter build apk --release

APK_PATH="build/app/outputs/flutter-apk/app-release.apk"
if [[ ! -f "$APK_PATH" ]]; then
  echo "✗ No se encontró el APK compilado: $APK_PATH"
  exit 1
fi

VERSION=$(grep -E '^version:' pubspec.yaml | awk '{print $2}')
TAG="v$VERSION"
echo "→ Versión detectada en pubspec.yaml: $VERSION (tag: $TAG)"

if ! command -v gh >/dev/null 2>&1; then
  echo ""
  echo "✗ GitHub CLI (gh) no está instalado."
  echo "  Instálalo y vuelve a correr el script:"
  echo "    sudo apt install gh && gh auth login"
  echo ""
  echo "  Para publicar MANUALMENTE desde el navegador:"
  echo "    1. Sube este repositorio y el APK a GitHub."
  echo "    2. Abre https://github.com/$RELEASE_REPO/releases/new"
  echo "    3. Crea el tag \"$TAG\", pega las notas y adjunta:"
  echo "       $APK_PATH"
  exit 1
fi

echo "→ Creando release $TAG en https://github.com/$RELEASE_REPO ..."
gh release create "$TAG" "$APK_PATH" \
  --repo "$RELEASE_REPO" \
  --title "Control Bodega $VERSION" \
  --notes "${NOTES:-Publicación de la versión $VERSION}"

echo "✓ Release publicado. En la web ya se verá la nueva versión."
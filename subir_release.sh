#!/usr/bin/env bash
# ============================================================
# Control Bodega — Publicar un Release (APK de Android)
#
# Uso:
#   ./subir_release.sh "Descripción de los cambios"
#
# Requisitos:
#   - Flutter instalado y en el PATH
#   - GitHub CLI (gh) instalado y con sesión iniciada:
#       sudo apt install gh && gh auth login
#   - Correr desde la carpeta de este repositorio (releases)
#
# Genera dos APK:
#   - v8a (arm64-v8a)  → Android nuevo (64-bit)
#   - v7a (armeabi-v7a) → Android viejito (32-bit)
# ============================================================
set -euo pipefail

APP_DIR="../app_bodega (Fenix)"
RELEASE_REPO="SerenFire-03/ControlBodega-releases"
NOTES="${1:-}"

echo "→ Entrando a la carpeta de la app: $APP_DIR"
cd "$APP_DIR"

OUT_DIR="build/app/outputs/flutter-apk"
APK_V8A="$OUT_DIR/app-arm64-v8a-release.apk"
APK_V7A="$OUT_DIR/app-armeabi-v7a-release.apk"

echo "→ Compilando APKs (split por arquitectura)..."
flutter build apk --release --split-per-abi

for apk in "$APK_V8A" "$APK_V7A"; do
  if [[ ! -f "$apk" ]]; then
    echo "✗ No se encontró el APK compilado: $apk"
    exit 1
  fi
done

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
  echo "    1. Sube este repositorio y los APK a GitHub."
  echo "    2. Abre https://github.com/$RELEASE_REPO/releases/new"
  echo "    3. Crea el tag \"$TAG\", pega las notas y adjunta:"
  echo "       $APK_V8A  (Android nuevo)"
  echo "       $APK_V7A  (Android viejito)"
  exit 1
fi

echo "→ Creando release $TAG en https://github.com/$RELEASE_REPO ..."
gh release create "$TAG" \
  "$APK_V8A" \
  "$APK_V7A" \
  --repo "$RELEASE_REPO" \
  --title "Control Bodega $VERSION" \
  --notes "${NOTES:-Publicación de la versión $VERSION}"

echo "✓ Release publicado. La web mostrará los botones v8a (64 bits) y v7a (32 bits)."
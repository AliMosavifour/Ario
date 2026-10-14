#!/usr/bin/env bash
# Copies the app icons into the generated Android project.
set -euo pipefail

RES="android/app/src/main/res"
if [ ! -d "$RES" ]; then
  echo "Android project not found. Run: npx cap add android" >&2
  exit 1
fi

for d in mdpi hdpi xhdpi xxhdpi xxxhdpi; do
  mkdir -p "$RES/mipmap-$d"
  cp icons/mipmap-$d/ic_launcher.png            "$RES/mipmap-$d/ic_launcher.png"
  cp icons/mipmap-$d/ic_launcher_round.png      "$RES/mipmap-$d/ic_launcher_round.png"
  cp icons/mipmap-$d/ic_launcher_foreground.png "$RES/mipmap-$d/ic_launcher_foreground.png"
done

mkdir -p "$RES/values"
cp icons/ic_launcher_background.xml "$RES/values/ic_launcher_background.xml"
echo "Icons applied."

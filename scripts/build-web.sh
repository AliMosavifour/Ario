#!/usr/bin/env bash
# Builds the small, fast web files in www/ from the readable sources in src/.
# Edit src/js/app.js and src/css/app.css, then run:  npm run build:web
set -euo pipefail
cd "$(dirname "$0")/.."
ESB="npx --no-install esbuild"
$ESB src/js/app.js --minify --target=chrome80 --legal-comments=none --charset=utf8 --outfile=www/js/app.js
$ESB src/css/app.css --minify --target=chrome80 --legal-comments=none --charset=utf8 --outfile=www/css/app.css

# Offline text recognition for "اسکن عکس جدول": the engine and the Persian language file are copied into www/ocr
OCR=www/ocr
mkdir -p "$OCR/lang"
if [ -f node_modules/tesseract.js/dist/tesseract.min.js ]; then
  cp node_modules/tesseract.js/dist/tesseract.min.js node_modules/tesseract.js/dist/worker.min.js "$OCR/"
  ls node_modules/tesseract.js-core/tesseract-core*lstm*.js >/dev/null 2>&1 && cp node_modules/tesseract.js-core/tesseract-core*lstm*.js "$OCR/" || cp node_modules/tesseract.js-core/tesseract-core*.js "$OCR/"
else
  echo "WARNING: tesseract.js is not installed (run npm install); table scan will be unavailable" >&2
fi
if [ ! -s "$OCR/lang/fas.traineddata.gz" ]; then
  if curl -fL --retry 3 -o "$OCR/lang/fas.traineddata" "https://github.com/tesseract-ocr/tessdata_fast/raw/main/fas.traineddata"; then
    gzip -f -9 "$OCR/lang/fas.traineddata"
  else
    echo "WARNING: could not download the Persian language file; table scan will be unavailable" >&2
    rm -f "$OCR/lang/fas.traineddata"
  fi
fi
echo "web files built"

#!/usr/bin/env bash
# Builds the small, fast web files in www/ from the readable sources in src/.
# Edit src/js/app.js and src/css/app.css, then run:  npm run build:web
set -euo pipefail
cd "$(dirname "$0")/.."
ESB="npx --no-install esbuild"
$ESB src/js/app.js --minify --target=chrome80 --legal-comments=none --charset=utf8 --outfile=www/js/app.js
$ESB src/css/app.css --minify --target=chrome80 --legal-comments=none --charset=utf8 --outfile=www/css/app.css
echo "web files built"

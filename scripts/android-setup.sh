#!/usr/bin/env bash
# Adds notification permissions and the notification icon to the generated Android project.
set -euo pipefail

MAN="android/app/src/main/AndroidManifest.xml"
RES="android/app/src/main/res"
if [ ! -f "$MAN" ]; then
  echo "Android project not found. Run: npx cap add android" >&2
  exit 1
fi

add_perm() {
  if ! grep -q "android.permission.$1" "$MAN"; then
    sed -i "s#<application#<uses-permission android:name=\"android.permission.$1\" />\n    <application#" "$MAN"
  fi
}
add_perm POST_NOTIFICATIONS
add_perm SCHEDULE_EXACT_ALARM
add_perm RECEIVE_BOOT_COMPLETED
add_perm VIBRATE

# Make sure the app (and its notifications) can lay out right-to-left.
if ! grep -q 'android:supportsRtl' "$MAN"; then
  sed -i 's#<application#<application android:supportsRtl="true"#' "$MAN"
else
  sed -i 's#android:supportsRtl="false"#android:supportsRtl="true"#' "$MAN"
fi

mkdir -p "$RES/drawable"
cat > "$RES/drawable/ic_stat_barnameyar.xml" <<'XML'
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp" android:height="24dp"
    android:viewportWidth="24" android:viewportHeight="24">
  <path android:fillColor="#FFFFFFFF"
      android:pathData="M12,22c1.1,0 2,-0.9 2,-2h-4c0,1.1 0.9,2 2,2zM18,16v-5c0,-3.07 -1.64,-5.64 -4.5,-6.32V4c0,-0.83 -0.67,-1.5 -1.5,-1.5s-1.5,0.67 -1.5,1.5v0.68C7.63,5.36 6,7.92 6,11v5l-2,2v1h16v-1l-2,-2z"/>
</vector>
XML
echo "Android notification setup applied."

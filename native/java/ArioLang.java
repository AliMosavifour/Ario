package __APPID__;

import android.content.Context;

/** The app language the user picked inside Ario ("fa" or "en"); the web app tells the native side. */
final class ArioLang {
    private static final String PREFS = "ario_lang";

    static boolean en(Context c) {
        return "en".equals(c.getSharedPreferences(PREFS, Context.MODE_PRIVATE).getString("lang", "fa"));
    }

    static String t(Context c, String fa, String en) {
        return en(c) ? en : fa;
    }

    static void set(Context c, String lang) {
        c.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit().putString("lang", "en".equals(lang) ? "en" : "fa").apply();
    }
}

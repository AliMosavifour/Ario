package __APPID__;

import android.content.Context;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/** Receives today's summary from the web app and refreshes the home-screen widget. */
@CapacitorPlugin(name = "WidgetBridge")
public class WidgetBridgePlugin extends Plugin {
    @PluginMethod
    public void update(PluginCall call) {
        String json = call.getString("json", "{}");
        Context c = getContext();
        c.getSharedPreferences(ArioWidgetProvider.PREFS, Context.MODE_PRIVATE)
                .edit().putString("data", json).apply();
        ArioWidgetProvider.refreshAll(c);
        call.resolve();
    }
}

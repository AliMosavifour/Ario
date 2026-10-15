package __APPID__;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(WidgetBridgePlugin.class);
        registerPlugin(AppLockPlugin.class);
        registerPlugin(ImageSavePlugin.class);
        registerPlugin(FocusNotifyPlugin.class);
        registerPlugin(ArioNotifyPlugin.class);
        super.onCreate(savedInstanceState);
    }
}

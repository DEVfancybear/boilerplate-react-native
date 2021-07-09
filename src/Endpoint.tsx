import React, {Suspense} from 'react';
import {Platform} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import {RecoilRoot} from 'recoil';
import './common/i18n';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppContainer} from './routes/AppNavigation';
import ErrorBoundary from 'react-native-error-boundary';

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableDebugging(false);
  KeyboardManager.setKeyboardDistanceFromTextField(10);
  KeyboardManager.setEnableAutoToolbar(false);
  // KeyboardManager.setToolbarDoneBarButtonItemText("Done");
  // KeyboardManager.setToolbarManageBehaviourBy("subviews"); // "subviews" | "tag" | "position"
  // KeyboardManager.setToolbarPreviousNextButtonEnable(false);
  // KeyboardManager.setToolbarTintColor('#0000FF'); // Only #000000 format is supported
  // KeyboardManager.setToolbarBarTintColor('#FFFFFF'); // Only #000000 format is supported
  // KeyboardManager.setShouldShowToolbarPlaceholder(true);
  KeyboardManager.setOverrideKeyboardAppearance(true);
  KeyboardManager.setKeyboardAppearance('default'); // "default" | "light" | "dark"
  KeyboardManager.setShouldResignOnTouchOutside(true);
  KeyboardManager.setShouldPlayInputClicks(true);
  KeyboardManager.resignFirstResponder();
  // KeyboardManager.isKeyboardShowing()
  //   .then((isShowing) => {
  //       // ...
  //   });
}
const Endpoint = () => {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <Suspense fallback={null}>
          <ErrorBoundary>
            <AppContainer />
          </ErrorBoundary>
        </Suspense>
      </SafeAreaProvider>
    </RecoilRoot>
  );
};

export default Endpoint;

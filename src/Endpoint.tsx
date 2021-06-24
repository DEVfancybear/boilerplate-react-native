import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import VectorImage from 'react-native-vector-image';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import { svgs } from './assets';
import {useNetWorkStatus} from './hooks/';
import './i18n/';
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
  const {t} = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
  const [status, canAccess] = useNetWorkStatus();
  console.log('Net work status', status);
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <View style={styles.sectionContainer}>
          <Text>{t('example.helloUser')} </Text>
        </View>
        <VectorImage source={svgs.horizontalDots} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Endpoint;

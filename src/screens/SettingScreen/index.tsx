import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a29bfe',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingScreen;

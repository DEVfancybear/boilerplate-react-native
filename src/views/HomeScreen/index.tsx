import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import config from '../../config';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>{config.BASE_URL}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#81ecec',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;

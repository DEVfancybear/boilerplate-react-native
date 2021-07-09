import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../components';
import config from '../../config';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Header" backEnabled={true} />
      <View style={styles.container}>
        <Text>{config.BASE_URL}</Text>
      </View>
    </SafeAreaView>
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

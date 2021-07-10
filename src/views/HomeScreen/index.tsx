import React from 'react';
import {StyleSheet, Text, TextBase, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../common/components/';
import config from '../../config';
import {optimizeHeavyScreen} from 'react-navigation-heavy-screen';
import {useQuery} from 'react-query';
import {HomeApi} from '../../common/apis';

const HomeScreen = () => {
  const fetchDataList = () => HomeApi.fetchData(1, 10);
  const {isLoading, isError, data, error} = useQuery(
    'homeLists',
    fetchDataList,
  );

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
export default optimizeHeavyScreen(HomeScreen);

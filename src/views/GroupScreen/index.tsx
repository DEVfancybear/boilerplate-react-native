import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '../../common/assets';
import {Img} from '../../common/components/';

const GroupScreen = () => {
  return (
    <View style={styles.container}>
      <Img style={{width: 100, height: 100}} source={images.bg_wallpaper} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GroupScreen;

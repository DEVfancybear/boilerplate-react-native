import React, {useMemo, memo, useState} from 'react';
import {
  StyleProp,
  ImageStyle,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import equals from 'react-fast-compare';
import {Block} from '../Block/Block';
import {IImageProps} from './Image.props';
import {enhance} from '../../helpers';
import FastImage from 'react-native-fast-image';

const ImgComponent = (props: IImageProps) => {
  // state
  const [isLoading, setIsLoading] = useState(true);
  const {
    children,
    style: styleOverride,
    resizeMode = 'cover',
    source,
    containerStyle,
  } = props;

  // style
  const style = useMemo<StyleProp<ImageStyle>>(
    () => enhance([styleOverride as ImageStyle]),
    [styleOverride],
  );

  // render
  return (
    <Block style={containerStyle}>
      <FastImage
        // @ts-ignore
        style={style}
        resizeMode={resizeMode}
        source={{uri: source}}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && (
        <Block style={styles.indicatorView}>
          <ActivityIndicator size="small" />
        </Block>
      )}
      {children}
    </Block>
  );
};
export const Img = memo(ImgComponent, equals);
const styles = StyleSheet.create({
  indicatorView: {
    ...StyleSheet.absoluteFillObject,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

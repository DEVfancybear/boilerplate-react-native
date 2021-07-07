import React, {useMemo, memo} from 'react';
import {Image, StyleProp, ImageStyle} from 'react-native';
import equals from 'react-fast-compare';
import {Block} from '../Block/Block';
import {IImageProps} from './Image.props';
import {enhance} from '../../helpers';

const ImgComponent = (props: IImageProps) => {
  // state
  const {
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
      <Image style={style} resizeMode={resizeMode} source={{uri: source}} />
    </Block>
  );
};
export const Img = memo(ImgComponent, equals);

import React, {memo, useMemo} from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import equals from 'react-fast-compare';

import {useTheme} from '@react-navigation/native';

import {IBlockProps} from './Block.props';
import {enhance} from '../../helpers';
import {IAppTheme} from '../../models/IThemes';

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

const BlockComponent = (props: IBlockProps) => {
  // state
  const theme: IAppTheme = useTheme();
  const {
    block,
    margin,
    marginLeft,
    alignItems,
    alignSelf,
    marginRight,
    marginTop,
    marginBottom,
    direction,
    padding,
    paddingHorizontal,
    paddingVertical,
    width,
    height,
    border,
    borderWidth,
    borderColor,
    color,
    justifyContent,
    middle,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingTop,
    borderRadius,
    shadow,
    flex,
    shadowConfig,
    position,
    flexWrap,
    left,
    right,
    bottom,
    top,
    zIndex,
    overflow,
    borderBottomWidth,
    borderEndWidth,
    borderLeftWidth,
    borderRightWidth,
    borderStartWidth,
    borderTopWidth,
    borderBottomColor,
    borderBottomEndRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderBottomStartRadius,
    borderEndColor,
    borderLeftColor,
    borderRightColor,
    borderStartColor,
    borderStyle,
    borderTopColor,
    borderTopEndRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderTopStartRadius,
    opacity,
    style = {},
    children,
    colorTheme,
    ...rest
  } = props;

  const styleComponent = useMemo(
    () =>
      enhance([
        [
          block && styles.block,
          margin && {margin},
          marginLeft && {marginLeft},
          marginRight && {marginRight},
          marginTop && {marginTop},
          marginBottom && {marginBottom},
          direction && {flexDirection: direction},
          padding && {padding},
          paddingRight && {paddingRight},
          paddingBottom && {paddingBottom},
          paddingLeft && {paddingLeft},
          paddingTop && {paddingTop},
          paddingHorizontal && {paddingHorizontal},
          paddingVertical && {paddingVertical},
          width && {width},
          height && {height},
          border && {
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#bbb',
          },
          borderWidth && {borderWidth: StyleSheet.hairlineWidth * borderWidth},
          borderColor && {borderColor},
          color && {backgroundColor: color},
          colorTheme && {backgroundColor: theme.colors[colorTheme]},
          justifyContent && {justifyContent},
          middle && {alignItems: 'center'},
          alignItems && {alignItems},
          alignSelf && {alignSelf},
          borderRadius && {borderRadius},
          flex && {flex},
          shadow && {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            ...shadowConfig,
          },
          position && {position},
          flexWrap && {flexWrap},
          left && {left},
          right && {right},
          bottom && {bottom},
          top && {top},
          zIndex && {zIndex},
          overflow && {overflow},
          borderBottomWidth && {
            borderBottomWidth: StyleSheet.hairlineWidth * borderBottomWidth,
          },
          borderEndWidth && {borderEndWidth},
          borderLeftWidth && {
            borderLeftWidth: StyleSheet.hairlineWidth * borderLeftWidth,
          },
          borderRightWidth && {
            borderRightWidth: StyleSheet.hairlineWidth * borderRightWidth,
          },
          borderStartWidth && {borderStartWidth},
          borderTopWidth && {
            borderTopWidth: StyleSheet.hairlineWidth * borderTopWidth,
          },
          borderBottomColor && {borderBottomColor},
          borderBottomEndRadius && {borderBottomEndRadius},
          borderBottomLeftRadius && {borderBottomLeftRadius},
          borderBottomRightRadius && {borderBottomRightRadius},
          borderBottomStartRadius && {borderBottomStartRadius},
          borderEndColor && {borderEndColor},
          borderLeftColor && {borderLeftColor},
          borderRightColor && {borderRightColor},
          borderStartColor && {borderStartColor},
          borderStyle && {borderStyle},
          borderTopColor && {borderTopColor},
          borderTopEndRadius && {borderTopEndRadius},
          borderTopLeftRadius && {borderTopLeftRadius},
          borderTopRightRadius && {borderTopRightRadius},
          borderTopStartRadius && {borderTopStartRadius},
          opacity && {opacity},
          style,
        ] as StyleProp<ViewStyle>,
      ]),
    [
      block,
      margin,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      direction,
      padding,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingTop,
      paddingHorizontal,
      paddingVertical,
      width,
      height,
      border,
      borderWidth,
      borderColor,
      color,
      colorTheme,
      theme.colors,
      justifyContent,
      middle,
      alignItems,
      alignSelf,
      borderRadius,
      flex,
      shadow,
      shadowConfig,
      position,
      flexWrap,
      left,
      right,
      bottom,
      top,
      zIndex,
      overflow,
      borderBottomWidth,
      borderEndWidth,
      borderLeftWidth,
      borderRightWidth,
      borderStartWidth,
      borderTopWidth,
      borderBottomColor,
      borderBottomEndRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderBottomStartRadius,
      borderEndColor,
      borderLeftColor,
      borderRightColor,
      borderStartColor,
      borderStyle,
      borderTopColor,
      borderTopEndRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderTopStartRadius,
      opacity,
      style,
    ],
  );

  // render
  return (
    <View style={[styleComponent]} {...rest}>
      {children}
    </View>
  );
};
export const Block = memo(BlockComponent, equals);

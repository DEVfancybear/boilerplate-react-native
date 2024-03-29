import React, {useMemo, memo} from 'react';
import {TouchableOpacity} from 'react-native';
import equals from 'react-fast-compare';

import {Text} from '../Text/Text';

import {stylesView, stylesText} from './Button.presets';
import {IButtonProps} from './Button.props';
import {enhance} from '../../helpers';

const ButtonComponent = (props: IButtonProps) => {
  // state
  const {
    preset = 'primary',
    tx,
    text,
    style: styleOverride = {},
    textStyle: textStyleOverride = {},
    children,
    ...rest
  } = props;

  // style
  const viewStyle = useMemo(
    () => enhance([stylesView[preset], styleOverride]),
    [preset, styleOverride],
  );
  const textStyle = useMemo(
    () => enhance([stylesText[preset], textStyleOverride]),
    [preset, textStyleOverride],
  );

  const content = useMemo(
    () => children || <Text tx={tx} text={text} style={textStyle} />,
    [tx, textStyle, children, text],
  );

  // render
  return (
    <TouchableOpacity style={viewStyle} {...rest}>
      {content}
    </TouchableOpacity>
  );
};
export const Button = memo(ButtonComponent, equals);

import {StyleSheet} from 'react-native';
import {ColorDefault} from '../../themes/colors';
import {FontSizeDefault} from '../../themes/fontSize';
import {SpacingDefault} from '../../themes/spacing';

export const stylesView = StyleSheet.create({
  primary: {
    paddingVertical: SpacingDefault.smaller,
    paddingHorizontal: SpacingDefault.smaller,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebf2f1',
  },
  link: {
    borderRadius: 4,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  default: {},
});

export const stylesText = StyleSheet.create({
  primary: {
    paddingHorizontal: SpacingDefault.smaller,
    fontSize: FontSizeDefault.FONT_9,
    color: '#FFFFFF',
  },
  link: {
    fontSize: FontSizeDefault.FONT_9,
    color: ColorDefault.text,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  default: {},
});
export type ButtonPresetNames = keyof typeof stylesView;

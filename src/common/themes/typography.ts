import {Platform} from 'react-native';

import {IFontFamily as IFontType} from '../models/IThemes';

export const FontDefault: IFontType = {
  primary: Platform.select({ios: 'Roboto-Medium', android: 'Roboto-Medium'}),
  secondary: Platform.select({ios: 'Roboto-Medium', android: 'Roboto-Medium'}),
};
export type FontFamily = keyof typeof FontDefault;

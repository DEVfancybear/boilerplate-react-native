import {ViewStyle, StyleProp} from 'react-native';
import {ImageTypes} from '../../assets/images';
import {ImageStyle} from 'react-native';

type ResizeMode = 'contain' | 'cover' | 'stretch' | 'center';

export interface IImageProps {
  /**
   * Overwrite image style
   * @default undefined
   */
  style?: StyleProp<ImageStyle>;

  /**
   * Overwrite wrap image style
   * @default undefined
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Source image(local)
   * @default undefined
   */
  source: ImageTypes;

  /**
   * Custom resizeMode
   * @default contain
   */
  resizeMode?: ResizeMode;
}

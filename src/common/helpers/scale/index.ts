import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
// screen width
const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;
// screen height
const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;
// screen width
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
// screen height
const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export {scale, verticalScale, moderateScale, moderateVerticalScale};

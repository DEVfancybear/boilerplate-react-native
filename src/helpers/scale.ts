import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

class Scale {
  scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;

  verticalScale = (size: number) =>
    (longDimension / guidelineBaseHeight) * size;
  moderateScale = (size: number, factor = 0.5) =>
    size + (this.scale(size) - size) * factor;
}

const scale = new Scale();

export default scale;

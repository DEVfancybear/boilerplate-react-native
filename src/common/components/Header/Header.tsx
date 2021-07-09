import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationService} from '../../../services/navigation-service/navigationService';
import {ColorDefault} from '../../themes/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IIconTypes} from './Header.props';
import {Ionicons} from '@expo/vector-icons';

type HeaderProps = {
  leftIcon?: IIconTypes;
  onPressLeft?: () => void;
  rightIcon?: IIconTypes;
  onPressRight?: () => void;
  title?: string;
  backEnabled?: boolean;
  subRightIcon?: IIconTypes;
  onPressSubRight?: () => void;
  children?: React.ReactNode;
};

export const Header = (props: HeaderProps) => {
  const {
    leftIcon,
    rightIcon,
    title,
    onPressLeft,
    onPressRight,
    backEnabled,
    subRightIcon,
    onPressSubRight,
    children,
  } = props;

  const iconLeft = leftIcon || (backEnabled ? 'chevron-back-sharp' : undefined);

  const onLeftPress =
    onPressLeft || backEnabled ? NavigationService.goBack : undefined;

  return (
    <View
      style={[styles.header, {backgroundColor: ColorDefault.navigationBar}]}>
      <TouchableOpacity
        disabled={!iconLeft}
        onPress={onLeftPress}
        style={styles.leftButton}>
        {!!iconLeft && (
          <Ionicons
            name={iconLeft}
            size={32}
            style={{color: ColorDefault.primary}}
          />
        )}
      </TouchableOpacity>
      {!!subRightIcon && <View style={styles.leftButton} />}

      {/* Title */}
      {children || (
        <Text style={[styles.titleText, {color: ColorDefault.primary}]}>
          {title}
        </Text>
      )}
      {!!subRightIcon && (
        <TouchableOpacity
          disabled={!rightIcon}
          onPress={onPressSubRight}
          style={styles.subRightButton}>
          {!!subRightIcon && (
            <Ionicons
              name={subRightIcon}
              size={32}
              style={{color: ColorDefault.primary}}
            />
          )}
        </TouchableOpacity>
      )}
      {/* Button right */}
      <TouchableOpacity
        disabled={!rightIcon}
        onPress={onPressRight}
        style={styles.rightButton}>
        {!!rightIcon && (
          <Ionicons
            name={rightIcon}
            size={32}
            style={{color: ColorDefault.primary}}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftButton: {
    width: 50,
    alignItems: 'center',
  },
  rightButton: {
    width: 50,
    alignItems: 'center',
  },
  subRightButton: {
    width: 50,
    alignItems: 'center',
  },
  titleText: {
    flex: 1,
    textAlign: 'center',
  },
  searchContainer: {
    height: 30,
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginRight: 8,
  },
});

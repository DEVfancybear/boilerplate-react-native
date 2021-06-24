import React from 'react';
import {View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {ColorDefault} from '../../themes/colors';

type Props = {
  iconName: any;
  isCurrent?: boolean;
};

export const BottomMenuItem = ({iconName, isCurrent}: Props) => {
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AntDesign
        name={iconName}
        size={32}
        style={{color: isCurrent ? ColorDefault.blue : ColorDefault.grey}}
      />
    </View>
  );
};

import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import BootSplash from 'react-native-bootsplash';

import {MainScreen} from './authen';
import {APP_SCREEN, RootStackParamList} from './screenTypes';
import {UnAuthentication} from './unAuthen';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigation = ({token}: {token?: string}) => {
  // effect
  //   useEffect(() => {
  //     BootSplash.hide({fade: true});
  //   }, []);

  // render
  return (
    <RootStack.Navigator headerMode={'none'} screenOptions={{}}>
      {token === undefined ? (
        <RootStack.Screen
          options={{animationTypeForReplace: 'pop', gestureEnabled: false}}
          name={APP_SCREEN.UN_AUTHORIZE}
          component={UnAuthentication}
        />
      ) : (
        <RootStack.Screen
          options={{gestureEnabled: false}}
          name={APP_SCREEN.AUTHORIZE}
          component={MainScreen}
        />
      )}
    </RootStack.Navigator>
  );
};

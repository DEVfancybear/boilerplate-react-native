import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {navigationRef} from '../services/navigation-service/navigationService';
import {RootNavigation} from './RootNavigator';

export const AppContainer = () => {
  // state

  // render
  return (
    <NavigationContainer ref={navigationRef}>
      <>
        <>
          <RootNavigation />
        </>
      </>
    </NavigationContainer>
  );
};

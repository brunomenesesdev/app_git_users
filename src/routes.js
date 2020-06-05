import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main'
import User from './pages/User'

const Stack = createStackNavigator();

const routes = () => {
    return(
      <NavigationContainer>
        <Stack.Navigator
              screenOptions={{
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
                headerStyle: { backgroundColor: '#7159c1' },
                headerTintColor: '#fff'
              }}
        >
          <Stack.Screen name="Mainv" component={Main} options={{
            title: 'Usuários',
          }}/>
          <Stack.Screen name="User" component={User}   options={{
            title: 'Usuário',
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default routes

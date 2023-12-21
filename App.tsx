// In App.js in a new project

import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomBottomNavigator from './src/navigation/CustomBottomNavigator';
import Splash from './src/screens/Splash';
import Product from './src/screens/Product';
import Cart from './src/screens/Cart';
import { createStore } from 'redux';
import rootReducer from './src/store/reducers/rootReducer';
import { Provider } from 'react-redux';



const Stack = createNativeStackNavigator();

function App() {

  const [splash, setSplash] = React.useState(true)


  React.useEffect(() => {
    setTimeout(() => {
      setSplash(false)
    }, 2000);

  }, [])


  const store = createStore(rootReducer);



  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
          {
            splash ?
              <Stack.Screen name="Splash" component={Splash} />
              :
              <Stack.Screen name="Tab" component={CustomBottomNavigator} />
          }
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="Cart" component={Cart} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
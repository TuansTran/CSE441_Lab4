import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useDispatch } from 'react-redux';
import store from './Screen/Store';
import ContactListScreen from './Screen/Contacts';
import DetailProfileScreen from './Screen/DetailScreen';
import FavoriteScreen from './Screen/Favourite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadFavorites } from './Screen/Slice';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Contacts"
    >
      <Tab.Screen 
        name="Contacts" 
        component={ContactListScreen} 
        options={{
          tabBarLabel: 'Contacts',
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoriteScreen} 
        options={{
          tabBarLabel: 'Favorites',
        }}
      />
    </Tab.Navigator>
  );
}

function MainApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadStoredFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        dispatch(loadFavorites(JSON.parse(storedFavorites)));
      }
    };
    loadStoredFavorites();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={AppNavigator} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="DetailProfile" 
          component={DetailProfileScreen} 
          options={{ title: 'Profile Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

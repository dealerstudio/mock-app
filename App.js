import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import VehicleDetailScreen from './screens/VehicleDetailScreen';
import AddVehicleScreen from './screens/AddVehicleScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === 'Inventory' ? 'car' : 'settings';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inventory" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  // INTERVIEW TASK: The candidate should explain why this is needed
  // and fix the flickering issue when the app restarts.
  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      setUserToken(token);
      setIsLoading(false);
    };
    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken == null ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            initialParams={{ setUserToken }}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            {/* BUG: should render MainTabs here, not HomeScreen directly */}
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Inventory' }}
            />
            <Stack.Screen
              name="VehicleDetail"
              component={VehicleDetailScreen}
              options={{ title: 'Vehicle Details' }}
            />
            <Stack.Screen
              name="AddVehicle"
              component={AddVehicleScreen}
              options={{ title: 'Add Vehicle' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

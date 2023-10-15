import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (<AntDesign name="home" size={24} color="black" />),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Settings',
            tabBarIcon: ({color, size}) => (<Ionicons name="ios-settings-outline" size={24} color="black" />),
          }}
        />
      </Tab.Navigator>
    );
  };
  
  export default BottomTabNavigator;
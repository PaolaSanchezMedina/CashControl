import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import TopTabNvigator from "../FinanceOperations/TopTabNavigator";

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AddTransactionScreen from "./TransactionHistoryScreen";
import TransactionHistoryScreen from "./TransactionHistoryScreen";

// Crea un objeto 'Tab' que utiliza createBottomTabNavigator() de React Navigation
const Tab = createBottomTabNavigator();

// Componente funcional 'BottomTabNavigator' que devuelve el contenedor de las pestañas inferiores
const BottomTabNavigator = () => {
  return (
    // Configuración del Tab Navigator con sus propiedades
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        "tabBarActiveTintColor": "red",
        "tabBarInactiveTintColor": "gray",
        "tabBarStyle": [
          {
            "display": "flex"
          },
          null
        ]
      }}
    >
      {/* Define la primera pestaña ('Home') con sus opciones */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (<AntDesign name="home" size={24} color="black" />),
        }}
      />
      {/* Define la segunda pestaña ('Top') con sus opciones */}
      <Tab.Screen
        name="Top"
        component={TopTabNvigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Mis finanzas',
          tabBarIcon: ({ color, size }) => (<Feather name="user-check" size={24} color="black" />),
        }}
      />
      {/* Define la tercera pestaña ('Transacciones') con sus opciones */}
      <Tab.Screen
        name="Historial"
        component={TransactionHistoryScreen} //Falta agregar el historial de finanzas
        options={{
          headerShown: false,
          tabBarLabel: 'Transacciones',
          tabBarIcon: ({ color, size }) => (<Ionicons name="add" size={24} color="black" />),
        }}
      />
      {/* Define la cuarta pestaña ('Settings') con sus opciones */}
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (<Ionicons name="ios-settings-outline" size={24} color="black" />),
        }}
      />
    </Tab.Navigator>
  );
};

// Exporta el componente 'BottomTabNavigator' para su uso en otras partes del código
export default BottomTabNavigator;

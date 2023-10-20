import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ExpenseScreen from "./ExpenseScreen";
import IncomeScreen from "./IncomeScreen";
import { useWindowDimensions } from "react-native";

const TabTop = createMaterialTopTabNavigator();

const TopTabNvigator = () => {
    return (  
        <TabTop.Navigator>
      <TabTop.Screen name="Ingresos" component={IncomeScreen} 
      options={{
        tabBarAndroidRipple: { borderless: true },
        tabBarItemStyle: {paddingTop: 30}
      }}
      />
      <TabTop.Screen name="Gastos" component={ExpenseScreen} 
      options={{
        tabBarAndroidRipple: { borderless: true },
        tabBarItemStyle: {paddingTop: 30}
      }}
      />
    </TabTop.Navigator>
      );
};

export default TopTabNvigator;
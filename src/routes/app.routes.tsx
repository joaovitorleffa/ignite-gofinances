import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { Resume } from "../screens/Resume";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { Platform } from "react-native";
import { useOrientation } from "../hooks/useOrientation";

const Tab = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();
  const { isPortrait } = useOrientation();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.secondary,
        inactiveTintColor: theme.colors.text,
        labelPosition: "beside-icon",
        labelStyle: {
          fontSize: RFValue(12),
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Listagem",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="format-list-bulleted"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          title: "Cadastrar",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Resume"
        component={Resume}
        options={{
          title: "Resumo",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="pie-chart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

import React from "react";
import { ThemeProvider } from "styled-components";
import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import AppLoading from "expo-app-loading";
import { StatusBar } from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
import { Routes } from "./src/routes/index.routes";
import { AuthProvider, useAuth } from "./src/hooks/auth";

export default function App() {
  const { isLoading } = useAuth();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded || isLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

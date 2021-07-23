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
// import { Routes } from "./src/routes/index.routes";
import { SignIn } from "./src/screens/SignIn";
import { AuthProvider } from "./src/hooks/auth";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      {/* <Routes /> */}
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    </ThemeProvider>
  );
}

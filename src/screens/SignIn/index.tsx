import React, { useContext } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import LogoSvg from "../../assets/logo.svg";
import GoogleSvg from "../../assets/google.svg";
import AppleSvg from "../../assets/apple.svg";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useOrientation } from "../../hooks/useOrientation";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitleWrapper,
  SignInTitle,
  Footer,
  SignInButtonContainer,
  ButtonWrapper,
} from "./styles";
import { useAuth } from "../../hooks/auth";
import { Alert } from "react-native";

export function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta google 😥");
    }
  }

  async function handleSignInWithApple() {
    try {
      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta apple 😥");
    }
  }

  const { isPortrait } = useOrientation();

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>Controle suas finanças de forma muito simples</Title>
        </TitleWrapper>
        <SignInTitleWrapper>
          <SignInTitle>Faça seu login com uma das contas abaixo</SignInTitle>
        </SignInTitleWrapper>
      </Header>
      <Footer>
        <SignInButtonContainer isPortrait={isPortrait}>
          <ButtonWrapper isPortrait={isPortrait}>
            <SignInSocialButton
              title="Entrar com Google"
              svg={GoogleSvg}
              onPress={handleSignInWithGoogle}
            />
          </ButtonWrapper>
          <ButtonWrapper isPortrait={isPortrait}>
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          </ButtonWrapper>
        </SignInButtonContainer>
      </Footer>
    </Container>
  );
}

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import theme from "../../global/styles/theme";
import { IsPortraitProps } from "../../hooks/useOrientation";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  height: 70%;
  padding: 42px 0px;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.primary};
`;

export const TitleWrapper = styled.View`
  flex: 4;
  max-width: 90%;
  justify-content: space-evenly;
  align-items: center;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const SignInTitleWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const SignInTitle = styled.Text`
  text-align: center;
  max-width: 55%;

  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Footer = styled.View`
  height: 30%;

  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const SignInButtonContainer = styled.View<IsPortraitProps>`
  margin: 0px
    ${({ isPortrait }) =>
      isPortrait
        ? theme.spacing.portrait_horizontal_safe_area
        : theme.spacing.landscape_horizontal_safe_area}px;

  flex-direction: ${({ isPortrait }) => (isPortrait ? "column" : "row")};

  ${({ isPortrait }) =>
    !isPortrait &&
    css`
      justify-content: space-between;
    `}
  margin-top: ${RFPercentage(-4)}px;
`;

export const ButtonWrapper = styled.View<IsPortraitProps>`
  width: ${({ isPortrait }) => (isPortrait ? "100%" : "48%")};

  ${({ isPortrait }) =>
    isPortrait &&
    css`
      margin-bottom: ${RFValue(12)}px;
    `};
`;

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { IsPortraitProps } from "../../hooks/useOrientation";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const UserWrapper = styled.View<IsPortraitProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0px
    ${({ theme, isPortrait }) =>
      isPortrait
        ? theme.spacing.paddingHorizontal
        : theme.spacing.paddingHorizontalLandscape}px;
  margin-top: ${({ isPortrait }) =>
    isPortrait ? getStatusBarHeight() + RFValue(28) : RFValue(28)}px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 16px;
`;

export const UserGreeting = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
`;

export const UserName = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.shape};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(28)}px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const HighlightCards = styled.ScrollView.attrs<IsPortraitProps>(
  ({ isPortrait, theme }) => ({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {
      paddingHorizontal: isPortrait
        ? theme.spacing.paddingHorizontal
        : theme.spacing.paddingHorizontalLandscape,
    },
  })
)<IsPortraitProps>`
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

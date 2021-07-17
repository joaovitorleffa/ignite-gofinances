import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { IsPortraitProps } from "../../hooks/useOrientation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  bounces: false,
})``;

export const Header = styled.View<IsPortraitProps>`
  background-color: ${({ theme }) => theme.colors.primary};
  height: ${({ isPortrait }) => (isPortrait ? RFValue(113) : RFValue(64))}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 16px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
`;

export const Form = styled.View<IsPortraitProps>`
  margin: 0px
    ${({ theme, isPortrait }) =>
      isPortrait
        ? theme.spacing.portrait_horizontal_safe_area
        : theme.spacing.landscape_horizontal_safe_area}px;
  margin-top: 24px;
  margin-bottom: 24px;

  flex: 1;
  justify-content: space-between;
`;

export const InputWrapper = styled.View`
  margin-bottom: 8px;
`;

export const Fields = styled.View`
  margin-bottom: 16px;
`;

export const TransactionTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: 8px;
  margin-bottom: 16px;
`;

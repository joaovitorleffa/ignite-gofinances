import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { IsPortraitProps } from "../../hooks/useOrientation";
import theme from "../../global/styles/theme";
import { getBottomSpace, isIphoneX } from "react-native-iphone-x-helper";

interface CategoryProps extends IsPortraitProps {
  selected: boolean;
}

type NameProps = {
  color: string;
};

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View<IsPortraitProps>`
  height: ${({ isPortrait }) => (isPortrait ? RFValue(113) : RFValue(64))}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 16px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
  flex-direction: row;
  align-items: center;
  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.colors.secondary_light};
    `}

  padding: ${RFValue(15)}px
    ${({ isPortrait }) =>
    isPortrait
      ? theme.spacing.portrait_horizontal_safe_area
      : theme.spacing.landscape_horizontal_safe_area}px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 12px;
`;

export const Name = styled.Text<NameProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ color }) => color};
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.border};
`;

export const Footer = styled.View<IsPortraitProps>`
  margin: 0px
    ${({ isPortrait }) =>
      isPortrait
        ? theme.spacing.portrait_horizontal_safe_area
        : theme.spacing.landscape_horizontal_safe_area}px;
  margin-bottom: ${isIphoneX() ? getBottomSpace() : 24}px;
`;

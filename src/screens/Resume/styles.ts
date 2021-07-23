import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { IsPortraitProps } from "../../hooks/useOrientation";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

interface ScrollProps extends IsPortraitProps {
  tabHeight: number;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.ScrollView.attrs<ScrollProps>((props) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: 24,
    paddingBottom: props.tabHeight,
    paddingHorizontal: props.isPortrait
      ? props.theme.spacing.portrait_horizontal_safe_area
      : props.theme.spacing.landscape_horizontal_safe_area,
  },
}))<ScrollProps>`
  flex: 1;
`;

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

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthSelect = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.title_secondary};
`;

export const Month = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title_secondary};
`;

export const LoadContainer = styled.View`
  margin-top: 64px;
`;

export const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: props.theme.colors.primary,
}))``;

import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface IconProps {
  type: "up" | "down";
}

interface SelectProps {
  selected: boolean;
}

interface TransactionProps {
  selected: boolean;
  type: "up" | "down";
}

export const Container = styled.View.attrs({
  activeOpacity: 0.75,
})<TransactionProps>`
  flex: 1;
  max-width: 48%;

  ${({ selected, type }) =>
    selected &&
    type === "up" &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
    `};

  ${({ selected, type }) =>
    selected &&
    type === "down" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `};

  border-width: ${({ selected }) => (selected ? 0 : 1.5)}px;
  border-color: ${({ theme }) => theme.colors.border};

  border-radius: 5px;
`;

export const Content = styled(RectButton)<SelectProps>`
  padding: 16px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;

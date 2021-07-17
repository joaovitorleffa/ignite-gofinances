import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton).attrs({
  underlayColor: "rgba(0, 0, 0, 0.4)",
})`
  padding: 18px 16px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CategoryName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;

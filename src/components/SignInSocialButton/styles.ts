import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Button = styled(RectButton)`
  height: ${RFValue(56)}px;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${RFValue(16)}px;
  border-right-width: 1px;
  border-color: ${({ theme }) => theme.colors.background};
`;

export const ButtonText = styled.Text`
  flex: 1;
  text-align: center;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title_secondary};
`;

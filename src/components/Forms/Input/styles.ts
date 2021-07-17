import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TextInput)`
  background-color: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.placeholder};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  padding: 18px 16px;
  border-radius: 5px;
`;

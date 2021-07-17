import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, CategoryName, Icon } from "./styles";

interface Props extends RectButtonProps {
  title: string;
}

export function CategorySelectButton({ title, ...rest }: Props) {
  return (
    <Container activeOpacity={0.75} {...rest}>
      <CategoryName>{title}</CategoryName>
      <Icon name="chevron-down" />
    </Container>
  );
}

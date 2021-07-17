import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest }: Props) {
  return (
    <Container activeOpacity={0.75} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}

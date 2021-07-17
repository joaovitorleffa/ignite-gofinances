import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Content, Icon, Title } from "./styles";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

interface Props extends RectButtonProps {
  title: string;
  type: "up" | "down";
  selected?: boolean;
}

export function TransactionTypeButton({
  title,
  type,
  selected = false,
  ...rest
}: Props) {
  return (
    <Container selected={selected} type={type}>
      <Content selected={selected} {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Content>
    </Container>
  );
}

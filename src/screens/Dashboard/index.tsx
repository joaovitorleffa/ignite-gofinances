import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { useOrientation } from "../../hooks/useOrientation";
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
} from "./styles";

export function Dashboard() {
  const { isPortrait } = useOrientation();

  return (
    <Container>
      <Header>
        <UserWrapper isPortrait={isPortrait}>
          <UserInfo>
            <Photo source={{ uri: "https://github.com/joaovitorleffa.png" }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>João Vitor</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards isPortrait={isPortrait}>
        <HighlightCard
          type="up"
          title="Entrada"
          amount="R$ 14.900,00"
          lastTransaction="Última transação dia 15 de julho"
        />
        <HighlightCard
          type="down"
          title="Saida"
          amount="R$ 14.900,00"
          lastTransaction="Última transação dia 15 de julho"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 14.900,00"
          lastTransaction="Última transação dia 15 de julho"
        />
      </HighlightCards>
    </Container>
  );
}

import React from "react";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
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
  Transactions,
  Title,
  TransactionList,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const { isPortrait } = useOrientation();

  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "16/07/2021",
    },
    {
      id: "2",
      type: "negative",
      title: "Hamburgueria",
      amount: "R$ 59,90",
      category: { name: "Alimentação", icon: "coffee" },
      date: "16/07/2021",
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      category: { name: "Casa", icon: "shopping-bag" },
      date: "16/07/2021",
    },
  ];

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
      <Transactions isPortrait={isPortrait}>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}

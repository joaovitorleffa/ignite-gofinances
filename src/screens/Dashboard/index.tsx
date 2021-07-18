import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback, useState } from "react";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import { useOrientation } from "../../hooks/useOrientation";
import { formatCurrencyToLocaleString } from "../../utils/currency";
import { formatDateToLocaleString } from "../../utils/date";
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
  LogoutButton,
  Loading,
  LoadContainer,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const { isPortrait } = useOrientation();

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState({} as HighlightData);

  let entriesSum = 0;
  let expensiveSum = 0;

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((item) => item.type === type)
          .map((item) => new Date(item.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  }

  function getDateInterval(collection: DataListProps[]) {
    const lastTransactionEntries = Math.max.apply(
      Math,
      collection
        .filter((item) => item.type === "positive")
        .map((item) => new Date(item.date).getTime())
    );

    const lastTransactionExpensive = Math.max.apply(
      Math,
      collection
        .filter((item) => item.type === "negative")
        .map((item) => new Date(item.date).getTime())
    );

    const firstTransactionEntries = Math.min.apply(
      Math,
      collection
        .filter((item) => item.type === "positive")
        .map((item) => new Date(item.date).getTime())
    );

    const firstTransactionExpensive = Math.min.apply(
      Math,
      collection
        .filter((item) => item.type === "negative")
        .map((item) => new Date(item.date).getTime())
    );

    const last = Math.max(lastTransactionEntries, lastTransactionExpensive);
    const first = Math.min(firstTransactionEntries, firstTransactionExpensive);

    return `${new Date(first).getDate()} à ${new Date(
      last
    ).getDate()} de ${new Date(last).toLocaleString("pt-BR", {
      month: "long",
    })}`;
  }

  async function fetchTransaction() {
    const dataKey = "@gofinances:transactions";
    try {
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];

      const formattedTransactions: DataListProps[] = transactions.map(
        (item: DataListProps) => {
          if (item.type === "positive") {
            entriesSum += Number(item.amount);
          } else {
            expensiveSum += Number(item.amount);
          }

          const amount = formatCurrencyToLocaleString(Number(item.amount));

          const date = formatDateToLocaleString(item.date);

          return {
            id: item.id,
            name: item.name,
            type: item.type,
            category: item.category,
            amount,
            date,
          };
        }
      );

      const lastTransactionEntries = getLastTransactionDate(
        transactions,
        "positive"
      );

      const lastTransactionExpensive = getLastTransactionDate(
        transactions,
        "negative"
      );

      const totalInterval = getDateInterval(transactions);

      setHighlightData({
        entries: {
          amount: formatCurrencyToLocaleString(entriesSum),
          lastTransaction: `Última entrada em ${lastTransactionEntries}`,
        },
        expensive: {
          amount: formatCurrencyToLocaleString(expensiveSum),
          lastTransaction: `Última saída em ${lastTransactionExpensive}`,
        },
        total: {
          amount: formatCurrencyToLocaleString(entriesSum - expensiveSum),
          lastTransaction: totalInterval,
        },
      });
      setTransactions(formattedTransactions);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchTransaction();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <Loading />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper isPortrait={isPortrait}>
              <UserInfo>
                <Photo
                  source={{ uri: "https://github.com/joaovitorleffa.png" }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>João Vitor</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={() => {}}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards isPortrait={isPortrait}>
            <HighlightCard
              type="up"
              title="Entrada"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saida"
              amount={highlightData.expensive.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>
          <Transactions isPortrait={isPortrait}>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}

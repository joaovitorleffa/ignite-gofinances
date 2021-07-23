import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback, useState } from "react";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import { useAuth } from "../../hooks/auth";
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
  const { user, signOut } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState({} as HighlightData);

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
    const lastTransaction = Math.max.apply(
      Math,
      collection.map((item) => new Date(item.date).getTime())
    );

    const firstTransaction = Math.min.apply(
      Math,
      collection.map((item) => new Date(item.date).getTime())
    );

    return `${new Date(firstTransaction).getDate()} à ${new Date(
      lastTransaction
    ).getDate()} de ${new Date(lastTransaction).toLocaleString("pt-BR", {
      month: "long",
    })}`;
  }

  async function fetchTransaction() {
    let entriesSum = 0;
    let expensiveSum = 0;
    const dataKey = `@gofinances:transactions_user:${user.id}`;
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

      const lastTransactionEntries =
        transactions?.length === 0
          ? 0
          : getLastTransactionDate(transactions, "positive");

      const lastTransactionExpensive =
        transactions?.length === 0
          ? 0
          : getLastTransactionDate(transactions, "negative");

      const totalInterval =
        transactions?.length === 0 ? 0 : getDateInterval(transactions);

      setHighlightData({
        entries: {
          amount: formatCurrencyToLocaleString(entriesSum),
          lastTransaction:
            lastTransactionEntries === 0
              ? ""
              : `Última entrada em ${lastTransactionEntries}`,
        },
        expensive: {
          amount: formatCurrencyToLocaleString(expensiveSum),
          lastTransaction:
            lastTransactionExpensive === 0
              ? ""
              : `Última saída em ${lastTransactionExpensive}`,
        },
        total: {
          amount: formatCurrencyToLocaleString(entriesSum - expensiveSum),
          lastTransaction: totalInterval === 0 ? "" : totalInterval,
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
                <Photo source={{ uri: user.photo }} />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
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

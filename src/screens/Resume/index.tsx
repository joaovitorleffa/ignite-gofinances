import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useFocusEffect } from "@react-navigation/core";
import { addMonths, subMonths, format } from "date-fns";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ptBR } from "date-fns/locale";

import { useAuth } from "../../hooks/auth";
import { categories } from "../../utils/categories";
import { useOrientation } from "../../hooks/useOrientation";
import { formatCurrencyToLocaleString } from "../../utils/currency";

import { HistoryCard } from "../../components/HistoryCard";

import {
  Container,
  Content,
  Header,
  Title,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer,
  Loading,
} from "./styles";

interface TransactionData {
  type: "negative" | "positive";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  color: string;
  name: string;
  percent: string;
  total: number;
  totalFormatted: string;
}

export function Resume() {
  const theme = useTheme();
  const height = useBottomTabBarHeight();
  const { isPortrait } = useOrientation();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  function handleDateChange(action: "previous" | "next") {
    if (action === "next") {
      return setSelectedDate((prev) => addMonths(prev, 1));
    }

    return setSelectedDate((prev) => subMonths(prev, 1));
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const expensive: TransactionData[] = transactions.filter(
      (transaction: TransactionData) =>
        transaction.type === "negative" &&
        new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
        new Date(transaction.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensiveTotal = expensive.reduce(
      (acc: number, item: TransactionData) => (acc += Number(item.amount)),
      0
    );
    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensive.forEach((element) => {
        if (element.category === category.key) {
          categorySum += Number(element.amount);
        }
      });

      if (categorySum > 0) {
        const percent = `${((categorySum / expensiveTotal) * 100).toFixed(0)}%`;

        totalByCategory.push({
          color: category.color,
          name: category.name,
          total: categorySum,
          percent,
          totalFormatted: formatCurrencyToLocaleString(categorySum),
        });
      }
    });

    setIsLoading(false);
    setTotalByCategories(totalByCategory);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header isPortrait={isPortrait}>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content isPortrait={isPortrait} tabHeight={height}>
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange("previous")}>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>

          <Month>{format(selectedDate, "MMMM, yyyy", { locale: ptBR })}</Month>

          <MonthSelectButton onPress={() => handleDateChange("next")}>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>

        {isLoading ? (
          <LoadContainer>
            <Loading />
          </LoadContainer>
        ) : (
          <>
            <ChartContainer>
              <VictoryPie
                data={totalByCategories}
                x="percent"
                y="total"
                colorScale={totalByCategories.map((item) => item.color)}
                labelRadius={50}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fill: theme.colors.shape,
                  },
                }}
              />
            </ChartContainer>
            {totalByCategories.map((item) => (
              <HistoryCard
                key={item.color}
                title={item.name}
                amount={item.totalFormatted}
                color={item.color}
              />
            ))}
          </>
        )}
      </Content>
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import { Alert, Modal } from "react-native";
import { useForm } from "react-hook-form";
import uuid from "react-native-uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import * as Yup from "yup";

import { useAuth } from "../../hooks/auth";
import { useOrientation } from "../../hooks/useOrientation";

import { CategorySelect } from "../CategorySelect";
import { Button } from "../../components/Forms/Button";
import InputForm from "../../components/Forms/InputForm";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";

import {
  Container,
  Header,
  Title,
  Form,
  InputWrapper,
  Fields,
  TransactionTypes,
  Content,
} from "./styles";

const schema = Yup.object().shape({
  name: Yup.string().required("O Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("Informe um valor positivo"),
});

const categoryObj = {
  key: "category",
  name: "Categoria",
};
interface FormData {
  name: string;
  amount: string;
}

export function Register() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { isPortrait } = useOrientation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const dataKey = `@gofinances:transactions_user:${user.id}`;

  const [category, setCategory] = useState(categoryObj);
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handleTransactionTypeSelect(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleCloseSelectModalCategory() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectModalCategory() {
    setCategoryModalOpen(true);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert(
        "Selecione a transação 🤑",
        "Selecione o tipo da transação para continuar"
      );
    }

    if (category.key === "category") {
      return Alert.alert(
        "Selecione a categoria",
        "Selecione a categoria para continuar"
      );
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const transactions = await AsyncStorage.getItem(dataKey);
      const currentData = transactions ? JSON.parse(transactions) : [];

      const formattedData = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));

      reset();
      setTransactionType("");
      setCategory(categoryObj);
      navigation.navigate("Dashboard");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Aaah, que pena! 😔",
        "Ocorreu um erro ao salvar os dados, não se preocupe, tente novamente mais tarde!"
      );
    }
  }

  // useEffect(() => {
  //   const remove = async () => {
  //     await AsyncStorage.removeItem(dataKey);
  //   };
  //   remove();
  // }, []);

  return (
    <Container>
      <Content>
        <Header isPortrait={isPortrait}>
          <Title>Cadastro</Title>
        </Header>
        <Form isPortrait={isPortrait}>
          <Fields>
            <InputWrapper>
              <InputForm
                name="name"
                error={errors.name && errors.name.message}
                control={control}
                placeholder="Nome"
                autoCorrect={false}
                autoCapitalize="sentences"
              />
            </InputWrapper>
            <InputWrapper>
              <InputForm
                name="amount"
                error={errors.amount && errors.amount.message}
                control={control}
                keyboardType="numeric"
                placeholder="Preço"
              />
            </InputWrapper>

            <TransactionTypes>
              <TransactionTypeButton
                title="Entrada"
                type="up"
                selected={transactionType === "positive"}
                onPress={() => handleTransactionTypeSelect("positive")}
              />
              <TransactionTypeButton
                title="Saída"
                type="down"
                selected={transactionType === "negative"}
                onPress={() => handleTransactionTypeSelect("negative")}
              />
            </TransactionTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectModalCategory}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
          <Modal
            visible={categoryModalOpen}
            animationType="slide"
            supportedOrientations={["portrait", "landscape"]}
          >
            <CategorySelect
              category={category}
              setCategory={setCategory}
              closeSelectCategory={handleCloseSelectModalCategory}
            />
          </Modal>
        </Form>
      </Content>
    </Container>
  );
}

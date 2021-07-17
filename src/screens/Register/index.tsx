import React, { useState } from "react";
import { Alert, Modal } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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

interface FormData {
  name: string;
  amount: string;
}

export function Register() {
  const { isPortrait } = useOrientation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleCloseSelectModalCategory() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectModalCategory() {
    setCategoryModalOpen(true);
  }

  function handleRegister(form: FormData) {
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

    console.log(form);
  }

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
                selected={transactionType === "up"}
                onPress={() => handleTransactionTypeSelect("up")}
              />
              <TransactionTypeButton
                title="Saída"
                type="down"
                selected={transactionType === "down"}
                onPress={() => handleTransactionTypeSelect("down")}
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

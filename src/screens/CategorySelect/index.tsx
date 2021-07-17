import React from "react";
import { FlatList } from "react-native";
import { Button } from "../../components/Forms/Button";
import { useOrientation } from "../../hooks/useOrientation";
import { categories } from "../../utils/categories";

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: Props) {
  const { isPortrait } = useOrientation();

  function handleCategorySelect(item: Category) {
    setCategory(item);
  }

  return (
    <Container>
      <Header isPortrait={isPortrait}>
        <Title>Categoria</Title>
      </Header>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={() => <Separator />}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <Category
            isPortrait={isPortrait}
            selected={category.key === item.key}
            onPress={() => handleCategorySelect(item)}
          >
            <Icon name={item.icon} color={item.color} />
            <Name color={item.color}>{item.name}</Name>
          </Category>
        )}
      />

      <Footer isPortrait={isPortrait}>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
}

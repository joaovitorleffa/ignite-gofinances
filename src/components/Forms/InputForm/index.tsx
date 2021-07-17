import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input";

import { Container, ErrorText } from "./styles";

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export function InputForm({ control, name, error, ...rest }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input {...rest} value={value} onChangeText={onChange} />
        )}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
}

export default InputForm;

import { Dimensions } from "react-native";

export function isPortrait() {
  const dimension = Dimensions.get("screen");
  return dimension.height >= dimension.width;
}

export function isLandScape() {
  const dimension = Dimensions.get("screen");
  return dimension.height < dimension.width;
}

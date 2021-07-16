import { useState } from "react";
import { Dimensions } from "react-native";
import { isPortrait } from "../utils/orientation";

export type DeviceOrientationType = "landscape" | "portrait";

export interface DeviceOrientation {
  orientation: DeviceOrientationType;
  isPortrait: boolean;
  isLandscape: boolean;
}

export type IsPortraitProps = Pick<DeviceOrientation, "isPortrait">;

export type IsLandscapeProps = Pick<DeviceOrientation, "isLandscape">;

export type Orientation = Pick<DeviceOrientation, "orientation">;

export function useOrientation(): DeviceOrientation {
  const [orientation, setOrientation] = useState<DeviceOrientationType>(
    isPortrait() ? "portrait" : "landscape"
  );

  Dimensions.addEventListener("change", () => {
    setOrientation(isPortrait() ? "portrait" : "landscape");
  });

  return {
    orientation,
    isPortrait: orientation === "portrait",
    isLandscape: orientation === "landscape",
  };
}

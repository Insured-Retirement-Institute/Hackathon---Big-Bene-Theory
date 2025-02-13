import * as React from "react";
import { CSSProperties } from "react";
import {
  MantineColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

export const CardContainerStyles = (
  colorScheme: MantineColorScheme,
): CSSProperties => {
  return {
    padding: "1rem 1.25rem",
    backgroundColor: colorScheme === "light" ? "white" : "#3b3b3b", //theme.colors.dark[5],
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px -1px rgb(0 0 0 / 5%)",
  };
};

export const CardContainer = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <div style={{ ...CardContainerStyles(colorScheme), ...style }}>
      {children}
    </div>
  );
};

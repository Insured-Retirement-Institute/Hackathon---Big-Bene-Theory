import { Text } from "@mantine/core";
import * as React from "react";

export const ValueText = ({ label }: { label: string }) => {
  return (
    <Text
      size={"sm"}
      fw={500}
      style={{
        whiteSpace: "pre-wrap",
      }}
    >
      {label}
    </Text>
  );
};

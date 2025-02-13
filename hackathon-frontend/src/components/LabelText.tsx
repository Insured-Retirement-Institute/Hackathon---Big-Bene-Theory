import { Text } from "@mantine/core";
import * as React from "react";

export const LabelText = ({ label }: { label: string }) => {
  return (
    <Text size={"xs"} c={"dimmed"} fw={500}>
      {label}
    </Text>
  );
};

import { Button, useMantineColorScheme } from "@mantine/core";

type PolicyDetailsButtonProps = {
  policyNumber: string;
};
export const PolicyDetailsButton = ({
  policyNumber,
}: PolicyDetailsButtonProps) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Button
      pl={0}
      variant={"transparent"}
      color={colorScheme === "light" ? "blue.8" : "blue.6"}
    >
      {policyNumber}
    </Button>
  );
};

import { Box, Center, Group, MantineColorScheme } from "@mantine/core";
import { IriLogo } from "./IRILogo";
import { ColorSchemeSwitcher } from "./ColorSchemeSwitcher";
import { Notifications } from "../components/Notifications";
import { IriLogoDark } from "./IRILogoDark";

type TopProps = {
  colorScheme: MantineColorScheme;
};
export const Top = ({ colorScheme }: TopProps) => {
  const userId = "1";
  return (
    <Group justify={"space-between"} align="center">
      <Center p={"sm"} pl={0}>
        {colorScheme === "dark" ? <IriLogoDark /> : <IriLogo />}
      </Center>
      <Group spacing="md">
        <Notifications userId={userId} />
        <Box pr={"md"}>
          <ColorSchemeSwitcher />
        </Box>
      </Group>
    </Group>
  );
};

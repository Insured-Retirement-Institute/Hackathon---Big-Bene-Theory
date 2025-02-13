import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CardContainer,
  CardContainerStyles,
  LabelText,
  ValueText,
} from "../components";
import {
  Button,
  Group,
  Stack,
  Title,
  useMantineColorScheme,
} from "@mantine/core";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const users = [
  {
    id: 1,
    name: "Michael Johnson",
    email: "mjohnson@example.com",
    number: "555-987-6543",
  },
  {
    id: 2,
    name: "Laura Williams",
    email: "lwilliams@example.com",
    number: "555-123-9876",
  },
];

function RouteComponent() {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Stack>
      <Title>Select A Policy Owner</Title>
      <Group align={"flex-start"}>
        {users.map((user) => (
          <Button
            key={user.id}
            style={{
              height: "6rem",
            }}
            variant={"outline"}
            radius={"md"}
            color={colorScheme === "light" ? "blue.8" : "blue.6"}
            component={Link}
            to={`/${user.id}`}
          >
            <Stack gap={0}>
              <ValueText label={user.name} />
              <LabelText label={user.email} />
              <LabelText label={user.number} />
            </Stack>
          </Button>
        ))}
      </Group>
    </Stack>
  );
}

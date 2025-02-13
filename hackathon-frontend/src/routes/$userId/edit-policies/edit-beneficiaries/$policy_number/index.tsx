import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import {
  Space,
  Text,
  Group,
  Stack,
  Title,
  Button,
  useMantineColorScheme,
} from "@mantine/core";
import {
  CardContainer,
  CardContainerStyles,
  PolicyDetailsButton,
} from "../../../../../components";
import { Policy } from "../../../../../PolicyGrid";
import { usePolicyAsSearchParams } from "../../../../../hooks/usePolicyAsSearchParams";

export const Route = createFileRoute(
  "/$userId/edit-policies/edit-beneficiaries/$policy_number/",
)({
  validateSearch: (search: { policy: Policy }): { policy: Policy } => {
    // validate and parse the search params into a typed state
    return {
      policy: search.policy,
    };
  },
  component: EditPolicyBeneficiaries,
});

function EditPolicyBeneficiaries() {
  const foo = usePolicyAsSearchParams(Route.fullPath);
  console.log("f", foo);
  const params = Route.useParams();
  const { colorScheme } = useMantineColorScheme();
  console.log(params);

  const links: { label: string; route: string }[] = [
    {
      label: "Add / Delete",
      route: "modify_policy",
    },
    {
      label: "Edit Information",
      route: "edit_beneficiary_information",
    },
    {
      label: "Change Allocations / Stirpes",
      route: "modify_policy/allocations",
    },
  ];

  console.log("params", params);
  return (
    <Stack>
      <Title>Beneficiaries</Title>
      <CardContainer style={{ width: "100%" }}>
        <Group>
          <Text>Policy:</Text>
          <PolicyDetailsButton policyNumber={params?.policy_number} />
        </Group>

        <Space h={"sm"} />
        <Text size={"sm"} c={"dimmed"}>
          Select One
        </Text>
        <Space h={"lg"} />
        <Group gap={"xl"}>
          {links.map((link) => (
            <Button
              key={link.label}
              variant={"outline"}
              component={Link}
              to={link.route}
              search={foo.policy}
              color={colorScheme === "light" ? "blue.8" : "blue.6"}
              styles={{
                inner: {
                  justifyContent: "flex-start",
                },
              }}
              style={{
                ...CardContainerStyles(colorScheme),
                width: "15rem",
                height: "5rem",
              }}
            >
              {link.label}
            </Button>
          ))}
        </Group>
      </CardContainer>
    </Stack>
  );
}

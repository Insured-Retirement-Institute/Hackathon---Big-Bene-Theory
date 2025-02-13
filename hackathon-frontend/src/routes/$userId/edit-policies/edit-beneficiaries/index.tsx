import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Text,
  Button,
  Group,
  Stack,
  Title,
  useMantineColorScheme,
  Table,
  NumberFormatter,
} from "@mantine/core";
import { CardContainer } from "../../../../components";
import { PolicyDetailsButton } from "../../../../components/PolicyDetailsButton";
import { useGetPolicies } from "../../../../api/serviice";
import { BeneTable } from "../../../../components/BeneTable";

export const Route = createFileRoute(
  "/$userId/edit-policies/edit-beneficiaries/",
)({
  component: RouteComponent,
});

export function camelCaseToWords(s: string) {
  const result = s?.replace(/([A-Z])/g, " $1");
  return result?.charAt(0)?.toUpperCase() + result?.slice(1);
}

function RouteComponent() {
  const { colorScheme } = useMantineColorScheme();

  const params = Route.useParams();
  const userId = params.userId;
  const policies = useGetPolicies(userId);
  return (
    <Stack style={{ flexGrow: 1, maxWidth: "80rem" }}>
      <Title>Beneficiaries</Title>
      {policies?.data?.map((policy) => (
        <CardContainer>
          <Stack>
            <Group justify={"space-between"}>
              <Group>
                <Text>Policy:</Text>
                <PolicyDetailsButton policyNumber={policy.policyNumber} />
              </Group>
              <Button
                variant={"outline"}
                component={Link}
                to={`${policy.policyNumber}`}
                search={policy}
              >
                Edit This Contract
              </Button>
            </Group>
            <BeneTable beneficiaries={policy.beneficiaries} />
            {/*<Table striped highlightOnHover withRowBorders={false}>*/}
            {/*  <Table.Thead>*/}
            {/*    <Table.Tr>*/}
            {/*      <Table.Th style={{ width: "20rem" }}>Name</Table.Th>*/}
            {/*      <Table.Th>Per Stirpes?</Table.Th>*/}
            {/*      <Table.Th>Allocation</Table.Th>*/}
            {/*      <Table.Th style={{ width: "14rem" }}>*/}
            {/*        Primary / Contingent*/}
            {/*      </Table.Th>*/}
            {/*      <Table.Th>Relationship</Table.Th>*/}
            {/*    </Table.Tr>*/}
            {/*  </Table.Thead>*/}
            {/*  <Table.Tbody>*/}
            {/*    {policy.beneficiaries.map((beneficiary) => (*/}
            {/*      <Table.Tr key={beneficiary.beneName}>*/}
            {/*        <Table.Td>*/}
            {/*          {camelCaseToWords(beneficiary.beneName)}*/}
            {/*        </Table.Td>*/}
            {/*        <Table.Td>Yes</Table.Td>*/}
            {/*        <Table.Td>*/}
            {/*          {+beneficiary.beneValue > 100 ? (*/}
            {/*            <NumberFormatter*/}
            {/*              value={beneficiary.beneValue}*/}
            {/*              thousandSeparator={true}*/}
            {/*              prefix={"$"}*/}
            {/*            />*/}
            {/*          ) : (*/}
            {/*            `${beneficiary.beneValue}%`*/}
            {/*          )}*/}
            {/*        </Table.Td>*/}
            {/*        <Table.Td>*/}
            {/*          {camelCaseToWords(beneficiary.beneRole)}*/}
            {/*        </Table.Td>*/}
            {/*        <Table.Td>*/}
            {/*          {camelCaseToWords(beneficiary.relationship)}*/}
            {/*        </Table.Td>*/}
            {/*      </Table.Tr>*/}
            {/*    ))}*/}
            {/*  </Table.Tbody>*/}
            {/*</Table>*/}
          </Stack>
        </CardContainer>
      ))}
    </Stack>
  );
}

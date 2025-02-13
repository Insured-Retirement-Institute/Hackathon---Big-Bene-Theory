import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CardContainer,
  PolicyDetailsButton,
} from "../../../../../../components";
import { Table, Stack, Title, Text, Group, Button } from "@mantine/core";
import { Policy, PolicyGrid } from "../../../../../../PolicyGrid";
import { usePolicyAsSearchParams } from "../../../../../../hooks/usePolicyAsSearchParams";
import { useGetPolicies } from "../../../../../../api/serviice";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BeneTable } from "../../../../../../components/BeneTable";
import { IconArrowBack } from "@tabler/icons-react";

export const Route = createFileRoute(
  "/$userId/edit-policies/edit-beneficiaries/$policy_number/modify_policy/verify-and-submit",
)({
  component: RouteComponent,
});

const TableOfData = ({ data }: { data: Policy[] }) => {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Policy Number</Table.Th>
          <Table.Th>Carrier</Table.Th>
          <Table.Th>Product Name</Table.Th>
          <Table.Th>Firm</Table.Th>
          <Table.Th>Account Value</Table.Th>
          <Table.Th>Product Category</Table.Th>
          <Table.Th>Financial Advisor</Table.Th>
        </Table.Tr>
        <Table.Tbody>
          {data.map((policy) => (
            <Table.Tr key={policy.policyNumber}>
              <Table.Td>{policy.policyNumber}</Table.Td>
              <Table.Td>{policy.carrier}</Table.Td>
              <Table.Td>{policy.productName}</Table.Td>
              <Table.Td>{policy.firm}</Table.Td>
              <Table.Td>{policy.accountValue}</Table.Td>
              <Table.Td>{policy.productCategory}</Table.Td>
              <Table.Td>{policy.financialAdvisor}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table.Thead>
    </Table>
  );
};

function RouteComponent() {
  const params = Route.useParams();
  const userId = params.userId;
  const { policy, setPolicy } = usePolicyAsSearchParams(Route.id);
  const policies = useGetPolicies(userId);
  const filteredPolicies = policies?.data?.filter(
    (x) => x.policyNumber !== policy.policyNumber,
  );
  console.log("aaapolicies", policies);
  const [selectedPolicies, setSelectedPolicies] = useState<Policy[]>([]);
  console.log("ppp");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (policies: Policy[]) => {
      return axios.post(
        "https://2205if6vs1.execute-api.us-east-1.amazonaws.com/dev/updateBene",
        { policies },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`policies_${userId}`] });
    },
  });

  const handleSubmit = () => {
    if (mutation.isSuccess) {
      return;
    }
    const benes = policy.beneficiaries;
    const policyForSubmit: Policy[] = [policy];
    for (const policy of filteredPolicies || []) {
      policyForSubmit.push({ ...policy, beneficiaries: benes });
    }
    mutation.mutate(policyForSubmit);
  };
  return (
    <Stack style={{ width: "100%" }}>
      <Group justify={"space-between"}>
        <Title>Verify and Submit</Title>
        <Group>
          {mutation.isSuccess && (
            <Button
              variant={"transparent"}
              size={"compact-sm"}
              component={Link}
              to={`/${userId}`}
            >
              <Group>
                <IconArrowBack />
                <Text>Back To Account Home </Text>
              </Group>
            </Button>
          )}

          <Button
            color={mutation.isSuccess ? "green.7" : "blue.6"}
            loading={mutation.isPending}
            onClick={handleSubmit}
            // disabled={mutation.isSuccess}
          >
            {mutation.isSuccess ? "Updates Submitted!" : "Submit Updates"}
          </Button>
        </Group>
      </Group>
      <CardContainer>
        <Stack>
          <Title order={5}>Policy</Title>

          <Stack>
            <div
              style={{
                height: "7rem",
              }}
            >
              <PolicyGrid policies={[policy]} />
            </div>
            <Title order={5}>Beneficiary Data</Title>
            <BeneTable beneficiaries={policy.beneficiaries} />
          </Stack>
          {/*<TableOfData data={[policy]} />*/}
        </Stack>
      </CardContainer>
      {(filteredPolicies?.length || 0) > 0 && (
        <CardContainer
          style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Text>
            Would you like to apply these beneficiary changes to any other
            policy?
          </Text>

          <div style={{ flexGrow: 1, minHeight: "15rem" }}>
            <PolicyGrid
              policies={filteredPolicies || []}
              selectedPolicies={selectedPolicies}
              setSelectedPolicies={(p) => setSelectedPolicies(p)}
            />
          </div>
        </CardContainer>
      )}
    </Stack>
  );
}

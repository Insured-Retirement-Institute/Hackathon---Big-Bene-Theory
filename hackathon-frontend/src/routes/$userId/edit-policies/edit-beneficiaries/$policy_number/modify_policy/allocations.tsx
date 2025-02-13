import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@mantine/form";
import { Policy } from "../../../../../../PolicyGrid";
import { usePolicyAsSearchParams } from "../../../../../../hooks/usePolicyAsSearchParams";
import {
  Stack,
  Table,
  Title,
  Switch,
  NumberInput,
  Group,
  Button,
} from "@mantine/core";
import { CardContainer } from "../../../../../../components";
import { camelCaseToWords } from "../../index";
import { useGetPolicies } from "../../../../../../api/serviice";

export const Route = createFileRoute(
  "/$userId/edit-policies/edit-beneficiaries/$policy_number/modify_policy/allocations",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const params = Route.useParams();
  const userId = params.userId;
  const policies = useGetPolicies(userId);
  const policyBeforeEdits = policies?.data?.find(
    (policy) => policy.policyNumber === params.policy_number,
  );
  const { policy, setPolicy } = usePolicyAsSearchParams(Route.id);
  const beneficiaryForm = useForm<Partial<Policy>>({
    initialValues: {
      // beneficiaries: policyBeforeEdits?.beneficiaries,
      beneficiaries: policy?.beneficiaries,
    },
    validate: {
      beneficiaries: (value, values) => {
        if ((value?.length || 0) === 0) {
          return "Enter Beneficiaries";
        }

        const primaryBeneficiaries = values.beneficiaries?.filter(
          (beneficiary) => beneficiary.beneRole === "primary",
        );
        const secondaryBeneficiaries = values.beneficiaries?.filter(
          (beneficiary) => beneficiary.beneRole === "contingent",
        );
        const sumOfSecondaryBeneficiaries = secondaryBeneficiaries?.reduce(
          (sum, beneficiary) => sum + +beneficiary.beneValue || 0,
          0,
        );

        if ((primaryBeneficiaries?.length || 0) > 0) {
          const sumOfPrimaryBeneficiaries = primaryBeneficiaries?.reduce(
            (sum, beneficiary) => sum + +beneficiary.beneValue || 0,
            0,
          );
          if (sumOfPrimaryBeneficiaries !== 100) {
            return "Sum of Primary Beneficiaries must be 100";
          }
        }
        if ((secondaryBeneficiaries?.length || 0) > 0) {
          if (sumOfSecondaryBeneficiaries !== 100) {
            return "Sum of Secondary Beneficiaries must be 100";
          }
        }
        return null;
      },
    },
  });
  return (
    <Stack>
      <Title>Update Allocations</Title>
      <CardContainer>
        <Table horizontalSpacing="xl">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Beneficiary</Table.Th>
              <Table.Th>Add Per Stirpes</Table.Th>
              <Table.Th>Percentage </Table.Th>
              <Table.Th>Primary / Contingent</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {policy.beneficiaries.map((beneficiary, index) => (
              <Table.Tr key={beneficiary.beneName}>
                <Table.Td>{beneficiary.beneName}</Table.Td>
                <Table.Td>
                  <Switch
                    {...beneficiaryForm.getInputProps(
                      `beneficiaries.${index}.perstirpes`,
                      { type: "checkbox" },
                    )}
                    onChange={(e) => {
                      for (let i = 0; i < policy.beneficiaries.length; i++) {
                        beneficiaryForm.setFieldValue(
                          `beneficiaries.${i}.perstirpes`,
                          e.target.checked,
                        );
                      }
                    }}
                  />
                </Table.Td>
                <Table.Td>
                  <NumberInput
                    rightSection={"%"}
                    {...beneficiaryForm.getInputProps(
                      `beneficiaries.${index}.beneValue`,
                    )}
                    onChange={(e) => {
                      console.log(",change value", e);
                      beneficiaryForm.setFieldValue(
                        `beneficiaries.${index}.beneValue`,
                        e === "" ? "" : +e,
                      );
                      beneficiaryForm.validate();
                    }}
                    placeholder="% Value"
                    error={beneficiaryForm.errors.beneficiaries}
                  />
                </Table.Td>
                <Table.Td>{camelCaseToWords(beneficiary.beneRole)}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Group justify={"flex-end"}>
          <Button
            disabled={!beneficiaryForm.isValid()}
            onClick={() => {
              if (!beneficiaryForm.isValid()) {
                beneficiaryForm.validate();
                return;
              }
              const newPolicy = {
                ...policy,
                beneficiaries: beneficiaryForm.values.beneficiaries,
              };
              setPolicy(newPolicy);
              setTimeout(() => {
                navigate({ to: "../verify-and-submit", search: newPolicy });
              });
            }}
          >
            Next
          </Button>
        </Group>
      </CardContainer>
    </Stack>
  );
}

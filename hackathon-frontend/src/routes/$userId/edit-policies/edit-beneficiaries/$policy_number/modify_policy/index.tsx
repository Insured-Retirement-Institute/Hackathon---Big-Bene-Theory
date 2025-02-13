import { createFileRoute, Link } from "@tanstack/react-router";
import { Beneficiary, MockData } from "../../../../../../PolicyGrid";
import {
  CardContainer,
  PolicyDetailsButton,
} from "../../../../../../components";
import {
  Title,
  Text,
  Button,
  Group,
  Stack,
  Table,
  TextInput,
  NumberInput,
  RadioGroup,
  Radio,
  Center,
} from "@mantine/core";
import { useState } from "react";
import { usePolicyAsSearchParams } from "../../../../../../hooks/usePolicyAsSearchParams";
import { IconPlus, IconRotateClockwise2 } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { BeneficiaryForm } from "../../../../../../components/BeneficiaryForm";

export const Route = createFileRoute(
  "/$userId/edit-policies/edit-beneficiaries/$policy_number/modify_policy/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const [addingBenificiary, setAddingBenificiary] = useState<boolean>(false);
  const policyBeforeEdits = MockData.find(
    (policy) => policy.policyNumber === params.policy_number,
  );

  const { policy, setPolicy } = usePolicyAsSearchParams(Route.id);
  console.log("p", policy.beneficiaries);
  const [currentBeneficiaries, setCurrentBeneficiaries] = useState<
    Beneficiary[]
  >(policy?.beneficiaries || []);
  const undoChanges = () => {
    setPolicy(policyBeforeEdits);
  };

  const beneficiaryForm = useForm<Partial<Beneficiary>>({
    initialValues: {
      beneName: "",
      beneRole: "primary",
      relationship: "",
      // type: "",
      beneValue: "",
      email: "",
      address: "",
      phoneNumber: "",
    },
    validate: {
      beneName: isNotEmpty("Required"),
      // role: isNotEmpty("Required"),
      relationship: isNotEmpty("Required"),
      // type: isNotEmpty("equired"),
      // value: isNotEmpty("Required"),
      email: isNotEmpty("Required"),
      address: isNotEmpty("Required"),
      phoneNumber: isNotEmpty("Required"),
    },
  });

  return (
    <Stack>
      <Title>Add / Delete Beneficiaries</Title>
      <CardContainer style={{ height: "fit-content", width: "100%" }}>
        <Stack>
          <Group justify={"space-between"}>
            {policy?.policyNumber ? (
              <Group>
                <Text>Policy:</Text>
                <PolicyDetailsButton policyNumber={policy.policyNumber} />
              </Group>
            ) : (
              <div></div>
            )}

            <Button
              variant={"outline"}
              size={"compact-md"}
              leftSection={<IconPlus />}
              disabled={addingBenificiary}
              onClick={() => setAddingBenificiary(true)}
            >
              Add Beneficiary
            </Button>
          </Group>
          <div style={{ minWidth: "40rem" }}>
            {policy.beneficiaries?.length > 0 ? (
              <Table
                striped
                // withTableBorder={true}
                highlightOnHover
                withRowBorders={false}
                style={{ width: "40rem" }}
              >
                <Table.Tbody>
                  {policy.beneficiaries?.map((bene: Beneficiary, index) => (
                    <Table.Tr key={bene.beneName + index}>
                      <Table.Td>
                        {bene.beneRole === "primary"
                          ? "Primary Beneficiary"
                          : "Contingent Beneficiary"}
                      </Table.Td>
                      <Table.Td>{bene.beneName}</Table.Td>
                      {/*<Table.Td>{bene.value}</Table.Td>*/}
                      <Table.Td>
                        <Button
                          color={"red.6"}
                          size={"compact-md"}
                          onClick={() => {
                            setPolicy({
                              ...policy,
                              beneficiaries: policy.beneficiaries?.filter(
                                (x) => x.beneName !== bene.beneName,
                              ),
                            });
                          }}
                        >
                          Delete
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            ) : (
              <Center>
                <Title order={4} c={"dimmed"}>
                  Please Add Beneficiary
                </Title>
              </Center>
            )}
          </div>
          <Group justify={"space-between"}>
            <Button
              leftSection={<IconRotateClockwise2 />}
              variant={"outline"}
              disabled={addingBenificiary}
              onClick={undoChanges}
            >
              Undo Changes
            </Button>
            <Button
              disabled={addingBenificiary}
              component={Link}
              to="allocations"
              search={policy}
            >
              Next
            </Button>
          </Group>
        </Stack>
      </CardContainer>

      {addingBenificiary && (
        <Stack>
          <Title order={5}>Add New Beneficiary</Title>
          <CardContainer style={{ height: "fit-content", width: "100%" }}>
            <BeneficiaryForm
              close={() => setAddingBenificiary(false)}
              onSubmit={(beneficiary: Beneficiary) => {
                const foo = {
                  ...policy,
                  beneficiaries: [...policy.beneficiaries, beneficiary],
                };
                setPolicy(foo);
                setAddingBenificiary(false);
              }}
            />
          </CardContainer>
        </Stack>
      )}
    </Stack>
  );
}

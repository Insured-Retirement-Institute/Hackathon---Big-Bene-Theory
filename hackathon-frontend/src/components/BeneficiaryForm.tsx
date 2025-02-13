import { isNotEmpty, useForm } from "@mantine/form";
import { Beneficiary } from "../PolicyGrid";
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

type BeneficiaryFormProps = {
  onSubmit: (bene: Beneficiary) => void;
  close: () => void;
};

export const BeneficiaryForm = ({ onSubmit, close }: BeneficiaryFormProps) => {
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
    <form>
      <Group gap={"xl"}>
        <TextInput
          label={"Name"}
          {...beneficiaryForm.getInputProps("beneName")}
        />
        <TextInput
          label={"Email"}
          {...beneficiaryForm.getInputProps("email")}
        />
        <TextInput
          label={"Address"}
          {...beneficiaryForm.getInputProps("address")}
        />
        <NumberInput
          label={"Phone Number"}
          {...beneficiaryForm.getInputProps("phoneNumber")}
        />

        <RadioGroup
          label={"Beneficiary Type"}
          {...beneficiaryForm.getInputProps("beneRole")}
          variant={"horizontal"}
        >
          <Radio label={"Primary"} value={"primary"}></Radio>
          <Radio label={"Contingent"} value={"contingent"}></Radio>
        </RadioGroup>

        <TextInput
          label={"Relationship"}
          {...beneficiaryForm.getInputProps("relationship")}
        />
      </Group>
      <Group mt={"md"} justify={"flex-end"}>
        <Button
          color={"red.5"}
          onClick={() => {
            beneficiaryForm.reset();
            close();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            const valid = beneficiaryForm.isValid();
            console.log("valid", valid);
            if (valid) {
              onSubmit(beneficiaryForm.values as Beneficiary);
            } else {
              beneficiaryForm.validate();
              console.log(beneficiaryForm.errors);
            }
          }}
        >
          Add Beneficiary
        </Button>
      </Group>
    </form>
  );
};

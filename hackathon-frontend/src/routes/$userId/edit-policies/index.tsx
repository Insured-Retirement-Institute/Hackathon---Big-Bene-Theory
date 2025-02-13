import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Button,
  Group,
  MantineColorScheme,
  Stack,
  Title,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import {
  CardContainer,
  CardContainerStyles,
} from "../../../components/CardContainer";
import {
  IconCoin,
  IconInfoCircle,
  IconLockAccess,
  IconMessage2Dollar,
  IconTipJar,
  IconUsers,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import { ValueText } from "../../../components/ValueText";
import { LabelText } from "../../../components";

export const Route = createFileRoute("/$userId/edit-policies/")({
  component: EditPolicies,
});

type EditCardProps = {
  label: string;
  icon: any;
  detailLabel?: string;
  colorScheme: MantineColorScheme;
  route: string;
};
const EditCard = ({
  label,
  icon: Icon,
  detailLabel,
  colorScheme,
  route,
}: EditCardProps) => {
  return (
    <Button
      variant={colorScheme === "light" ? "outline" : "filled"}
      component={Link}
      to={route}
      color={colorScheme === "light" ? "blue.8" : "blue.6"}
      styles={{
        inner: {
          justifyContent: "flex-start",
        },
      }}
      style={{
        ...CardContainerStyles(colorScheme),
        width: "20rem",
        height: "6rem",
        backgroundColor: colorScheme === "light" ? "white" : "#192937", //theme.colors.dark[5],
      }}
    >
      <Group
        align={"flex-start"}
        gap={"lg"}
        justify={"flex-start"}
        style={{
          textAlign: "left",
        }}
      >
        <Icon size={30} />
        <Stack gap={0}>
          <ValueText label={label} />
          {detailLabel && <LabelText label={detailLabel} />}
        </Stack>
      </Group>
    </Button>
  );
};

function EditPolicies() {
  const { colorScheme } = useMantineColorScheme();
  const EditCards: Omit<EditCardProps, "colorScheme">[] = [
    {
      label: "Beneficiary Information",
      icon: IconUsers,
      route: "edit-beneficiaries",
    },
    {
      label: "Annuity Information",
      icon: IconInfoCircle,
      route: "edit-beneficiaries",
    },
    {
      label: "Investments and Values",
      icon: IconMessage2Dollar,
      route: "edit-beneficiaries",
    },
    {
      label: "Authorized Access",
      detailLabel: "POA / TC",
      icon: IconLockAccess,
      route: "edit-beneficiaries",
    },
    {
      label: "Withdrawals",
      detailLabel: "Required Minimum Distribution",
      icon: IconCoin,
      route: "edit-beneficiaries",
    },
    {
      label: "Contact Information",
      icon: IconUserSquareRounded,
      route: "edit-beneficiaries",
    },
    {
      label: "Contributions",
      icon: IconTipJar,
      route: "edit-beneficiaries",
    },
  ];

  return (
    <Stack>
      <Title>What are you looking to do?</Title>

      <CardContainer>
        <Stack>
          <Text>Choose one to view and edit</Text>
          <Group>
            {EditCards.map((card, index) => (
              <EditCard key={index} {...card} colorScheme={colorScheme} />
            ))}
          </Group>
        </Stack>
      </CardContainer>
    </Stack>
  );
  // const [selectedPolicies, setSelectedPolicies] = useState<Policy[]>([]);
  // return (
  //   <Stack>
  //     <PolicyGrid
  //       selectedPolicies={selectedPolicies}
  //       setSelectedPolicies={setSelectedPolicies}
  //     />
  //   </Stack>
  // );
}

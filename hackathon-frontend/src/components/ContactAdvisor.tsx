import { Box, Center, Group, Space, Stack, Text } from "@mantine/core";
import { Calendar, DatePicker } from "@mantine/dates";
import { useState } from "react";
import { IconClock, IconPhone } from "@tabler/icons-react";

export const ContactAdvisor = () => {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <Group pb={"xl"} align={"flex-start"}>
      <Box flex={1}>
        <Stack justify={"flex-start"}>
          <Stack>
            <Group>
              <IconClock size={15} />
              <Text size={"sm"} c={"dimmed"}>
                30 min
              </Text>
            </Group>
            <Group>
              <IconPhone size={15} />
              <Text size={"sm"} c={"dimmed"}>
                Phone Call
              </Text>
            </Group>
          </Stack>

          <Text>
            Select from the time slot to set up some time with your advisor.
          </Text>
          <Text>Alternatively, call 1-888-888-8888</Text>
        </Stack>
      </Box>
      <Box flex={1} style={{ margin: "auto" }}>
        <Center>
          <DatePicker value={date} onChange={setDate} />
        </Center>
      </Box>
    </Group>
  );
};

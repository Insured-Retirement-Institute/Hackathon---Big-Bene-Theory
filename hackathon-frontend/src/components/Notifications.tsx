import { useState, useEffect } from "react";
import {
  ActionIcon,
  Indicator,
  Popover,
  Text,
  Stack,
  ScrollArea,
  Button,
  Loader,
} from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { useGetNotifications } from "../api/serviice";

export const Notifications = ({ userId }: { userId: string | number }) => {
  const [opened, setOpened] = useState(false);
  const [localNotifications, setLocalNotifications] = useState<string[]>([]);

  const {
    data: notifications = [],
    isLoading,
    isError,
    refetch,
  } = useGetNotifications(userId);

  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

  const handleButtonClick = () => {
    refetch();
    setOpened((o) => !o);
  };

  const handleClearAll = () => {
    setLocalNotifications([]);
  };

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="bottom-end"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        {localNotifications?.length > 0 ? (
          <Indicator
            color="red"
            size={12}
            label={localNotifications?.length}
            offset={4}
          >
            <ActionIcon
              size="lg"
              variant="transparent"
              onClick={handleButtonClick}
            >
              <IconBell size={32} />
            </ActionIcon>
          </Indicator>
        ) : (
          <ActionIcon
            size="lg"
            variant="transparent"
            onClick={handleButtonClick}
          >
            <IconBell size={32} />
          </ActionIcon>
        )}
      </Popover.Target>

      <Popover.Dropdown style={{ width: 300 }}>
        <Stack spacing="sm">
          <Text weight={600} size="lg">
            Notifications
          </Text>
          <ScrollArea style={{ height: 200 }} scrollbarSize={6}>
            {isLoading ? (
              <Loader size="sm" />
            ) : isError ? (
              <Text size="sm" color="red">
                Failed to load notifications.
              </Text>
            ) : localNotifications?.length > 0 ? (
              localNotifications.map((message: string, index: number) => (
                <Text
                  key={index}
                  size="md"
                  py={6}
                  style={{ borderBottom: "1px solid #e0e0e0" }}
                >
                  {message}
                </Text>
              ))
            ) : (
              <Text size="sm" color="dimmed">
                No new notifications
              </Text>
            )}
          </ScrollArea>
          <Stack spacing="xs" mt="sm">
            <Button
              fullWidth
              variant="light"
              size="xs"
              onClick={() => setOpened(false)}
            >
              View all
            </Button>
            <Button
              fullWidth
              variant="outline"
              size="xs"
              color="red"
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          </Stack>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import {
  AppShell,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { Navbar } from "../Navbar/Navbar";
import { Top } from "../Navbar/Top";
import { useColorScheme } from "@mantine/hooks";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const params = Route.useParams();
  const userId = (params as any).userId;
  console.log("scheme,", colorScheme);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: "5rem",
        breakpoint: 0,
      }}
      padding="md"
    >
      <AppShell.Header>
        <Top colorScheme={colorScheme} />
        <div></div>
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar userId={userId} />
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          display: "flex",
          backgroundColor:
            colorScheme === "light"
              ? theme.colors.gray[0]
              : theme.colors.dark[6],
        }}
      >
        <Outlet />
      </AppShell.Main>

      <TanStackRouterDevtools position="bottom-left" />
    </AppShell>
  );
}

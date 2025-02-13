import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import React from "react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import {
  Button,
  createTheme,
  Input,
  MantineProvider,
  NumberInput,
  Title,
} from "@mantine/core";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { QueryClient } from "@tanstack/react-query";
import ChatBot from "./components/ChatBot";
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const theme = createTheme({
  primaryColor: "blue",
  components: {
    NumberInput: NumberInput.extend({
      defaultProps: {
        hideControls: true,
      },
    }),
    Title: Title.extend({
      defaultProps: {
        order: 4,
      },
    }),
    Input: Input.extend({
      defaultProps: {
        radius: "md",
      },
    }),
    Button: Button.extend({
      defaultProps: {
        radius: "xl",
      },
    }),
  },
  /** Put your mantine theme override here */
});
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);
// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export const App = () => {
  return (
    <div id={"root"}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <MantineProvider theme={theme}>
          <RouterProvider router={router} />
          <ChatBot />
        </MantineProvider>
      </PersistQueryClientProvider>
    </div>
  );
};

import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Stack } from "@mantine/core";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  React.useEffect(() => {
    const swaggerFiles = [
      { id: "swagger-ai", url: "/ai-swagger-api.json", title: "AI API" },
      {
        id: "swagger-notification",
        url: "/notification-swagger-api.json",
        title: "Notification API",
      },
      {
        id: "swagger-carrierx",
        url: "/carrierx-swagger-api.json",
        title: "CarrierX API",
      },
      {
        id: "swagger-bene",
        url: "/bene-swagger-api.json",
        title: "Bene Orchestration API",
      },
    ];

    swaggerFiles.forEach(({ id, url }) => {
      if (window.SwaggerUIBundle) {
        window.SwaggerUIBundle({
          url,
          dom_id: `#${id}`,
          deepLinking: true,
          // docExpansion: 'full',          // Auto-expands all endpoints
          // defaultModelsExpandDepth: -1,  // Hides schemas by default
          operationsSorter: "alpha", // Sorts operations alphabetically
          tagsSorter: "alpha", // Sorts tags alphabetically
        });
      }
    });
  }, []);

  return (
    <div style={{ padding: "0", margin: "0", width: "100vw" }}>
      <h2 style={{ padding: "20px" }}>API Documentation</h2>
      <Stack gap={"4rem"}>
        {[
          { id: "swagger-ai", title: "AI API" },
          { id: "swagger-notification", title: "Notification API" },
          { id: "swagger-carrierx", title: "CarrierX API" },
          { id: "swagger-bene", title: "Bene Orchestration API" },
        ].map(({ id, title }) => (
          <div key={id} style={{ width: "90vw" }}>
            <h3 style={{ padding: "10px" }}>{title}</h3>
            <div id={id} style={{ width: "100%", height: "600px" }}></div>
          </div>
        ))}
      </Stack>
    </div>
  );
}

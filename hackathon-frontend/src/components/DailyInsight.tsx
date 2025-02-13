import * as React from "react";
import { CardContainer } from "./CardContainer";
import { Stack, Text, Title } from "@mantine/core";

const insights = [
  "A recent study found that individuals with guaranteed income in retirement are twice as likely to feel financially secure compared to those relying on investment-based income alone, like withdrawals from 401(k)s or IRAs.",
  "Nearly 60% of Americans don't have a will, despite it being one of the easiest and most important ways to ensure your assets are distributed according to your wishes after you pass.",
  "A recent AARP survey reveals that 61% are concerned they won't have enough money to support themselves in retirement.",
  "Women are more likely than men to be concerned about outliving their retirement savings, with nearly 70% expressing this fear, according to a recent study.",
  "Diversifying retirement income sources—such as combining Social Security, pensions, and annuities—can significantly reduce financial uncertainty in retirement.",
  "People who work with a financial advisor are 3x more likely to feel confident about their retirement readiness compared to those who go it alone.",
  "Failing to plan for long-term care expenses is one of the biggest risks to retirement security. Nearly 70% of people aged 65+ will require long-term care at some point.",
  "Establishing a living trust can help your loved ones avoid the delays and costs associated with probate, ensuring a smoother transfer of assets.",
  "Health care costs in retirement can add up to over $300,000 for a couple. Planning for these expenses early can reduce financial stress later."
];

export const DailyInsight = () => {
  const [currentInsight, setCurrentInsight] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false); // Fade out
      setTimeout(() => {
        setCurrentInsight((prev) => (prev + 1) % insights.length); // Switch to the next insight
        setVisible(true); // Fade back in
      }, 500); // Duration of fade-out before switching
    }, 10000); // Change insight every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
      <CardContainer style={{ height: "11.5rem", overflow: "hidden" }}>
        <Stack>
          <Title order={3} c={"blue.5"}>
            Did you know?
          </Title>
          <Text
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.5s ease, transform 0.5s ease"
              }}
          >
            {insights[currentInsight]}
          </Text>
        </Stack>
      </CardContainer>
  );
};

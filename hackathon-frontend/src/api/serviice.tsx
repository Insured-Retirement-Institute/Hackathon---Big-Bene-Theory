import { useMutation, useQuery } from "@tanstack/react-query";
import { Policy } from "../PolicyGrid";

export function useGetPolicies(userId: string | number) {
  return useQuery({
    queryKey: [`policies_${userId}`],
    queryFn: async (): Promise<Array<Policy>> => {
      console.log("userId", userId);
      const response = await fetch(
        `https://2205if6vs1.execute-api.us-east-1.amazonaws.com/dev/getBene?customerId=00${userId}`,
      );
      console.log("what cmon");
      return await response.json();
    },
  });
}


export function useGetNotifications(userId: string | number) {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: async (): Promise<string[]> => {
      const response = await fetch(
          `https://0mvz5u2gxl.execute-api.us-east-1.amazonaws.com/Dev/notfication`,
          {
            method: "POST", // Changed to POST because it carries a request body
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerId: `00${userId}` }),
          }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const result = await response.json();
      const parsedBody = JSON.parse(result.body.replace(/^"|"$/g, "").replace(/'/g, '"'));
      console.log(parsedBody)
      return parsedBody;
    },
  });
}


export interface ChatBotResponse {
  reply: string;
  conversation_history: { role: "user" | "assistant"; content: string }[];
}

export async function useChatBotResponse(
  userMessage: string,
  conversationHistory: any[],
): Promise<ChatBotResponse> {
  const payload = {
    user_question: userMessage,
    conversation_history: conversationHistory,
  };

  const response = await fetch(
    "https://b0ma0042q3.execute-api.us-east-1.amazonaws.com/Dev/ai",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: JSON.stringify(payload), // Ensure the body is properly stringified
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch response: ${errorText}`);
  }

  const responseData = await response.json();
  console.log("Response Data:", responseData);

  // Parse the `body` field if it's a string
  const parsedBody =
    typeof responseData.body === "string"
      ? JSON.parse(responseData.body)
      : responseData;
  console.log("Parsed Body:", parsedBody);

  return {
    reply: parsedBody.reply,
    conversation_history: parsedBody.conversation_history,
  };
}

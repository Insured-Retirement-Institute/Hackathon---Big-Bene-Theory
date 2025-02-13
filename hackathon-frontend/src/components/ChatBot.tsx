import React, { useState } from "react";
import { Drawer, Textarea, Stack, Text, ScrollArea, Tooltip, Button } from "@mantine/core";
import { useChatBotResponse } from "../api/serviice";
import irineGif from "../assets/irine.gif";

const ChatBot: React.FC = () => {
    const [opened, setOpened] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        setMessages((prev) => [...prev, { role: "assistant", content: "IRIne is thinking..." }]);
        setLoading(true);
        setError(null);

        try {
            const data = await useChatBotResponse(input, messages);
            setMessages((prev) => [
                ...prev.slice(0, -1), // Remove "IRIne is thinking..."
                { role: "assistant", content: data.reply }
            ]);
        } catch (err) {
            console.error("Error fetching response:", err);
            setError("Oops! Something went wrong. Please try again.");
            setMessages((prev) => [
                ...prev.slice(0, -1),
                { role: "assistant", content: "Oops! Something went wrong. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const clearChat = () => {
        setMessages([]);
        setInput("");
        setError(null);
    };

    return (
        <>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title="ChatBot"
                padding="md"
                position="right"
                size="md"
            >
                <ScrollArea style={{ height: "400px" }}>
                    <Stack spacing="xs">
                        {messages.length === 0 && (
                            <Text color="gray" align="center">
                                Start a conversation with IRIne!
                            </Text>
                        )}
                        {messages.map((msg, index) => (
                            <Text
                                key={index}
                                style={{
                                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                                    backgroundColor: msg.role === "user" ? "#1c7ed6" : "#f1f3f5",
                                    color: msg.role === "user" ? "white" : "black",
                                    padding: "8px 12px",
                                    borderRadius: "12px",
                                    maxWidth: "70%",
                                    wordBreak: "break-word",
                                }}
                            >
                                {msg.content}
                            </Text>
                        ))}
                        {error && (
                            <Text color="red" style={{ marginTop: 10 }}>
                                {error}
                            </Text>
                        )}
                    </Stack>
                </ScrollArea>
                <Textarea
                    value={input}
                    onChange={(e) => setInput(e.currentTarget.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message and press Enter..."
                    minRows={1}
                    autosize
                    disabled={loading}
                />
                <Button onClick={clearChat} fullWidth variant="outline" style={{ marginTop: 10 }}>
                    Clear Chat
                </Button>
            </Drawer>
            <Tooltip label="Ask IRIne!" position="left" withArrow>
                <button
                    style={{
                        position: "fixed",
                        bottom: 20,
                        right: opened ? "16%" : 20,
                        transform: opened ? "translate(50%, 0)" : "none",
                        zIndex: 1000,
                        padding: 0,
                        background: "none",
                        border: "none",
                        width: opened ? 110 : 60,
                        height: opened ? 110 : 60,
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                    }}
                    onClick={() => setOpened((prev) => !prev)}
                >
                    <img
                        src={irineGif}
                        alt="Chat Icon"
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                    />
                </button>
            </Tooltip>
        </>
    );
};

export default ChatBot;

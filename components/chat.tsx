"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import { SignOut } from "./sign-out";

const ChatComponent = ({
  userName,
  userImage,
}: {
  userName: string | null;
  userImage: string;
}) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while fetching the response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-center gap-2 py-4">
        Signed In as {userName}
        <Avatar>
          <AvatarImage src={userImage} alt={userName || "User"} />
          <AvatarFallback>
            {userName?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="fixed bg-gray-200 p-4 rounded bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 shadow">
        <div className="flex gap-2">
          <Input
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="max-w-2xl mx-auto">
          {loading && (
            <Skeleton className="w-full h-[20px] bg-gray-300 rounded-full mt-4" />
          )}
          {response && (
            <div className="p-4 bg-gray-100 rounded-lg mt-4">
              <h3 className="font-semibold mb-2">Response:</h3>
              <p className="">{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;

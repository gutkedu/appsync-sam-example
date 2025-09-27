"use client";

import { useState, useEffect, useRef } from "react";
import { Amplify } from "aws-amplify";
import { events } from "aws-amplify/data";

export default function Home() {
  const [channel, setChannel] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [channelName, setChannelName] = useState("default/stories");
  const [isConfigured, setIsConfigured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Configure Amplify on client side
  useEffect(() => {
    Amplify.configure({
      API: {
        Events: {
          endpoint: process.env.NEXT_PUBLIC_EVENT_API_ENDPOINT!,
          region: process.env.NEXT_PUBLIC_EVENT_API_REGION!,
          defaultAuthMode: "apiKey",
          apiKey: process.env.NEXT_PUBLIC_EVENT_API_KEY!,
        },
      },
    });
    setIsConfigured(true);
  }, []);

  const connectToChannel = async () => {
    if (!isConfigured) {
      setMessages((prev) => [
        ...prev,
        {
          type: "error",
          error: "Amplify not configured yet",
          timestamp: new Date(),
        },
      ]);
      return;
    }

    try {
      const eventChannel = await events.connect(channelName);
      setChannel(eventChannel);
      setIsConnected(true);

      // Subscribe to messages
      eventChannel.subscribe({
        next: (data: any) => {
          console.log("Received event:", data);
          setMessages((prev) => [
            ...prev,
            { type: "received", data, timestamp: new Date() },
          ]);
        },
        error: (err: any) => {
          console.error("Subscription error:", err);
          setMessages((prev) => [
            ...prev,
            { type: "error", error: err, timestamp: new Date() },
          ]);
        },
      });

      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          message: `Connected to channel: ${channelName}`,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Connection error:", error);
      setMessages((prev) => [
        ...prev,
        { type: "error", error, timestamp: new Date() },
      ]);
    }
  };

  const disconnectFromChannel = () => {
    if (channel) {
      channel.close();
      setChannel(null);
      setIsConnected(false);
      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          message: "Disconnected from channel",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      const messageData = {
        message: inputMessage,
        timestamp: new Date().toISOString(),
      };
      await events.post(channelName, messageData);

      setMessages((prev) => [
        ...prev,
        { type: "sent", data: messageData, timestamp: new Date() },
      ]);
      setInputMessage("");
    } catch (error) {
      console.error("Send error:", error);
      setMessages((prev) => [
        ...prev,
        { type: "error", error, timestamp: new Date() },
      ]);
    }
  };

  const sendTestEvent = async () => {
    try {
      const testData = { event_1: "data_1", test: true };
      await events.post(channelName, testData);

      setMessages((prev) => [
        ...prev,
        { type: "sent", data: testData, timestamp: new Date() },
      ]);
    } catch (error) {
      console.error("Send test event error:", error);
      setMessages((prev) => [
        ...prev,
        { type: "error", error, timestamp: new Date() },
      ]);
    }
  };

  return (
    <div className={`min-h-screen p-4 sm:p-8 font-mono bg-white`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-8 border-b-2 pb-4 border-black`}>
          <h1 className={`text-2xl font-bold mb-2 tracking-wider text-black`}>
            [ APPSYNC EVENT API DEMO ]
          </h1>
          <p className={`text-sm text-black`}>REAL-TIME MESSAGING INTERFACE</p>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Connection Controls */}
            <div className={`border-2 p-6 border-black bg-white`}>
              <h2
                className={`text-lg font-bold mb-4 border-b pb-2 text-black border-black`}
              >
                [ CONNECTION CONTROL ]
              </h2>
              <div className="flex flex-col gap-4 items-start mb-4">
                <div className="w-full">
                  <label className={`block text-sm font-bold mb-2 text-black`}>
                    CHANNEL NAME:
                  </label>
                  <input
                    type="text"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    className={`w-full px-3 py-2 border-2 font-mono focus:outline-none border-black bg-white text-black focus:bg-gray-50`}
                    placeholder="default/stories"
                  />
                </div>
                <button
                  onClick={
                    isConnected ? disconnectFromChannel : connectToChannel
                  }
                  disabled={!isConfigured}
                  className={`w-full px-6 py-2 border-2 font-bold font-mono tracking-wider ${
                    isConnected
                      ? "border-black bg-black text-white hover:bg-white hover:text-black"
                      : isConfigured
                      ? "border-black bg-white text-black hover:bg-black hover:text-white"
                      : "border-gray-400 bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isConnected ? "[ DISCONNECT ]" : "[ CONNECT ]"}
                </button>
              </div>
              <div className={`text-sm font-mono text-black`}>
                STATUS:{" "}
                <span className="font-bold">
                  {isConnected ? "[ CONNECTED ]" : "[ DISCONNECTED ]"}
                </span>
                {!isConfigured && (
                  <span className="ml-2">[ CONFIGURING... ]</span>
                )}
              </div>
            </div>

            {/* Message Controls */}
            <div className={`border-2 p-6 border-black bg-white`}>
              <h2
                className={`text-lg font-bold mb-4 border-b pb-2 text-black border-black`}
              >
                [ MESSAGE CONTROL ]
              </h2>
              <div className="flex flex-col gap-4 items-start mb-4">
                <div className="w-full">
                  <label className={`block text-sm font-bold mb-2 text-black`}>
                    MESSAGE:
                  </label>
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className={`w-full px-3 py-2 border-2 font-mono focus:outline-none border-black bg-white text-black focus:bg-gray-50`}
                    placeholder="Type a message..."
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!isConnected}
                  className={`w-full px-6 py-2 border-2 font-bold font-mono tracking-wider border-black bg-white text-black hover:bg-black hover:text-white disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed`}
                >
                  [ SEND ]
                </button>
              </div>
              <button
                onClick={sendTestEvent}
                disabled={!isConnected}
                className={`w-full px-4 py-2 border-2 font-bold font-mono tracking-wider border-black bg-white text-black hover:bg-black hover:text-white disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed`}
              >
                [ TEST EVENT ]
              </button>
            </div>
          </div>

          {/* Messages Display */}
          <div className="lg:w-2/3">
            <div className={`border-2 p-6 h-full border-black bg-white`}>
              <div
                className={`flex justify-between items-center mb-4 border-b pb-2 border-black`}
              >
                <h2 className={`text-lg font-bold text-black`}>[ MESSAGES ]</h2>
                <span className={`text-sm font-mono text-black`}>
                  {messages.length} MESSAGES
                </span>
              </div>

              <div className="space-y-3 max-h-[800px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className={`text-center py-12 font-mono text-black`}>
                    <p className="text-lg mb-2">[ NO MESSAGES YET ]</p>
                    <p className="text-sm">
                      [ CONNECT TO A CHANNEL TO START RECEIVING MESSAGES ]
                    </p>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`border-2 p-2 ${
                        msg.type === "sent"
                          ? "border-green-600 bg-green-50"
                          : msg.type === "received"
                          ? "border-orange-600 bg-orange-50"
                          : msg.type === "error"
                          ? "border-red-600 bg-red-50"
                          : "border-gray-600 bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span
                          className={`text-sm font-bold font-mono uppercase tracking-wider ${
                            msg.type === "sent"
                              ? "text-green-800"
                              : msg.type === "received"
                              ? "text-orange-800"
                              : msg.type === "error"
                              ? "text-red-800"
                              : "text-gray-800"
                          }`}
                        >
                          [ {msg.type} ]
                        </span>
                        <span
                          className={`text-xs font-mono px-2 py-1 border text-black border-black`}
                        >
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      </div>

                      {msg.type === "system" && (
                        <p className={`font-mono text-black`}>{msg.message}</p>
                      )}

                      {msg.type === "sent" && (
                        <pre
                          className={`text-sm font-mono whitespace-pre-wrap p-2 border text-black bg-gray-50 border-black`}
                        >
                          {JSON.stringify(msg.data, null, 2)}
                        </pre>
                      )}

                      {msg.type === "received" && (
                        <pre
                          className={`text-sm font-mono whitespace-pre-wrap p-2 border text-black bg-gray-50 border-black`}
                        >
                          {JSON.stringify(msg.data, null, 2)}
                        </pre>
                      )}

                      {msg.type === "error" && (
                        <pre
                          className={`text-sm font-mono whitespace-pre-wrap p-2 border-2 text-black bg-gray-50 border-black`}
                        >
                          {JSON.stringify(msg.error, null, 2)}
                        </pre>
                      )}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

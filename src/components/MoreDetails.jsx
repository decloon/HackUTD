import { Send, Upload, Loader } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export const MoreDetails = () => {
  // State variables to manage messages, input message, loading state, and selected file
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // useEffect to scroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle sending a message
  const handleSendMessage = async () => {
    // Return if there is no input message and no selected file
    if (!inputMessage.trim() && !selectedFile) return;

    // Create a new message object
    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      file: selectedFile,
    };

    // Add the new message to the messages state
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setSelectedFile(null);
    setIsLoading(true);

    try {
      // Send the new message to the backend
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      // Throw an error if the response is not ok
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the AI response from the backend
      const aiResponse = await response.json();
      const botMessage = {
        id: Date.now() + 1,
        text: aiResponse.text,
        sender: "bot",
        file: null,
      };

      // Add the AI response to the messages state
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      setSelectedFile(file);
    } else {
      alert("Please upload a CSV file");
      event.target.value = "";
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 min-h-screen" style={{ backgroundColor: "hsl(226, 42%, 20%)" }} id="moredetails">
      <div className="flex flex-col h-[80vh] bg-white rounded-lg overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${message.sender === "user" ? "bg-purple-400 text-white" : "bg-gray-100 text-gray-800"}`}
              >
                <p>{message.text}</p>
                {message.file && (
                  <div className="mt-2 text-sm text-gray-600">
                    Uploaded: {message.file.name}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 rounded-lg p-3">
                <Loader className="h-5 w-5 animate-spin text-gray-600" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <label className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 cursor-pointer">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload className="h-5 w-5 text-white" />
            </label>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-100 text-gray-800 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button
              onClick={handleSendMessage}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          {selectedFile && (
            <div className="mt-2 text-sm text-gray-600">
              Selected file: {selectedFile.name}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoreDetails;
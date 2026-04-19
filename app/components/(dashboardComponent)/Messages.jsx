"use client";
import { useState, useRef } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import html2canvas from "html2canvas";

const Messages = ({ messages, setMessages, loadMessages }) => {
  const [deleting, setDeleting] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { data: session } = useSession();

  const selectedRef = useRef(null);

  const getTimeAgo = (createdAt) => {
    const now = new Date();
    const time = new Date(createdAt);
    const diff = Math.floor((now - time) / 1000); // in seconds

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const toggleIsNew = async (messageID) => {
    try {
      await axios.patch("/api/messages", {
        messageID,
        action: "toggle-new",
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageID ? { ...msg, isNew: false } : msg
        )
      );
      loadMessages();
    } catch {
      toast.error("Failed to mark as read");
    }
  };

  const toggleLoved = async (messageID) => {
    try {
      await axios.patch("/api/messages", {
        messageID,
        action: "toggle-love",
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageID ? { ...msg, loved: !msg.loved } : msg
        )
      );
      loadMessages();
    } catch {
      toast.error("Failed to love this message");
    }
  };

  const messageDelete = async (messageID) => {
    try {
      setDeleting(messageID);

      await axios.delete("/api/messages", {
        data: { messageID },
      });

      setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.id !== messageID));
        setDeleting(null);
      }, 1200);

      toast.success("Message deleted successfully");
      loadMessages();
    } catch {
      toast.error("Failed to delete message");
      setDeleting(null);
    }
  };

  const closeModal = () => {
    setSelectedMessage(null);
  };

  const handleSnapDownload = async () => {
    if (!selectedRef.current) return;

    try {
      // Alternative: Draw directly on canvas without html2canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size
      canvas.width = 400;
      canvas.height = 300;
      
      // Fill background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add shadow/border
      ctx.shadowColor = 'rgba(0,0,0,0.1)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
      ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
      ctx.shadowColor = 'transparent';
      
      // Set text styles
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 18px Arial';
      ctx.fillText('Anonymous', 30, 50);
      
      // Add message text
      ctx.fillStyle = '#374151';
      ctx.font = '14px Arial';
      
      const words = selectedMessage.message.split(' ');
      let line = '';
      let y = 80;
      const maxWidth = 340;
      
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, 30, y);
          line = words[n] + ' ';
          y += 20;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 30, y);
      
      // Add timestamp
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px Arial';
      ctx.fillText(getTimeAgo(selectedMessage.createdAt), 30, y + 40);
      
      // Download the canvas
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `message-${Date.now()}.png`;
      link.click();

      toast.success("Message snapped successfully");
    } catch (err) {
      console.error("Error capturing screenshot:", err);
      toast.error("Failed to capture message");
    }
  };

  return (
    <div className="relative">
      {messages.map((msg) => {
        const isBeingDeleted = deleting === msg.id;

        return (
          <div
            key={msg.id}
            onClick={() => {
              toggleIsNew(msg.id);
              setSelectedMessage(msg);
            }}
            className={clsx(
              `
              w-full
              bg-white
              rounded-lg
              shadow-gray-300
              shadow-md
              mt-5
              px-2
              py-4
              transition
              duration-300
              ease-in-out
              relative
              cursor-pointer
              `,
              msg.isNew && "newMessage",
              isBeingDeleted &&
                "opacity-0 blur-2xl scale-95"
            )}
          >
            <div
              className="
              w-full
              px-1
              py-2
              mt-3
              flex
              items-center
            "
            >
              <div
                className={clsx(
                  `
                  w-2.5
                  h-2.5
                  bg-blue-600
                  rounded-full
                  m-1
                  `,
                  !msg.isNew && "hidden"
                )}
              />
              <h3>Anonymous ● {getTimeAgo(msg.createdAt)}</h3>

              <span
                className="
                flex
                ml-auto
                gap-4
                items-center
                text-gray-600
                text-sm
                mx-2
              "
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLoved(msg.id);
                  }}
                  className={clsx(
                    `
                    w-8
                    h-8
                    rounded-md
                    flex
                    justify-center
                    items-center
                  `,
                    msg.loved && "loved"
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    messageDelete(msg.id);
                  }}
                  className="
                    w-8
                    h-8
                    rounded-md
                    flex
                    justify-center
                    items-center
                    transition-all
                    duration-300
                    ease-in-out
                    active:scale-90
                    hover:bg-gray-400
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </span>
            </div>
            <p>{msg.message}</p>
          </div>
        );
      })}

      {selectedMessage && (
        <div
          className="
            fixed 
            inset-0 
            bg-black/40 
            backdrop-blur-sm 
            z-50 
            flex 
            items-center 
            justify-center
          "
          onClick={closeModal}
        >
          <div
            ref={selectedRef}
            style={{
              backgroundColor: "#ffffff",
              color: "#1f2937",
              padding: "24px",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              fontFamily: "Poppins, sans-serif",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Snap button - positioned absolutely with inline styles */}
            <button
              onClick={handleSnapDownload}
              style={{
                position: "absolute",
                bottom: "18px",
                right: "25px",
                color: "#6b7280",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "4px",
                transition: "color 0.3s ease",
                width: "35px",
                height: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "transparent",
                borderRadius: "50%",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#374151")}
              onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                style={{ width: "24px", height: "24px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>
            </button>

            {/* Close button - positioned absolutely with inline styles */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                color: "#6b7280",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "4px",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#374151")}
              onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                style={{ width: "24px", height: "24px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content with inline styles */}
            <h3 style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "12px" }}>
              Anonymous
            </h3>
            <p style={{ 
              color: "#374151", 
              whiteSpace: "pre-line",
              lineHeight: "1.5",
              marginBottom: "16px"
            }}>
              {selectedMessage.message}
            </p>
            <p style={{ 
              fontSize: "14px", 
              color: "#6b7280",
              marginTop: "16px"
            }}>
              {getTimeAgo(selectedMessage.createdAt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
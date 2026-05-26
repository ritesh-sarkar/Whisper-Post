"use client";
import { useState, useRef, Component } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

// Custom libs and components
import AnimationWrapper from "@/app/components/Animation/AnimationWrapper";
import { messageCardAnimationConfig } from "@/lib/AnimationConfig";

// icons
import { TiPinOutline } from "react-icons/ti";
import { FaRegHeart, FaRegMessage } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { FiDownload } from "react-icons/fi";

const Messages = ({ messages, setMessages, loadMessages }) => {
  const [deleting, setDeleting] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [pinned, setPinned] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(true);

  // session part
  const { data: session } = useSession();

  const selectedRef = useRef(null);
  const controlsRef = useRef(null);

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
          msg.id === messageID ? { ...msg, isNew: false } : msg,
        ),
      );
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
          msg.id === messageID ? { ...msg, loved: !msg.loved } : msg,
        ),
      );
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
    } catch {
      toast.error("Failed to delete message");
      setDeleting(null);
    }
  };

  const handleSnapDownload = async () => {
    if (!selectedRef.current) return;

    try {
      // Alternative: Draw directly on canvas without html2canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas size
      canvas.width = 400;
      canvas.height = 300;

      // Fill background
      ctx.fillStyle = "#000000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add shadow/border
      ctx.shadowColor = "rgba(0,0,0,0.1)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
      ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
      ctx.shadowColor = "transparent";

      // Set text styles
      ctx.fillStyle = "#000000";
      ctx.font = "bold 18px Arial";
      ctx.fillText("Anonymous", 30, 50);

      // Add message text
      ctx.fillStyle = "#374151";
      ctx.font = "14px Arial";

      const words = selectedMessage.message.split(" ");
      let line = "";
      let y = 80;
      const maxWidth = 340;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, 30, y);
          line = words[n] + " ";
          y += 20;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 30, y);

      // Add timestamp
      ctx.fillStyle = "#6b7280";
      ctx.font = "12px Arial";
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

  // control section handler
  const handleControlsToggle = (clickedMessageId) => {
    setControlsOpen((prev) =>
      prev === clickedMessageId ? null : clickedMessageId,
    );
  };

  // Message filter
  const normalMessages = messages.filter((msg) => !msg.pinned);
  const pinnedMessages = messages.filter((msg) => msg.pinned);

  // Reusable renderer
  const renderMessage = (msg) => {
    const isBeingDeleted = deleting === msg.id;

    return (
      <AnimationWrapper
        variants={messageCardAnimationConfig(0.2)}
        once={false}
        key={msg.id}
        className="
          w-full
        "
      >
        <div
          key={msg.id}
          onClick={() => {
            toggleIsNew(msg.id);
            handleControlsToggle(msg.id);
          }}
          className={clsx(
            `
              w-full
              bg-bg-alt
              rounded-xl
              font-secondary
              mt-5
              px-3
              py-4
              transition
              duration-300
              ease-in-out
              relative   
              hover:bg-bg-glass
              cursor-pointer
              `,
            msg.isNew && "newMessage hover:bg-bg",
            isBeingDeleted && "opacity-0 blur-2xl scale-95",
          )}
        >
          {/* Mood, Hint and time part  */}
          <div
            className="
              w-full
              font-primary
              text-text-alt
              flex
              items-center
              justify-around
              px-1
              relative
              mb-3
            "
          >
            {/* Mood and hint part */}
            <span
              className="
                    w-3/4
                    flex
                    items-center
                    justify-start
                    gap-5
                    text-xs
                  "
            >
              <h1
                className={`
                      p-1.5
                      rounded-lg
                      capitalize
                        ${
                          msg.mood === "confession"
                            ? "mood-confession"
                            : msg.mood === "love"
                              ? "mood-love"
                              : msg.mood === "funny"
                                ? "mood-funny"
                                : msg.mood === "advice"
                                  ? "mood-advice"
                                  : msg.mood === "secret"
                                    ? "mood-secret"
                                    : ""
                        }
                      `}
              >
                {msg.mood}
              </h1>

              <h1
                className="
                      bg-bg-glass
                      p-1.5
                      rounded-lg
                      font-semibold
                      capitalize
                    "
              >
                Hint: {msg.hint?.trim() ? msg.hint : "N/A"}
              </h1>
            </span>

            {/* Time part */}
            <span
              className="
                  w-1/4
                  flex
                  items-center
                  justify-end
                  text-sm
                "
            >
              {getTimeAgo(msg.createdAt)}
            </span>
          </div>
          <p>{msg.message}</p>

          {/* Control part */}
          <span
            className={`
              w-full
              max-h-0
              overflow-hidden
              opacity-0
              transition-all
              duration-300
              ease-in-out
              flex
              gap-2
              items-center
              justify-between
              text-text-alt
              border-t-2
              border-border
              mt-0
              pt-0
                ${
                  controlsOpen === msg.id
                    ? "max-h-40 opacity-100 mt-5 pt-3"
                    : "max-h-0 opacity-0 pt-0 mt-0"
                }
              `}
          >
            {/* Pin and love button part */}
            <span
              className="
                    w-1/2
                    flex
                    items-center
                    justify-start
                    gap-5
                  "
            >
              {/* Pin button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // togglePinned(msg.id);
                }}
                className={clsx(
                  `
                    h-8
                    w-8
                    rounded-md
                    flex
                    justify-center
                    items-center
                    cursor-pointer
                    text-lg
                    transition-all
                    duration-300
                    ease-in-out
                    hover:text-[#fde047]
                  `,
                  msg.pinned && "pinned",
                )}
              >
                <TiPinOutline className="text-2xl" />
              </button>

              {/* Love button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLoved(msg.id);
                }}
                className={clsx(
                  `
                    rounded-md
                    flex
                    justify-center
                    items-center
                    cursor-pointer
                    text-lg
                    transition-all
                    duration-300
                    ease-in-out
                    hover:text-accent-pink
                  `,
                  msg.loved && "loved",
                )}
              >
                <FaRegHeart />
              </button>
            </span>

            {/* Download and delete button part */}
            <span
              className="
                    w-1/2
                    flex
                    items-center
                    justify-end
                    gap-5
                    
                  "
            >
              {/* Download button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // downloadMessage(msg.id);
                }}
                className="
                      w-8
                      h-8
                      bg-bg-glass
                      rounded-md
                      flex
                      justify-center
                      items-center
                      transition-all
                      duration-300
                      ease-in-out
                      cursor-pointer
                      active:scale-90
                      hover:bg-text-alt/20
                      hover:text-text
                      hover:border-text-alt
                      
                    "
              >
                <FiDownload className="text-xl" />
              </button>

              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  messageDelete(msg.id);
                }}
                className="
                    w-8
                    h-8
                    bg-red-600/10
                    rounded-md
                    flex
                    justify-center
                    items-center
                    transition-all
                    duration-300
                    ease-in-out
                    cursor-pointer
                    active:scale-90
                    hover:bg-red-600/20
                  "
              >
                <MdDeleteForever className="text-2xl text-red-600" />
              </button>
            </span>
          </span>
        </div>
      </AnimationWrapper>
    );
  };

  // pinned message part
  return (
    <div className="relative">
      {pinnedMessages.length > 0 && (
        <div>
          <h1
            className="
              w-full
              text-text-alt
              flex
              items-center
              gap-2
              text-lg
              font-primary
              font-semibold
              capitalize
            "
          >
            <TiPinOutline
              className="
              text-xl 
              -rotate-45"
            />
            Pinned messages
          </h1>
          {pinnedMessages.map(renderMessage)}
        </div>
      )}
      <div
        className="
          mt-10 
          lg:mt-14
          "
      >
        <h1
          className="
              w-full
              text-text-alt
              flex
              items-center
              gap-2
              text-lg
              font-primary
              font-semibold
              capitalize
            "
        >
          <FaRegMessage className="text-lg" />
          {normalMessages.length>0 ? "Messages" : "No messages"}
        </h1>
        {normalMessages.map(renderMessage)}
      </div>
    </div>
  );
};

export default Messages;

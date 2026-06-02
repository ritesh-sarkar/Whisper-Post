"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toPng } from "html-to-image";

// Custom libs and components
import AnimationWrapper from "@/app/components/Animation/AnimationWrapper";
import { messageCardAnimationConfig } from "@/lib/AnimationConfig";

// Icons
import { TiPinOutline } from "react-icons/ti";
import { FaRegHeart, FaRegMessage } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { FiDownload } from "react-icons/fi";

const Messages = ({ messages, setMessages, loadMessages }) => {
  const [deleting, setDeleting] = useState(null);
  const [controlsOpen, setControlsOpen] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedDeleteID, setSelectedDeleteID] = useState(null);
  const exportRef = useRef(null);
  const [exportMessage, setExportMessage] = useState(null);

  // Session
  const { data: session } = useSession();

  // Time formatter
  const getTimeAgo = (createdAt) => {
    const now = new Date();
    const time = new Date(createdAt);

    const diff = Math.floor((now - time) / 1000);

    if (diff < 60) return `${diff}s ago`;

    if (diff < 3600) {
      return `${Math.floor(diff / 60)}m ago`;
    }

    if (diff < 86400) {
      return `${Math.floor(diff / 3600)}h ago`;
    }

    return `${Math.floor(diff / 86400)}d ago`;
  };

  // Mark message as read
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

  // Toggle loved message
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

  // Toggle pinned message
  const togglePinned = async (messageID) => {
    try {
      await axios.patch("/api/messages", {
        messageID,
        action: "toggle-pin",
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageID ? { ...msg, pinned: !msg.pinned } : msg,
        ),
      );
      loadMessages();
    } catch {
      toast.error("Failed to pin this message");
    }
  };

  // Delete message
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

  // Toggle control section
  const handleControlsToggle = (clickedMessageId) => {
    setControlsOpen((prev) =>
      prev === clickedMessageId ? null : clickedMessageId,
    );
  };

  const parseMoodStyle = (mood) => {
    switch (mood) {
      case "love":
        return {
          backgroundColor: "#ec489a20",
          color: "#f472b6",
          border: "1px solid #f472b6",
        };
      case "confession":
        return {
          backgroundColor: "#f9741620",
          color: "#f97416",
          border: "1px solid #f97416",
        };
      case "funny":
        return {
          backgroundColor: "#eab20820",
          color: "#fde047",
          border: "1px solid #fde047",
        };
      case "secret":
        return {
          backgroundColor: "#7f1d1d20",
          color: "#ff5656",
          border: "1px solid #ff5656",
        };
      case "advice":
        return {
          backgroundColor: "#2563eb20",
          color: "#3b82f6",
          border: "1px solid #3b82f6",
        };
      default:
        return {
          backgroundColor: "#9ca3af",
          color: "#f8fafc",
          border: "1px solid #f8fafc",
        };
    }
  };

  // Fixed 4:3 Image Download Functionality
  const downloadMessageAsImage = async (e, msg) => {
    e.stopPropagation();

    const toastId = toast.loading("Generating image...");

    try {
      // 1. Set data
      setExportMessage(msg);

      // 2. Wait for React paint (NOT timeout)
      await new Promise(requestAnimationFrame);
      await new Promise(requestAnimationFrame);

      // extra safety for fonts
      if (document.fonts) {
        await document.fonts.ready;
      }

      // 3. Capture
      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#000000",
      });

      // 4. Download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `message-${msg.id.slice(0, 4)}-whisper-post.png`;
      link.click();

      toast.success("Downloading image...", { id: toastId });

      // 5. cleanup AFTER capture
      setExportMessage(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to download image", { id: toastId });
    }
  };

  // Message filters
  const normalMessages = messages.filter((msg) => !msg.isPinned);
  const pinnedMessages = messages.filter((msg) => msg.isPinned);

  // Reusable Message Renderer
  const renderMessage = (msg) => {
    const isBeingDeleted = deleting === msg.id;

    return (
      <AnimationWrapper
        variants={messageCardAnimationConfig(0.2)}
        once={false}
        key={msg.id}
        className="w-full"
      >
        <div
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
              transition-all
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
          {/* Top Section */}
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
            {/* Mood + Hint */}
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

            {/* Time */}
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

          {/* Message */}
          <p>{msg.message}</p>

          {/* Controls */}
          <span
            className={`
              w-full
              overflow-hidden
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

              ${
                controlsOpen === msg.id
                  ? "max-h-40 opacity-100 mt-5 pt-3"
                  : "max-h-0 opacity-0 mt-0 pt-0"
              }
            `}
          >
            {/* Left Controls */}
            <span
              className="
                w-1/2
                flex
                items-center
                justify-start
                gap-5
              "
            >
              {/* Pin Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePinned(msg.id);
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
                  msg.isPinned && "pinned",
                )}
              >
                <TiPinOutline className="text-2xl" />
              </button>

              {/* Love Button */}
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

            {/* Right Controls */}
            <span
              className="
                w-1/2
                flex
                items-center
                justify-end
                gap-5
              "
            >
              {/* Download Button */}
              <button
                onClick={(e) => downloadMessageAsImage(e, msg)}
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

              {/* Delete */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDeleteID(msg.id);
                  setConfirmDelete(true);
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

  return (
    <div className="relative">
      {/* Pinned Messages */}
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
            <TiPinOutline className="text-xl -rotate-45" />
            Pinned messages
          </h1>
          {pinnedMessages.map(renderMessage)}
        </div>
      )}

      {/* Normal Messages */}
      <div className="mt-10 lg:mt-14">
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
          {normalMessages.length > 0 ? "Messages" : "No messages"}
        </h1>
        {normalMessages.map(renderMessage)}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div
          className="
            fixed
            inset-0
            z-999
            flex
            items-center
            justify-center
            bg-bg/40
            backdrop-blur-md
            px-4
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              w-full
              max-w-md
              rounded-2xl
              border
              border-border
              bg-bg-alt
              backdrop-blur-xl
              p-6
              text-center
              animate-in
              fade-in
              zoom-in-95
              duration-300
            "
          >
            <h1 className="text-xl font-semibold font-primary text-text">
              Delete Message
            </h1>
            <p className="mt-3 text-sm text-text-alt leading-relaxed font-secondary">
              Are you sure you want to delete this message? This action cannot
              be undone.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setConfirmDelete(false);
                  setSelectedDeleteID(null);
                }}
                className="
                  px-3
                  py-2
                  rounded-xl
                  bg-bg-glass
                  border
                  border-border
                  text-text-alt
                  font-medium
                  transition-all
                  duration-300
                  hover:bg-bg-glass
                  active:scale-95
                  cursor-pointer
                "
              >
                No
              </button>
              <button
                onClick={async () => {
                  await messageDelete(selectedDeleteID);
                  setConfirmDelete(false);
                  setSelectedDeleteID(null);
                }}
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  bg-red-600/10
                  text-red-600
                  font-normal
                  transition-all
                  duration-300
                  hover:bg-red-600/20
                  active:scale-95
                  cursor-pointer
                "
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FIXED IMAGE EXPORT CANVAS */}
      <div
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "0px",
          height: "0px",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: -9999,
        }}
      >
        <div
          ref={exportRef}
          style={{
            width: "800px",
            height: "600px",
            backgroundColor: "#0b0b0f",
            color: "#f8fafc",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontFamily: "Poppins, -apple-system, sans-serif",
            overflow: "hidden",
          }}
        >
          {exportMessage && (
            <>
              {/* HEADER */}
              <div
                style={{
                  borderBottom: "1px solid #2a2a2a",
                  paddingBottom: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: 600,
                        textTransform: "capitalize",
                        ...parseMoodStyle(exportMessage.mood),
                      }}
                    >
                      {exportMessage.mood}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "#cfcfcf",
                        backgroundColor: "#1a1a1f",
                        padding: "6px 10px",
                        borderRadius: "8px",
                      }}
                    >
                      {exportMessage.hint?.trim() ? exportMessage.hint : "N/A"}
                    </span>
                  </div>
                  <span style={{ fontSize: "13px", color: "#9a9a9a" }}>
                    {getTimeAgo(exportMessage.createdAt)}
                  </span>
                </div>
              </div>

              {/* MESSAGE CONTENT */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <p
                  style={{
                    fontSize: "28px",
                    textAlign: "center",
                    lineHeight: 1.5,
                    maxWidth: "90%",
                    wordWrap: "break-word",
                  }}
                >
                  {exportMessage.message}
                </p>
              </div>

              {/* FOOTER */}
              <div
                style={{
                  borderTop: "1px solid #2a2a2a",
                  paddingTop: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  src="/logo.png"
                  alt="logo"
                  style={{ width: "22px", height: "22px" }}
                />
                <span
                  style={{
                    fontSize: "14px",
                    letterSpacing: "1px",
                    color: "#b5b5b5",
                    fontWeight: 500,
                  }}
                >
                  WhisperPost
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;

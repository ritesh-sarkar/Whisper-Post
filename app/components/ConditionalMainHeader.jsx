"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { fetchMessagesByUser } from "@/lib/FetchMessageByUser";

const ConditionalMainHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const { data: session } = useSession();

  const userID = session?.user.id;
  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    if (!userID) return;
    const { success, messages } = await fetchMessagesByUser(userID);
    if (success) {
      setMessages(messages);
    }
  };

  const unreadMessages = messages.filter((msg) => msg.isNew);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name);
      setUsername(session.user.username);
      loadMessages();
    }
  }, [session]);

  const handleSignOut = () => {
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
    toast.success("Signed out successfully");
    router.push("/");
  };

  if (pathname === "/") {
    return (
      <header
        className="
          fixed
          top-0 
          z-10 
          w-full 
          bg-transparent
          backdrop-blur-2xl
          px-2 
          py-1 
          font-primary
          shadow-md
          flex 
          items-center 
          justify-between
          rounded-br-xl
          rounded-bl-xl
        "
      >
        <span
          className="
            w-1/2 
            flex 
            items-center 
            font-semibold 
            text-xl
          "
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="
              p-2
              m-0
            "
          />
          <h1>WhisperPost</h1>
        </span>

        <span
          className="
            w-1/2 
            flex 
            items-center 
            justify-end 
            gap-3 
            text-[18px]
            sm:gap-5
          "
        >
          <Link
            href="/login"
            className="
              font-semibold 
              text-text-alt
              hover:underline 
              transition-all 
              duration-300 
              ease-in-out
              cursor-pointer
            "
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="
              font-semibold 
              bg-border
              px-2 
              py-1.5 
              rounded-xl
            "
          >
            Get Started
          </Link>
        </span>
      </header>
    );
  } else if (pathname.startsWith("/message/")) {
    return (
      <header
        className="
          sticky
          top-0 
          z-10 
          w-full 
          bg-transparent
          px-2 
          py-1 
          font-primary 
          shadow-border
          shadow-md
          flex 
          items-center 
          justify-between
        "
      >
        <span
          className="
            w-full 
            flex 
            items-center 
            gap-2 
            font-bold 
            text-2xl
          "
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="
              border-r-2 
              border-[#687280] 
              p-0 
              m-0
            "
          />
          <h1>Whisper Post</h1>
        </span>
      </header>
    );
  } else if (pathname === "/dashboard") {
    return (
      <header
        className="
          sticky
          top-0 
          z-10 
          w-full 
          bg-transparent
          px-2 
          py-4 
          font-primary 
          shadow-border
          shadow-md
          flex 
          items-center 
          justify-between
        "
      >

        // TODO : add profile picture & functionality
        <span
          className="
        w-1/2 
        flex 
        items-center 
        gap-1
        text-xl
        "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="
              w-10
              h-10
              sm:size-10
              sm:m-2
              bg-blue-500
              p-1.5
              rounded-full
              text-white
            "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          <span
            className="
          flex 
          flex-col
          items-start
          ml-2
          "
          >
            <h1
              className="
           font-primary
           text-xl 
           text-text
           font-bold
          "
            >
              {name}
            </h1>

            <p
              className="
            font-primary
            text-sm 
            text-text-secondary
            "
            >{`@${username}`}</p>
          </span>
        </span>

        <span
          className="
          w-1/2 
          flex 
          items-center 
          justify-end 
          gap-8
          px-3
        "
        >
          <span
            className="
            flex
            items-center
            gap-2
            cursor-pointer
            bg-accent/20
            px-2
            py-1
            rounded-md
            text-accent
            font-primary
          "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
              />
            </svg>

            <p
              className="
              text-sm
              font-primary
              font-semibold
            "
            >{`new ${unreadMessages.length}`}</p>
          </span>

          <button
            onClick={handleSignOut}
            className="
            flex
            items-center
            gap-2
            cursor-pointer
            transform-all
            duration-300
            ease-in-out
            active:scale-90
            hover:bg-accent-pink/20
            px-2
            py-1
            rounded-md
          "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="
            size-7
            text-accent-pink
            transform
            rotate-90
            "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
          </button>
        </span>
      </header>
    );
  } else {
    return null;
  }
};

export default ConditionalMainHeader;

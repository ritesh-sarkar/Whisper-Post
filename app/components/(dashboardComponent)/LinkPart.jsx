"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

import { IoIosLink } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";

const LinkPart = () => {
  const { data: session } = useSession();

  const [anonyLink, setAnonyLink] = useState("");

  useEffect(() => {
    if (session?.user?.username) {
      const dynamicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/message/${session.user.username}`;
      setAnonyLink(dynamicLink);
    }
  }, [session]);

  return (
    <div
      className="
        w-full
        bg-bg-glass
        border
        border-border
        rounded-xl
        flex
        flex-col
        items-start
        backdrop-blur-lg
        py-5
        px-4
        gap-4
      "
    >
      {/* Title */}

      <h1
        className="
          w-full
          flex
          items-center
          gap-3
          text-text
          text-lg
          font-primary
          font-semibold
        "
      >
        <IoIosLink className="text-accent text-xl" />
        Your anonymous link
      </h1>

      {/* Input + Button */}

      <div
        className="
          w-full
          flex
          flex-row
          items-center
          gap-3
        "
      >
        <input
          type="text"
          readOnly
          value={anonyLink}
          className="
            w-full
            py-2.5
            px-4
            rounded-xl
            border
            border-border
            bg-transparent
            text-text
            focus:outline-none
          "
        />

        <button
          onClick={() => {
            if (anonyLink) {
              navigator.clipboard.writeText(anonyLink);
              toast.success("Copied to clipboard");
            } else {
              toast.error("Link not ready yet. Try again!");
            }
          }}
          className="
            text-center
            text-base
            font-primary
            font-semibold
            text-bg
            bg-text
            flex
            items-center
            justify-center
            gap-1
            px-5
            py-2.5
            rounded-xl
            transition-all
            duration-300
            ease-in-out
            hover:tracking-wide
            hover:gap-2
            hover:bg-linear-to-br
            hover:from-accent-primary/20
            hover:via-accent/20
            hover:to-accent-pink/20
            active:scale-95
          "
        >
          <IoCopyOutline className="text-lg" />
          Copy
        </button>
      </div>

      {/* Description */}

      <p
        className="
          w-full
          text-sm
          text-text-alt
          text-center
          sm:text-base
        "
      >
        Share this link anywhere to receive anonymous messages from anyone!
      </p>
    </div>
  );
};

export default LinkPart;
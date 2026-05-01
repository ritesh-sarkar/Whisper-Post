"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

// icons
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
        h-full
        bg-bg-alt/50
        border
        border-border
        rounded-3xl
        flex
        flex-col
        items-start
        backdrop-blur-lg
        py-5
        px-4
        gap-4
        transition-all
        duration-300
        ease-in-out
        hover:bg-bg-alt
        lg:h-146
      "
    >
      {/* Profile image part */}

      <div
        className="
            flex
            flex-row
            items-center
            gap-3
            md:gap-4
            mb-5
          "
      >
        <img
          src="profile.png"
          alt="profile image"
          className="
              w-16
              h-16
              object-cover
              rounded-xl
            "
        />
        <span>
          <h1
            className="
                  font-primary
                  text-xl
                  md:text-2xl
                  font-semibold
                "
          >
            {session?.user?.name}
          </h1>

          <h2
            className="
                  font-secondary
                  text-text-alt
                  text-base
                  md:text-lg
                "
          >
            @{session?.user?.username}
          </h2>
        </span>
      </div>

      {/* link + Button */}

      <div
        className="
          w-full
          flex
          flex-col
          items-start
          justify-center
          gap-3
        "
      >
        <h1
          className="
            w-full
            text-left
            font-primary
            text-base
            uppercase
            text-text-alt
          "
        >
          Your public link.
        </h1>

        <span
          className="
            w-full
            flex
            flex-row
            gap-2
            md:gap-6
            items-center
            justify-between
            mb-3
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
            cursor-pointer
          "
          >
            <IoCopyOutline className="text-lg" />
            Copy
          </button>
        </span>

        <p
          className="
          w-full
          text-sm
          text-text-alt
          text-center
          md:text-base
        "
        >
          Share this link anywhere to receive anonymous messages from anyone!
        </p>
      </div>
    </div>
  );
};

export default LinkPart;

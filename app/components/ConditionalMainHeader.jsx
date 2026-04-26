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

//icons
import { IoSettingsSharp } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { set } from "mongoose";

const ConditionalMainHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [isProfileOpen, setisProfileOpen] = useState(false);
  const [isDeleteOpen, setisDeleteOpen] = useState(false);

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
  } else if (pathname === "/login" || pathname === "/signup") {
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
      </header>
    );
  } else if (pathname.startsWith("/message/")) {
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
          fixed
          top-0 
          z-10 
          w-full
          bg-transparent
          backdrop-blur-2xl
          font-primary
          shadow-md
          flex 
          items-center 
          justify-between
          rounded-br-xl
          rounded-bl-xl
        "
      >
        <div
          className="
            w-full 
            px-2 
            py-1 
            flex 
            items-center 
            justify-between
            relative
        "
        >
          <span
            className="
            w-3/4 
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
            w-1/4
            flex 
            items-center 
            justify-end 
            gap-2
            px-2
            md:gap-3
            md:px-5
        "
          >
            <span
              className="
              flex
              items-center
              gap-1
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
              >
                {unreadMessages.length}
              </p>
            </span>

            <button
              onClick={() => setisMenuOpen(!isMenuOpen)}
              className="
              flex
              items-center
              gap-2
              cursor-pointer
              transform-all
              duration-300
              ease-in-out
              active:scale-90
              hover:rotate-90
              px-2
              py-2
              rounded-md
          "
            >
              <IoSettingsSharp className="size-5" />
            </button>

            {/* Menu part */}

            {isMenuOpen && (
              <div
                className="
                absolute
                top-16
                right-2
                bg-bg-alt
                border-2
                border-border
                rounded-md
                p-2
                flex
                flex-col
                gap-2
                items-center
                justify-center
              "
              >
                <h1
                  className="
                    text-lg
                    font-primary
                    font-semibold
                    text-text
                    text-left
                    p-1
                    pr-8
                    md:pr-16
                    w-full
                    flex
                    flex-col
                    items-start
                    justify-center
                    border-b-1
                    border-border
                  "
                >
                  {name}

                  <p
                    className="
                    text-base
                    font-secondary
                    font-normal
                    text-text-alt
                    text-left
                  "
                  >
                    @{username}
                  </p>
                </h1>

                <ul
                  className="
                    w-full
                    flex
                    flex-col
                    gap-2
                    list-none
                    items-center
                    justify-start
                    p-1
                  "
                >
                  <li
                    onClick={() => {
                      setisMenuOpen(false);
                      setisProfileOpen(true);
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      justify-start
                      gap-2
                      bg-transparent
                      m-1
                      p-2
                      rounded-lg
                      font-secondary
                      text-text
                      cursor-pointer
                      transform-all
                      duration-300
                      ease-in-out
                      active:scale-90
                      hover:bg-text-alt/20
                    "
                  >
                    <CiUser className="size-5" />
                    Profile
                  </li>
                  <hr
                    className="
                      w-full
                      h-[1px]
                    bg-red-600
                      rounded-full
                      border-none
                      p-0
                    "
                  />
                  <li
                    onClick={handleSignOut}
                    className="
                      flex
                      w-full
                      items-center
                      justify-start
                      gap-2
                      bg-transparent
                      p-2
                      rounded-lg
                      font-secondary
                      text-red-500
                      cursor-pointer
                      transform-all
                      duration-300
                      ease-in-out
                      active:scale-90
                      hover:bg-red-600/20
                      relative
                    "
                  >
                    <IoIosLogOut className="size-5" />
                    Log out
                  </li>
                </ul>
              </div>
            )}

            {/* //TODO: add profile edit fuctionality */}

            {/* Profile edit part */}

            {isProfileOpen && (
              <div
                onClick={() => setisProfileOpen(false)}
                className="
                  fixed
                  w-full
                  h-screen
                  inset-0
                  z-20
                  flex
                  items-center
                  justify-center
                  bg-bg/90
                "
              >
                {/* Modal */}

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="
                    w-9/10
                    max-w-[450px]
                    bg-bg-alt
                    border-2
                    border-border
                    rounded-2xl
                    p-5
                    flex
                    flex-col
                    items-center
                    gap-5
                    relative
                  "
                >
                  {/* Close Button */}

                  <button
                    onClick={() => setisProfileOpen(false)}
                    className="
                      absolute
                      cursor-pointer
                      top-5
                      right-3
                      text-text-alt
                      hover:text-text
                      transition
                      "
                  >
                    <IoMdClose className="size-6" />
                  </button>

                  {/* Title */}
                  <h1
                    className="
                      w-full
                      text-xl
                      font-primary
                      font-semibold
                      text-text
                      text-left
                      border-b-2
                      border-border
                      pb-4
                    "
                  >
                    Edit Profile
                  </h1>

                  {/* Profile Image */}
                  <div
                    className="
                      flex
                      flex-col
                      items-center
                      gap-4
                    "
                  >
                    <div
                      className="
                        w-24
                        h-24
                        bg-bg-glass
                        border
                        border-border
                        flex
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-xl
                        "
                    >
                      <img
                        src="/profile.png"
                        alt="profile"
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />
                    </div>

                    <label
                      className="
                        text-sm
                        font-secondary
                        bg-bg-alt
                        p-2
                        rounded-lg
                        text-text-alt
                        cursor-pointer
                        transition-all
                        duration-300
                        ease-in-out
                        hover:bg-bg-glass
                        hover:text-text
                      "
                    >
                      Upload new image
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                  </div>

                  {/* Inputs */}
                  <div
                    className="
                      w-full
                      flex
                      flex-col
                      gap-3
                    "
                  >
                    <label
                      className="
                        w-full
                        flex
                        flex-col
                        items-start
                        justify-start
                        text-text
                        gap-1
                      "
                    >
                      Name:
                      <input
                        required
                        type="text"
                        placeholder="Name"
                        defaultValue={name}
                        className="
                        w-full
                        px-4
                        py-2.5
                        rounded-xl
                        bg-bg-glass
                        border
                        border-border
                        text-text
                        focus:outline-none
                        focus:ring-1
                        focus:ring-accent
                    "
                      />
                    </label>

                    <label
                      className="
                        w-full
                        flex
                        flex-col
                        items-start
                        justify-start
                        text-text
                        gap-1
                      "
                    >
                      Username:
                      <input
                        required
                        type="text"
                        placeholder="Username"
                        defaultValue={username}
                        className="
                        w-full
                        px-4
                        py-2.5
                        rounded-xl
                        bg-bg-glass
                        border
                        border-border
                        text-text
                        focus:outline-none
                        focus:ring-1
                        focus:ring-accent
                    "
                      />
                    </label>
                  </div>

                  {/* Save Button */}
                  <button
                    className="
                      w-full
                      text-center
                      text-base
                      font-primary
                      font-semibold
                      text-bg
                      bg-text
                      flex
                      justify-center
                      items-center
                      px-5
                      py-2
                      my-4
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
                    Save Changes
                  </button>

                  {/* Delete Button */}

                  <p
                    className="
                      w-full
                      text-center
                      text-base
                      font-primary
                      font-semibold
                      text-red-600
                      my-3
                      relative
                      before:absolute
                      before:content-['']
                      before:w-1/3
                      before:h-0.5
                      before:bg-red-600
                      before:left-0
                      before:top-1/2
                      after:absolute
                      after:content-['']
                      after:w-1/3
                      after:h-0.5
                      after:bg-red-600
                      after:right-0
                      after:top-1/2
                    "
                  >
                    Danger Zone
                  </p>

                  <button
                    onClick={() => setisDeleteOpen(true)}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      bg-red-500/10
                      border
                      border-red-600
                      p-2
                      rounded-lg
                      font-secondary
                      text-red-500
                      cursor-pointer
                      transform-all
                      duration-300
                      ease-in-out
                      active:scale-90
                      hover:bg-red-600/20
                      relative
                    "
                  >
                    <MdDeleteForever className="size-6" />
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Delete account Confirmation */}

            {/* //TODO: Add delete functionality here */}

            {isDeleteOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="
                  fixed
                  w-full
                  h-screen
                  inset-0
                  z-20
                  flex
                  items-center
                  justify-center
                  bg-bg/80
                  "
              >
                {/* Delete Prodfile Modal */}

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="
                    w-9/10
                    max-w-[450px]
                    bg-bg-alt
                    border-2
                    border-border
                    rounded-2xl
                    p-5
                    flex
                    flex-col
                    items-center
                    gap-5
                    relative
                  "
                >
                  {/* Close Button */}

                  <button
                    onClick={() => setisDeleteOpen(false)}
                    className="
                      absolute
                      cursor-pointer
                      top-5
                      right-3
                      text-text-alt
                      hover:text-text
                      transition
                      "
                  >
                    <IoMdClose className="size-6" />
                  </button>

                  {/* Title */}
                  <h1
                    className="
                      w-full
                      text-xl
                      font-primary
                      font-semibold
                      text-red-600
                      text-left
                      border-b-2
                      border-border
                      pb-4
                    "
                  >
                    Delete Account
                  </h1>

                  {/* Confirmation Inputs & warning */}
                  <div
                    className="
                      w-full
                      flex
                      flex-col
                      gap-3
                    "
                  >
                    <p
                      className="
                        text-base
                        font-secondary
                        font-normal
                        flex
                        flex-col
                        gap-2
                        items-start
                        justify-center
                      "
                    >
                      Deleting your account is a permanent action and cannot be
                      undone.
                      <br />
                      <ul
                        className="
                          list-disc
                          pl-3
                        "
                      >
                        <li
                          className="
                            py-2
                          "
                        >
                          All your anonymous messages will be permanently
                          deleted
                        </li>

                        <li
                          className="
                            py-2   
                        "
                        >
                          Your profile, username, and data will be completely
                          removed
                        </li>

                        <li
                          className="
                            py-2
                          "
                        >
                          You will lose access to your account forever
                        </li>
                      </ul>
                      <span
                        className="
                          text-red-600
                          font-semibold
                          text-base
                          font-primary
                        "
                      >
                        This action is irreversible.
                      </span>
                    </p>

                    <h1 className="font-primary">
                      To confirm, type "{" "}
                      <span className="font-semibold">DELETE MY ACCOUNT</span> "
                      in the box below.
                    </h1>

                    <label
                      className="
                        w-full
                        flex
                        flex-col
                        items-start
                        justify-start
                        text-text
                        gap-1
                      "
                    >
                      Confirmation text:
                      <input
                        required
                        type="text"
                        placeholder="Confirmation text"
                        className="
                        w-full
                        px-4
                        py-2.5
                        rounded-xl
                        bg-bg-glass
                        border
                        border-border
                        text-text
                        focus:outline-none
                        focus:ring-1
                        focus:ring-accent
                    "
                      />
                    </label>
                    <label
                      className="
                        w-full
                        flex
                        flex-col
                        items-start
                        justify-start
                        text-text
                        gap-1
                      "
                    >
                      Password:
                      <input
                        required
                        type="password"
                        placeholder="Password"
                        className="
                        w-full
                        px-4
                        py-2.5
                        rounded-xl
                        bg-bg-glass
                        border
                        border-border
                        text-text
                        focus:outline-none
                        focus:ring-1
                        focus:ring-accent
                    "
                      />
                    </label>
                  </div>

                  {/* Delete account Button */}

                  <button
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      bg-red-500/10
                      border
                      border-red-600
                      p-2
                      rounded-lg
                      font-secondary
                      text-red-500
                      cursor-pointer
                      transform-all
                      duration-300
                      ease-in-out
                      active:scale-90
                      hover:bg-red-600/20
                      relative
                    "
                  >
                    <MdDeleteForever className="size-6" />
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </span>
        </div>
      </header>
    );
  } else {
    return null;
  }
};

export default ConditionalMainHeader;

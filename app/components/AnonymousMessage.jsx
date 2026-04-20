"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { MessageValidationZod } from "@/lib/MessageValidationZod";
import axios from "axios";
import LoaderComponent from "@/app/components/LoaderComponent";

import { IoIosArrowRoundForward } from "react-icons/io";
import { IoSparklesSharp } from "react-icons/io5";

const AnonymousMessage = () => {
  const [message, setMessage] = useState("");
  const [messageMood, setMessageMood] = useState("");
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);

  const { username } = useParams();

  const moodOption = [
    {
      name: "love",
      className: "mood-love",
    },
    {
      name: "confession",
      className: "mood-confession",
    },
    {
      name: "funny",
      className: "mood-funny",
    },
    {
      name: "secret",
      className: "mood-secret",
    },
    {
      name: "advice",
      className: "mood-advice",
    },
  ];

  // message submission function

    //TODO: add hint and mood with message to send to backend

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    const result = MessageValidationZod.safeParse({ message });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`/api/messages/${username}`, {
        message,
      });

      toast.success(res.data.message);
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoaderComponent state={"Sending message"} />;

  return (
    <div
      className="
        w-full
        h-full
        mx-auto
        font-secondary
        flex
        flex-col
        items-center
        justify-center
        p-2.5
        relative
        overflow-x-hidden
      "
    >
      {/* Background blobs */}

      <div
        className="
          absolute 
          top-0 
          left-1/2 
          -translate-x-1/2 
          w-96
          h-96
          bg-accent/20
          rounded-full 
          blur-3xl
          -z-10
          pointer-events-none
          md:w-[500px]
          md:h-[500px]
          "
      ></div>

      <div
        className="
          w-full
          pt-40
          md:pt-50
          lg:pt-60
          flex
          flex-col
          items-center
          justify-center
          gap-2
          text-center
          my-5
        "
      >
        <span
          className="
            w-20
            h-20
            rounded-3xl
            flex
            items-center
            justify-center
            bg-accent
            my-4
          "
        >
          {/* //TODO:profile pic */}
        </span>

        <h1
          className="
            font-primary
            text-2xl
            font-semibold
            text-text
          "
        >
          Send an anonymous message to <br /> @{username}
        </h1>

        <p
          className="
            text-text-alt
            text-lg
            font-secondary
            flex
            items-center
            justify-center
            gap-1
          "
        >
          <IoSparklesSharp className="text-accent" />
          They won&apos;t know it&apos;s from you.
        </p>
      </div>

      {/* Card */}

      <div
        className="
          w-9/10
          max-w-[500px]
          bg-bg-alt
          border-5
          border-border
          rounded-xl
          p-4
          md:p-5
          flex
          flex-col
          items-center
          justify-center
          gap-4
          mb-10
        "
      >
        <form
          onSubmit={handleMessageSubmit}
          className="
            w-full
            flex
            flex-col
            gap-3
          "
        >
          <label
            className="
              text-text-alt
              font-semibold
              capitalize
            "
          >
            Your message
          </label>

          <textarea
            rows="6"
            maxLength="500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your anonymous message here..."
            required
            className="
              resize-none
              w-full
              px-4
              py-3
              rounded-xl
              border
              border-border
              bg-bg-glass
              text-text
              focus:outline-none
              focus:ring-1
              focus:ring-accent
            "
          />

          <span
            className="
              text-text-alt
              text-sm
              self-end
            "
          >
            {message.length}/500
          </span>

          {/* mood selection part */}

          <div
            className="
                w-full
                flex
                flex-col
                gap-3
                px-2.5
                py-3
            "
          >
            <label
              className="
                  text-text-alt
                  font-semibold
                  text-sm
                  tracking-wide
                  capitalize
                "
            >
              Select a mood
            </label>

            <div
              className="
                  w-full
                  flex
                  justify-center
                  items-center
                  flex-wrap
                  gap-2
                "
            >
              {moodOption.map((mood, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMessageMood(mood.name);
                    console.log(messageMood);
                  }}
                  className={`
                      bg-bg-glass
                      border
                      border-border
                      text-text
                      font-secondary
                      capitalize
                      px-4
                      py-1
                      rounded-full
                      cursor-pointer
                      transition-all
                      duration-300
                      ease-linear
                      active:scale-85
                      ${
                        mood.name === "love"
                          ? "hover:bg-[#ec489950]  hover:border-[#f472b6] hover:text-[#f472b6]"
                          : mood.name === "confession"
                            ? "hover:bg-[#f9731650]  hover:border-[#f97416] hover:text-[#f97416]"
                            : mood.name === "funny"
                              ? "hover:bg-[#eab30850]  hover:border-[#fde047] hover:text-[#fde047]"
                              : mood.name === "secret"
                                ? "hover:bg-[#7f1d1d50]  hover:border-[#ff5656] hover:text-[#ff5656]"
                                : "hover:bg-[#3b82f650]  hover:border-[#3b82f6] hover:text-[#3b82f6]"
                      }
                      ${
                        messageMood === mood.name
                          ? `${mood.className} font-semibold`
                          : ""
                      }
                    `}
                >
                  {mood.name}
                </button>
              ))}
            </div>
          </div>

          {/* Hint part */}

          <div
            className="
                w-full
                flex
                flex-col
                gap-3
                px-2.5
                py-3
            "
          >
            <label
              className="
                  text-text-alt
                  font-semibold
                  text-sm
                  tracking-wide
                  capitalize
                "
            >
              Leave a hint (optional)
            </label>

            <input
              type="text"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              placeholder="e.g. classmate"
              className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-border
                  bg-bg-glass
                  text-text
                  focus:outline-none
                  focus:ring-1
                  focus:ring-accent
                "
            />
          </div>

          {/* send button part */}

          <button
            type="submit"
            className="
              text-center
              text-lg
              font-primary
              font-semibold
              text-bg
              bg-text
              flex
              items-center
              justify-center
              px-5
              py-2.5
              rounded-xl
              transition-all
              duration-300
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
            Send Message
            <IoIosArrowRoundForward className="ml-1 text-2xl" />
          </button>
        </form>

        <Link
          href="/signup"
          className="
            text-accent
            font-semibold
            mt-2
            transition-all
            duration-300
            hover:underline
          "
        >
          Create your own anonymous link
        </Link>
      </div>
    </div>
  );
};

export default AnonymousMessage;

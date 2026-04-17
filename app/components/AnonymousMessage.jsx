"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { MessageValidationZod } from "@/lib/MessageValidationZod";
import axios from "axios";
import LoaderComponent from "@/app/components/LoaderComponent";

import { IoIosArrowRoundForward } from "react-icons/io";

const AnonymousMessage = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { username } = useParams();

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

  if (loading)
    return (
      <LoaderComponent
        state={"Sending message"}
      />
    );

  return (
    <div
      className="
        w-full
        h-full
        bg-bg
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
          top-[20%]
          -left-64
          w-96
          h-96
          bg-accent-pink/30
          rounded-full
          blur-3xl
          z-10
          pointer-events-none
          md:w-[400px]
          md:h-[400px]
        "
      />

      <div
        className="
          absolute
          bottom-[20%]
          -right-64
          w-96
          h-96
          bg-accent/30
          rounded-full
          blur-3xl
          z-10
          pointer-events-none
          md:w-[400px]
          md:h-[400px]
        "
      />

      {/* Header */}

      <div
        className="
          w-full
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
            rounded-full
            flex
            items-center
            justify-center
            bg-accent
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
          Send an anonymous message
        </h1>

        <p
          className="
            text-text-alt
            text-lg
          "
        >
          to @{username}
        </p>
      </div>

      {/* Card */}

      <div
        className="
          w-9/10
          max-w-[500px]
          bg-bg-glass
          border
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
              text-text
              font-semibold
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
              bg-transparent
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
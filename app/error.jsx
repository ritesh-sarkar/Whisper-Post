"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="
        w-full
        min-h-screen
        flex
        items-center
        justify-center
        bg-bg
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-xl
          flex
          flex-col
          items-center
          justify-center
          gap-6
          bg-bg-alt/60
          border
          border-border
          rounded-3xl
          p-8
          backdrop-blur-xl
          text-center
        "
      >
        {/* Illustration */}
        <div
          className="
            relative
            w-52 
            h-52
            "
        >
          <Image
            src="/error.svg"
            alt="Something went wrong"
            fill
            className="object-contain relative z-10"
          />
        </div>

        {/* Title */}
        <h2
          className="
            font-primary
            text-2xl
            md:text-3xl
            font-bold
            text-red-600
          "
        >
          Oops! Something went wrong.
        </h2>

        {/* Subtitle */}
        <p
          className="
            font-secondary
            text-text-alt
            text-sm
            md:text-base
          "
        >
          An unexpected error occurred. You can try again or come back later.
        </p>

        {/* Button */}
        <button
          onClick={() => reset()}
          className="
            mt-4
            font-secondary
            font-bold
            cursor-pointer
            text-sm
            md:text-base
            px-6
            py-2.5
            rounded-xl
            bg-red-600
            text-text
            transition-all
            duration-300
            hover:scale-105
          "
        >
          Try again
        </button>
      </div>
    </div>
  );
}

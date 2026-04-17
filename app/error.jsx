"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Image from "next/image";

export default function Error({ error, reset }) {
  useEffect(() => {}, [error]);

  return (
    <div
      className="
    w-9/10
    h-screen
    mx-auto
    flex
    flex-col
    items-center
    justify-center
    gap-10
    pt-10
    z-99
    "
    >
      <Image
        src="/error.svg"
        alt="error.svg"
        width={256}
        height={256}
        className="
        mt-10
        "
      />
      <h2
        className="
      font-poppins
      text-2xl
      font-bold
      text-pink-600

      "
      >
        Oops! Something went wrong!
      </h2>

      <button
        onClick={() => reset()}
        className="
        bg-pink-600
        text-white
        font-bold
        px-4 
        py-2 
        rounded-md 
        hover:bg-pink-800
        transition-colors
        duration-300
        ease-in-out
        "
      >
        Try again
      </button>
    </div>
  );
}

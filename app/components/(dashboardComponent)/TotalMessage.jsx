"use client";

import { FaRegMessage } from "react-icons/fa6";

const TotalMessage = ({ messages }) => {
  return (
    <div
      className="
        w-auto
        bg-bg-glass
        rounded-2xl
        flex
        flex-col
        items-start
        py-5
        px-3
        text-text
        gap-2
        md:gap-3
        md:px-5
        md:py-6
        mt-10
        border-2
        border-border
      "
    >
      <span
        className="
          w-full
          flex
          gap-4
          items-center
          justify-between
        "
      >
        <p
          className="
          text-text-alt
          font-secondary
          font-base
          capitalize
          md:text-lg 
          md:font-semibold
          "
        >
          Total Messages
        </p>

        <FaRegMessage className="size-6 md:size-7 text-accent" />

      </span>

      <span
        className="
          text-3xl 
          font-bold
          font-primary
          pt-2
          "
      >
        {messages?.length}
      </span>
    </div>
  );
};

export default TotalMessage;

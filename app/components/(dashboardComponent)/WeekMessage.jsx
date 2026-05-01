"use client";

import { FaCalendarWeek } from "react-icons/fa";

const WeekMessage = ({ WeekMessage }) => {
  return (
    <div
      className="
        w-full
        bg-bg-alt/50
        rounded-3xl
        flex
        flex-col
        items-start
        justify-between
        p-5
        text-text
        gap-2
        border
        border-border
        transition-all
        duration-300
        ease-in-out
        hover:bg-bg-alt
        md:gap-3
        md:px-5
        md:py-6 
        md:h-44
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
                This Week
              </p>
      
              <FaCalendarWeek className="size-6 md:size-7 text-accent-pink" />
      
            </span>
      
            <span
              className="
                text-4xl 
                font-bold
                font-primary
                pt-5
                "
            >
              {WeekMessage?.length}
            </span>
    </div>
  );
};

export default WeekMessage;

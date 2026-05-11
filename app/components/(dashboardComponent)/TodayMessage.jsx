"use client";

// Custom components and libs
import AnimationWrapper from "@/app/components/Animation/AnimationWrapper";
import { dashboardCardAnimationConfig } from "@/lib/AnimationConfig";

// icons
import { GiProgression } from "react-icons/gi";

const TodayMessage = ({ TodayMessage }) => {
  return (
    <AnimationWrapper
      variants={dashboardCardAnimationConfig(0.15*2)}
      once={false}
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
          Today
        </p>

        <GiProgression className="size-6 md:size-7 text-accent-alt" />
      </span>

      <span
        className="
                text-4xl 
                font-bold
                font-primary
                pt-5
                "
      >
        {TodayMessage?.length}
      </span>
    </AnimationWrapper>
  );
};

export default TodayMessage;

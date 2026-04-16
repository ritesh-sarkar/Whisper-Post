import CreateProfileButton from "@/app/components/CreateProfileButton";

import { IoShieldOutline } from "react-icons/io5";
import { IoSparklesSharp } from "react-icons/io5";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaShareAlt } from "react-icons/fa";

const page = () => {
  const features = [
    {
      title: "Anonymous Messaging",
      text: "Receive messages from anyone without revealing their identity. Pure honesty, no filters.",
      icon: IoShieldOutline,
      iconGenre: "anonymous",
    },
    {
      title: "Mood-Based Messages",
      text: "Every message carries a mood — love, confession, humor, or secrets — making each one feel alive.",
      icon: IoSparklesSharp,
      iconGenre: "mood",
    },
    {
      title: "Smart Insights",
      text: "Track how many messages you receive daily and weekly with clean, simple insights.",
      icon: TbBrandGoogleAnalytics,
      iconGenre: "insights",
    },
    // {
    //   title: "Shareable Identity",
    //   text: "Your personal link is all you need. Share it anywhere and start receiving messages instantly.",
    //   icon: FaShareAlt,
    //   iconGenre: "share",
    // },
  ];

  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        gap-4
        items-center
        justify-center
        w-full
        pt-30
        bg-linear-to-br
        from-bg
        via-accent/10
        to-bg
        md:pt-50
        relative
        overflow-hidden
      "
    >
      {/* Background orbits */}

      <div
        className="
            absolute 
            top-[20%]
            -left-64 
            w-96 
            h-96
            bg-accent-pink/40 
            rounded-full 
            blur-3xl 
            -z-10 
            pointer-events-none
            md:w-[400px]
            md:h-[400px]
            "
      ></div>
      <div
        className="
          absolute 
          bottom-[20%]
          -right-64 
          w-96 
          h-96 
          bg-accent/40 
          rounded-full 
          blur-3xl 
          -z-10 
          pointer-events-none
          md:w-[400px]
          md:h-[400px]
          "
      ></div>

      <div
        className="
          w-full
          py-2
          flex
          flex-col
          items-center
          justify-center
          text-center
          mb-12
        "
      >
        <h1
          className="
            text-[40px]
            font-primary
            font-bold 
            px-1.5
            mb-10
            leading-tight
            capitalize
            md:text-6xl
          "
        >
          Hear what they never say out{" "}
          <span
            className="
            bg-linear-to-r 
            from-accent-pink
            to-accent
            bg-clip-text 
            text-transparent
            "
          >
            loud.
          </span>
        </h1>
        <p
          className="
            text-xl 
            text-text-alt
            font-secondary
            mb-12 
            max-w-2xl 
            mx-auto
            px-2
            md:text-2xl
          "
        >
          Share your unique link and let anyone send you anonymous messages. No
          names. No pressure. Just honest thoughts.
        </p>

        <CreateProfileButton />
      </div>

      {/* Feature Blocks */}

      <div
        className="
          w-full
          py-2
          p-6
          flex
          flex-col
          items-center
          justify-center
          gap-10
          mb-12
          md:flex-row
          md:justify-around
          md:p-12
        "
      >
        {features.map((feature, index) => (
          <span
            key={index}
            className="
                  w-full
                  md:h-80
                  bg-bg-glass
                  backdrop-blur-2xl
                  rounded-2xl
                  p-3
                  flex
                  flex-col
                  items-start
                  justify-center
                  gap-3.5
                  text-start
                  border-1
                  border-border
                  transition-all
                  duration-300
                  ease-in-out
                  hover:bg-text-alt/10
                  md:p-6
                "
          >
            <feature.icon
              className={`
                    text-5xl 
                    text-accent
                    bg-text-alt/15
                    p-2
                    rounded-2xl
                    ${
                      feature.iconGenre === "anonymous"
                        ? "text-accent"
                        : feature.iconGenre === "mood"
                          ? "text-accent-pink"
                          : feature.iconGenre === "insights"
                            ? "text-accent-alt"
                            : ""
                    }
                    `}
            />

            <h3
              className="
                      text-xl
                      font-bold
                      font-primary 
                      mt-2
                      "
            >
              {feature.title}
            </h3>
            <p
              className="
                    text-base
                    text-text-alt
                    my-2
                    font-secondary
                    "
            >
              {feature.text}
            </p>
          </span>
        ))}
      </div>
    </div>
  );
};

export default page;

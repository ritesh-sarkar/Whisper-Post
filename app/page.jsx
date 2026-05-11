import CreateProfileButton from "@/app/components/CreateProfileButton";

// custom libs and components
import AnimationWrapper from "@/app/components/Animation/AnimationWrapper";
import {
  heroAnimationConfig,
  cardAnimationConfig,
} from "@/lib/AnimationConfig";
import ParticleBackground from "./components/Particles";

// icons
import { IoShieldOutline, IoSparklesSharp } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa";
import { TbBrandGoogleAnalytics } from "react-icons/tb";

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
    {
      title: "Authentic Messages",
      text: "No bots or system-generated texts - only real messages from real people.",
      icon: FaUserCheck,
      iconGenre: "authentic",
    },
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
        from-bg/80
        via-accent/10
        to-bg/80 
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
            md:w-100
            md:h-100
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
          md:w-100
          md:h-100
          "
      ></div>

      {/* Background particles */}
      <div
        className="
          fixed
          inset-0
          -z-20
          pointer-events-none
        "
      >
        <ParticleBackground />
      </div>

      {/* Hero animation  */}
      <AnimationWrapper variants={heroAnimationConfig(0.5)} once={false}>
        <div
          className="
          w-full
          py-2
          flex
          flex-col
          items-center
          justify-center
          text-center
        "
        >
          <h1
            className="
            flex
            gap-1.5
            items-center
            justify-center
            bg-accent-pink/10
            py-1
            px-2
            rounded-full
            text-base
            text-accent-pink
            font-primary
            border
            border-accent-pink
            shadow-[0_0_15px]
            shadow-accent-pink/40
            animate-bounce
            mb-10

            md:text-lg
            md:mb-20
            mb:py-2
            mb:px-3
          "
          >
            <IoSparklesSharp />
            Where Secrets Speak Freely.
          </h1>

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
            Share your unique link and let anyone send you anonymous messages.
            No names, No pressure, Just honest thoughts.
          </p>

          <CreateProfileButton />
        </div>
      </AnimationWrapper>

      {/* Feature Blocks */}
      <div
        className="
          w-full
          max-w-6xl
          py-2
          p-6
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-10
          my-13
          md:flex-row
          md:justify-around
          md:p-12
        "
      >
        {features.map((feature, index) => (
          <AnimationWrapper
            key={index}
            variants={cardAnimationConfig(index * 0.15)}
            once={false}
          >
            <span
              key={index}
              className="
                  w-full
                  md:h-80
                  bg-bg-glass
                  backdrop-blur-sm
                  rounded-2xl
                  p-4
                  flex
                  flex-col
                  items-start
                  justify-center
                  gap-3.5
                  text-start
                  border
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
                            : feature.iconGenre === "authentic"
                              ? "text-yellow-300"
                              : " "
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
          </AnimationWrapper>
        ))}
      </div>
    </div>
  );
};

export default page;

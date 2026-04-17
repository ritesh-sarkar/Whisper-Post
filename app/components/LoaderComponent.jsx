const LoaderComponent = ({ state }) => {
  return (
    <div
      className="
        w-full
        min-h-screen
        bg-bg
        flex
        items-center
        justify-center
        font-secondary
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
          z-0
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
          z-0
        "
      />

      {/* Loader */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          justify-center
        "
      >
        {/* Bubble */}

        <div
          className="
            relative
            w-40
            h-40
            bg-bg-glass
            border
            border-border
            rounded-full
            flex
            items-center
            justify-center
            animate-pulse
            shadow-lg
          "
        >
          <div
            className="
              w-16
              h-16
              bg-text
              rounded-full
              flex
              items-center
              justify-center
              shadow-md
            "
          >
            <svg
              className="
                w-8
                h-8
                text-accent
                animate-bounce
              "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
        </div>

        {/* Ripples */}

        <div className="absolute">
          <div
            className="
              w-48
              h-48
              border
              border-accent/70
              rounded-full
              animate-ping
            "
          />
        </div>

        <div className="absolute">
          <div
            className="
              w-64
              h-64
              border
              border-accent-pink/70
              rounded-full
              animate-ping
            "
            style={{ animationDelay: "0.3s" }}
          />
        </div>

        {/* Floating dots */}

        <div className="absolute -top-10 -left-6">
          <div
            className="
              w-2
              h-2
              bg-accent
              rounded-full
              animate-bounce
            "
          />
        </div>

        <div className="absolute -top-6 left-8">
          <div
            className="
              w-1.5
              h-1.5
              bg-text
              rounded-full
              animate-bounce
            "
            style={{ animationDelay: "0.2s" }}
          />
        </div>

        <div className="absolute -top-4 -right-4">
          <div
            className="
              w-1
              h-1
              bg-border
              rounded-full
              animate-bounce
            "
            style={{ animationDelay: "0.4s" }}
          />
        </div>

        {/* Text */}

        <div
          className="
            mt-8
            text-center
            flex
            flex-col
            items-center
            gap-2
          "
        >
          <h1
            className="
              text-text
              font-primary
              text-xl
              font-semibold
              tracking-wide
              md:text-2xl
            "
          >
            WhisperPost
          </h1>

          <div
            className="
              text-text-alt
              text-sm
              font-secondary
              flex
              items-center
              gap-2
              md:text-base
            "
          >
            <span>{state}</span>

            <div className="flex gap-1">
              <div
                className="
                  w-1
                  h-1
                  bg-accent
                  rounded-full
                  animate-bounce
                "
              />
              <div
                className="
                  w-1
                  h-1
                  bg-accent-pink
                  rounded-full
                  animate-bounce
                "
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="
                  w-1
                  h-1
                  bg-accent-alt
                  rounded-full
                  animate-bounce
                "
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderComponent;

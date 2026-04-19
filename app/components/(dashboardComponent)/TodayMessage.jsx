const TodayMessage = ({ TodayMessage }) => {
  return (
    <div
      className="
        w-40
        h-40
        bg-bg-alt
        rounded-lg
        flex
        flex-col
        items-start
        py-5
        px-3
        gap-2
        border-2
        border-border
        md:gap-3
        md:px-5
        md:py-6
        md:w-64
        md:h-44
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="size-7 text-accent md:size-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>

      <span className="text-3xl font-bold text-text pt-2">
        {TodayMessage.length}
      </span>

      <p className="font-primary text-text-alt md:text-lg md:font-semibold">
        Today
      </p>
    </div>
  );
};

export default TodayMessage;

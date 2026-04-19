"use client";

const TotalMessage = ({ messages, loadMessages }) => {
  return (
    <div
      className="
        w-40
        h-40
        bg-bg-glass
        rounded-lg
        flex
        flex-col
        items-start
        shadow-lg
        shadow-gray-200
        py-5
        px-3
        gap-2
        sm:gap-3
        sm:px-5
        sm:py-6
        sm:w-64
        sm:h-44
      "
    >
      <span
        className="
          w-full
          flex
          justify-between
          items-center
        "
      >
        <svg
          onClick={loadMessages}
          title="Refresh"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="
            size-7
            text-blue-600
            sm:size-8
            cursor-pointer
            hover:rotate-180
            transition-transform
          "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="
            size-5
            text-green-500
            sm:size-6
          "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
          />
        </svg>
      </span>

      <span className="text-3xl font-bold text-gray-800 pt-2">
        {messages.length}
      </span>

      <p className="text-gray-500 sm:text-lg sm:font-semibold">
        Total Message
      </p>
    </div>
  );
};

export default TotalMessage;

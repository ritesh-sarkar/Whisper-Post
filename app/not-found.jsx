import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
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
        <div className="relative w-52 h-52">
          <Image
            src="/not-found.svg"
            alt="404 Not Found"
            fill
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h1
          className="
            font-primary
            text-3xl
            md:text-4xl
            font-bold
            text-text
          "
        >
          404 - Lost in Space
        </h1>

        {/* Subtitle */}
        <p
          className="
            font-secondary
            text-text-alt
            text-sm
            md:text-base
          "
        >
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="
            mt-4
            font-secondary
            font-bold
            text-sm
            md:text-base
            px-6
            py-2.5
            rounded-xl
            bg-accent
            text-text
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]
          "
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

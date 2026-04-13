
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";

const CreateProfileButton = () => {
  return (
    <Link
      href="/signup"
      className="
      text-center
      text-xl
      font-primary
      font-semibold 
      text-bg
      bg-text
      flex
      justify-center
      items-center
      px-4 
      py-2
      mt-12
      rounded-3xl 
      transition-all
      duration-300
      ease-in-out
      hover:tracking-wide
      hover:gap-2
      hover:bg-linear-to-br
      hover:from-accent-primary/20
      hover:via-accent/20
      hover:to-accent-pink/20
      "
    >
      Create Profile
      <IoIosArrowRoundForward className=" ml-1 text-2xl" />
    </Link>
  );
};

export default CreateProfileButton;

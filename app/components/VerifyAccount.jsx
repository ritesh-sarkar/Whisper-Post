"use client";

import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import LoaderComponent from "@/app/components/LoaderComponent";

import { IoIosArrowRoundForward } from "react-icons/io";

const VerifyAccount = () => {
  const router = useRouter();
  const { token } = useParams();

  const [verificationToken, setVerificationToken] = useState(token);
  const [loading, setLoading] = useState(false);

  const handleVerification = async () => {
    setLoading(true);

    try {
      const res = await axios.post("/api/verify", {
        token: verificationToken,
      });

      if (res.status === 200) {
        toast.success("Account verified successfully");
        setVerificationToken("");
        router.push("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoaderComponent state={"Verifying account"} />;

  return (
    <div
      className="
        w-full
        h-full
        bg-bg
        mx-auto
        font-secondary
        flex
        flex-col
        items-center
        justify-center
        p-2.5
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
          z-10
          pointer-events-none
          md:w-[400px]
          md:h-[400px]
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
          z-10
          pointer-events-none
          md:w-[400px]
          md:h-[400px]
        "
      />

      {/* Card */}

      <div
        className="
          w-9/10
          max-w-[500px]
          bg-bg-glass
          border
          border-border
          rounded-xl
          p-4
          py-10
          md:p-6
          flex
          flex-col
          items-center
          justify-center
          gap-4
          text-center
        "
      >
        <h1
          className="
            font-secondary
            text-2xl
            font-semibold
            text-text
            md:text-3xl
          "
        >
          Thanks for joining <br />
          <span
            className="
            font-primary
            bg-linear-to-r 
            from-accent-pink
            to-accent
            bg-clip-text 
            text-transparent
            "
          >
            WhisperPost!
          </span>
        </h1>

        <p
          className="
            text-text-alt
            md:text-lg
          "
        >
          Verify your account to get started.
        </p>

        <button
          type="button"
          onClick={handleVerification}
          className="
            text-center
            text-lg
            font-primary
            font-semibold
            text-bg
            bg-text
            flex
            items-center
            justify-center
            px-5
            py-2.5
            rounded-xl
            transition-all
            duration-300
            ease-in-out
            hover:tracking-wide
            hover:gap-2
            hover:bg-linear-to-br
            hover:from-accent-primary/20
            hover:via-accent/20
            hover:to-accent-pink/20
            active:scale-95
            cursor-pointer
          "
        >
          Verify Account
          <IoIosArrowRoundForward className="ml-1 text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default VerifyAccount;

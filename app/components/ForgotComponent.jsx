"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

// Custom Libs and components
import LoaderComponent from "@/app/components/LoaderComponent";
import AnimationWrapper from "@/app/components/Animation/AnimationWrapper";
import { accountAccessAnimationConfig } from "@/lib/AnimationConfig";

// icons
import { IoIosArrowRoundForward } from "react-icons/io";

const ForgotComponent = () => {
  const [state, setState] = useState("email-state");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Email is required");

    setLoading(true);

    try {
      const res = await axios.post("/api/send-otp", { email });
      toast.success(res.data.message);
      setState("OTP-state");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) return toast.error("Invalid OTP");

    setLoading(true);

    try {
      const res = await axios.post("/api/varify-otp", {
        email,
        otpFromUser: otp,
      });
      toast.success(res.data.message);
      setState("password-state");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    if (password.length < 6)
      return toast.error("Password must be at least 6 characters long");

    setLoading(true);

    try {
      const res = await axios.post("/api/reset-password", {
        email,
        newPassword: password,
      });
      toast.success(res.data.message);
      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && state === "email-state")
    return <LoaderComponent state={"Sending OTP"} />;

  if (loading && state === "OTP-state")
    return <LoaderComponent state={"Verifying OTP"} />;

  if (loading && state === "password-state")
    return <LoaderComponent state={"Resetting Password"} />;

  return (
    <div
      className="
        w-full
        min-h-screen
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
          bg-accent-pink/20
          rounded-full
          blur-3xl
          -z-10
          pointer-events-none
          md:w-100
          md:h-100
        "
      />

      <div
        className="
          absolute
          bottom-[20%]
          -right-64
          w-96
          h-96
          bg-accent/20
          rounded-full
          blur-3xl
          z-10
          pointer-events-none
          md:w-100
          md:h-100
        "
      />

      <AnimationWrapper
        variants={accountAccessAnimationConfig(0.4)}
        once={true}
      >
        <div
          className="
          w-full
          flex
          flex-col
          items-center
          justify-center
          gap-5
        "
        >
          {/* Heading */}

          <span
            className="
            w-full
            flex
            flex-col
            items-center
            justify-center
            gap-2
            my-5
          "
          >
            <h1
              className="
              font-primary
              text-3xl
              font-semibold
              text-text
            "
            >
              Forgot Password?
            </h1>

            <p
              className="
              text-text-alt
              text-center
              max-w-125
            "
            >
              Don&apos;t worry! Follow the steps below to recover your account.
            </p>
          </span>

          {/* Card */}

          <div
            className="
            w-9/10
            max-w-125
            bg-bg-glass
            border
            border-border
            rounded-xl
            p-3
            md:p-5
            flex
            flex-col
            items-center
            justify-center
            gap-4
          "
          >
            {/* EMAIL */}

            {state === "email-state" && (
              <form
                onSubmit={handleEmailSubmit}
                className="
                w-full
                flex
                flex-col
                items-center
                gap-4
              "
              >
                <p className="text-text-alt text-center">
                  Enter your registered email
                </p>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="
                  w-full
                  py-2.5
                  px-4
                  rounded-xl
                  border
                  border-border
                  bg-transparent
                  text-text
                  focus:outline-none
                  focus:ring-1
                  focus:ring-accent
                "
                />

                <button
                  type="submit"
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
                  px-5
                  py-2
                  my-4
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
                  Send OTP
                  <IoIosArrowRoundForward className="ml-1 text-2xl" />
                </button>
              </form>
            )}

            {/* OTP */}

            {state === "OTP-state" && (
              <form
                onSubmit={handleOtpSubmit}
                className="
                w-full
                flex
                flex-col
                items-center
                gap-4
              "
              >
                <p className="text-text-alt text-center">
                  Enter the 6-digit OTP sent to your email
                </p>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  placeholder="••••••"
                  className="
                  w-1/2
                  py-2.5
                  px-4
                  text-center
                  text-xl
                  tracking-widest
                  rounded-xl
                  border
                  border-border
                  bg-transparent
                  text-text
                  focus:outline-none
                  focus:ring-1
                  focus:ring-accent
                "
                />

                <button
                  type="submit"
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
                  px-5
                  py-2
                  my-4
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
                  Verify OTP
                  <IoIosArrowRoundForward className="ml-1 text-2xl" />
                </button>
              </form>
            )}

            {/* PASSWORD */}

            {state === "password-state" && (
              <form
                onSubmit={handlePasswordSubmit}
                className="
                w-full
                flex
                flex-col
                items-center
                gap-4
              "
              >
                <p className="text-text-alt text-center">
                  Set your new password
                </p>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="New password"
                  className="
                  w-full
                  py-2.5
                  px-4
                  rounded-xl
                  border
                  border-border
                  bg-transparent
                  text-text
                  focus:outline-none
                  focus:ring-1
                  focus:ring-accent
                "
                />

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm password"
                  className="
                  w-full
                  py-2.5
                  px-4
                  rounded-xl
                  border
                  border-border
                  bg-transparent
                  text-text
                  focus:outline-none
                  focus:ring-1
                  focus:ring-accent
                "
                />

                <button
                  type="submit"
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
                  px-5
                  py-2
                  my-4
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
                  Reset Password
                  <IoIosArrowRoundForward className="ml-1 text-2xl" />
                </button>
              </form>
            )}

            <button
              onClick={() => router.push("/login")}
              className="
              text-text-alt
              text-base
              my-2
              font-primary
              transition-all
              duration-300
              ease-in-out
              hover:text-text
              cursor-pointer
            "
            >
              Back to Login
            </button>
          </div>
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default ForgotComponent;

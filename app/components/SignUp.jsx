"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

// Custom Libs and components
import { SignUpValidationZod } from "@/lib/SignUpValidationZod";
import LoaderComponent from "@/app/components/LoaderComponent";

// animation libs
import {
  accountAccessAnimationConfig,
  headerAnimationConfig,
} from "@/lib/AnimationConfig";
import AnimationWrapper from "./Animation/AnimationWrapper";

// icons
import { IoIosArrowRoundForward } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verifyBanner, setVerifyBanner] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = SignUpValidationZod.safeParse({
      name,
      username,
      email,
      password,
    });

    const failedData = {};

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        failedData[issue.path[0]] = issue.message;
      });

      toast.error("Invalid form submission!");
      setError(failedData);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/signup", {
        name,
        username,
        email,
        password,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        setVerifyBanner(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }

    setError("");
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleGoogleLogin = () => {
    // TODO: integrate Google OAuth
    toast("Google login coming soon 🚀");
  };

  if (loading) return <LoaderComponent state={"Creating your account"} />;

  return (
    <AnimationWrapper variants={accountAccessAnimationConfig(0.3)} once={true}>
      <div
        className="
        w-full
        h-full
        mt-8
        mx-auto
        font-secondary
        flex
        flex-col
        items-center
        justify-center
        p-2.5
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
          -z-10
          pointer-events-none
          md:w-100
          md:h-100
        "
        />

        {!verifyBanner && (
          <div
            className="
            w-full
            h-full
            flex
            flex-col
            items-center
            justify-center
            gap-5
          "
          >
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
                m-2
              "
              >
                Create profile
              </h1>

              <h3
                className="
                text-xl
                text-text-alt
              "
              >
                Join <span className="font-bold">WhisperPost</span> today!
              </h3>
            </span>

            <form
              onSubmit={handleSubmit}
              className="
              w-9/10
              max-w-125
              bg-bg-glass
              flex
              flex-col
              items-center
              justify-center
              gap-1
              border
              border-border
              rounded-xl
              p-2.5
              mb-20
              font-secondary
              md:p-4
            "
            >
              {/* Name */}
              <label
                className="
                w-full
                flex
                flex-col
                items-start
                justify-start
                py-3
                px-2.5
                text-text
                gap-1
                font-semibold
              "
              >
                Name:
                <input
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="
                  w-full
                  py-2.5
                  px-4
                  rounded-xl
                  border
                  border-border
                  focus:outline-none
                  focus:ring-1
                  focus:ring-accent
                "
                />
                {error && (
                  <p className="text-red-500 text-sm my-1">{error.name}</p>
                )}
              </label>

              {/* Username */}
              <label
                className="
                w-full
                flex
                flex-col
                items-start
                justify-start
                p-2.5
                text-text
                gap-1
                font-semibold
              "
              >
                Username:
                <input
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="@username"
                  required
                  className="
                  w-full
                  py-2.5
                  px-4
                  rounded-xl
                  border
                  border-border
                  focus:outline-none
                  focus:ring-1
                  focus:ring-accent
                "
                />
                {error && (
                  <p className="text-red-500 text-sm my-1">{error.username}</p>
                )}
              </label>

              {/* Email */}
              <label
                className="
                w-full
                flex
                flex-col
                items-start
                justify-start
                p-2.5
                text-text
                gap-1
                font-semibold
              "
              >
                Email:
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="
                  w-full
                  py-2.5
                  px-4
                  rounded-xl
                  border
                  border-border
                  focus:outline-none
                  focus:ring-1
                  focus:ring-accent
                "
                />
                {error && (
                  <p className="text-red-500 text-sm my-1">{error.email}</p>
                )}
              </label>

              {/* Password */}
              <label
                className="
                w-full
                flex
                flex-col
                items-start
                justify-start
                p-2.5
                text-text
                gap-1
                font-semibold
              "
              >
                Password:
                <input
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="
                  w-full
                  py-2.5
                  px-4
                  rounded-xl
                  border
                  border-border
                  focus:outline-none
                  focus:ring-1
                  focus:ring-accent
                "
                />
                {error && (
                  <p className="text-red-500 text-sm my-1">{error.password}</p>
                )}
              </label>

              {/* Create Account */}
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
                py-2.5
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
                Create Account
                <IoIosArrowRoundForward className="ml-1 text-2xl" />
              </button>

              {/* Divider */}
              <div
                className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                my-2
              "
              >
                <div className="flex-1 h-px bg-border" />
                <span className="text-text-alt text-sm">Or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                py-2.5
                px-4
                border
                border-border
                rounded-xl
                bg-bg-glass
                text-text
                font-medium
                transition-all
                duration-300
                hover:bg-bg-alt
                active:scale-95
                cursor-pointer
              "
              >
                <FcGoogle className="text-xl" />
                Continue with Google
              </button>

              <p className="text-text-alt mt-3">
                Already have an account?{" "}
                <Link href="/login" className="text-accent font-semibold">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        )}

        {verifyBanner && (
          <div
            className="
            w-9/10
            max-w-150
            mx-auto
            flex
            flex-col
            items-center
            justify-center
            gap-5
            text-center
            bg-bg-glass
            rounded-xl
            border
            border-border
            py-5
            px-3
            md:py-6
            md:px-5
          "
          >
            <h1
              className="
              font-primary
              text-2xl
              font-semibold
              text-text
              md:text-3xl
              md:leading-tight
            "
            >
              A verification link has been sent to your email.
            </h1>

            <p
              className="
              font-secondary
              text-text-alt
              md:text-lg
              md:font-medium
              md:leading-snug
              md:tracking-wide
            "
            >
              Please check your email and verify your account to continue.
            </p>
          </div>
        )}
      </div>
    </AnimationWrapper>
  );
};

export default SignUp;

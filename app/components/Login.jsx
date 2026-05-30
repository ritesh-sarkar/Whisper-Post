"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

//Custom libs and components
import LoaderComponent from "@/app/components/LoaderComponent";
import AnimationWrapper from "@/app/components/Animation/AnimationWrapper";
import {
  accountAccessAnimationConfig,
  anonymousMessageHeadingAnimationConfig,
  anonymousMessageSubHeadingAnimationConfig,
} from "@/lib/AnimationConfig";

// icons
import { FcGoogle } from "react-icons/fc";
import { IoIosArrowRoundForward } from "react-icons/io";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationStaus, setverificationStaus] = useState(true);

  const router = useRouter();

  // Error tracking part
  const params = useSearchParams();
  const emailExistingError = params.get("error");

  useEffect(() => {
    if (emailExistingError === "email_exists") {
      toast.error(
        "An account already exists with this email. Please sign in with credentials.",
      );
      router.replace("/login");
    }
  }, [emailExistingError]);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const loginRequest = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginRequest?.ok) {
        toast.success("Logged in successfully");
        router.push("/dashboard");
      }

      if (loginRequest?.error) {
        toast.error(loginRequest.error);
        if (loginRequest.error === "User is not varified yet!") {
          setverificationStaus(false);
          console.log(loginRequest.error); //TODO: Console debug
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  //Handle login with google
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  //Hanlde sending verification email
  const handleVerifiaction = async () => {
    try {
      const res = await axios.post("/api/resend-verification-email", {
        email,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (loading) return <LoaderComponent state={"Logging in"} />;

  return (
    <div
      className="
        w-full
        h-screen
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
          -z-10
          pointer-events-none
          md:w-100
          md:h-100
        "
      />

      {/* Main part */}
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
          {/* Heading Animation */}

          <AnimationWrapper
            variants={anonymousMessageHeadingAnimationConfig(0.2)}
            once={false}
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
              Welcome back
            </h1>
          </AnimationWrapper>

          {/* Sub-Heading Animation */}
          <AnimationWrapper
            variants={anonymousMessageSubHeadingAnimationConfig(0.4)}
            once={false}
          >
            <h3
              className="
                text-xl
                text-text-alt
                font-secondary
              "
            >
              Login to <span className="font-bold">WhisperPost</span>
            </h3>
          </AnimationWrapper>
        </span>

        {/* Form Animation */}
        <AnimationWrapper
          variants={accountAccessAnimationConfig(0.6)}
          once={false}
          className="
            w-full
            flex
            flex-col
            items-center
            justify-center
          "
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
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
              mb-10
              font-secondary
              md:p-4
            "
          >
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
            </label>

            {/* Login Button */}
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
                py-1.5
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
              Login
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

            {/* Links */}
            <p
              className="
                text-text-alt 
                mt-3
                "
            >
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="
                  text-accent 
                  font-semibold
                  "
              >
                Sign up
              </Link>
            </p>

            {/* Forgot Password Link */}
            <Link
              href="/forgot-password"
              className="
                text-accent
                font-semibold
                hover:underline
              "
            >
              Forgot Password?
            </Link>
          </form>
        </AnimationWrapper>
      </div>

      {!verificationStaus && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setverificationStaus(true);
          }}
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
          bg-black/40
            backdrop-blur-sm
            p-4
          "
        >
          <div
            className="
              w-full
              max-w-md
              bg-bg-glass
              border
              border-border
              rounded-3xl
              p-6
              flex
              flex-col
              items-center
              justify-center
              gap-5
              text-center
              shadow-2xl
            "
          >
            {/* Heading */}
            <h1
              className="
                text-2xl
                font-primary
                font-bold
                text-text
              "
            >
              Account Not Verified!
            </h1>

            {/* Description */}
            <p
              className="
                text-text-alt
                font-secondary
                leading-relaxed
              "
            >
              Your account has not been verified yet. Please verify your account
              before logging in.
            </p>

            {/* Verify Button */}
            <button
              onClick={handleVerifiaction} //TODO: Add verify account functionality
              className="
                text-center
                text-lg
                font-primary
                font-semibold
                text-bg
                bg-text
                flex
                justify-center
                items-center
                px-5
                py-1.5
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
              Verify Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const LinkPart = () => {
  const { data: session } = useSession();
  const [anonyLink, setAnonyLink] = useState("");

  useEffect(() => {
    if (session?.user?.username) {
      const dynamicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/message/${session.user.username}`;
      setAnonyLink(dynamicLink);
    }
  }, [session]);

  return (
    <div className="w-9/10 max-w-[800px] bg-white mt-5 rounded-xl flex flex-col items-start shadow-lg shadow-gray-200 py-5 px-3 gap-2">
      <h1 className="w-full flex justify-start items-center gap-4 px-4 text-gray-800 text-lg font-poppins font-semibold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6 text-blue-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 
              1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
          />
        </svg>
        Your anonymous link
      </h1>

      <span className="w-full flex justify-between items-center gap-2 sm:gap-4 sm:px-4">
        <input
          type="text"
          readOnly
          value={anonyLink}
          className="w-7/10 h-10 rounded-lg border-2 border-gray-200 bg-gray-100 px-4 my-3"
        />
        <button
          onClick={() => {
            if (anonyLink) {
              navigator.clipboard.writeText(anonyLink);
              toast.success("Copied to clipboard");
            } else {
              toast.error("Link not ready yet. Try again!");
            }
          }}
          className="flex-1 flex justify-center items-center bg-blue-500 transition-all duration-300 ease-in-out active:scale-90 text-white px-4 py-2 rounded-lg gap-2 sm:font-semibold sm:text-lg sm:hover:bg-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 
              1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 
              1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 
              10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 
              9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 
              1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 
              6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 
              1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
            />
          </svg>
          Copy
        </button>
      </span>

      <p className="w-full text-sm text-gray-500 font-inter font-semibold text-center sm:text-lg sm:px-4 sm:py-2">
        Share this link anywhere to receive anonymous messages from anyone!
      </p>
    </div>
  );
};

export default LinkPart;

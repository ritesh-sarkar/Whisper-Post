"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const LinkPart = () => {
  const { data: session } = useSession();
  const [anonyLink, setAnonyLink] = useState("");
  const [shortSlug, setShortSlug] = useState("");

  useEffect(() => {
    if (session?.user?.username) {
      const dynamicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/message/${session.user.username}`;
      setAnonyLink(dynamicLink);

      // Fetch or generate short link
      fetch(`/api/short-link/${session.user.username}`)
        .then((res) => res.json())
        .then((data) => setShortSlug(data.slug || ""))
        .catch(() => setShortSlug(""));
    }
  }, [session]);

  // Copy full link
  const handleCopy = () => {
    if (anonyLink) {
      navigator.clipboard.writeText(anonyLink);
      toast.success("Copied to clipboard");
    } else {
      toast.error("Link not ready yet. Try again!");
    }
  };

  // WhatsApp share with full link
  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      anonyLink
    )}`;
    window.open(url, "_blank");
  };

  // Instagram share with short link (mobile only)
  const handleIGShare = async () => {
    const igUrl = shortSlug
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/s/${shortSlug}`
      : anonyLink;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Send an anonymous message`,
          text: `Send an anonymous message to @${session.user.username}`,
          url: igUrl,
        });
        toast.success("Instagram share opened!");
      } catch (err) {
        toast.error("Sharing canceled or failed");
      }
    } else {
      window.prompt("Copy this link to share on Instagram Story:", igUrl);
    }
  };

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
          onClick={handleCopy}
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

      {/* Share Buttons */}
      <div className="flex gap-4 mt-3">
        {/* WhatsApp */}
        <button
          onClick={handleWhatsAppShare}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
          WhatsApp
        </button>

        {/* Instagram */}
        <button
          onClick={handleIGShare}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.736 0 8.332.014 7.052.072 5.78.13 4.563.36 3.515 1.408 2.467 2.456 2.237 3.673 2.18 4.945.014 8.332 0 8.736 0 12c0 3.264.014 3.668.072 4.948.058 1.272.288 2.489 1.336 3.537 1.048 1.048 2.265 1.278 3.537 1.336C8.332 23.986 8.736 24 12 24s3.668-.014 4.948-.072c1.272-.058 2.489-.288 3.537-1.336 1.048-1.048 1.278-2.265 1.336-3.537.058-1.28.072-1.684.072-4.948s-.014-3.668-.072-4.948c-.058-1.272-.288-2.489-1.336-3.537C19.437.36 18.22.13 16.948.072 15.668.014 15.264 0 12 0zM12 5.838a6.162 6.162 0 1 0 0 12.324A6.162 6.162 0 0 0 12 5.838zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
          Instagram
        </button>
      </div>

      <p className="w-full text-sm text-gray-500 font-inter font-semibold text-center sm:text-lg sm:px-4 sm:py-2">
        Share this link anywhere to receive anonymous messages from anyone!
      </p>
    </div>
  );
};

export default LinkPart;

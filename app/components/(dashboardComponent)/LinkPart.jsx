"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const LinkPart = () => {
  const { data: session } = useSession();
  const [mainLink, setMainLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!session?.user?.username) return;

    const dynamicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/message/${session.user.username}`;
    setMainLink(dynamicLink);

    const fetchShort = async () => {
      try {
        const res = await fetch("/api/shorten", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: session.user.username }),
        });
        const data = await res.json();
        if (res.ok) setShortLink(data.shortUrl);
      } catch (err) {}
    };

    fetchShort();
  }, [session]);

  const handleCopy = async () => {
    if (!mainLink) return toast.error("Link not ready yet");
    await navigator.clipboard.writeText(mainLink);
    setCopied(true);
    toast.success("Copied full link!");
    setTimeout(() => setCopied(false), 1500);
  };

  const handleWhatsAppShare = () => {
    if (!mainLink) return toast.error("Link not ready");
    const url = encodeURIComponent(mainLink);
    window.open(
      `https://wa.me/?text=Send%20me%20an%20anonymous%20message:%20${url}`,
      "_blank"
    );
  };

  const handleInstagramShare = () => {
    if (!shortLink) return toast.error("Short link not ready");
    if (navigator.share) {
      navigator
        .share({
          title: "Send me an anonymous message",
          text: "Tap to send your message anonymously!",
          url: shortLink,
        })
        .catch(() => toast.error("Sharing canceled or failed"));
    } else {
      toast(
        "Sharing not supported on this device. Copy the link manually from your profile."
      );
    }
  };

  return (
    <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 max-w-[800px] bg-white mt-5 rounded-xl shadow-lg py-5 px-4 sm:px-5 flex flex-col gap-4">
      <h1 className="text-base sm:text-lg font-semibold text-gray-800">
        Your anonymous link
      </h1>

      {/* Input field showing main URL */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <input
          type="text"
          readOnly
          value={mainLink}
          className="flex-1 h-10 sm:h-11 rounded-lg text-base border border-gray-200 bg-gray-100 px-3 py-3 sm:px-4 text-gray-700 sm:text-base w-full"
        />
        <button
          onClick={handleCopy}
          className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition-colors text-base font-semibold sm:text-base"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-3">
        {/* WhatsApp button sharing full URL */}
        <button
          onClick={handleWhatsAppShare}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors text-base sm:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M20.52 3.478A11.936 11.936 0 0012 0C5.373 0 0 5.373 0 12a11.932 11.932 0 001.477 5.818L0 24l6.36-1.666A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12 0-3.197-1.247-6.203-3.48-8.522zm-8.475 18.202a9.865 9.865 0 01-5.02-1.408l-.36-.218-3.777.988.992-3.673-.233-.374A9.876 9.876 0 012.13 12c0-5.43 4.418-9.848 9.85-9.848 2.63 0 5.092 1.03 6.95 2.888 1.859 1.857 2.888 4.32 2.888 6.95 0 5.432-4.417 9.85-9.85 9.85zm5.447-7.436c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.149-.671.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.476-.883-.787-1.48-1.761-1.654-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.298.298-.497.099-.198.05-.372-.025-.52-.074-.149-.671-1.612-.918-2.207-.242-.579-.488-.5-.671-.51-.173-.008-.372-.01-.57-.01s-.52.074-.793.372c-.272.297-1.04 1.016-1.04 2.476 0 1.46 1.064 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.49.71.307 1.263.49 1.694.627.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.411.248-.693.248-1.287.173-1.41-.074-.124-.272-.198-.57-.347z"/>
          </svg>
          WhatsApp
        </button>

        {/* Instagram button sharing short URL */}
        <button
          onClick={handleInstagramShare}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] hover:opacity-90 text-white font-semibold transition-all text-base sm:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2.25a.75.75 0 110 1.5.75.75 0 010-1.5zm-4.25 1a5.25 5.25 0 105.25 5.25 5.257 5.257 0 00-5.25-5.25zm0 1.5a3.75 3.75 0 110 7.5 3.754 3.754 0 010-7.5z"/>
          </svg>
          Instagram
        </button>
      </div>

      <p className="text-sm text-gray-500 text-center mt-2">
        Share this link to receive anonymous messages from anyone!
      </p>
    </div>
  );
};

export default LinkPart;

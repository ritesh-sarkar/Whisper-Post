import AnonymousMessage from "@/app/components/AnonymousMessage";

export const metadata = {
  title: "Send Anonymous Message | Whisper Post",
  description:
    "Send anonymous messages easily and securely on Whisper Post. Share your thoughts without revealing your identity.",
};

const page = () => {
  return (
    <div
      className="
        h-screen 
        felx 
        justify-center 
        items-center
        "
    >
      <AnonymousMessage />
    </div>
  );
};

export default page;

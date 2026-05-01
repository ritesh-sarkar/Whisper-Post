export const metadata = {
  title: "Dashboard | Whisper Post",
  description: "View your personalized dashboard on Whisper Post — check messages, stats, and manage your account.",
};

import Dashboard from "@/app/components/(dashboardComponent)/Dashboard";

const page = () => {
  return (
    <div
      className="
        w-full
        h-full
        flex
        flex-col
        items-center
      "
    >
      <Dashboard />
    </div>
  );
};

export default page;

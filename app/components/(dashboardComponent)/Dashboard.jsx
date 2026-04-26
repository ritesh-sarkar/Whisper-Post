"use client";

import TotalMessage from "@/app/components/(dashboardComponent)/TotalMessage";
import TodayMessage from "@/app/components/(dashboardComponent)/TodayMessage";
import Unread from "@/app/components/(dashboardComponent)/Unread";
import WeekMessage from "@/app/components/(dashboardComponent)/WeekMessage";
import LinkPart from "@/app/components/(dashboardComponent)/LinkPart";
import Messages from "@/app/components/(dashboardComponent)/Messages";
import Graph from "@/app/components/(dashboardComponent)/Graph";

import { fetchMessagesByUser } from "@/lib/FetchMessageByUser";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { isToday, isThisWeek } from "@/lib/DateCountLogic";

const Dashboard = () => {
  const { data: session } = useSession();
  const userID = session?.user.id;

  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    if (!userID) return;

    const { success, messages } = await fetchMessagesByUser(userID);

    if (success) {
      setMessages(messages);
      toast.success("Messages loaded successfully");
    } else {
      toast.error("Failed to load messages");
    }
  };

  useEffect(() => {
    loadMessages();
  }, [userID]);

  const todayMessages = messages.filter((msg) => isToday(msg.createdAt));

  const weekMessages = messages.filter((msg) => isThisWeek(msg.createdAt));



  return (
    <div
      className="
        w-full
        bg-bg
        flex
        flex-col
        items-center
        font-secondary
        relative
        overflow-x-hidden
        p-2.5
      "
    >
      <Graph />
      {/* Stats Section */}

      <aside
        className="
          w-full
          max-w-225
          mt-6
          grid
          grid-cols-2
          md:grid-cols-4
          gap-4
        "
      >
        <TotalMessage messages={messages} loadMessages={loadMessages} />

        <TodayMessage TodayMessage={todayMessages} />

        <WeekMessage WeekMessage={weekMessages} />
      </aside>

      {/* Link Section */}

      <div className="mt-5 w-full max-w-225">
        <LinkPart />
      </div>

      {/* Messages Card */}

      {/* <div
        className="
          w-9/10
          max-w-225
          bg-bg-glass
          border
          border-border
          rounded-xl
          mt-6
          mb-10
          px-3
          py-4
          pb-6
          backdrop-blur-md
        "
      >
        <h1
          className="
            font-primary
            text-2xl
            font-semibold
            text-text
            m-2
          "
        >
          Messages
        </h1>

        <div
          className="
            w-full
            h-px
            bg-border
            my-2
          "
        />

        <div
          className="
            sm:max-h-150
            sm:overflow-y-auto
            pr-1
          "
        >
          <Messages
            messages={messages}
            setMessages={setMessages}
            loadMessages={loadMessages}
          />
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;

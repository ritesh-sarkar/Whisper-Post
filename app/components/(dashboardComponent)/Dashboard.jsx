"use client";

import TotalMessage from "@/app/components/(dashboardComponent)/TotalMessage";
import TodayMessage from "@/app/components/(dashboardComponent)/TodayMessage";
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
        h-full
        bg-bg
        flex
        flex-col
        items-center
        font-secondary
        relative
        overflow-x-hidden
        p-2
        mt-20
        md:p-5
        lg:max-w-85/100
        lg:mt-30
      "
    >
      {/* Upper part container */}

      <div
        className="
          w-full
          h-full
          max-w-9/10
          flex
          flex-col
          items-start
          justify-center
          gap-12
          lg:flex-row
          lg:items-center
          lg:justify-center  
        "
      >
        {/* Link part */}
        <div
          className="
            w-full
            h-full
            lg:w-1/2
          "
        >
          <LinkPart />
        </div>

        {/* Card and graph part */}
        <div
          className="
            w-full
            flex
            flex-col
            justify-center
            items-start
            gap-10
          "
        >
          {/* Cards */}
          <div
            className="
              w-full
              flex
              flex-col
              gap-8
              sm:flex-row
              sm:items-start
              sm:justify-between
            "
          >
            <TotalMessage messages={messages} />
            <TodayMessage TodayMessage={todayMessages} />
            <WeekMessage WeekMessage={weekMessages} />
          </div>

          {/* Graph */}
          <div
            className="
              w-full
              bg-bg-alt/50
              border
              border-border
              rounded-3xl
              flex
              flex-col
              items-start
              justify-between
              p-2
              text-text-alt
              gap-2
            "
          >
            <h1
              className="
                text-lg
                font-primary
                p-2
              "
            >
              Activity Overview
            </h1>
            <Graph />
          </div>
        </div>
      </div>



      {/* Messages Card */}

      <div
        className="
          w-9/10
          bg-bg
          border
          border-border
          rounded-3xl
          my-16
          px-3
          py-4
          pb-6
          backdrop-blur-xl
        "
      >
        <h1
          className="
            font-primary
            text-2xl
            font-semibold
            text-text
            m-2
            tracking-wider
          "
        >
          Messages
        </h1>

        <div
          className="
            w-full
            h-0.5
            bg-linear-to-r
            from-accent
            via-accent-alt
            to-accent-pink
            my-5
            rounded-full
          "
        />

        <div
          className="
            bg-transparent
            md:max-h-150
            md:overflow-y-auto
            px-1
          "
        >
          <Messages
            messages={messages}
            setMessages={setMessages}
            loadMessages={loadMessages}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

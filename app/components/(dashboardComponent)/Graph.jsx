import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

//Convert raw messages into weekly aggregated data
//Each day contains total number of messages
const getWeeklyMessageStats = (messages) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Initialize all days with 0 messages
  const weeklyData = days.map((day) => ({
    day,
    messages: 0,
  }));

  // Count messages per day
  messages.forEach((msg) => {
    const date = new Date(msg.createdAt);
    const dayIndex = date.getDay(); // 0 (Sun) - 6 (Sat)

    weeklyData[dayIndex].messages += 1;
  });

  return weeklyData;
};

// Weekly message graph
export default function CardinalAreaChart({ messages }) {
  const data = getWeeklyMessageStats(messages);

  return (
    <div
      className="
        w-full 
        max-w-225 
        h-48 
        md:h-75
        "
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          {/* Gradient definition for area fill */}
          <defs>
            <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={1} />

              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          {/* Area graph */}
          <Area
            type="monotone"
            dataKey="messages"
            stroke="#7c3aed"
            strokeWidth={2}
            fill="url(#customGradient)"
            fillOpacity={0.35}
          />

          {/* Tooltip */}
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload || !payload.length) return null;

              const data = payload[0].payload;

              return (
                <div
                  className="
                    bg-bg
                    px-3
                    py-2
                    rounded-lg
                    border
                    border-border
                  "
                >
                  <p
                    className="
                      text-sm 
                      text-text
                      "
                  >
                    {data.day}
                  </p>

                  <p
                    className="
                      text-xs 
                      text-text-alt
                      "
                  >
                    {data.messages} messages
                  </p>
                </div>
              );
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

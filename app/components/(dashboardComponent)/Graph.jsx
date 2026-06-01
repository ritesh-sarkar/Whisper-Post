import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

/*
|--------------------------------------------------------------------------
| Last 7 Days Message Analytics
|--------------------------------------------------------------------------
|
| Converts raw message documents into chart-ready data.
|
| Why Last 7 Days instead of Sun-Sat weekly aggregation?
|
| - Shows the user's most recent activity.
| - Prevents stats from resetting every Sunday.
| - Matches the behavior of modern analytics dashboards.
| - Always returns exactly 7 data points.
|
| Example:
|
| Input:
| [
|   { createdAt: "2026-06-01T10:00:00Z" },
|   { createdAt: "2026-06-01T12:00:00Z" }
| ]
|
| Output:
| [
|   { day: "Tue", messages: 0 },
|   { day: "Wed", messages: 0 },
|   ...
|   { day: "Mon", messages: 2 }
| ]
|
*/
const getLast7DaysStats = (messages) => {
  const data = [];

  /*
  |--------------------------------------------------------------------------
  | Generate data from oldest → newest day
  |--------------------------------------------------------------------------
  |
  | We start from 6 days ago and move toward today so the graph
  | appears in chronological order from left to right.
  |
  */
  for (let i = 6; i >= 0; i--) {
    /*
    |--------------------------------------------------------------------------
    | Create day boundaries
    |--------------------------------------------------------------------------
    |
    | startOfDay = 00:00:00.000
    | endOfDay   = next day at 00:00:00.000
    |
    | Any message whose timestamp falls within:
    |
    | startOfDay <= createdAt < endOfDay
    |
    | belongs to this day.
    |
    */
    const startOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);
    startOfDay.setDate(startOfDay.getDate() - i);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    /*
    |--------------------------------------------------------------------------
    | Count messages for the current day
    |--------------------------------------------------------------------------
    |
    | Example:
    |
    | startOfDay = Jun 01 00:00
    | endOfDay   = Jun 02 00:00
    |
    | Every message created between those two timestamps
    | contributes to today's count.
    |
    */
    const count = messages.filter((msg) => {
      const msgDate = new Date(msg.createdAt);

      return msgDate >= startOfDay && msgDate < endOfDay;
    }).length;

    /*
    |--------------------------------------------------------------------------
    | Push chart-ready data point
    |--------------------------------------------------------------------------
    |
    | Recharts expects a simple array of objects.
    |
    */
    data.push({
      day: startOfDay.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      messages: count,
    });
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Cardinal Area Chart
|--------------------------------------------------------------------------
|
| Displays message activity from the last 7 days.
|
| Example:
|
| Mon ▂
| Tue ▅
| Wed ▃
| Thu ▇
| Fri ▄
| Sat ▂
| Sun █
|
| The chart updates automatically whenever the messages
| prop changes.
|
*/
export default function CardinalAreaChart({ messages = [] }) {
  const data = getLast7DaysStats(messages);

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
          {/* Area fill gradient */}
          <defs>
            <linearGradient
              id="customGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#7c3aed"
                stopOpacity={1}
              />

              <stop
                offset="95%"
                stopColor="#7c3aed"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>

          {/* Main area graph */}
          <Area
            type="monotone"
            dataKey="messages"
            stroke="#7c3aed"
            strokeWidth={2}
            fill="url(#customGradient)"
            fillOpacity={0.35}
          />

          {/* Custom tooltip */}
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) {
                return null;
              }

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
                    shadow-lg
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
                    {data.messages} message
                    {data.messages !== 1 ? "s" : ""}
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
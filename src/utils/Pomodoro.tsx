type PomodoroCircleProps = {
  timeLeft: number;
  totalTime: number;
};

const formatTime = (t: number): string => {
  t = Math.max(0, Math.floor(t));
  if (t < 60) {
    return `${t} с`;
  }
  if (t < 3600) {
    return `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, "0")}`;
  }
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  return `${h}:${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
};

export const PomodoroCircle = ({
  timeLeft,
  totalTime,
}: PomodoroCircleProps) => {
  const radius = 90;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress =
    totalTime > 0 ? Math.max(0, timeLeft) / Math.max(1, totalTime) : 0;
  const strokeDashoffset = circumference - progress * circumference;

  const roundedTimeLeft = Math.max(0, Math.floor(timeLeft));

  return (
    <div className="flex flex-col items-center" style={{ width: radius * 2 }}>
      <div className="relative" style={{ width: radius * 2, height: radius * 2 }}>
        <svg
          width={radius * 2}
          height={radius * 2}
          className="rotate-90"
          style={{ display: "block" }}
        >
          <circle
            stroke="var(--overlay)"
            strokeOpacity={0.15}
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="var(--aside)"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90 ${radius} ${radius})`}
            style={{
              transition: "stroke-dashoffset 1s linear"
            }}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--text)"
            fontSize="2rem"
            fontWeight="600"
            style={{
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          >
            {formatTime(roundedTimeLeft)}
          </text>
        </svg>
      </div>
    </div>
  );
};
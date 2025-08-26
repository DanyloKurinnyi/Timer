import { useTimer } from "../../hooks/useTimer";
import "./timer.css";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.round(seconds % 60).toString().padStart(2, "0");
  if (s === "60") {
      return `${(parseInt(m, 10) + 1).toString().padStart(2, "0")}:00`;
  }
  return `${m}:${s}`;
}

export default function Timer() {
  const { remaining, isOnline, latency } = useTimer();

  return (
    <div className="timer">
      <h2>Тестовий таймер</h2>
      {remaining !== null ? (
        <h1>{formatTime(remaining)}</h1>
      ) : (
        <p>Синхронізація з сервером...</p>
      )}
      <div className="status">
        <p className={isOnline ? "online" : "offline"}>
          {isOnline ? "Online" : "Offline"}
        </p>
        {isOnline && remaining !== null && (
           <p className="latency">Затримка: {latency} мс</p>
        )}
      </div>
    </div>
  );
}

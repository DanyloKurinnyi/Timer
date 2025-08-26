import { useEffect, useState, useRef } from "react";
import { getServerTime } from "../services/api";

export function useTimer() {
  const [remaining, setRemaining] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [latency, setLatency] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const syncWithServer = async () => {
      const requestStartTime = performance.now();
      try {
        const data = await getServerTime();
        if (!isMounted) return; 

        const requestEndTime = performance.now();
        const roundTrip = requestEndTime - requestStartTime;
        setLatency(Math.round(roundTrip));

        const oneWayLatencySeconds = (roundTrip / 2) / 1000;
        const adjustedRemaining = data.remaining - oneWayLatencySeconds;
        
        setRemaining(adjustedRemaining > 0 ? adjustedRemaining : 0);
        setIsOnline(true);

        if (adjustedRemaining > 0) {
          const delay = 1000 - roundTrip;
          timerRef.current = setTimeout(syncWithServer, Math.max(0, delay));
        }

      } catch (err) {
        if (!isMounted) return;
        console.error("Sync failed:", err);
        setIsOnline(false);
        timerRef.current = setTimeout(syncWithServer, 2000);
      }
    };

    syncWithServer();

    return () => {
      isMounted = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []); 
  
  return { remaining, isOnline, latency };
}
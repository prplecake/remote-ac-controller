import {minuteInMiliseconds} from "../components/remote-ac";
import {useEffect} from "react";

const DEFAULT_REFRESH_INTERVAL =  minuteInMiliseconds * 5;

export function useRefresh(func: () => void, int: number = DEFAULT_REFRESH_INTERVAL) {
  useEffect(() => {
    const interval = setInterval(func, int);
    return () => clearInterval(interval);
  }, []);
}

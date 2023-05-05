import {minuteInMiliseconds} from '../components/remote-ac';

const DEFAULT_REFRESH_INTERVAL =  minuteInMiliseconds * 5;

export function useRefresh(func, int = DEFAULT_REFRESH_INTERVAL) {
  const interval = setInterval(func, int);
  return () => clearInterval(interval);
}

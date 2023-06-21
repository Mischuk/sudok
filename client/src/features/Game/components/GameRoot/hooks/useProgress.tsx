import { useEffect, useState } from "react";
import { EVENTS, Progress } from "utils";
import { socket } from "../../../../../api/instances";

export const useProgress = () => {
  const [progress, setProgress] = useState<Progress[]>([]);

  useEffect(() => {
    const updateProgress = ({ data }: { data: Progress[] }) => {
      setProgress(data);
    };
    socket.on(EVENTS.GAME.UPDATE_PROGRESS, updateProgress);

    return () => {
      socket.off(EVENTS.GAME.UPDATE_PROGRESS, updateProgress);
    };
  }, []);

  return { progress };
};

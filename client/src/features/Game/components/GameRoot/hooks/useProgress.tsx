import { useEffect, useState } from "react";
import { INITIAL_PROGRESS } from "../../../Game.consts";
import { EVENTS } from "utils";
import { socket } from "../../../../../api/instances";

export const useProgress = () => {
  const [progress, setProgress] = useState(INITIAL_PROGRESS);

  useEffect(() => {
    const updateProgress = (progress: number) => setProgress(progress);
    socket.on(EVENTS.GAME.UPDATE_PROGRESS, updateProgress);

    return () => {
      socket.off(EVENTS.GAME.UPDATE_PROGRESS, updateProgress);
    };
  }, []);

  return { progress };
};

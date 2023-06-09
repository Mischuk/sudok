import { useEffect } from "react";
import { Difficults } from "../../components/Difficults/Difficults";
import { HomeContext } from "./Home.context";
import { useGame, usePlayers } from "./Home.hooks";
import { Root, Waiting } from "./Home.styles";
import { socket } from "../../api/instances";
import { GameStatus } from "./Home.types";
import { Game } from "../Game/Game";
import { EVENTS } from "utils";

const MIN_PLAYERS = 2;

const Home = () => {
  const { players, totalPlayers } = usePlayers();
  const { data, status, changeStatus, run } = useGame();

  useEffect(() => {
    socket.on(EVENTS.GAME.PREPARE.SERVER, () => changeStatus(GameStatus.Prepare));
  }, [changeStatus]);

  useEffect(() => {
    socket.on(EVENTS.GAME.START.SERVER, run);
  }, [run]);

  const isWaiting = totalPlayers !== MIN_PLAYERS && totalPlayers > 0;
  const isInitial = status === GameStatus.Init;
  const isProcess = status === GameStatus.Process || status === GameStatus.Prepare;
  const isDiffing = isInitial && totalPlayers === MIN_PLAYERS;

  return (
    <HomeContext.Provider value={{ players }}>
      <Root>
        {isWaiting && <Waiting>Waiting for the second player...</Waiting>}

        {isDiffing && <Difficults />}

        {isProcess && <Game status={status} data={data} />}
      </Root>
    </HomeContext.Provider>
  );
};
export { Home };

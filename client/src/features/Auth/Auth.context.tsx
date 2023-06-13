import { createContext, useCallback, useState } from "react";
import { socket } from "../../api/instances";
import { DTO_Player, EVENTS } from "utils";
import { LS } from "../../utils/consts";

interface AuthContextType {
  id: string;
  isAuth: boolean;
  signIn: (data: DTO_Player, callback?: VoidFunction) => void;
  signUp: (data: DTO_Player, callback?: VoidFunction) => void;
  signOut: (callback?: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);
const INIT_USER_DATA: { id: string; isAuth: boolean } = { id: "", isAuth: false };

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ id, isAuth }, setUser] = useState(INIT_USER_DATA);

  const signIn = useCallback(({ id }: DTO_Player, callback = () => {}) => {
    setUser({ id, isAuth: true });

    socket.emit(EVENTS.PLAYER.CONNECT.CLIENT, { id });
    callback();
  }, []);

  const signUp = useCallback(
    ({ id }: DTO_Player, callback = () => {}) => {
      localStorage.setItem(LS.userId, id);
      signIn({ id }, callback);
    },
    [signIn]
  );

  const signOut = useCallback((callback = () => {}) => {
    setUser(INIT_USER_DATA);
    callback();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        id,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

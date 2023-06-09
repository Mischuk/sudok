import { createContext, useState } from "react";
import { socket } from "../../api/instances";
import { EVENTS } from "../../utils/ws";

interface AuthContextType {
  user: number;
  isAuth: boolean;
  signIn: (data: { charCode: number; id: string }, callback?: VoidFunction) => void;
  signOut: (callback?: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);
const INIT_USER_DATA: { user: number; isAuth: boolean } = { user: null!, isAuth: false };

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ user, isAuth }, setUser] = useState(INIT_USER_DATA);

  const signIn = ({ charCode, id }: { charCode: number; id: string }, callback = () => {}) => {
    setUser({ user: charCode, isAuth: true });

    socket.emit(EVENTS.PLAYER.CONNECT.CLIENT, { id, charCode });

    callback();
  };

  const signOut = (callback = () => {}) => {
    setUser(INIT_USER_DATA);
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

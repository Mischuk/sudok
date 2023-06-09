import { useContext } from "react";
import { AuthContext } from "../Auth.context";

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext };

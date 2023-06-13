import { useAuthContext } from "./hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { abortController } from "../../utils/abortController";
import { api } from "../../api/instances";
import { useQuery } from "react-query";
import { DTO_Player } from "utils";
import { Routes } from "../../utils/enum";
import { useCallback, useEffect } from "react";
import { LS } from "../../utils/consts";

let controller: AbortController;

const Auth = () => {
  const userId = localStorage.getItem(LS.userId);

  let navigate = useNavigate();
  const navigateHome = useCallback(
    () => navigate(Routes.Home, { replace: true }),
    [navigate]
  );

  const { signIn, signUp } = useAuthContext();

  const { isError } = useQuery(
    ["auth"],
    async (): Promise<DTO_Player> => {
      controller = abortController(controller);

      const response = await api.get<DTO_Player>("/auth/signup");
      return response.data;
    },
    {
      enabled: !userId,
      retry: true,
      onSuccess: ({ id }) => signUp({ id }, navigateHome),
    }
  );

  useEffect(() => {
    if (userId) {
      signIn({ id: userId }, navigateHome);
    }
  }, [navigateHome, signIn, userId]);

  return (
    <div>
      {isError && (
        <div>
          Oops! Something went wrong... <br /> Please, refresh the page.
        </div>
      )}
    </div>
  );
};

export { Auth };

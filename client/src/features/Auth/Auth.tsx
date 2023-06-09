import { useAuthContext } from "./hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../utils/enum";
import { abortController } from "../../utils/abortController";
import { api } from "../../api/instances";
import { useQuery } from "react-query";

let controller: AbortController;
type ResponseType = { charCode: number; id: string };

const Auth = () => {
  let navigate = useNavigate();
  const { signIn, user } = useAuthContext();

  const { isError } = useQuery(
    ["auth"],
    async (): Promise<ResponseType> => {
      controller = abortController(controller);

      const response = await api.get<ResponseType>("/auth");
      return response.data;
    },
    {
      enabled: !user,
      retry: true,
      onSuccess: ({ charCode, id }) => {
        signIn({ charCode, id }, () => {
          navigate(Routes.Home, { replace: true });
        });
      },
    }
  );

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

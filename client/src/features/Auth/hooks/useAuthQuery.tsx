import { useMutation } from "react-query";
import { abortController } from "../../../utils/abortController";
import { api } from "../../../api/instances";
import { ErrorResponse } from "../../../utils/types";

let controller: AbortController;

type AuthArgs = { charCode: string };

const auth = async (): Promise<any> => {
  controller = abortController(controller);

  const { data: response } = await api.get<any>("/auth/signin", {
    signal: controller.signal,
  });

  return response;
};

const useAuthQuery = () => {
  return {
    ...useMutation<any, ErrorResponse<any>, AuthArgs>(auth),
    abort: () => controller.abort(),
  };
};

export { useAuthQuery };

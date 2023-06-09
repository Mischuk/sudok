import { Navigate, Route, Routes as Routers, useLocation } from "react-router-dom";
import { useAuthContext } from "../features/Auth/hooks/useAuthContext";
import { Routes } from "../utils/enum";
import { NotFoundRoute } from "./ErrorRoute";
import { Layout } from "../components/Layout/Layout";
import { Auth } from "../features/Auth/Auth";
import { Home } from "../features/Home/Home";

function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();
  const { isAuth } = useAuthContext();

  if (!isAuth) {
    return <Navigate to={Routes.Auth} state={{ from: location }} replace />;
  }

  return children;
}

const RoutesContainer = () => {
  return (
    <Routers>
      <Route element={<Layout />}>
        <Route
          path={Routes.Home}
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path={Routes.Auth} element={<Auth />} />
        <Route path="*" element={<NotFoundRoute />} />
      </Route>
    </Routers>
  );
};

export default RoutesContainer;

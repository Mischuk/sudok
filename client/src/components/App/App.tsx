import { Root } from "./App.styles";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../../api/instances";
import { AuthProvider } from "../../features/Auth/Auth.context";
import { BrowserRouter } from "react-router-dom";
import RoutesContainer from "../../routes/RoutesContainer";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Root>
            <RoutesContainer />
          </Root>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

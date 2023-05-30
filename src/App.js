import { ThemeProvider } from "@mui/material";
import HomePage from "./pages/HomePage";
import theme from "./theme/theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Lobby from "./pages/Lobby";
import Play from "./pages/Play";
import Result from "./pages/Result";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/lobby",
    element: <Lobby />,
  },
  {
    path: "/play",
    element: <Play />,
  },
  {
    path: "/result",
    element: <Result />,
  },
]);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

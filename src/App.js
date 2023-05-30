import { ThemeProvider } from "@mui/material";
import HomePage from "./pages/HomePage";
import theme from "./theme/theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Lobby from "./pages/Lobby";
import Play from "./pages/Play";
import Result from "./pages/Result";
import { Box } from "@mui/material";
import mainBackground from "./background.png";
import { ToastContainer } from "react-toastify";
import JoinRoomForm from "./components/JoinRoomForm";
import CreateRoomForm from "./components/CreateRoomForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "invite/:roomId",
        element: <JoinRoomForm />,
      },
      {
        path: "/",
        element: <CreateRoomForm />,
      },
    ],
  },
  {
    path: "/lobby/:roomId",
    element: <Lobby />,
  },
  {
    path: "/play/:roomId",
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
      <Box
        sx={{
          backgroundImage: `url(${mainBackground})`,
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
          padding: 0,
          margin: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RouterProvider router={router} />
      </Box>
    </ThemeProvider>
  );
}

export default App;

import { Container, Stack, ThemeProvider } from "@mui/material";
import HomePage from "./pages/HomePage";
import theme from "./theme/theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Lobby from "./pages/Lobby";
import Play from "./pages/Play";
import Result from "./pages/Result";
import { Box } from "@mui/material";
import mainBackground from "./background.png";
import { ToastContainer } from "react-toastify";
import JoinRoomForm from "./components/Forms/JoinRoomForm";
import CreateRoomForm from "./components/Forms/CreateRoomForm";
import ConfigureRoom from "./pages/ConfigureRoom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/invite/:roomId",
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
    path: "/configure/:roomId",
    element: <ConfigureRoom />,
  },
  {
    path: "/play/:roomId",
    element: <Play />,
  },
  {
    path: "/result/:roomId",
    element: <Result />,
  },
]);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          backgroundImage: `url(${mainBackground})`,
          backgroundPosition: "center",
          minHeight: "100vh",
          minWidth: "100vw",
          display: "flex",
          padding: 0,
          margin: 0,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  );
}

export default App;

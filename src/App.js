import { Container, ThemeProvider } from "@mui/material";
import HomePage from "./pages/HomePage";
import theme from "./theme/theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Lobby from "./pages/Lobby";
import Play from "./pages/Play";
import Result from "./pages/Result";
import mainBackground from "./background.png";
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
        fixed
        sx={{
          backgroundImage: `url(${mainBackground})`,
          backgroundPosition: "center",
          minHeight: "100vh",
          minWidth: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  );
}

export default App;

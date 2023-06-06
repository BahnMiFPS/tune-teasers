import HomePage from "./pages/HomePage";
import JoinRoomForm from "./components/Forms/JoinRoomForm";
import CreateRoomForm from "./components/Forms/CreateRoomForm";
import Lobby from "./pages/Lobby";
import ConfigureRoom from "./pages/ConfigureRoom";
import Play from "./pages/Play";
import Result from "./pages/Result";

const routes = [
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
];

export default routes;

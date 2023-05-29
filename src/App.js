import { ThemeProvider } from "@mui/material";
import HomePage from "./pages/HomePage";
import theme from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;

import ReactDOM from "react-dom/client";
// import './index.css';
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import DataProvider from "./context/DataProvider";
import Theme from "./theme/Theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <DataProvider>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </DataProvider>
  </BrowserRouter>,
);

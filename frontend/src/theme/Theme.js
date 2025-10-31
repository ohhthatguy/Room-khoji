// theme.js
import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: { fontFamily: "Poppins, sans-serif", fontWeight: 700 },
    h2: { fontFamily: "Poppins, sans-serif", fontWeight: 600 },
    h3: { fontFamily: "Poppins, sans-serif", fontWeight: 500 },
    body1: { fontFamily: "Inter, sans-serif", fontWeight: 400 },
    body2: { fontFamily: "Inter, sans-serif", fontWeight: 300 },
    caption: { fontFamily: "Inter, sans-serif", fontWeight: 300, opacity: 0.8 },
  },
});

export default Theme;

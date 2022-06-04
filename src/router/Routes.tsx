import {
  BrowserRouter,
  Routes as RoutesWrapper,
  Route,
  Navigate,
} from "react-router-dom";

import NavBar from "../ui-kit/NavBar";
import MenuLayout from '../ui-kit/MenuLayout'


import { ThemeProvider } from "@emotion/react";
import { theme } from "../theme";
import { GlobalStyle } from "../global";

export default function Routes() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <RoutesWrapper>
          <Route path="/" element={<NavBar />} />
          <Route path="/menu" element={<MenuLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </RoutesWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
}

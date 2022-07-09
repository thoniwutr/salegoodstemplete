import {
  BrowserRouter,
  Routes as RoutesWrapper,
  Route,
  Navigate,
} from "react-router-dom";

import NavBar from "../ui-kit/NavBar";
import MenuLayout from '../ui-kit/MenuLayout'
import FacebookLoginPage from '../auth/FacebookLoginPage'
import ProductPage from "../sg-pages/product/ProductPage";
import OrderPage from "../sg-pages/order/OrderPage";
import OrderDetail from "../sg-pages/order/OrderDetail"
import HistoryPage from "../sg-pages/history/HistoryPage";
import TransactionPage from "../sg-pages/transaction/TransactionPage";

import { ThemeProvider } from "@emotion/react";
import { theme } from "../theme";
import { GlobalStyle } from "../global";
import CssBaseline from '@mui/material/CssBaseline';

export default function Routes() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <BrowserRouter>
        <RoutesWrapper>
        <Route path="/" element={<FacebookLoginPage/>} />
        <Route element={<MenuLayout />}>
          <Route path="/" element={<div></div>} />
          <Route path="/product" element={<ProductPage/>} />
          <Route path="/order" element={<OrderPage />} />
          <Route
                path="/order/:orderId"
                element={<OrderDetail />}
              />
          <Route path="/transaction" element={<TransactionPage/>} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </RoutesWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
}

import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Checkout } from "./pages/Checkout";
import { Confirmation } from "./pages/Checkout/components/Confirmation";
import { Home } from "./pages/Home";
import { ItemDetails } from "./pages/ItemDetails";

function Router() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="item/:itemId" element={<ItemDetails />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>
        <Route path="checkout/success" element={<Confirmation />}></Route>
      </Route>
    </Routes>
  );
}

export { Router };

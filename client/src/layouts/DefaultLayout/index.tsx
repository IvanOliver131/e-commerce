import { Box } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CartMenu } from "../../components/CartMenu";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { shades } from "../../theme";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function DefaultLayout() {
  return (
    <Box margin="auto" bgcolor={shades.secondary[500]}>
      <Navbar />
      <ScrollToTop />
      <div>
        <Outlet />
      </div>
      <CartMenu />
      <Footer />
    </Box>
  );
}

export { DefaultLayout };

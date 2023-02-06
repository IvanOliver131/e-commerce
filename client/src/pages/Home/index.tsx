import { Box } from "@mui/material";
import { MainCarousel } from "./components/MainCarousel";
import { ShoppingList } from "./components/ShoppingList";
import { Subscribe } from "./components/Subscribe ";

function Home() {
  return (
    <Box>
      <MainCarousel />
      <ShoppingList />
      <Subscribe />
    </Box>
  );
}
export { Home };

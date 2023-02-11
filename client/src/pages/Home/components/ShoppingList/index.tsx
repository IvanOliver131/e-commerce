import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";

import { setItems } from "../../../../state";
import { Item } from "../../../../components/Item";

type ItemType = {
  id: number;
  count: number;
  name: string;
  attributes: {
    name: string;
    price: number;
    shortDescription: string;
    category: string;
    image: { data: { attributes: { formats: { medium: { url: string } } } } };
  };
};

type MyState = {
  cart: {
    cart: Array<ItemType>;
    items: Array<ItemType>;
    isCartOpen: boolean;
  };
};

function ShoppingList() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state: MyState) => state.cart.items);
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  console.log("items", items);

  function handleChange(event: any, newValue: any) {
    setValue(newValue);
  }

  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      { method: "GET" }
    );

    const itemsJson = await items.json();

    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, []);

  const portionsItems = items.filter(
    (item) => item.attributes.category === "portions"
  );
  const smashItems = items.filter(
    (item) => item.attributes.category === "smash"
  );
  const smokedItems = items.filter(
    (item) => item.attributes.category === "smoked"
  );
  const drinksItems = items.filter(
    (item) => item.attributes.category === "drinks"
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        {" "}
        Todos os nossos <b>Produtos</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="SMASH" value="smash" />
        <Tab label="SMOKED" value="smoked" />
        <Tab label="PORÇÕES" value="portions" />]
        <Tab label="DRINKS" value="drinks" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "smash" &&
          smashItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "smoked" &&
          smokedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "portions" &&
          portionsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "drinks" &&
          drinksItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
}

export { ShoppingList };

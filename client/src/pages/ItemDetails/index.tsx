import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button, Tabs, Tab } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useNavigate, useParams } from "react-router-dom";
import { Item } from "../../components/Item";

type ItemType = {
  id: number;
  count: number;
  name: string;
  attributes: {
    name: string;
    price: number;
    shortDescription: string;
    longDescription: string;
    category: string;
    image: { data: { attributes: { formats: { medium: { url: string } } } } };
  };
};

function ItemDetails() {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState<ItemType>(null as never);
  const [items, setItems] = useState<ItemType[]>([]);

  function handleChange(event: any, newValue: any) {
    setValue(newValue);
  }

  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      { method: "GET" }
    );

    const itemJson = await item.json();

    setItem(itemJson.data);
  }

  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      { method: "GET" }
    );

    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  function handlePrevOrNext(
    itemId: string | undefined,
    action: "prev" | "next"
  ) {
    if (itemId) {
      const actions = {
        prev: () => navigate(`/item/${items[index - 1].id}`),
        next: () => navigate(`/item/${items[index + 1].id}`),
      };

      const index = items.findIndex((item) => item.id === Number(itemId));

      if (index === 0 && action === "prev") {
        navigate(`/item/${items[items.length - 1].id}`);
        return;
      }
      if (index === items.length - 1 && action === "next") {
        navigate(`/item/${items[0].id}`);
        return;
      }
      actions[action]();
    }
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]);

  return (
    <Box width="80%" m="60px auto" paddingY={5}>
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={item?.name}
            width="100%"
            height="100%"
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box
              onClick={() => navigate("/")}
              sx={{ ":hover": { cursor: "pointer", fontWeight: "bold" } }}
            >
              Home/Item
            </Box>
            <Box display="flex" gap="8px">
              <Typography
                onClick={() => handlePrevOrNext(itemId, "prev")}
                sx={{ cursor: "pointer" }}
              >
                Prev
              </Typography>{" "}
              <Typography
                onClick={() => handlePrevOrNext(itemId, "next")}
                sx={{ cursor: "pointer" }}
              >
                Pr??ximo
              </Typography>
            </Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {item?.attributes?.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Typography>
            <Typography sx={{ mt: "20px" }}>
              {item?.attributes?.longDescription}
            </Typography>
          </Box>

          {/* COUNT AND BUTTON */}
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(Math.max(count + 1, 1))}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADICIONAR
            </Button>
          </Box>

          <Box>
            <Box m="20px 0 5px 0" display="flex">
              {/* <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography> */}
            </Box>
            <Typography>CATEGORIA: {item?.attributes?.category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRI????O" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{item?.attributes?.longDescription}</div>
        )}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Produtos relacionados
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.slice(0, 4).map((item, index) => (
            <Item key={`${item.name}-${index}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export { ItemDetails };

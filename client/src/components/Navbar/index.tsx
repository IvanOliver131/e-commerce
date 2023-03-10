import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";

type MyState = {
  cart: {
    cart: Array<object>;
  };
};

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: MyState) => state.cart.cart);

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      bgcolor="rgba(67, 42, 35, 0.95)"
      color="white"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color="white"
        >
          D'ROY
        </Box>
        <Box display="flex" justifyContent="space-between" columnGap="20px">
          {/* <IconButton sx={{ color: "white" }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <PersonOutline />
          </IconButton> */}

          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen())}
              sx={{ color: "white" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          {/* <IconButton sx={{ color: "white" }}>
            <MenuOutlined />
          </IconButton> */}
        </Box>
      </Box>
    </Box>
  );
}

export { Navbar };

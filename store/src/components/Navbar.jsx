/* eslint-disable jsx-a11y/img-redundant-alt */
import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton } from "@mui/material";
import { ShoppingBagOutlined } from "@mui/icons-material";
import { setIsCartOpen } from "../redux";
import logo from "../assets/webp/logo.webp";
import "../styling/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const cartItemCount = cart.reduce((total, item) => total + item.count, 0);

  return (
    <Box className="navContainer">
      <Box className="navContent">
        <Link to="/">
          <Box className="logoImg">
            <img
              src={logo}
              alt="logo-picture"
              style={{
                width: "100%",
                height: "64px",
              }}
            ></img>
          </Box>
        </Link>

        <Box>
          <Badge
            badgeContent={cartItemCount}
            color="secondary"
            invisible={cartItemCount === 0}
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
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
              aria-label="shopping-cart"
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;

/* eslint-disable jsx-a11y/img-redundant-alt */
import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton } from "@mui/material";
import { ShoppingBagOutlined} from "@mui/icons-material";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";
import logo from '../../assets/logo/logo.png'
import '../../styling/Navbar.css'
import { Link } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart); 

  return (
    <Box className="navContainer">
      <Box className="navContent">
        <Link to="/">
        <Box className="logoImg"color={shades.secondary[500]} >
          <img src={logo} alt="logo-picture" width="64px"></img>
        </Box>
        </Link>
        
        <Box>
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
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
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
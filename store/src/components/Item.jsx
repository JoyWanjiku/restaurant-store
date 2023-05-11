import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  IconButton,
  Box,
  Typography,
  useTheme,
  Button,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../redux/index.js";

const Item = ({ item, width }) => {
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);
  const {
    palette: { secondary },
  } = useTheme();

  const { diet, price, title, image, description } = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;

  const [isAdded, setIsAdded] = useState(false);
  const handleAddToCart = () => {
    dispatch(addToCart({ item: { ...item, count } }));
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  };

  return (
    <Box width={width}>
      <Box position="relative">
        <img
          alt={item.title}
          width="300px"
          height="400px"
          src={`http://localhost:1337${url}`}
          style={{ cursor: "pointer" }}
        />
        <Box
          display="block"
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton 
              onClick={() => setCount(Math.max(count - 1, 0))}
              aria-label="remove"
              >
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton 
              onClick={() => setCount(count + 1)}
              aria-label="Add"
              >
                <AddIcon />
              </IconButton>
            </Box>
            {count > 0 && (
              <Button
                className="orderBtn"
                onClick={handleAddToCart}
                sx={{ backgroundColor: shades.secondary[800], color: "white" }}
              >
                {isAdded ? "Added" : "Order"}
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      <Box mt="6px">
        <Typography
         variant="subtitle2"
         backgroundColor={secondary.second} 
         sx={{
          display:"inline",
          padding:"5px",
          fontWeight:"bold",
          color:"white"
         }}
          
          >
          {diet
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography fontWeight="bold" mt="11px">{title}</Typography>
        <Typography>{description}</Typography>

        <Typography fontWeight="bold">${price}</Typography>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isAdded}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={() => setIsAdded(false)}
      >
        <Alert variant="filled" severity="success">{`${count}  ${title} added to cart.`}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Item;

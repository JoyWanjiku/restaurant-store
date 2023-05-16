import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen
} from "../redux";
import { useNavigate } from "react-router-dom";
import "../styling/CartMenu.css";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../makeRequest";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);
  const stripePromise = loadStripe(
    "pk_test_51N4410BEiacPJDtle7aMWiBqwNNVojlwfFO9XxNbGeIeJqh4WfWllv0lanRfifMB9jk8SVL4YC8OqLCVfhUK77PT00qFvSpNIn"
  );
  const handlePayment = async (values) => {
    try {
      const stripe = await stripePromise;
      const res = await makeRequest.post("/orders", {
        products: cart.map(({ id, count }) => ({
          id,
          count,
        })),
      });
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box className="cartContainer" display={isCartOpen ? "block" : "none"}>
      <Box className="cartModal" width="max(400px, 30%)">
        <Box padding="30px" overflow="auto" height="100%">
          <FlexBox mb="15px">
            <Typography variant="h3">
              YOUR ORDERS <b>({cart.length})</b>
            </Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>
          <Divider />
          {cart.length === 0 ? (
            <Typography
              variant="h4"
              fontWeight="bold"
              marginTop={5}
              marginBottom={5}
            >
              No orders made yet.
            </Typography>
          ) : (
            <Box>
              {cart.map((item) => (
                <Box key={`${item.attributes.title}-${item.id}`}>
                  <FlexBox p="15px 0">
                    <Box flex="1 1 40%">
                      <img
                        alt={item?.title}
                        width="123px"
                        height="164px"
                        src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                      />
                    </Box>
                    <Box flex="1 1 60%">
                      <FlexBox mb="5px">
                        <Typography fontWeight="bold">
                          {item.attributes.title}
                        </Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(removeFromCart({ id: item.id }))
                          }
                        >
                          <CloseIcon />
                        </IconButton>
                      </FlexBox>
                      <FlexBox m="15px 0">
                        <Box
                          display="flex"
                          alignItems="center"
                          border={`1.5px solid ${shades.neutral[500]}`}
                        >
                          <IconButton
                            onClick={() =>
                              dispatch(decreaseCount({ id: item.id }))
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography>{item.count}</Typography>
                          <IconButton
                            onClick={() =>
                              dispatch(increaseCount({ id: item.id }))
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                        <Typography fontWeight="bold">
                          ${item.attributes.price}
                        </Typography>
                      </FlexBox>
                    </Box>
                  </FlexBox>
                  <Divider />
                </Box>
              ))}
            </Box>
          )}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">TOTAL</Typography>
              <Typography fontWeight="bold">${totalPrice}</Typography>
            </FlexBox>

            <TextField
              label="Promo Code"
              placeholder="Enter promo code"
              sx={{
                minWidth: "100%",
                m: "20px 0",
              }}
            ></TextField>
            {cart.length > 0 ? (
                <Box sx={{display: "flex", width:"50%"}}>
                <Button
                variant="filled"
                sx={{
                  backgroundColor: shades.neutral[600],
                  color: "white",
                  borderRadius: 0,
                  minWidth: "100%",
                  padding: "20px 40px",
                  m: "20px 0",
                  "&:hover": { color: "black" },
                  border: "white solid 8px",
                  ".MuiButtonGroup-grouped:not(:last-of-type):hover": {
                    borderRightColor: "#fff",
                  },
                  ".MuiButtonGroup-grouped:not(:last-of-type)&:hover": {
                    borderRightColor: "#fff",
                  },
                }}
                onClick={() => {
                  navigate("/pickup");
                  dispatch(setIsCartOpen({}));
                } }
              >
                <LocalMallIcon />
                Pick-Up
              </Button><Button
                variant="filled"
                sx={{
                  backgroundColor: shades.secondary[600],
                  color: "white",
                  borderRadius: 0,
                  minWidth: "100%",
                  padding: "20px 40px",
                  m: "20px 0",
                  "&:hover": { color: "black" },
                  border: "white solid 8px",
                }}
                onClick={() => {
                  handlePayment();
                  dispatch(setIsCartOpen({}));
                } }
              >
                  <LocalShippingIcon
                    fontSize="small"
                    sx={{ marginRight: "2px" }} />
                  Delivery
                </Button>
                </Box>
            ) : (
              <Button
                sx={{
                  backgroundColor: shades.secondary[600],
                  color: "white",
                  borderRadius: 0,
                  minWidth: "100%",
                  padding: "20px 40px",
                  m: "20px 0",
                  "&:hover": { color: "black" },
                  opacity: 0.5,
                  pointerEvents: "none",
                }}
                disabled
              >
                CHECKOUT
              </Button>
            )}
            <Button
              sx={{
                backgroundColor: shades.primary[500],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
                "&:hover": { color: "black" },
              }}
              onClick={() => {
                navigate("/");
                dispatch(setIsCartOpen({}));
              }}
            >
              KEEP SHOPPING
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;

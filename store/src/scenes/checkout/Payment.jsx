import { Box, Button, Typography } from "@mui/material";
import { makeRequest } from "../../makeRequest";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { shades } from "../../theme";
import { useNavigate } from "react-router-dom";
import AddCardIcon from '@mui/icons-material/AddCard';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Payment = () => {
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
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
    <Box m="132px 40px">
      
        <Typography sx={{ mb: "15px" }} variant="h3">
          Payment Options
        </Typography>
        <Box display={"flex"}>
        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          onClick={() => {
            navigate("/checkout/success");
          }}
          sx={{
            backgroundColor: shades.secondary[400],
            boxShadow: "none",
            color: "white",
            borderRadius: 0,
            padding: "15px 40px",
            border:"solid 8px white"
          }}
        >
          <StorefrontIcon/>
          Pay at restaurant
        </Button>
        <Button
          onClick={handlePayment}
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            backgroundColor: shades.secondary[600],
            boxShadow: "none",
            color: "white",
            borderRadius: 0,
            padding: "15px 40px",
            border:"solid 8px white"
          }}
        >
          <AddCardIcon/>
          Pay now
        </Button>
      </Box>
      <Box sx={{ marginTop: "30px", display: "flex" }}>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          sx={{
            backgroundColor: shades.primary[200],
            boxShadow: "none",
            color: "white",
            borderRadius: 0,
            padding: "15px 40px",
          }}
          onClick={() => navigate("/pickup")}
        >
          Back
        </Button>
        </Box>
    </Box>
  );
};

export default Payment;

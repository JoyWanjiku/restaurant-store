import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { useState } from "react";
import { shades } from "../../theme";
import Payment from "./Payment.jsx";
import AddressForm from "./AddressForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../../makeRequest";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission and page refresh
    handleNext(); // Proceed to the next step
  };

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
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Pick up Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <form onSubmit={handleSubmit}>
          {isFirstStep && <AddressForm />}
          {isSecondStep && <Payment />}
          <Box display="flex" justifyContent="space-between" gap="50px">
            {isSecondStep && (
              <>
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
                onClick={handleBack}
              >
                Back
              </Button>
              <Box display={"flex"}>
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                onClick={() => {
                  navigate("/checkout");
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
                Pay now
              </Button>
            </Box>
            </>
            )}
            {isFirstStep&&(
            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              sx={{
                backgroundColor: shades.primary[400],
                boxShadow: "none",
                color: "white",
                borderRadius: 0,
                padding: "15px 40px",
              }}
            >
              {isFirstStep ? "Next" : "Place Order"}
            </Button>
             )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Checkout;

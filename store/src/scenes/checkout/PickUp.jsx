import { useState } from "react";
import { Box, Button, Container, TextField, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../../makeRequest";
import { resetCart } from "../../redux";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { shades } from "../../theme";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

const StepContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: theme.spacing(4),
}));

const PickUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    date: "",
    time: "",
    paymentMethod: "",
  });
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleNextStep = () => {
    const validationErrors = {};
    let isValid = true;

    if (!formData.name) {
      validationErrors.name = "Please enter your name";
      isValid = false;
    }

    if (!formData.phoneNumber) {
      validationErrors.phoneNumber = "Please enter your phone number";
      isValid = false;
    }

   

    if (!formData.time) {
      validationErrors.time = "Please select a time";
      isValid = false;
    }

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const date = useState(dayjs());

  return (
    <form onSubmit={handleSubmit} >
      <Box sx={{ marginTop: "10em", marginBottom: "3em" }}>
        <StepContainer>
          {currentStep === 1 && (
            <Box width={isNonMobile ? "60em" : "100%"}>
              <Typography variant="h6" gutterBottom>
                Step 1: Enter Pick-Up Information
              </Typography>

              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                error={!!errors.name}
                helperText={errors.name}
              />

              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
              
              <Typography sx={{marginBottom:'30px', marginTop:'30px'}} variant="h6">Choose date and time</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={[
                    "DatePicker",
                    "DateTimePicker",
                    "TimePicker",
                    "DateRangePicker",
                  ]}
                >
                  <DemoItem>
                    <DatePicker
                      defaultValue={date}
                      disablePast
                      
                      required
                      shouldDisableDate={(date) => {
                        const day = dayjs(date).day();
                        return day === 0 || day === 1; // Disable Sundays (day 0) and Mondays (day 1)
                      }}
                      views={["year", "month", "day"]}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>

              <TextField
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                error={!!errors.time}
                helperText={errors.time}
              />

              <Button
                variant="contained"
                onClick={handleNextStep}
                sx={{ marginTop: "4em" , height:'4em', 
                 "&:hover": { color: "black" , backgroundColor: shades.neutral[500]}
                }}
                fullWidth
              >
                Next
              </Button>
            </Box>
          )}

          {currentStep === 2 && (
                        <Box width={isNonMobile ? "27em" : "100%"}>

              <Typography variant="h6" gutterBottom>
                Step 2: Choose Payment Method
              </Typography>
              <Box display={"flex"} sx={{marginTop:'2em', marginBottom:'2em'}}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate("/checkout/success");
                    dispatch(resetCart({}));
                  }}
                  sx={{
                    backgroundColor: shades.secondary[400],
                    boxShadow: "none",
                    color: "white",
                    padding: "15px 40px",
                    border:"solid 8px white",
                    height:'13em',
                    borderRadius:'3em',
                    "&:hover": { color: "black", backgroundColor:shades.neutral[400] },
                  }}
                >
                  Pay at restaurant
                </Button>
                <Button
                  onClick={handlePayment}
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: shades.secondary[600],
                    boxShadow: "none",
                    color: "white",
                    padding: "15px 40px",
                    border:"solid 8px white",
                    height:'13em',
                    borderRadius:'3em',
                  }}
                >
                  Pay now with card
                </Button>
              </Box>
              <Button
                variant="contained"
                onClick={handlePreviousStep}
                fullWidth
                style={{ marginRight: 16 , height:'4em'}}
                sx={{ backgroundColor: shades.primary[500],
                  "&:hover": { color: "black" , backgroundColor: shades.neutral[500],
                }}}
              >
                Previous
              </Button>
            </Box>
          )}
        </StepContainer>
      </Box>
    </form>
  );
};

export default PickUp;

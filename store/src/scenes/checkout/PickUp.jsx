import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../../makeRequest";
import { useSelector } from "react-redux";

const PickUp = ({
  type,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // these functions allow for better code readability
 
  //sets date and time ahead or same
  const today = dayjs();
  const todayStartOfTheDay = today.startOf("day");
  const navigate = useNavigate();

  //STRIPE CHECKOUT
  const stripePromise = loadStripe(
    "pk_test_51N4410BEiacPJDtle7aMWiBqwNNVojlwfFO9XxNbGeIeJqh4WfWllv0lanRfifMB9jk8SVL4YC8OqLCVfhUK77PT00qFvSpNIn"
  );
  const cart = useSelector((state) => state.cart.cart);

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makeRequest.post("/orders", {
        products:cart.map(({id, count})=>({
          id, count,
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
    <Box
      gap="15px"
      width="80%"
      m="100px auto"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: "20px" }}>
        Pick-Up Details
      </Typography>
      <TextField
        fullWidth
        type="text"
        label=" Name"
        
        sx={{ gridColumn: "span 2", marginBottom: "15px" }}
      />  <TextField
        fullWidth
        type="number"
        label=" Phone Number"
        
        sx={{ gridColumn: "span 2", marginBottom: "15px" }}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            "DatePicker",
            "DateTimePicker",
            "TimePicker",
            "DateRangePicker",
          ]}
          sx={{ gridColumn: "span 2" }}
        >
          <DemoItem label="Pick-up date">
            <DatePicker
              defaultValue={today}
              disablePast
              views={["year", "month", "day"]}
              sx={{ gridColumn: "span 2" }}
            />
          </DemoItem>

          <DemoItem label="TimePicker">
            <TimePicker
              defaultValue={todayStartOfTheDay}
              disablePast
              sx={{ gridColumn: "span 2" }}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
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
          onClick={() => navigate("/")}
        >
          Back
        </Button>
        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            backgroundColor: shades.secondary[400],
            boxShadow: "none",
            color: "white",
            borderRadius: 0,
            padding: "15px 40px",
          }}
          onClick={handlePayment}
        >
          Place order
        </Button>
      </Box>
    </Box>
  );
};

export default PickUp;

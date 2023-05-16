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

const PickUp = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  // these functions allow for better code readability
 
  //sets date and time ahead or same
  const today = dayjs();
  const todayStartOfTheDay = today.startOf("day");

  //STRIPE CHECKOUT
 
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
          onClick={() => navigate("/payment")}
        >
          Pay
        </Button>
       </Box>
      </Box>
  );
};

export default PickUp;

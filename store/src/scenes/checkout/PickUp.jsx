import { useState } from "react";
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

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const date = useState(dayjs());
  const [time, setTime] = useState(dayjs().startOf("day"));
  const [errors, setErrors] = useState({});

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleTimeChange = (value) => {
    setTime(value);
  };

  const handlePayClick = () => {
    const validationErrors = {};

    if (!name) {
      validationErrors.name = "Name is required";
    }

    if (!phoneNumber) {
      validationErrors.phoneNumber = "Phone number is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      navigate("/payment");
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
        label="Name"
        value={name}
        onChange={handleNameChange}
        error={!!errors.name}
        helperText={errors.name}
        sx={{ gridColumn: "span 2", marginBottom: "15px" }}
      />
      <TextField
        fullWidth
        type="number"
        label="Phone Number"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber}
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
              defaultValue={date}
              disablePast
              shouldDisableDate={(date) => {
                const day = dayjs(date).day();
                return day === 0 || day === 1; // Disable Sundays (day 0) and Mondays (day 1)
              }}
              views={["year", "month", "day"]}
              sx={{ gridColumn: "span 2" }}
            />
          </DemoItem>

          <DemoItem label="TimePicker">
            <TimePicker
              value={time}
              onChange={handleTimeChange}
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
          onClick={handlePayClick}
        >
          Continue To Payment
        </Button>
      </Box>
    </Box>
  );
};

export default PickUp;

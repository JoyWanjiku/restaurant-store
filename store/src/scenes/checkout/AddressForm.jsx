
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AddressForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // these functions allow for better code readability
 
  //sets date and time ahead or same
  const today = dayjs();
  const todayStartOfTheDay = today.startOf("day");

 
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
    </Box>
  );
};

export default AddressForm;
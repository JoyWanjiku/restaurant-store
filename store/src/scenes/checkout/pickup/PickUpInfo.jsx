import { getIn } from "formik";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const PickUpInfo = ({
  type,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // these functions allow for better code readability
  const formattedName = (field) => `${type}.${field}`;

  const formattedError = (field) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    );

  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

    //sets date and time ahead or same
  const today = dayjs();
  const todayStartOfTheDay = today.startOf("day");

  return (
    <Box
      gap="15px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      <TextField
        fullWidth
        type="text"
        label=" Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values?.name}
        name={formattedName("name")}
        error={formattedError("name")}
        helperText={formattedHelper("name")}
        sx={{ gridColumn: "span 2" }}
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

export default PickUpInfo;

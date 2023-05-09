import { getIn } from "formik";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";

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

  return (
    <Box
      display="grid"
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
      
      
      <TextField
        fullWidth
        type="text"
        label="Pick-up Date"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values?.pickUpDate}
        name={formattedName("pickUpDate")}
        error={formattedError("pickUpDate")}
        helperText={formattedHelper("pickUpDate")}
        sx={{ gridColumn: "span 2" }}
      />
     
      <TextField
        fullWidth
        type="text"
        label="Pick-up Time"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values?.pickUpTime}
        name={formattedName("pickUpTime")}
        error={formattedError("pickUpTime")}
        helperText={formattedHelper("pickUpTime")}
        sx={{ gridColumn: "span 2" , marginBottom:"20px"}}
      />
   
      
    </Box>
  );
};

export default PickUpInfo;
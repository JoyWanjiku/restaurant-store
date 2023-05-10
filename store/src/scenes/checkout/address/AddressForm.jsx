import { getIn } from "formik";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import InfoIcon from "@mui/icons-material/Info";

const AddressForm = ({
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
    <Box>
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
        label="C/O"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values?.co}
        name={formattedName("co")}
        error={formattedError("co")}
        helperText={formattedHelper("co")}
        sx={{ gridColumn: "span 2" }}
      />
      
      <TextField
        fullWidth
        type="text"
        label="Street Address"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values?.street1}
        name={formattedName("street1")}
        error={formattedError("street1")}
        helperText={formattedHelper("street1")}
        sx={{ gridColumn: "span 2" }}
      />
     
      <TextField
        fullWidth
        type="text"
        label="City"
        onBlur={handleBlur}
        onChange={handleChange}
        value="Stockholm"
        name={formattedName("city")}
        error={formattedError("city")}
        helperText={formattedHelper("city")}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="State"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values?.state}
        name={formattedName("state")}
        error={formattedError("state")}
        helperText={formattedHelper("state")}
        sx={{ gridColumn: "1fr" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Zip Code"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values?.zipCode}
        name={formattedName("zipCode")}
        error={formattedError("zipCode")}
        helperText={formattedHelper("zipCode")}
        sx={{ gridColumn: "1fr" }}
      />
     
    </Box>
    <Box
        sx={{
          background: " #99b99942",
          width: "100%",
          textAlign: "center",
          padding: "10px",
          marginTop: "40px",
        }}
      >
        <Typography>
          <InfoIcon fontSize="small" sx={{marginRight:"20px"}}/>
          Please note that we <b>only</b> deliver in Stockholm. Delivery fee is $8.
        </Typography>
      </Box>{" "}
    </Box>
  );
};

export default AddressForm;
import { Box, Typography } from "@mui/material";
import AddressForm from "./AddressForm";

const Shipping = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
}) => {
  return (
    <Box m="30px auto">
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Shipping Information
        </Typography>
        <AddressForm
          type="shippingAddress"
          values={values.shippingAddress}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>

    </Box>
  );
};

export default Shipping;
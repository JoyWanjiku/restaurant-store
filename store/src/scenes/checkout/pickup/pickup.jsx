import { Box, Typography } from "@mui/material";
import PickUpInfo from "./PickUpInfo";

const Pickup = ({
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
          Pick-Up Information
        </Typography>
        <PickUpInfo
          type="pickUp"
          values={values.pickUp}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>

    </Box>
  );
};

export default Pickup;
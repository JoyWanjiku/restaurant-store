import { Box} from "@mui/material";
import Payment from "./Payment";

const PaymentInfo = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
}) => {
  return (
    <Box m="30px auto">
      <Box>
        
        <Payment
          type="paymentInfo"
          values={values.PaymentInfo}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>

    </Box>
  );
};

export default PaymentInfo;
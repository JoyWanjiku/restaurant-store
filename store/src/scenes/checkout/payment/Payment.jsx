import { Box, Typography, useMediaQuery } from "@mui/material";
import TextField from "@mui/material/TextField";
import payment from '../../../assets/webp/payment.webp'
import { getIn } from "formik";
import MaskedInput from 'react-text-mask';

const Payment = ({type, values, touched, errors, handleBlur, handleChange }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const formattedName = (field) => `${type}.${field}`;

  const formattedError = (field) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    );

  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

    const monthYearMask = [/\d/, /\d/, '/', /\d/, /\d/];

  return (
    <Box m="30px 0">
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Contact Information
        </Typography>
        <TextField
          fullWidth
          type="text"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.email}
          name={formattedName("email")}
          error={formattedError("email")}
          helperText={formattedHelper("email")}
          sx={{ gridColumn: "span 4", marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Phone Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.phoneNumber}
          name={formattedName("phoneNumber")}
          error={formattedError("phoneNumber")}
          helperText={formattedHelper("phoneNumber")}
          sx={{ gridColumn: "span 4" , marginBottom: "20px" }}
        /> 


        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Card Information
        </Typography>
        <TextField
          fullWidth
          type="text"
          label="Name on Card"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.cardName}
          name={formattedName("cardName")}
          error={formattedError("cardName")}
          helperText={formattedHelper("cardName")}
          sx={{ gridColumn: "span 4" , marginBottom: "15px" }}
        />
        
        <TextField
          fullWidth
          type="text"
          label="Card Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.cardNumber}
          name={formattedName("cardNumber")}
          error={formattedError("cardNumber")}
          helperText={formattedHelper("cardNumber")}
          sx={{ gridColumn: "span 4" , marginBottom: "15px" }}
        />  
        <TextField
          fullWidth
          type="text"
          label="CVC"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.cvc}
          name={formattedName("cvc")}
          error={formattedError("cvc")}
          helperText={formattedHelper("cvc")}
          sx={{ width: '25ch',marginBottom: "15px", marginRight:"20px"}}
        /> 
         <TextField
          fullWidth
          type="text"
          label="Expiration Date"
          InputProps={{
            inputComponent: MaskedInput,
            inputProps: {
              mask: monthYearMask,
              placeholder: 'MM/YY',
            },
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.expirationDate}
          name={formattedName("expirationDate")}
          error={formattedError("expirationDate")}
          helperText={formattedHelper("expirationDate")}
          sx={{ width: "25ch"  , marginBottom: "15px" }}
        />
        <Box mt={5} marginLeft={isNonMobile ? 40 : 2}>
          <img src={payment} alt="card-images" width={"50%"} ></img>
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;
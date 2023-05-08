import { Box, Typography, useMediaQuery } from "@mui/material";
import TextField from "@mui/material/TextField";
import payment from '../../assets/card/payment.jpg'

const Payment = ({ values, touched, errors, handleBlur, handleChange }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
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
          value={values.email}
          name="email"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{ gridColumn: "span 4", marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Phone Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber"
          error={!!touched.phoneNumber && !!errors.phoneNumber}
          helperText={touched.phoneNumber && errors.phoneNumber}
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
          value={values.cardName}
          name="cardName"
          error={!!touched.cardName && !!errors.cardName}
          helperText={touched.cardName && errors.cardName}
          sx={{ gridColumn: "span 4" , marginBottom: "15px" }}
        />
        
        <TextField
          fullWidth
          type="text"
          label="Card Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.cardNumber}
          name="cardNumber"
          error={!!touched.cardNumber && !!errors.cardNumber}
          helperText={touched.cardNumber && errors.cardNumber}
          sx={{ gridColumn: "span 4" , marginBottom: "15px" }}
        />  
        <TextField
          fullWidth
          type="text"
          label="CVC"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.cvc}
          name="cvc"
          error={!!touched.cvc && !!errors.cvc}
          helperText={touched.cvc && errors.cvc}
          sx={{ width: '25ch',marginBottom: "15px", marginRight:"20px"}}
        /> 
         <TextField
          fullWidth
          type="text"
          label="Expiration Date"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.expirationDate}
          name="expirationDate"
          error={!!touched.expirationDate && !!errors.expirationDate}
          helperText={touched.expirationDate && errors.expirationDate}
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
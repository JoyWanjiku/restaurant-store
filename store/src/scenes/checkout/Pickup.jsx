import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import PaymentInfo from "./payment/PaymentInfo";
import { resetCart } from "../../redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Pickup from "./pickup/pickup";

const PickUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFormSubmit = async () => {
    setActiveStep(activeStep + 1);
  };

  function handleClick() {
    dispatch(resetCart());
    navigate("/checkout/success");
  }

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel> Pick-Up</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Pickup
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <PaymentInfo
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {isSecondStep && (
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
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.secondary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                  onClick={!isFirstStep ? handleClick : undefined}
                  disabled={Object.keys(errors).length > 0} 

                >
                  {isFirstStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const initialValues = {
  pickUp: {
    name: "",
  },
paymentInfo:{ 
   email: "",
  phoneNumber: "",
  cardName: "",
  cardNumber: "",
  cvc: "",
  expirationDate: "",}
};

const checkoutSchema = [
  yup.object().shape({
    pickUp: yup.object().shape({
      name: yup.string().required("Required"),
    }),
  }),
  yup.object().shape({
    paymentInfo: yup.object().shape({
    email: yup.string().required("required").email("invalid email"),
    phoneNumber: yup.string().required("required"),
    cardName: yup.string().required("required"),
    cardNumber: yup.string().required("required"),
    cvc: yup.string().required("required"),
    expirationDate: yup.string().required("required"),
  }),}),
];

export default PickUp;

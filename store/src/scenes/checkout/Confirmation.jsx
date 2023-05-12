/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";
import success from "../../assets/webp/success.webp";
import useMediaQuery from "@mui/material/useMediaQuery";

const Confirmation = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      marginTop={10}
      marginBottom={10}
    >
      <img
        src={success}
        alt="success-payment-image"
        height="300px"
        width={isNonMobile ? "50%" : "100%"}
        style={{ objectFit: "contain" }}
      ></img>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order —{" "}
        <strong>An sms/email will be sent with an ETA of your meal</strong>
      </Alert>
      <Link to="/">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{
            mt: 3,
            mb: 10,
            "&:hover": { cursor: "pointer", backgroundColor: "#4C8958" },
          }}
        >
          Go back to home
        </Button>
      </Link>
    </Box>
  );
};

export default Confirmation;

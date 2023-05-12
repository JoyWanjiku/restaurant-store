/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";
import denied from "../../assets/payment/denied.png";
import useMediaQuery from "@mui/material/useMediaQuery";

const Denied = () => {
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
        src={denied}
        alt="failed-payment-image"
        height="300px"
        width={isNonMobile ? "50%" : "100%"}
        style={{ objectFit: "contain" }}
      ></img>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Order Failed — <strong>Please try making your order again</strong>
      </Alert>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{
          mt: 3,
          "&:hover": { cursor: "pointer", backgroundColor: "#4C8958" },
        }}
      >
        Go back to home
      </Button>
    </Box>
  );
};

export default Denied;

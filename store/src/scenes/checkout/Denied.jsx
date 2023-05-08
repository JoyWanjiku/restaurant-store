import { Box, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";

const Denied = () => {
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Order Failed —{" "}
        <strong>Please try making your order again</strong>
      </Alert>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/checkout"
        sx={{ mt: 3 ,"&:hover": { cursor: "pointer"  , backgroundColor: "#4C8958"}}}
      >
        Go back to checkout
      </Button>
    </Box>
  );
};

export default Denied;
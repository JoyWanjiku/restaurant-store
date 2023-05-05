import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Denied = () => {
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Order Failed —{" "}
        <strong>Please try again in Making your Purchase</strong>
      </Alert>
    </Box>
  );
};

export default Denied;
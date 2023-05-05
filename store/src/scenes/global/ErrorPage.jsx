/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import error from '../../assets/404/error.jpg'

const ErrorPage = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      marginTop={10}
    >
        <img src={error} alt="404-error-image" 
              height= "300px"
              
              width={isNonMobile ? "50%" : "100%"}
            >
            
        </img>
     
      <Typography variant="h3" fontWeight="bold" align="center" gutterBottom>
        Oops! Looks like you're lost.
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        The page you're looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ mt: 3 ,"&:hover": { cursor: "pointer"  , backgroundColor: "#59E4A8"}}}
      >
        Go back to home
      </Button>
    </Box>
  );
};

export default ErrorPage;

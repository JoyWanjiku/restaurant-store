import { Box, Typography, useMediaQuery } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { shades } from "../../theme";
import hero from '../../assets/webp/heroImage.webp'
import { useEffect } from "react";


const HeroSection = () => {
useEffect(() => {
  const img = new Image();
  img.src = hero;
}, []);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box>    
        <Box key={`hero-image`} marginLeft="-25px">
          <img
            src={hero}
            alt={`hero`}
            loading="eager"
            style={{
              width: "100%",
              height: "500px",
              objectFit: "cover",
              backgroundAttachment: "fixed",
            }}
          />
          <Box
            color="white"
            padding="20px"
            borderRadius="1px"
            textAlign="left"
            backgroundColor="rgb(0, 0, 0, 0.6)"
            position="absolute"
            top={isNonMobile ? "46%" : "26%"}
            left={isNonMobile ? "10%" : "0"}
            right={isNonMobile ? undefined : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? undefined : "240px"}
          >
            <Typography color={shades.secondary[300]}>Welcome to Crème de la Crème</Typography>
            <Typography variant="h1" > FRESH, TASTY, HEALTHY FOOD</Typography>
          
          </Box>
        </Box>
    </Box>
  );
};

export default HeroSection;
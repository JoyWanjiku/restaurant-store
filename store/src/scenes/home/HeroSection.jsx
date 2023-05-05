import { Box, Typography, useMediaQuery } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { shades } from "../../theme";

// imports all images from assets folder
const importImg = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTextureImports = importImg(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

const HeroSection = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box>    
      {Object.values(heroTextureImports).map((texture, index) => (
        <Box key={`carousel-image-${index}`}>
          <img
            src={texture}
            alt={`carousel-${index}`}
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
      ))}
    </Box>
  );
};

export default HeroSection;
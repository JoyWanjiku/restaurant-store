
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";

function About() {
  const {
    palette: { secondary },
  } = useTheme();

  return (
    <Box marginTop="70px" padding="40px 0"     text-align="-webkit-center"backgroundColor={secondary.second} color="white">
      <Box width="80%" margin="auto">
        <Typography variant="h1" fontWeight="bold" mb="30px">
          About Us
        </Typography>
        <Typography mb="30px">
          At Creme de la Creme, we are passionate about food and hospitality. Our chefs create delicious dishes using only the freshest ingredients, and our friendly staff ensure that every customer has a memorable dining experience.
        </Typography>
        <Typography mb="30px">
          We believe in using sustainable and locally sourced ingredients whenever possible, and our menu features a variety of vegetarian options. Lactose and gluten free options are available as well.
        </Typography>
        <Typography mb="30px">
          Whether you're looking for a romantic dinner for two or a venue for your next event, Cream Restaurant has you covered. We offer private dining rooms and catering services for weddings, corporate events, and other special occasions.
        </Typography>
        <Typography mb="30px">
          Come visit us today and discover why Cream Restaurant is one of the most popular dining destinations in town!
        </Typography>
      </Box>
    </Box>
  );
}

export default About;

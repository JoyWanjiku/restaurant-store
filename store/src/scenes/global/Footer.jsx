/* eslint-disable jsx-a11y/anchor-has-content */
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";

function Footer() {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[600]}
          >
           Crème de la Crème
          </Typography>
          <div>
          We serve healthy tasty and homecooked food. We use fresh ingredients
            from local producers to prepare our dishes. We always use healthy
            cooking methods. Our menu includes a variety of nutritious options,
            including vegetarian, lactose and gluten-free options. Make your
            order today and taste the difference!
          </div>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Working Hours
          </Typography>
          <Typography mb="30px">MON - FRE : 10-22</Typography>
          <Typography mb="30px">SAT : 12-18</Typography>
          <Typography mb="30px">SUNDAY: CLOSED</Typography>
        </Box>


        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px">
            <a href="https://www.google.com/maps/place/Tasty+Buds/@51.2072,-121.9883,3z/data=!3m1!4b1!4m6!3m5!1s0x548671c2f1541053:0x5f16fcd940308384!8m2!3d51.2072!4d-121.9883!16s%2Fg%2F11h806trrn">
           Taste Buds, Stockholm</a>
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
            <a href="mailto:creamrestaurant@gmail.com">
            Email: cremerestaurant@gmail.com</a>
          </Typography>
          <Typography mb="30px">
            <a href="tel:070886644">
            +467772347734</a>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
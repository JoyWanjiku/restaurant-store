import { Box, Typography } from "@mui/material";
import "../styling/Footer.css";
import { useTheme } from "@emotion/react";

function Footer() {
  const {
    palette: { neutral },
  } = useTheme();

  return (
    <Box  padding="20px 0" backgroundColor={neutral.light}>
      <Box
        width="100%"
        margin="auto"
        display="flex"
        justifyContent="space-evenly"
        flexWrap="wrap"
        rowGap="15px"
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="10px">
            Contact us
          </Typography>
          <Typography mb="10px">
            <a
              className="link"
              href="https://www.google.com/maps/place/Tasty+Buds/@51.2072,-121.9883,3z/data=!3m1!4b1!4m6!3m5!1s0x548671c2f1541053:0x5f16fcd940308384!8m2!3d51.2072!4d-121.9883!16s%2Fg%2F11h806trrn"
            >
              Taste Buds, Stockholm
            </a>
          </Typography>
          <Typography mb="5px">
            <a className="link" href="mailto:creamrestaurant@gmail.com">
              cremerestaurant@gmail.com
            </a>
          </Typography>
          <Typography mb="5px">
            <a className="link" href="tel:070886644">
              +467772347734
            </a>
          </Typography>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="10px">
            Working Hours
          </Typography>
          <Typography mb="5px">MON - FRI: 10-22</Typography>
          <Typography mb="5px">SAT: 12-18</Typography>
          <Typography color="red">SUNDAY: CLOSED</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;

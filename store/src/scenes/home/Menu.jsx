import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../redux";
import InfoIcon from "@mui/icons-material/Info";

const Menu = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      { method: "GET" }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const glutenFreeItems = items.filter(
    (item) => item.attributes.diet === "glutenFree"
  );
  const lactoseFreeItems = items.filter(
    (item) => item.attributes.diet === "lactoseFree"
  );
  const vegetarianItems = items.filter(
    (item) => item.attributes.diet === "vegetarian"
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center" padding="20px" color="black">
        <b>Menu</b>
      </Typography>
      <Tabs
        textColor="inherit"
        indicatorColor="secondary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="Lactose Free" value="lactoseFree" />
        <Tab label="Gluten Free" value="glutenFree" />
        <Tab label="Vegetarian" value="vegetarian" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.title}-${item.id}`} />
          ))}
        {value === "lactoseFree" &&
          lactoseFreeItems.map((item) => (
            <Item item={item} key={`${item.title}-${item.id}`} />
          ))}
        {value === "glutenFree" &&
          glutenFreeItems.map((item) => (
            <Item item={item} key={`${item.title}-${item.id}`} />
          ))}
        {value === "vegetarian" &&
          vegetarianItems.map((item) => (
            <Item item={item} key={`${item.title}-${item.id}`} />
          ))}
      </Box>
      <Box
        sx={{
          background: " #99b99942",
          width: "100%",
          textAlign: "center",
          padding: "10px",
          marginTop: "40px",
        }}
      >
        <Typography>
          <InfoIcon fontSize="small" sx={{marginRight:"20px"}}/>
          Please note that we are unable to accommodate substitutions to ensure
          the quality and consistency of our dishes. Thank you for your
          understanding.
        </Typography>
      </Box>{" "}
    </Box>
  );
};

export default Menu;

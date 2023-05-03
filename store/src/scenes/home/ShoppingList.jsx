import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";

const ShoppingList = () => { //chnage to ProductList
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
      <Typography variant="h3" textAlign="center">
         <b>Menu</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
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
    </Box>
  );
};

export default ShoppingList;
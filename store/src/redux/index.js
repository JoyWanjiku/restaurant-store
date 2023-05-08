import { createSlice } from "@reduxjs/toolkit"; //lets state mutation not needed

const initialState = {
  isCartOpen: false,
  cart: [], //added to cart
  items: [], //items available
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems (state, action)  {
      state.items = action.payload;
    },
    addToCart (state, action)  {
      const { item } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );
    
      if (existingItemIndex !== -1) {
        // Item already exists in the cart, update its count
        state.cart[existingItemIndex].count += item.count;
      } else {
        // Item doesn't exist in the cart, add it
        state.cart.push(item);
      }
    },

    //filter through all items, the item id we want to remove saves
    // in the action, then it removes only passed item id and not 
    //other items
    removeFromCart(state, action)  {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    increaseCount (state, action) {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },

    decreaseCount (state, action) {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) //cannot be less than 1
        {
          item.count--;
        }
        return item;
      });
    },
    resetCart: (state) => {
      state.cart = []
    }, 
    setIsCartOpen (state) {
      state.isCartOpen = !state.isCartOpen; //flip the current state
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  resetCart
} = cartSlice.actions;

export default cartSlice.reducer;
import { createContext, useContext, useReducer } from "react";
import cartReducer from "./cartReducer";
const CartContext = createContext();
const CartContextDispatcher = createContext();
// eslint-disable-next-line react/prop-types
const initialState={
    cart:[],
    total:0,
}
const CartProvider = ({ children }) => {
  const [cart, dispath] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={cart}>
      <CartContextDispatcher.Provider value={dispath}>
        {children}
      </CartContextDispatcher.Provider>
    </CartContext.Provider>
  );
};

export default CartProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
// eslint-disable-next-line react-refresh/only-export-components
export const useCartActions = () => useContext(CartContextDispatcher);

import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export const ShopContext = createContext();
//import { products } from '../assets/assets.js';

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // States
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState()

  const navigate = useNavigate('')

 // Add to Cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }

    // Clone existing cart data
    let cartData = JSON.parse(JSON.stringify(cartItem)); // safer deep clone

    // Check if item already exists in the cart
    if (cartData[itemId]) {
      // Check if the size already exists
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1; // Increment quantity
      } else {
        cartData[itemId][size] = 1; // Add new size with quantity 1
      }
    } else {
      // Add new item to cart
      cartData[itemId] = { [size]: 1 };
    }

    setCartItem(cartData); // Update state
    toast.success('Item added to cart!');

    if (token) {
      try {
        const response = await axios.post(backendUrl + "/api/cart/add", { itemId, size }, { headers: { token } });
      } catch (err) {
        toast.error(err.message);
        console.log(err);
      }
    }
  };
  // const addToCart = async (itemId, size) => {
  //   if (!size) {
  //     toast.error("Select Product Size");
  //     return;
  //   }
  
  //   let cartData = { ...cartItem };
  
  //   if (!cartData[itemId]) {
  //     cartData[itemId] = {};
  //   }
  //   cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
  
  //   setCartItem(cartData); // Update UI first
  //   toast.success("Item added to cart!");
  
  //   if (token) {
  //     try {
  //       await axios.post(backendUrl + "/api/cart/add", { itemId, size }, { headers: { token } });
  //     } catch (err) {
  //       toast.error(err.message);
  //       console.log(err);
  //     }
  //   }
  // };
  

  // Get Cart Count
  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItem) {
      const sizes = cartItem[itemId]; // Get all sizes for the item

      for (const size in sizes) {
        try {
          totalCount += sizes[size]; // Sum up quantities
        } catch (error) {
          console.error('Error calculating count:', error); // Log errors
        }
      }
    }
    return totalCount;
  };
  //update quantity
  const updateQuantity = async (itemId, size, quantity) => {
    // Clone existing cart data
    let cartData = JSON.parse(JSON.stringify(cartItem)); // safer deep clone
    cartData[itemId][size] = quantity
    //set cart data
    setCartItem(cartData);
    if (token) {
      try {
        await axios.post(backendUrl + "/api/cart/update", { itemId, size, quantity }, { headers: { token } });
      }
      catch (err) {
        console.log(err)
        toast.error(err.message)
      }
    }

  }
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + "/api/cart/get",{}, { headers: { token } });
      //console.log(response);
      if (response.data.message) {
        setCartItem(response.data.cartData)
      }
      else {
        toast.error("some thing went wrong")
      }
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  //total cart amount

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item]
          }
        }
        catch (error) {

        }
      }
    }
    return totalAmount;
  }

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      //console.log(response.data);
      if (response.data.success) {
        setProducts(response.data.products);
      }
      else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  }

  useEffect(() => {
    getProductsData()
  }, [])

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'))
    }
  }, [])

  // Context Values
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addToCart,
    
    setCartItem,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token, setToken
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

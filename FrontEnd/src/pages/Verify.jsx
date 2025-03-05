import axios from 'axios';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from "../assets/assets";
import CartTotal from '../components/CartTotal';
import Title from '../components/Title';
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from 'react-router-dom'
const Verify = () => {
    const { navigate, backendUrl, token, cartItem, setCartItem, delivery_fee, getCartAmount, products } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get(success);
    const orderId = searchParams.get(orderId);

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null;
            }
            const response = await axios.post(backendUrl + "/api/order/verifyStripe", { success, orderId }, { headers: { token } })
            if (response.data.success) {
                setCartItem({})
                navigate('/orders');
            }
            else {
                navigate('/home')
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    }
    useEffect(() => {

    }, [token])
    return (
        <div>
    
        </div>
    )
}

export default Verify

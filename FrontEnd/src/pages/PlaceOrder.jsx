import axios from 'axios';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from "../assets/assets";
import CartTotal from '../components/CartTotal';
import Title from '../components/Title';
import { ShopContext } from "../context/ShopContext";
const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const { navigate, backendUrl, token, cartItem, setCartItem, delivery_fee, getCartAmount, products } = useContext(ShopContext);

  //now linking front End with backend
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''

  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }));

  }
  const initPay = (order) => {
    const options = {
      key_id: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(backendUrl + "/api/order/verifyRazorpay", response, { headers: { token } });
          if (data.success) {
            navigate('/orders');
            setCartItem({});
          }
        } catch (err) {
          console.log(err);
          toast.error(err.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const orderItem = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.Quantity = cartItem[items][item];
              orderItem.push(itemInfo);

            }
          }
        }
      }
      //console.log(orderItem)
      let OrderData = {
        address: formData,
        items: orderItem,
        amount: getCartAmount() + delivery_fee
      }
      switch (method) {


        //api call for case on delivery

        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', OrderData, { headers: { token } })
          if (response.data.success) {
            setCartItem({});
            //console.log(response.data)
            navigate('/orders')
          }
          else {
            toast.error(response.success.message)
          }
          break;
        //payment with razor pay
        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + "/api/order/razorpay", OrderData, { headers: { token } })
          if (responseRazorpay.data.success) {
            //console.log(responseRazorpay.data.order)
            initPay(responseRazorpay.data.order)
          }
          break;
        //payment with stripe
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', OrderData, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          }
          else {
            toast.error(responseStripe.data.message);
          }


          break

        default:
          break;

      }

    } catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name' />
        </div>

        <input required onChange={onChangeHandler} name='email' value={formData.email} className='mt-2 border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Enter your Email' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='mt-2 border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' />

        <div className='mt-2 flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
        </div>

        <div className='flex gap-3 mt-2'>
          <input required onChange={onChangeHandler} name='zipCode' value={formData.zipCode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Zipcode' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
        </div>

        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='mt-2 border border-gray-300 rounded py-1.5 px-3.5 w-full' type='tel' placeholder='Phone' />
        <img
          src={assets.ForPaymentPage}
          alt=""
          className="hidden lg:block w-full"
        />

      </div>

      {/*-------------Right side   */}
      <div className='mt-10 sm:max-w-[600px] w-full'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12 text-xl'>
          <Title text1={"PAYMENT "} text2={"METHOD"} />
          {/* payment method */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className=' flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? "bg-green-400" : ''}`}></p>
              <img src={assets.stripe_logo} alt="" className='h-5 mx-4' />
            </div>

            <div onClick={() => setMethod('razorpay')} className=' flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? "bg-green-400" : ''}`}></p>
              <img src={assets.razorpay_logo} alt="" className='h-5 mx-4' />
            </div>

            <div onClick={() => setMethod('cod')} className=' flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? "bg-green-400" : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>


          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit'

              className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>

    </form>
  )
}
export default PlaceOrder

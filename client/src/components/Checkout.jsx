import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { placeOrder } from '../actions/orderActions';
import Success from './Success';
import Loading from './Loading'
import Error from './Error';
import { useNavigate } from 'react-router-dom';

const Checkout = ({subTotal}) => {

  const orderstate=useSelector(state=> state.placeOrderReducer);
  const{ loading, error, success}=orderstate;
  const stripeKey=process.env.REACT_APP_STRIPE_KEY;

  console.log(stripeKey);
  

  const dispatch=useDispatch();

    function tokenHandler(token){

        console.log(token);
        dispatch(placeOrder(token, subTotal))


    }

    useEffect(()=>{
      if (success) {
        localStorage.removeItem('cartItems');
        window.location.href = "/order";
      }
    }, [success])
  return (
    <div>

      {loading && <Loading />}
      {error && <Error errorMessage='Something Went Wrong!'/>}
      {success && <Success successMessage='Your Order is placed Successfully!'/>}
      {/*success && localStorage.removeItem('cartItems') && (window.location.href="/order")*/}
      <StripeCheckout
      amount={subTotal*100}
      shippingAddress
      token={tokenHandler}
      stripeKey={stripeKey}
      >
        <button className='btn'>Buy Now</button>
      </StripeCheckout>
    </div>
  )
}

export default Checkout

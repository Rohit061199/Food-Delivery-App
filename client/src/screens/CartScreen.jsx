import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import Checkout from "../components/Checkout";

const CartScreen = () => {
  const cartState = useSelector((state) => state.cartReducer);

  const cartItems = cartState.cartItems;
  var subTotal=cartItems.reduce((x, item) => x+item.itemPrice, 0)
  const dispatch=useDispatch();
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 style={{ fontSize: "40px" }}> My Cart</h2>

          {cartItems.map((item) => {
            return (
              <div className="flex-container">
                <div className="text-start m-1 w-100">
                  <h1>
                    {item.name} ({item.varient})
                  </h1>
                  <h1>
                    Price: {item.quantity} x {item.prices[0][item.varient]}=
                    {item.itemPrice}
                  </h1>
                  <h1 style={{display:'inline'}}>Quantity: </h1>
                  <i className="fa fa-plus" aria-hidden="true" onClick={()=> dispatch(addToCart(item, item.quantity+1, item.varient))}></i>
                  <b> {item.quantity}</b>
                  <i className="fa fa-minus" aria-hidden="true" onClick={()=> dispatch(addToCart(item, item.quantity-1, item.varient))}></i>
                  <hr/>
                </div>
                
                <div className="m-1 w-100">
                    <img src={item.image} style={{height: '80px', width: '80px'}} />
                </div>
                <div className="m-1 w-100">
                <i className="fa fa-trash mt-4" aria-hidden="true" onClick={()=> dispatch(deleteFromCart(item))}></i>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-md-4">
            <h2 style={{fontSize: '45px'}}>Subtotal: $ {subTotal}</h2>
            <Checkout subTotal={subTotal}/>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;

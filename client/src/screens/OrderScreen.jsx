import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUserOrders } from '../actions/orderActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { Link } from 'react-router-dom';

const OrderScreen = () => {

    const dispatch=useDispatch();

    const orderstate=useSelector(state=>state.getUserOrdersReducer)

    const {orders, error, loading}=orderstate;
    

    useEffect(()=>{
        dispatch(getUserOrders())
    },[])
  return (
    <div>
      <h2 style={{fontSize: '35px'}}> My Orders </h2>
      <hr />
      <div className='row justify-content-center' style={{backgroundColor: 'blue'}}>
        {loading && <Loading />}
        {error && <Error errorMessage='Something Went Wrong!'/>}
        {orders && orders.map(order=>{
            return <div className="col-md-8 p-1 m-2" style={{
                backgroundColor: 'blue',
                color: 'white'
            }}>
                <div className="flex-container">
                    <div className='text-left w-100 m-1'>
                        <h2 style={{fontSize: '25px'}}> Items </h2>
                        <hr/>
                        {order.orderItems.map((item)=>{
                            return <div>
                                <p>{item.name} [{item.varient}] * {item.quantity} = {item.itemPrice}</p>
                            </div>
                        })}
                    </div>
                    <div className='text-left w-100 m-1'>
                    <h2 style={{fontSize: '25px'}}> Address </h2>
                    <hr/>
                    <p> Street: {order.shippingAddress.street}</p>
                    <p> City: {order.shippingAddress.city}</p>
                    <p> Country: {order.shippingAddress.country}</p>
                    <p> Pincode: {order.shippingAddress.pincode}</p>

                    </div>
                    <div className='text-left w-100 m-1'>
                    <h2 style={{fontSize: '25px'}}> Order Info </h2>
                    <hr/>
                    <p>Order Amount: {order.orderAmount}</p>
                    <p>Date: {order.createdAt.substring(0,10)}</p>
                    <p>Transaction ID: {order.transactionId}</p>
                    <p>
                        Track your order by clicking here:{" "}
                        <Link to={`/track/${order._id}`} style={{ color: 'yellow' }}>Track Order</Link>
                    </p>

                    </div>
                </div>
            </div>
        })}
      </div>
    </div>
  )
}

export default OrderScreen

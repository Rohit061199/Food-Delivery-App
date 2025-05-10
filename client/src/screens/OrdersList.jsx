import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { deliverOrderAction, getAllOrders } from '../actions/orderActions';

const OrdersList = () => {
  const dispatch = useDispatch();
  
    const allorderstate = useSelector(state=> state.getAllOrdersReducer);
    const { loading, orders, error}=allorderstate;

    function deliverOrder(orderId){
      dispatch(deliverOrderAction(orderId));
    }
    

      useEffect(() => {
        dispatch(getAllOrders());
      }, [dispatch]);
  return (
    <div>
      <h2> Orders List </h2>
      {error && <Error errorMessage='Something Went Wrong' />}
      {loading && <Loading />}

      <table className="table table-bordered">
        <thead className="thead-dark" style={{backgroundColor: '#343a40'}}>
        <tr>
        <th>Order ID</th>
        <th>Email</th>
        <th>User Id</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {orders && orders.map((order)=>{
          return <tr>

            <td>{order._id}</td>
            <td>
              {order.email}
            </td>
            <td>{order.userId}</td>
            <td>
              {order.orderAmount}
            </td>
            <td>
              {order.createdAt.substring(0,10)}
            </td>
            <td>
              {order.isDelivered ? (<h1 style={{color: 'green'}}>Delivered</h1> ): <button className='btn' onClick={()=> deliverOrder(order._id)}> Deliver </button>}
            </td>
          </tr>
        })}
        </tbody>
        
      </table>
      
    </div>
  )
}

export default OrdersList

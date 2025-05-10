import axios from 'axios';

export const placeOrder=(token, subTotal)=>async (dispatch, getState)=>{
    dispatch({type:'PLACE_ORDER_REQUEST'});

    const currentUser=getState().loginUserReducer.currentUser;
    const cartItems=getState().cartReducer.cartItems

    console.log(currentUser);

    try{

        const response=await axios.post(`/api/orders/placeorder`, {token, subTotal, currentUser, cartItems});


        dispatch({type:'PLACE_ORDER_SUCCESS'})
        console.log(response)


    }catch(error){
        dispatch({type:'PLACE_ORDER_FALSE'})
        console.log(error);
    }


}

export const getUserOrders = () =>async (dispatch, getState) =>{

    dispatch({type:'GET_USER_ORDERS_REQUEST'});
    const currentUser=getState().loginUserReducer.currentUser;

    console.log(currentUser.id);

    let userId;

    if(currentUser.id!==null){
        userId=currentUser.id;
    }
    else{
        userId=currentUser._id;
    }

    try{
        const response=await axios.get(`/api/orders/getuserorders?userId=${userId}`);
        console.log(response)
        dispatch({type:'GET_USER_ORDERS_SUCCESS', payload: response.data});
    }catch(error){
        dispatch({type:'GET_USER_ORDERS_FAILED', payload: error});
    }

}

export const getAllOrders = () =>async (dispatch) =>{

    dispatch({type:'GET_ALL_ORDERS_REQUEST'});

    try{
        const response=await axios.get(`/api/orders/getallorders`);
        console.log(response)
        dispatch({type:'GET_ALL_ORDERS_SUCCESS', payload: response.data});
    }catch(error){
        dispatch({type:'GET_ALL_ORDERS_FAILED', payload: error});
    }

}

export const deliverOrderAction = (orderId) =>async (dispatch) =>{

    dispatch({type:'DELIVER_ORDER_REQUEST'});

    try{
        const response=await axios.put(`/api/orders/deliverorder/${orderId}`, { isDelivered: true});
        console.log(response)
        const orders=await axios.get(`/api/orders/getallorders`);
        dispatch({type:'GET_ALL_ORDERS_SUCCESS', payload: orders.data});
    }catch(error){
        console.log(error)
        dispatch({type:'DELIVER_ORDER_FAILED', payload: error});
    }

}

export const getOrderByIdAction = (orderId) =>async (dispatch) =>{

    dispatch({type:'GET_ORDER_BY_ID_REQUEST'});

    try{
        const response=await axios.get(`/api/orders/getorderdetailsbyid/${orderId}`,{});
        console.log(response)
        //const orders=await axios.get(`/api/orders/getallorders`);
        dispatch({type:'GET_ORDER_BY_ID_SUCCESS', payload: response.data});
    }catch(error){
        console.log(error)
        dispatch({type:'GET_ORDER_BY_ID_FAILED', payload: error});
    }
}

export const placeOrderReducer=(state={}, action)=>{

    switch(action.type){

        case 'PLACE_ORDER_REQUEST': return{
            loading: true
        }

        case 'PLACE_ORDER_SUCCESS': return{
            loading: false,
            success: true
        }
        case 'PLACE_ORDER_FALSE': return{
            loading: false,
            error: action.payload
        }

        default: return state
    }
}

export const getUserOrdersReducer=(state={orders:[]}, action)=>{
    switch(action.type)
    {
        case 'GET_USER_ORDERS_REQUEST': return{
            ...state,
            loading: true
        }
        case 'GET_USER_ORDERS_SUCCESS':return{
            orders: action.payload,
            loading: false
        }

        case 'GET_USER_ORDERS_FAILED':return{
            error: action.payload,
            loading: false
        }

        default: return state
    }
}

export const getAllOrdersReducer=(state={orders:[]}, action)=>{
    switch(action.type)
    {
        case 'GET_ALL_ORDERS_REQUEST': return{
            ...state,
            loading: true
        }
        case 'GET_ALL_ORDERS_SUCCESS':return{
            orders: action.payload,
            loading: false
        }

        case 'GET_ALL_ORDERS_FAILED':return{
            error: action.payload,
            loading: false
        }

        default: return state
    }
}

export const deliverOrderReducer=(state={}, action)=>{
    switch(action.type)
    {
        case 'DELIVER_ORDER_REQUEST': return{
            ...state,
            loading: true
        }
        case 'DELIVER_ORDER_SUCCESS':return{
            success: action.payload,
            loading: false
        }

        case 'DELIVER_ORDER_FAILED':return{
            error: action.payload,
            loading: false
        }

        default: return state
    }
}

export const getOrderByIdReducer=(state={}, action)=>{

    switch(action.type){

        case 'GET_ORDER_BY_ID_REQUEST': return{
            ...state,
            loading: true
        }
        case 'GET_ORDER_BY_ID_SUCCESS':return{
            order: action.payload,
            loading: false
        }

        case 'GET_ORDER_BY_ID_FAILED':return{
            error: action.payload,
            loading: false
        }

        default: return state



    }
}
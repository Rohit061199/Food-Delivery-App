

export const getAllPizzasReducer=(state={pizzas:[]}, action)=>{
    switch(action.type)
    {
        case 'GET_PIZZAS_REQUEST': return{
            ...state,
            loading: true
        }
        case 'GET_PIZZAS_SUCCESS':return{
            pizzas: action.payload,
            loading: false
        }

        case 'GET_PIZZAS_FAILED':return{
            error: action.payload,
            loading: false
        }

        default: return state
    }
}

export const getPizzaByIdReducer=(state={}, action)=>{
    switch(action.type)
    {
        case 'GET_PIZZA_BY_ID_REQUEST': return{
            ...state,
            loading: true
        }
        case 'GET_PIZZA_BY_ID_SUCCESS':return{
            pizza: action.payload,
            loading: false
        }

        case 'GET_PIZZA_BY_ID_FAILED':return{
            error: action.payload,
            loading: false
        }

        default: return state
    }
}

export const addPizzaReducer=(state={}, action)=>{
    switch(action.type)
    {
        case 'ADD_PIZZAS_REQUEST': return{
            ...state,
            loading: true
        }
        case 'ADD_PIZZAS_SUCCESS':return{
            success: true,
            loading: false
        }

        case 'ADD_PIZZAS_FAILED':return{
            failed: true,
            loading: false
        }

        default: return state
    }
}

export const editPizzaReducer=(state={}, action)=>{
    switch(action.type)
    {
        case 'EDIT_PIZZAS_REQUEST': return{
            ...state,
            editloading: true
        }
        case 'EDIT_PIZZAS_SUCCESS':return{
            editsuccess: true,
            editloading: false
        }

        case 'EDIT_PIZZAS_FAILED':return{
            editerror: true,
            editloading: false
        }

        default: return state
    }
}

export const deletePizzaReducer=(state={}, action)=>{
    switch(action.type)
    {
        case 'DELETE_PIZZAS_REQUEST': return{
            ...state,
            delloading: true
        }
        case 'DELETE_PIZZAS_SUCCESS':return{
            delsuccess: true,
            delloading: false
        }

        case 'DELETE_PIZZAS_FAILED':return{
            delerror: true,
            delloading: false
        }

        default: return state
    }
}
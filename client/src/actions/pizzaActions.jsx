import axios from "axios"

export const getAllPizzas = () =>async dispatch =>{

    dispatch({type:'GET_PIZZAS_REQUEST'});

    try{
        const response=await axios.get('/api/pizzas/getallpizzas');
        console.log(response)
        dispatch({type:'GET_PIZZAS_SUCCESS', payload: response.data});
    }catch(error){
        dispatch({type:'GET_PIZZAS_FAILED', payload: error});
    }

}

export const getPizzaById = (pizzaId) =>async dispatch =>{

    dispatch({type:'GET_PIZZA_BY_ID_REQUEST'});

    try{
        const response=await axios.get(`/api/pizzas/getpizzabyid/${pizzaId}`);
        console.log(response)
        dispatch({type:'GET_PIZZA_BY_ID_SUCCESS', payload: response.data});
        
    }catch(error){
        dispatch({type:'GET_PIZZA_BY_ID__FAILED', payload: error});
    }

}

export const addPizza = (pizza) =>async dispatch =>{

    dispatch({type:'ADD_PIZZAS_REQUEST'});

    try{
        const response=await axios.post('/api/pizzas/addpizza', pizza);
        console.log(response)
        dispatch({type:'ADD_PIZZAS_SUCCESS', payload: response.data});
    }catch(error){
        dispatch({type:'ADD_PIZZAS_FAILED', payload: error});
    }

}

export const editPizza = (pizzaId,updatedPizza) =>async dispatch =>{

    dispatch({type:'EDIT_PIZZAS_REQUEST'});

    try{
        const response=await axios.put(`/api/pizzas/editpizza/${pizzaId}`, updatedPizza);
        console.log(response)
        dispatch({type:'EDIT_PIZZAS_SUCCESS', payload: response.data});
        window.location.href='/admin/pizzaslist'
    }catch(error){
        dispatch({type:'EDIT_PIZZAS_FAILED', payload: error});
    }

}

export const deletePizza = (pizzaId) =>async dispatch =>{

    dispatch({type:'DELETE_PIZZAS_REQUEST'});

    try{
        const response=await axios.delete(`/api/pizzas/deletepizza/${pizzaId}`);
        alert('Pizza Deleted Successfully');
        dispatch({type:'DELETE_PIZZAS_SUCCESS', payload: response.data});
        window.location.reload();
    }catch(error){
        alert('Something went wrong');
        console.log(error)
        dispatch({type:'DELETE_PIZZAS_FAILED', payload: error});
    }

}
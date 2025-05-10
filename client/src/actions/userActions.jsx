import axios from "axios"
export const registerUser=(user)=>async dispatch=>{

    dispatch({type: 'USER_REGISTER_REQUEST'})

    try{
        console.log(user)
        const response=await axios.post('/api/users/register', user);
        console.log(response);
        dispatch({type: 'USER_REGISTER_SUCCESS'})
    }catch(error){
        dispatch({type: 'USER_REGISTER_FAILED', payload: error})
    }
}

export const loginUser=(user)=>async dispatch=>{

    dispatch({type: 'USER_LOGIN_REQUEST'})

    try{
        console.log(user)
        const response=await axios.post('/api/users/login', user);
        console.log(response);
        dispatch({type: 'USER_LOGIN_SUCCESS', payload: response.data})
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        window.location.href="/";
    }catch(error){
        dispatch({type: 'USER_LOGIN_FAILED', payload: error})
        console.log(error)
    }
}

export const logoutUser=()=>dispatch =>{

    

    alert('All Your Items in the Cart will be lost');

    localStorage.removeItem('currentUser');

    if(localStorage.getItem('cartItems')!==null){
        localStorage.removeItem('cartItems');
    }
    

    console.log(localStorage.getItem('authToken'));

    if(localStorage.getItem('authToken')!==null){
        localStorage.removeItem('authToken');
    }
    window.location.href='/login'
}

export const getAllUsers = () =>async dispatch =>{

    dispatch({type:'GET_ALL_USERS_REQUEST'});

    try{
        const response=await axios.get('/api/users/getallusers');
        console.log(response)
        dispatch({type:'GET_ALL_USERS_SUCCESS', payload: response.data});
    }catch(error){
        dispatch({type:'GET_ALL_USERS_FAILED', payload: error});
    }

}

export const deleteUser = (userId) =>async dispatch =>{

    dispatch({type:'DELETE_USERS_REQUEST'});

    try{
        const response=await axios.delete(`/api/users/deleteuser/${userId}`);
        console.log(response)
        const users=await axios.get('/api/users/getallusers');
        dispatch({type:'GET_ALL_USERS_SUCCESS', payload: users.data});
        window.location.reload();
    }catch(error){
        dispatch({type:'DELETE_USERS_FAILED', payload: error});
    }

}
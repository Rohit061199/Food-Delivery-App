export const registerUserReducer=(state={}, action)=>{

    switch(action.type){

        case 'USER_REGISTER_REQUEST': return{
            loading: true
        }

        case 'USER_REGISTER_SUCCESS': return{
            loading: false,
            success: true
        }
        case 'USER_REGISTER_FALSE': return{
            loading: false,
            error: action.payload
        }

        default: return state
    }
}

export const loginUserReducer=(state={}, action)=>{

    switch(action.type){

        case 'USER_LOGIN_REQUEST': return{
            loading: true
        }

        case 'USER_LOGIN_SUCCESS': return{
            loading: false,
            success: true,
            currentUser: action.payload
        }
        case 'USER_LOGIN_FAILED': return{
            loading: false,
            error: action.payload
        }

        default: return state
    }
}

export const getAllUserReducer=(state={users:[]}, action)=>{
    switch(action.type)
    {
        case 'GET_ALL_USERS_REQUEST': return{
            ...state,
            loading: true
        }
        case 'GET_ALL_USERS_SUCCESS':return{
            users: action.payload,
            loading: false
        }

        case 'GET_ALL_USERS_FAILED':return{
            error: action.payload,
            loading: false
        }

        default: return state
    }
}

export const deleteUserReducer=(state={}, action)=>{
    switch(action.type)
    {
        case 'DELETE_USERS_REQUEST': return{
            ...state,
            loading: true
        }
        case 'DELETE_USERS_SUCCESS':return{
            success: true,
            loading: false
        }

        case 'DELETE_USERS_FAILED':return{
            failed: true,
            loading: false
        }

        default: return state
    }
}
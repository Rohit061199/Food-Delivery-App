import { combineReducers }from 'redux';
import { createStore, applyMiddleware } from 'redux';

import  { thunk }  from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { addPizzaReducer, deletePizzaReducer, editPizzaReducer, getAllPizzasReducer, getPizzaByIdReducer } from './reducers/pizzaReducers';
import { cartReducer } from './reducers/cartReducers';
//import { useReducer } from 'react';
import { getAllUserReducer, loginUserReducer, registerUserReducer } from './reducers/userReducer';
import { getAllOrdersReducer, getOrderByIdReducer, getUserOrdersReducer, placeOrderReducer } from './reducers/orderReducer';

const finalReducer=combineReducers({

    getAllPizzasReducer,
    cartReducer,
    registerUserReducer,
    loginUserReducer,
    placeOrderReducer,
    getUserOrdersReducer,
    addPizzaReducer,
    getPizzaByIdReducer,
    editPizzaReducer,
    deletePizzaReducer,
    getAllOrdersReducer,
    getAllUserReducer,
    getOrderByIdReducer
});

const cartItems=localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):[]

const currentUser=localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')): null

const initialState={

    cartReducer:{
        cartItems: cartItems
    },
    loginUserReducer:{
        currentUser: currentUser
    }
}

const middleware=[thunk]
const store= createStore(finalReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
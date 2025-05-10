import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pizza from "../components/Pizza";
import { deletePizza, getAllPizzas } from "../actions/pizzaActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { Link } from "react-router-dom";

const PizzasList = () => {

    const dispatch = useDispatch();
  
    const pizzaState = useSelector(state=> state.getAllPizzasReducer);
    
    
  
    const { pizzas, error, loading } = pizzaState;

      useEffect(() => {
        dispatch(getAllPizzas());
      }, [dispatch]);
  return (
    <div>
      <h2> Pizzas List </h2>
      {error && <Error errorMessage='Something Went Wrong' />}
      {loading && <Loading />}

      <table className="table table-bordered">
        <thead className="thead-dark" style={{backgroundColor: '#343a40'}}>
        <tr>
        <th>Name</th>
        <th>Prices</th>
        <th>Category</th>
        <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {pizzas && pizzas.map((pizza)=>{
          return <tr>

            <td>{pizza.name}</td>
            <td>
              Small: {pizza.prices[0]['small']}<br />
              Medium: {pizza.prices[0]['medium']}<br />
              Large: {pizza.prices[0]['large']}<br />
            </td>
            <td>{pizza.category}</td>
            <td>
              <i className="fa fa-trash  m-1" onClick={()=> dispatch(deletePizza(pizza._id))}></i>
              <Link to={`/admin/editpizza/${pizza._id}`}><i className="fa fa-edit m-1"></i></Link>
            </td>
          </tr>
        })}
        </tbody>
        
      </table>
      
    </div>
  )
}

export default PizzasList

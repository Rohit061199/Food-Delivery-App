import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pizza from "../components/Pizza";
import { getAllPizzas } from "../actions/pizzaActions";
import Loading from "../components/Loading";
import Error from "../components/Error";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const pizzaState = useSelector(state=> state.getAllPizzasReducer);
  
  

  const { pizzas, error, loading } = pizzaState;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);
  return (
    <div>
      <div className="row justify-content-center">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error errorMessage={"Something went wrong"} />
        ) : (
            pizzas.map((pizza) => {
              return (
                <div key={pizza._id} className="col-md-3 m-3">
                  <div>
                    <Pizza pizza={pizza} />
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default HomeScreen;

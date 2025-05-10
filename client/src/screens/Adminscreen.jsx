import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Routes, Route, Link } from 'react-router-dom';
import UsersList from "./UsersList";
import PizzasList from "./PizzasList";
import AddPizza from "./AddPizza";
import OrdersList from "./OrdersList";
import EditPizza from "./EditPizza";


const Adminscreen = () => {
  const dispatch = useDispatch();
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  useEffect(() => {
    console.log(currentUser.isAdmin);
    if (!currentUser.isAdmin) {
      window.location.href = "/";
    }
  });
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 style={{ fontSize: "35px" }}> Admin Panel </h2>
          <ul className="adminfunctions">
          <li><Link to="/admin/userslist">Users List</Link></li>
            <li><Link to="/admin/pizzaslist">Pizzas List</Link></li>
            <li><Link to="/admin/addPizza">Add New Pizza</Link></li>
            <li><Link to="/admin/orderslist">Orders List</Link></li>
            
          </ul>

          <Routes>
            <Route path="userslist" element={<UsersList />} />
            <Route path="pizzaslist" element={<PizzasList />} />
            <Route path="addPizza" element={<AddPizza />} />
            <Route path="orderslist" element={<OrdersList />} />
            <Route path="editpizza/:pizzaId" element={<EditPizza />} />
            
          </Routes>
          
        </div>
      </div>
    </div>
  );
};

export default Adminscreen;

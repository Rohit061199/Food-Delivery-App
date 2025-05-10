import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap-icons/font/bootstrap-icons.css";
import { logoutUser } from "../actions/userActions";

const Navbar = () => {

  const cartState=useSelector(state=> state.cartReducer); 
  const userState=useSelector(state=>state.loginUserReducer);
  const {currentUser}=userState;
  const dispatch=useDispatch();
  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
        <a className="navbar-brand fw-bold" href="/">
          North Texas Pizza
        </a>
       <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/*<span className="navbar-toggler-icon">*</span>*/}
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto fw-bold">

            {currentUser? (<div class="dropdown">
  <a className="dropdown-toggle nav-link" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    {currentUser.name.toUpperCase()}
  </a>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" href="/order">Orders</a>
    <a className="dropdown-item" href="#" onClick={()=> dispatch(logoutUser())}>Logout</a>
  </div>
</div>):(<li className="nav-item active">
              <a className="nav-link" href="/login">
                Login <span className="sr-only"></span>
              </a>
            </li>)}
            
            <li className="nav-item">
              <a className="nav-link" href="/cart">
                Cart <i className="bi bi-basket"></i> {/*console.log(*/cartState.cartItems.length/*)*/}
              </a>
              
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userActions";
import Loading from "../components/Loading";
import Success from "../components/Success";
import Error from "../components/Error";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword]=useState("")
  const [phonenumber, setPhonenumber] = useState("");
  const dispatch=useDispatch();
  const registerState=useSelector(state=>state.registerUserReducer)
  const {error, loading, success}= registerState;



  function register(){
    if(password!==confirmPassword){
        alert("Passwords don't match")
    }
    else{
        const user={
            name: name,
            email: email,
            password: password,
            phoneNumber: phonenumber
        }
        console.log(user);
        dispatch(registerUser(user));

    }

    window.location.href="/login"
  }
  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 shadow-lg p-3 mb-5 bg-white rounded">
          { loading && (<Loading/>)}
          {success && (<Success successMessage={"User Registration Successful!"}/>)}
          {error && (<Error errorMessage={"Failed to Load."}/>)}
          <h2 className="m-2" style={{ fontSize: "35px" }}>
            {" "}
            Register{" "}
          </h2>
          <div>
            <input required type="text" placeholder="name" className="form-control" value={name} onChange={(e)=> setName(e.target.value)}/>
          </div>
          <div>
            <input required type="text" placeholder="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)} />
          </div>
          <div>
            <input
              type="text"
              placeholder="password"
              className="form-control"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              required
              placeholder="confirm password"
              className="form-control"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              required
              placeholder="phone number"
              className="form-control"
              value={phonenumber}
              onChange={(e)=>setPhonenumber(e.target.value)}
            />
          </div>
          <div>
            <button onClick={register} className="btn m-1 mt-5">REGISTER</button>
            
          </div>
          <div>
          <a href="/login">Already Have An Account? Login Here! </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

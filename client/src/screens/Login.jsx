import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
//import { URLSearchParams } from 'url';
import axios from 'axios';

const Login = () => {

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch();
  
  const loginState=useSelector(state=> state.loginUserReducer);
  const {loading, success, error}=loginState;

  /*useEffect(()=>{

    const params=new URLSearchParams(window.location.search);
    const code=params.get("code");

    if(localStorage.getItem('currentUser')){
      window.location.href="/"
    }

    else if(code){
      axios.get(`http://localhost:5000/auth/google/callback?code=${code}`).then((res)=>{

        console.log("OAuth Response: ", res.data);
        
      }).catch((err)=>{
        console.log("OAuth err: ", err);
      })
    }

  },[])*/

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token"); // Get token from URL
  
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    } else if (token) {
      localStorage.setItem("authToken", token); // Store token
  
      axios
        .get("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("User Info: ", res.data);
          localStorage.setItem("currentUser", JSON.stringify(res.data));
          window.location.href = "/";
        })
        .catch((err) => {
          console.log("OAuth err: ", err);
        });
    }
  }, []);
  

  function hitOIDC(){

  }

    function login(){

        if(password ==="" && email===""){
            alert("Email & Password are mandatory!")
        }
        else{
            const user={
                email: email,
                password: password
            }

            console.log(user);
            dispatch(loginUser(user));
            
        }

    }
    return (
      <div>
      <div className="row justify-content-center mt-5 ">
        <div className="col-md-5 mt-5 shadow-lg p-3 mb-5 bg-white rounded">
          {loading && (<Loading />)}
          {error && (<Error errorMessage={"Invalid Credentials!"} />)}
          <h2 className="m-2" style={{ fontSize: "35px" }}>
            {" "}
            Login{" "}
          </h2>

          <p>Want to sign in another way?</p>
          <i className="bi bi-google m-2 oauth-action" onClick={() => window.location.href = "http://localhost:5000/auth/google/login"}></i>
          <i className="bi bi-github m-2 oauth-action" onClick={() => window.location.href = "http://localhost:5000/auth/google/login"}></i>
          <i className="bi bi-linkedin m-2 oauth-action" onClick={() => window.location.href = "http://localhost:5000/auth/google/login"}></i>
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
            <button onClick={login} className="btn m-1 mt-5">LOGIN</button>
          </div>
          <div>
            <a href='/register'>Don't Have an Account? Register Here!</a>
          </div>
        </div>
      </div>
    </div>
    )
    
}

export default Login

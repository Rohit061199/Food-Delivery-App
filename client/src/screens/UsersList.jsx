import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { deleteUser, getAllUsers } from '../actions/userActions';

const UsersList = () => {

  const dispatch=useDispatch();
  const alluserstate=useSelector(state=>state.getAllUserReducer);
  const {loading, users, error}= alluserstate;

  useEffect(()=>{

    dispatch(getAllUsers())
  }, [dispatch])
  return (
    <div>
      <h1> Users List </h1>
      {error && <Error errorMessage='Something Went Wrong' />}
      {loading && <Loading />}

      <table className="table table-striped table-bordered">
        <thead className="thead-dark" style={{backgroundColor: '#343a40'}}>
        <tr>
        <th>User ID</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Date Onboarded</th>
        <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {users && users.map((user)=>{
          return <tr>

            <td>{user._id}</td>
            <td>
              {user.email}
            </td>
            
            <td>
              {user.phoneNumber}
            </td>
            <td>
              {user.createdAt.substring(0,10)}
            </td>
            <td><i className="fa fa-trash  m-1" onClick={()=> {dispatch(deleteUser(user._id))}}></i></td>
          </tr>
        })}
        </tbody>
        
      </table>
      
    </div>
  )
}

export default UsersList;

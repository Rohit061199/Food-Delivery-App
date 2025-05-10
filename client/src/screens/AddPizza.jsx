import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-router-dom'
import { addPizza } from '../actions/pizzaActions';
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from '../components/Success';

const AddPizza = () => {

  const [name, setName]=useState();
  const [smallPrice, setSmallPrice]=useState();
  const [mediumPrice, setMediumPrice]=useState();
  const [largePrice, setLargePrice]=useState();
  const [imageURL, setImageURL]=useState();
  const [description, setDescription]=useState();
  const [category, setCategory]=useState();

  const dispatch=useDispatch();
  const addpizzastate=useSelector(state=>state.addPizzaReducer);

  const { loading, error, success}=addpizzastate;

  function formHandler(e){

    e.preventDefault();

    const pizza={
      name,
      image: imageURL,
      prices:{
        small: smallPrice,
        medium: mediumPrice,
        large: largePrice
      },
      description,
      category
    }

    console.log(pizza);
    dispatch(addPizza(pizza));

  }
  return (
    <div>
      
      <div>
        <h1> Add Pizza </h1>
        {loading && <Loading />}
        {error && <Error errorMessage='Something Went Wrong' />}
        {success && <Success successMessage='Pizza Added Successfully!' />}
        <form onSubmit={formHandler}>
          <input className='form-control' type='text' placeholder='name' value={name} onChange={(e)=>{setName(e.target.value)}} />
          <input className='form-control' type='text' placeholder='small varient price' value={smallPrice} onChange={(e)=>{setSmallPrice(e.target.value)}} />
          <input className='form-control' type='text' placeholder='medium varient price' value={mediumPrice} onChange={(e)=>{setMediumPrice(e.target.value)}} />
          <input className='form-control' type='text' placeholder='large varient price' value={largePrice} onChange={(e)=>{setLargePrice(e.target.value)}} />
          <input className='form-control' type='text' placeholder='image url' value={imageURL} onChange={(e)=>{setImageURL(e.target.value)}} />
          <input className='form-control' type='text' placeholder='category' value={category} onChange={(e)=>{setCategory(e.target.value)}} />
          <input className='form-control' type='text' placeholder='description' value={description} onChange={(e)=>{setDescription(e.target.value)}} />

          <button className='btn m-2' type='submit'> Add Pizza </button>
        </form>
      </div>
    </div>
  )
}

export default AddPizza

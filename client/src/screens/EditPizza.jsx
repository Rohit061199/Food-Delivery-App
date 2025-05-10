import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addPizza, editPizza, getPizzaById } from '../actions/pizzaActions';
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from '../components/Success';

const EditPizza = () => {



    const { pizzaId }=useParams();

     const [name, setName]=useState();
      const [smallPrice, setSmallPrice]=useState();
      const [mediumPrice, setMediumPrice]=useState();
      const [largePrice, setLargePrice]=useState();
      const [imageURL, setImageURL]=useState();
      const [description, setDescription]=useState();
      const [category, setCategory]=useState();

    const dispatch=useDispatch();
    const getpizzabyidstate=useSelector(state=>state.getPizzaByIdReducer);
    const editpizzabyidstate=useSelector(state=>state.editPizzaReducer);

    const {loading, pizza, error}=getpizzabyidstate;
    const {editloading,editsuccess, editerror}=editpizzabyidstate;





    function formHandler(e){
    
        e.preventDefault();
    
        const updatedPizza={
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
    
        console.log(updatedPizza);
        dispatch(editPizza(pizza._id, updatedPizza));
    
      };

    useEffect(()=>{

        if(pizza && pizza._id===pizzaId){
            setName(pizza.name);
            setCategory(pizza.category);
            setDescription(pizza.description);
            setSmallPrice(pizza.prices[0].small);
            setMediumPrice(pizza.prices[0].medium);
            setLargePrice(pizza.prices[0].large);
            setImageURL(pizza.image)
        }
        else{
        dispatch(getPizzaById(pizzaId));
        }

    }, [pizza, dispatch]);

    
  return (
    <div>
      <h1> Edit Pizza </h1>
      <div>
        
        {loading && <Loading />}
        {error && <Error errorMessage='Something Went Wrong' />}
        {editsuccess && <Success successMessage='Successully Updated the Pizza' />}
        {editloading && <Loading />}
        {console.log(pizza)}
        <form onSubmit={formHandler}>
          <input className='form-control' type='text' placeholder='name' value={name} onChange={(e)=>{setName(e.target.value)}} />
          <input className='form-control' type='text' placeholder='small varient price' value={smallPrice} onChange={(e)=>{setSmallPrice(e.target.value)}} />
          <input className='form-control' type='text' placeholder='medium varient price' value={mediumPrice} onChange={(e)=>{setMediumPrice(e.target.value)}} />
          <input className='form-control' type='text' placeholder='large varient price' value={largePrice} onChange={(e)=>{setLargePrice(e.target.value)}} />
          <input className='form-control' type='text' placeholder='image url' value={imageURL} onChange={(e)=>{setImageURL(e.target.value)}} />
          <input className='form-control' type='text' placeholder='category' value={category} onChange={(e)=>{setCategory(e.target.value)}} />
          <input className='form-control' type='text' placeholder='description' value={description} onChange={(e)=>{setDescription(e.target.value)}} />

          <button className='btn m-2' type='submit'> Edit Pizza </button>
        </form>
      </div>
    </div>
  )
}

export default EditPizza

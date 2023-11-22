import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader.jsx';
import Input from './../../shared/Input.jsx';
import { validationUserData } from '../../validation/uservalidation.js';
import './Create.css'

export default function Create() {

  const navigate = useNavigate();
  let [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  })
  let [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  let [errorBack, setErrorBack] = useState(' ');
  let [loader, setLoader] = useState(false);
  const changeData = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user, [name]: value
    })
  }
  const sendData = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (Object.keys(validationUserData(user)).length > 0) {
      setErrors(validationUserData(user));
    }
    else {

      try {
        const { data } = await axios.post("https://crud-users-gold.vercel.app/users/", user);
        if (data.message == 'success') {
          toast.success("user added successfuly")
          navigate('/user/index')
          setLoader(false);
        }
      } catch (error) {
      
        setErrorBack(error.response.data.message);
        setErrorBack([]);
        setLoader(false);
      }
    }
  }
  if (loader) {
    return (
      <Loader />
    )
  }
  return (
   
     
        <div className="col py-3 sec  ">
          {errorBack && <p className='text-danger text' >{errorBack}</p>}

          <div className="container  ">
            <h2 className='text text-center '>Create Account</h2>
          <form key={user._id} className="row g-3  mt-4 border-rounded" onSubmit={sendData}>
            <Input  errors={errors}  id={'username'}   title={'user name'} type={'text'} name={'name'} changeData={changeData} />
            <Input errors={errors} id={'email'}   title={'user email'} type={'email'} name={'email'} changeData={changeData} />
            <Input errors={errors} id={'password'}   title={'user password'}
              type={'password'} name={'password'} changeData={changeData} />
            <div className="mb-3">
              <input type='submit' className='form-control mt-3 d' value='Add User' />
            </div>
          </form>
          </div>

        </div>
      
    
  )
}
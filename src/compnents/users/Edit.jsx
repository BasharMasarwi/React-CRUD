import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validationUserData } from '../../validation/uservalidation.js';
import Input from '../../shared/Input.jsx';
import Loader from './Loader.jsx';
import { useParams } from 'react-router-dom'



export default function Edit() {
    const navigate = useNavigate();
    let [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    });


    let [users, setUsers] = useState({})

    const { id } = useParams('id');
    const getUser = async () => {
        const { data } = await axios.get(`https://crud-users-gold.vercel.app/users/${id}`);
        setUsers(data.user);
    }

    useEffect(() => {
        getUser();
    }, [])

    let [loader, setLoader] = useState(false);

    let [errorBack, setErrorBack] = useState('');

    const changeData = (e) => {
        const { name, value } = e.target;
        setUsers({
            ...users,
            [name]: value
        })
    }

    const sendData = async (e) => {
        e.preventDefault();
        if (Object.keys(validationUserData(users)).length > 0) {
            setErrors(validationUserData(users));
        } else {
            try {
                setLoader(true);
                const { data } = await axios.put(`https://crud-users-gold.vercel.app/users/${id}`, users);
                if (data.message == 'success') {
                    toast.success('user updated successfully');
                    navigate('/user/index');
                    setLoader(false);
                }
            } catch (error) {
                setErrorBack(error.response.data.message);
                setErrors([]);
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
        <div className="container-fluid">
            <div className="row flex-nowrap">

                <div className="col py-3">

                    {errorBack && <p className='text-danger'>{errorBack}</p>}
                    <form key={users._id} onSubmit={sendData}>

                        <Input id={'username'} errors={errors} title={'user name'} value={users.name} type={'text'} name={'name'} changeData={changeData} />
                        <Input id={'email'} errors={errors} title={'user email'} value={users.email} type={'email'} name={'email'} changeData={changeData} />
                        <Input id={'password'} errors={errors} title={'user password'} value={users.password} type={'password'} name={'password'} changeData={changeData} />
                        <input type="submit" className='form-control' value='update User' />

                    </form>
                </div>
            </div>
        </div>
    )
}
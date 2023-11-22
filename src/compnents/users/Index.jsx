import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';

export default function Index() {
    let [loader, setLoader] = useState(false);
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        const { data } = await axios.get("https://crud-users-gold.vercel.app/users");
        setUsers(data.users);
        setLoader(false);
    }
    const deleteUser = async (id) => {
        setLoader(true);
        const { data } = await axios.delete(`https://crud-users-gold.vercel.app/users/${id}`);
        if (data.message == 'success') {
            toast.success("user deleted successfuly");
            setLoader(false);
            getUsers();
        }
    }



    useEffect(() => {
        getUsers();
    }, [])
    if (loader) {
        return <Loader />
    }
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                
                <div className="col py-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">name</th>
                                <th scope="col">email</th>
                                <th scope="col">password</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        {users.length > 0 ? users.map((user, index) => {
                            return (
                                <React.Fragment key={user._id}>
                                    <tr>

                                        <td>{index}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td className='btn btn-danger' onClick={() => deleteUser(user._id)}>delete</td>
                                        <td className='btn btn-info'><Link to={`/user/${user._id}`}>details</Link></td>
                                        <td className='btn btn-warning' onClick={() => getUsers(user._id) }>
                                            <Link to={`/user/edit/${user._id}`}> edit </Link>
                                        </td>

                                    </tr>
                                   
                                </React.Fragment>
                                
                            )
                            
                        }) : <h2>no user data</h2>}
                        <tbody>
                        <button className='btn d-flex justify-content-center  text-center text-decoration-none' ><Link to={`/user/create`}> Add User</Link></button>

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}
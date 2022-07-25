import React, { useState } from 'react'
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const UsersTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {

        getUsers();

    }, [])

    const getUsers = async () => {
        const data = await axios.get("http://localhost:3000/user/all");
        setUsers(data.data);
        console.log(data.data);
    };



    return (
        <div className='mt-5'><h3>Users</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return (<tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default UsersTable
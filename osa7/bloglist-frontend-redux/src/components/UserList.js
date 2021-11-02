import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'

const UserList = () => {

    const [users, setUsers] = useState()

    useEffect(() => {
        userService.getUsers()
            .then(res => {
                setUsers(res)
            })
    }, [])


    if (!users) {
        return (
            <div>
                loading...
            </div>
        )
    }

    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th style={{ float: 'left' }}>Name</th>
                        <th>blogs created</th>
                    </tr>
                    {users.map(usr => {
                        return (
                            <tr key={usr.id}>
                                <td><Link to={`/users/${usr.id}`}>{usr.name}</Link></td>
                                <td>{usr.blogs.length}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )

}

export default UserList

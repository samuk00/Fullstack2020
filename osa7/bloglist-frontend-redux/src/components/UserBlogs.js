import React from 'react'
import { useParams } from 'react-router-dom'

const UserBlogs = ({ blogs }) => {

    
    const { id } = useParams()

    const userBlogs = blogs.filter(blog => blog.user === id)

    if (userBlogs.length < 1) {
        return (
            <div>
                No blogs..
            </div>
        )
    }

    return (
        <div>
            <h3>Added blogs</h3>
            <ul>
                {userBlogs.map(blg => <li key={blg.id}>{blg.title}</li>)}
            </ul>
        </div>
    )
}



export default UserBlogs

import React from 'react'
import { useParams } from 'react-router-dom'
import Blog from './Blog'
import { ListGroup } from 'react-bootstrap'


const BlogList = ({ user, blogs, updateBlog, removeBlog }) => {

    const { id } = useParams()

    const singleBlog = blogs.find(blg => blg.id === id)

    if (!id) {
        return (
            <ListGroup id='blog-list' style={{ listStyleType: 'none', paddingTop: '10px' }}>
                {blogs.map((blog, index) =>
                    <ListGroup.Item key={blog.id}>
                        <Blog
                            key={index}
                            blog={blog}
                            updateBlog={updateBlog}
                            removeBlog={removeBlog}
                            userid={user.userid}
                            display="list" />
                    </ListGroup.Item>
                )}
            </ListGroup>
        )
    }

    return (
        <div>
            <Blog
                blog={singleBlog}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
                userid={user.userid}
                display="single"
            />
        </div>

    )
}

export default BlogList

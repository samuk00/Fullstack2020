import React from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const CreateBlog = ({ createBlog, blogFormRef }) => {
    return (
        <Togglable buttonlabel='create a new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
        </Togglable>
    )
}

export default CreateBlog

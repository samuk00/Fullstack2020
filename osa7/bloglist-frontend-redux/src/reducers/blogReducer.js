import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addBlog = (blog) => {
    return async dispatch => {
        try {
            const newBlog = await blogService.create(blog)
            dispatch({
                type: 'ADD_BLOG',
                data: newBlog
            })
        } catch (expection) {
            dispatch(setNotification('At least the title and the url must be filled'))
        }
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: { id }
        })
    }
}

export const likeBlog = (id, updatedBlog) => {
    return async dispatch => {
        await blogService.update(id, updatedBlog)
        dispatch({
            type: 'LIKE',
            data: { id }
        })
    }
}

export const sortBlogs = (() => {
    return {
        type: 'SORT'
    }
})

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'ADD_BLOG':
            return state.concat(action.data)
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data.id)
        case 'LIKE':
            const id = action.data.id
            const targetBlog = state.find(blog => blog.id === id)
            const changedBlog = {
                ...targetBlog,
                likes: targetBlog.likes + 1
            }
            return state.map(blog => blog.id !== id ? blog : changedBlog)
        case 'SORT':
            return state.slice().sort((a, b) => {
                return b.likes - a.likes
            })

        default:
            return state
    }
}

export default blogReducer
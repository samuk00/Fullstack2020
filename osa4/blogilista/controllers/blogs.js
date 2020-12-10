const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')

blogsRouter.get('/', async (request, response, next) => {


    try {
        const blogs = await Blog.find({})
        if (blogs) {
            response.json(blogs)
        } else {
            response.status(404).end()
        }
    } catch (expection) {
        next(expection)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    try {
        const decodedToken = jwt.verify(request.token, config.SECRET)

        const user = await User.findById(decodedToken.id)

        if (!body.likes) body.likes = 0

        const blog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes,
            user: user.id
        })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()
        response.status(200).json(blog.toJSON())
    } catch (expection) {
        next(expection)

    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id
    try {
        const decodedToken = jwt.verify(request.token, config.SECRET)
        const blog = await Blog.findById(id)
        if(blog.user.toString() === decodedToken.id.toString()){
            await Blog.findByIdAndRemove(id)
            response.status(204).end()
        } else {
            response.status(401).json({
                error: 'Cannot delete blog made by someone else'
            })
        }

    } catch (expection) {
        next(expection)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const updatedObject = request.body
    try {
        await Blog.findByIdAndUpdate(request.params.id, updatedObject, { new: true })
        response.status(204).end()
    } catch (expection) {
        next(expection)
    }
})

module.exports = blogsRouter
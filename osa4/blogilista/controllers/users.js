const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', { author: 1, title: 1})
        response.json(users)
    } catch (expection) {
        next(expection)
    }
})

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (!body.password || body.password.length < 3) {
        response.status(400).json({
            error: 'Password must be at least 3 characters'
        })
    } else {

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            password: passwordHash
        })
        try {
            const savedUser = await user.save()
            response.status(201).json(savedUser.toJSON())
        } catch (expection) {
            next(expection)
        }
    }

})

module.exports = usersRouter

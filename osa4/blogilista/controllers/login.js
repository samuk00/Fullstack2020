const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({ username: body.username })

    if (!user) {
        return response.status(401).json({
            error: 'invalid username'
        })
    } else {
        const correctPassword = await bcrypt.compare(body.password, user.password)
        if (!correctPassword) {
            return response.status(401).json({
                error: 'invalid password'
            })
        } else {
            const userForToken = {
                username: user.username,
                id: user.id
            }
            const token = jwt.sign(userForToken, config.SECRET)
            response.status(200).send({ token, username: user.username, name: user.name })

        }
    }


})

module.exports = loginRouter

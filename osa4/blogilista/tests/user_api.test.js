const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')


describe('user api tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const saltRounds = 10
        const hashPW = await bcrypt.hash('jeAHZIa', saltRounds)
        let userObj = new User(
            {
                username: 'Teppo32',
                name: 'Teppo Sulkala',
                password: hashPW
            }
        )

        await userObj.save()
    })

    test('Valid user can be added to the DB', async () => {
        const newUser = {
            username: 'Mikko34',
            name: 'Mikko Mäenpää',
            password: 'Tziaa'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
    })

    test('User with the same username cannot be added to the DB', async () => {
        const newUser = {
            username: 'Teppo32',
            name: 'Teppo Sulkala',
            password: 'JEAHS'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('expected `username` to be unique')
    })


    test('User with username length < 3 characters cannot be added to the DB', async () => {
        const newUser = {
            username: 'Ki',
            name: 'Kimmo Jeala',
            password: 'Rcokec'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('is shorter than the minimum allowed length (3).')

    })

    test('User with password length < 3 characters cannot be added to the DB', async () => {
        const newUser = {
            username: 'Kaitsu43',
            name: 'Kai Keijola',
            password: 'R'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('Password must be at least 3 characters')
    })

    test('User without username field filled cannot be added to the DB', async () => {
        const newUser = {
            name: 'Kai Keijola',
            password: 'REWwe'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('Path `username` is required')
    })

    test('User without password field filled cannot be added to the DB', async () => {
        const newUser = {
            username: 'Kaitsu43',
            name: 'Kai Keijola'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('Password must be at least 3 characters')

    })

})

afterAll(() => {
    mongoose.connection.close()
})
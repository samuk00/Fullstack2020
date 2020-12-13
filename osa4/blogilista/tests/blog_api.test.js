const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'RuokaBlogi',
        author: 'Hans Välimäki',
        url: 'asddada',
        likes: 3
    },
    {
        title: 'Pihviblogi',
        author: 'Jyrki Sukula',
        url: 'diibabadas',
        likes: 7
    }, 
    {
        title: 'Sepon blogi',
        author: 'Seppo',
        url: 'asddada',
        likes: 3
    }
]

let token = null

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObj = new Blog(initialBlogs[0])
    await blogObj.save()
    blogObj = new Blog(initialBlogs[1])
    await blogObj.save()

    // User creation
    await User.deleteMany({})
    const saltRounds = 10
    const hashPW = await bcrypt.hash('jeAHZIa', saltRounds)
    let userObj = new User(
        {
            username: 'Seppo43',
            name: 'SEpi Sulkala',
            password: hashPW
        }
    )
    await userObj.save()

    // User login
    const user = await api
        .post('/api/login')
        .send({ username: 'Seppo43', password: 'jeAHZIa' })

    token = user.body.token

    // Post Blog for username Seppo43
    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send({
            title: 'Sepon blogi',
            author: 'Seppo',
            url: 'asddada',
            likes: 3
        })
})

describe('When there is already two blogs saved in the DB', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })


    test('number of blogs is correct', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)

    })

    test('id idenfier in blogs ', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body
        blogs.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    })
})

describe('Posting operations', () => {

    test('posting new blog', async () => {
        const newBlog = {
            title: 'Viiniblogi',
            author: 'Samu',
            url: 'diibadaabva',
            likes: 1
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(200)

        const response = await api.get('/api/blogs')
        const blogs = response.body
        expect(blogs).toHaveLength(initialBlogs.length + 1)
        expect(blogs).toContainEqual(expect.objectContaining(newBlog))


    })

    test('posting new blog without token', async () => {
        const newBlog = {
            title: 'Viiniblogi',
            author: 'Samu',
            url: 'diibadaabva',
            likes: 1
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })

    test('posting new blog without likes', async () => {
        const newBlog = {
            title: 'Viiniblogi',
            author: 'Samu',
            url: 'diibadaabva'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(200)

        const response = await api.get('/api/blogs')
        const blogs = response.body
        expect(blogs).toContainEqual(expect.objectContaining({ ...newBlog, likes: 0 }))

    })

    test('posting new blog without title and url', async () => {
        const newBlog = {
            author: 'Samu',
            likes: 5
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })

})

describe('Update and remove operations', () => {

    test('Updating likes and url of specific blog', async () => {
        const updatedObject = {
            likes: 5,
            url: 'laadidaadi'
        }

        const response = await api.get('/api/blogs')
        const id = response.body[0].id

        await api
            .put(`/api/blogs/${id}`)
            .send(updatedObject)
            .expect(204)

        const response2 = await api.get('/api/blogs/')
        const blogs = response2.body
        expect(blogs).toContainEqual(expect.objectContaining(updatedObject))

    })

    test('Removing blog', async () => {

        const blogs = await api
            .get('/api/blogs')


        const blogBody = blogs.body.filter(blog => blog.title === 'Sepon blogi')
        const blogID = blogBody[0].id


        await api
            .delete(`/api/blogs/${blogID}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(2)
    })

})

afterAll(() => {
    mongoose.connection.close()
})


const blogs = [
    { title: 'Samun blogi', author: 'Samu', url: 'samu.com', likes: 3 },
    { title: 'Villen blogi', author: 'Ville', url: 'ville.com', likes: 4 },
    { title: 'Maijan blogi', author: 'Maija', url: 'maija.com', likes: 9 },
    { title: 'Kaijan blogi', author: 'Kaija', url: 'kaija.com', likes: 1 }
]

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', { username: 'samu43', password: 'kibe' })
        cy.request('POST', 'http://localhost:3003/api/users', { username: 'vilu43', password: 'kibe' })
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Log in to application')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('samu43')
            cy.get('#password').type('kibe')
            cy.get('#login-button').click()
            cy.contains('Blogs')
        })

        it('fails with correct credentials', function () {
            cy.get('#username').type('samu43')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
            cy.get('#invalidCredentials')
                .should('contain', 'Wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')

        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'samu43', password: 'kibe' })

        })

        it('A blog can be created', function () {
            cy.contains('create a new blog').click()
            cy.get('#title').type('Samun Blogi')
            cy.get('#author').type('Samu')
            cy.get('#url').type('samu.com')
            cy.get('#create-button').click()
            cy.contains('Samun Blogi Samu')
        })

        it('A blog can be liked', function () {
            cy.contains('create a new blog').click()
            cy.get('#title').type('Samun Blogi')
            cy.get('#author').type('Samu')
            cy.get('#url').type('samu.com')
            cy.get('#create-button').click()
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('likes 1')
        })

        it('A blog can be removed', function () {

            cy.contains('create a new blog').click()
            cy.get('#title').type('Samun Blogi')
            cy.get('#author').type('Samu')
            cy.get('#url').type('samu.com')
            cy.get('#create-button').click()
            cy.contains('view').click()
            cy.contains('Remove').click()
            cy.get('#blog-list').should('be.empty')
        })
    })

    describe('Blog added by another user', function () {
        beforeEach(function () {
            cy.login({ username: 'samu43', password: 'kibe' })
            cy.createBlog({ title: 'Samun blogi', author: 'Samu', url: 'samu.com' })
        })

        it('cannot be removed', function () {
            cy.login({ username: 'vilu43', password: 'kibe' })
            cy.contains('view').click()
            cy.get('#remove-button').should('not.exist')
        })
    })

    describe('Bloglist order', function () {
        beforeEach(function () {
            cy.login({ username: 'samu43', password: 'kibe' })

            cy.createBlog(blogs[0])
            cy.createBlog(blogs[1])
            cy.createBlog(blogs[2])
            cy.createBlog(blogs[3])
        })
        it('Blogs with most likes are shown first', function () {
            for (let i = 0; i < 4 ; i++) {
                cy.contains('view').click()
            }

            cy.get('#blog-list > li:nth-child(1)').should('contain', 'likes 9')
            cy.get('#blog-list > li:nth-child(2)').should('contain', 'likes 4')
            cy.get('#blog-list > li:nth-child(3)').should('contain', 'likes 3')
            cy.get('#blog-list > li:nth-child(4)').should('contain', 'likes 1')

        })
    })
})

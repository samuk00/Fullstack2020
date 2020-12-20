import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [feedbackMsg, setFeedbackMsg] = useState(null)

	const blogFormRef = useRef()

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs.sort((a, b) => b.likes - a.likes))
		)
	}, [])

	console.log(blogs)

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const loggedUser = await loginService.login({ username, password })
			window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
			blogService.setToken(loggedUser.token)
			setUser(loggedUser)

		} catch (expection) {
			setFeedbackMsg('Wrong username or password')
			setTimeout(() => {
				setFeedbackMsg(null)
			}, 5000)
		}
	}

	const createBlog = async (newBlog) => {

		try {
			blogFormRef.current.toggleVisibility()
			const response = await blogService.create(newBlog)
			setBlogs(blogs.concat(response))
			setFeedbackMsg(`a new blog ${newBlog.title} by ${newBlog.author} added`)
			setTimeout(() => {
				setFeedbackMsg(null)
			}, 5000)
		} catch (expection) {
			setFeedbackMsg('At least title and url for the blog must be filled')
			setTimeout(() => {
				setFeedbackMsg(null)
			}, 5000)
		}
	}

	const updateBlog = async (id, updatedBlog) => {
		const updatedBlogs = [...blogs]
		const targetBlog = blogs.find(blog => blog.id === id)
		targetBlog.likes = targetBlog.likes + 1
		updatedBlogs.concat(targetBlog)

		try {
			await blogService.update(id, updatedBlog)
			setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
		} catch (expection) {
			console.log('failed to update blog')
		}
	}

	const removeBlog = async (id) => {
		try {
			await blogService.remove(id)
			setBlogs(blogs.filter(blog => blog.id !== id ? blog : null))
		} catch (expection) {
			console.log('failed to remove blog')
		}
	}

	if (user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
				<Notification message={feedbackMsg} />
				<LoginForm
					username={username}
					password={password}
					setUsername={setUsername}
					setPassword={setPassword}
					handleLogin={handleLogin}
				/>
			</div>
		)
	}

	return (
		<div>
			<h2>Blogs</h2>
			<Notification message={feedbackMsg} />
			<p>{user.name} logged in <button onClick={() => window.localStorage.removeItem('loggedUser')}>Logout</button></p>
			<Togglable buttonlabel='create a new blog' ref={blogFormRef}>
				<BlogForm createBlog={createBlog} />
			</Togglable>
			<ul id='blog-list' style={{listStyleType: 'none', padding: 0}}>
				{blogs.map((blog, index) =>
					<Blog key={index} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} userid={user.userid} />
				)}
			</ul>
		</div>
	)
}

export default App
import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserList from './components/UserList'
import UserBlogs from './components/UserBlogs'
import NavigationBar from './components/NavigationBar'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, addBlog, deleteBlog, likeBlog, sortBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import CreateBlog from './components/CreateBlog'

const App = () => {

	const dispatch = useDispatch()

	const blogs = useSelector(state => state.blogs.slice().sort((a, b) => b.likes - a.likes))
	const notification = useSelector(state => state.notification)
	const user = useSelector(state => state.user)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const blogFormRef = useRef()

	useEffect(() => {
		dispatch(initBlogs())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
			blogService.setToken(user.token)
		}
	}, [dispatch])


	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const loggedUser = await loginService.login({ username, password })
			window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
			dispatch(setUser(loggedUser))
			blogService.setToken(loggedUser.token)
		} catch (expection) {
			dispatch(setNotification('Wrong username or password'))
		}
	}

	const createBlog = (newBlog) => {
		blogFormRef.current.toggleVisibility()
		dispatch(addBlog(newBlog))

	}

	const updateBlog = (id, targetBlog) => {
		dispatch(sortBlogs())
		dispatch(likeBlog(id, targetBlog))
	}

	const removeBlog = (id) => {
		dispatch(deleteBlog(id))
	}

	if (user === null) {
		return (
			<div className="container">
				<h2>Log in to application</h2>
				<Notification message={notification} />
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
		<div className="container">
			<Router>
				<NavigationBar username={user.name} />
				<Notification message={notification} />
				<Switch>
					<Route exact path='/'>
						<h2>Blogs</h2>
						<CreateBlog
							createBlog={createBlog}
							blogFormRef={blogFormRef}
						/>
						<BlogList
							user={user}
							blogs={blogs}
							removeBlog={removeBlog}
							updateBlog={updateBlog}
						/>
					</Route>
					<Route exact path='/blogs/:id'>
						<BlogList
							user={user}
							blogs={blogs}
							removeBlog={removeBlog}
							updateBlog={updateBlog}
						/>
					</Route>
					<Route exact path='/users'>
						<UserList />
					</Route>
					<Route exact path='/users/:id'>
						<UserBlogs blogs={blogs} />
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
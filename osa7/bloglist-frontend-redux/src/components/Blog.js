import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'
import { Container, Button } from 'react-bootstrap'

const Blog = ({ blog, updateBlog, removeBlog, userid, display }) => {

	const [comment, setComment] = useState('')
	const [comments, setComments] = useState([])
	const [errMsg, setErr] = useState('')

	useEffect(() => {
		if (blog) {
			blogService.getComments(blog.id)
				.then(data => {
					setComments(data)
				})
		}
	}, [blog])

	const likeBlog = (event) => {
		event.preventDefault()
		const updatedBlog = {
			user: blog.user,
			likes: blog.likes,
			author: blog.author,
			title: blog.title,
			url: blog.url
		}
		updateBlog(blog.id, updatedBlog)
	}

	const deleteBlog = (event) => {
		event.preventDefault()
		if (window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author}?`)) {
			removeBlog(blog.id)
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		blogService.addComment(blog.id, { comment: comment })
			.then(data => setComments(comments.concat(data)))
			.catch(() => {
				setErr('Comment cannot be empty')
				setTimeout(() => {
					setErr('')
				}, 3000)
			})
	}


	if (display === 'list') {
		return (
			<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
		)
	}

	if (!blog) {
		return null
	}

	return (
		<Container>
			<h4>{blog.title}</h4>
			<div>
				<div>
					<a href={blog.url}>{blog.url}</a>
				</div>
				<div />
				<div>
					{blog.likes === undefined ? 'no likes' : `likes ${blog.likes}`}
					<Button onClick={likeBlog}>like</Button>
				</div>
				<div>
					{userid === blog.user ? <Button id='remove-button' onClick={deleteBlog}>Remove</Button> : null}
				</div>
			</div>
			<h3>comments</h3>
			<form onSubmit={handleSubmit}>
				<input
					value={comment}
					onChange={({ target }) => setComment(target.value)} />
				<Button type="submit">Add comment</Button>
				<p style={{ color: 'red' }}>{errMsg}</p>
			</form>
			<ul>
				{comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
			</ul>
		</Container>
	)
}

Blog.propTypes = {
	updateBlog: PropTypes.func.isRequired,
	removeBlog: PropTypes.func.isRequired,
	userid: PropTypes.string.isRequired
}

export default Blog
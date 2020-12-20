import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DisplayButton from './DisplayButton'

const Blog = ({ blog, updateBlog, removeBlog, userid }) => {

	const [buttonText, setButtonText] = useState('view')

	const handleClick = () => {
		buttonText === 'view' ?
			setButtonText('hide')
			:
			setButtonText('view')
	}

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

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	if (buttonText === 'view') {
		return (
			<div style={blogStyle}>
				<div>
					{blog.title} {blog.author} <DisplayButton buttontext={buttonText} handleClick={handleClick} />
				</div>
			</div>
		)
	}

	const showRemoveButton = userid === blog.user ? <button id='remove-button' onClick={deleteBlog}>Remove</button> : null
	const likesToShow = blog.likes === undefined ? 'no likes' : `likes ${blog.likes}`

	return (
		<li style={blogStyle}>
			<div>
				{blog.title} {blog.author} <DisplayButton buttontext={buttonText} handleClick={handleClick} />
			</div>
			<div>
				{blog.url}
			</div>
			<div>
				{likesToShow} <button onClick={likeBlog}>like</button>
			</div>
			<div>
				{showRemoveButton}
			</div>
		</li>
	)
}

Blog.propTypes = {
	updateBlog: PropTypes.func.isRequired,
	removeBlog: PropTypes.func.isRequired,
	userid: PropTypes.string.isRequired
}

export default Blog

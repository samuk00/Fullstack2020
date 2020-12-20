import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({ title, author, url })
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<form id='form' onSubmit={addBlog}>
			<div>
				<h2>Create a new blog</h2>
				<div>
					title:
					<input
						id='title'
						type='text'
						value={title}
						name='Title'
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author:
					<input
						id='author'
						type='text'
						value={author}
						name='Author'
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url:
					<input
						id='url'
						type='text'
						value={url}
						name='Url'
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<div>
					<button id='create-button' type='submit'>Create</button>
				</div>
			</div>
		</form>
	)
}

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired
}

export default BlogForm

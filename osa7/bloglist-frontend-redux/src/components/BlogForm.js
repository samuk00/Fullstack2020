import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

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
		<Form id='form' onSubmit={addBlog}>
			<h4>Add a new blog</h4>
			<Form.Group>
				<Form.Label>title:</Form.Label>
					<Form.Control
						id='title'
						type='text'
						value={title}
						name='Title'
						onChange={({ target }) => setTitle(target.value)}
					/>

				<Form.Label>author:</Form.Label>
					<Form.Control
						id='author'
						type='text'
						value={author}
						name='Author'
						onChange={({ target }) => setAuthor(target.value)}
					/>
		
				<Form.Label>url:</Form.Label>
					<Form.Control
						id='url'
						type='text'
						value={url}
						name='Url'
						onChange={({ target }) => setUrl(target.value)}
					/>
				<Button className="mt-3" id='create-button' type='submit'>Create</Button>
			</Form.Group>
		</Form>
	)
}

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired
}

export default BlogForm

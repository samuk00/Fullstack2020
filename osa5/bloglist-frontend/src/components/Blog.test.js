import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('Blog component tests', () => {

	const blog = {
		title: 'Samun blogi',
		author: 'Samu',
		url: 'sam.copm',
		likes: 1,
	}

	const mockHandler = jest.fn()

	test('Blog component does not render url and likes', () => {

		const component = render(
			<Blog blog={blog} updateBlog={mockHandler} removeBlog={mockHandler} userid={'32131'} />
		)

		expect(component.container).toHaveTextContent('Samun blogi Samu')
		expect(component.container).not.toHaveTextContent('sam.copm 1')

	})

	test('Blog compnent renders url and title when view -button is clicked', () => {

		const component = render(
			<Blog blog={blog} updateBlog={mockHandler} removeBlog={mockHandler} userid={'32131'} />
		)
		const button = component.getByText('view')
		fireEvent.click(button)

		const urlElement = component.getByText('sam.copm')
		const likesElement = component.getByText('likes 1')
		expect(urlElement).toBeDefined()
		expect(likesElement).toBeDefined()
	})

	test('Like -button handler is called twice when button is clicked twice', () => {

		const component = render(
			<Blog blog={blog} updateBlog={mockHandler} removeBlog={mockHandler} userid={'32131'} />
		)

		const button = component.getByText('view')
		fireEvent.click(button)

		const likeButton = component.getByText('like')
		fireEvent.click(likeButton)
		fireEvent.click(likeButton)

		expect(mockHandler.mock.calls).toHaveLength(2)

	})
})

describe('Blog form tests', () => {

	const createBlog = jest.fn()

	test('Blog can be successfully created with correct data', () => {

		const component = render(
			<BlogForm createBlog={createBlog} />
		)

		const title = component.container.querySelector('#title')
		const author = component.container.querySelector('#author')
		const url = component.container.querySelector('#url')
		const form = component.container.querySelector('#form')

		fireEvent.change(title, {
			target: { value: 'Samun blogi' }
		})

		fireEvent.change(author, {
			target: { value: 'Samu' }
		})

		fireEvent.change(url, {
			target: { value: 'samu.com' }
		})

		fireEvent.submit(form)

		expect(createBlog.mock.calls).toHaveLength(1)
		expect(createBlog.mock.calls[0][0].title).toBe('Samun blogi')
		expect(createBlog.mock.calls[0][0].author).toBe('Samu')
		expect(createBlog.mock.calls[0][0].url).toBe('samu.com')
	})
})
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'


const LoginForm = ({
	username,
	password,
	setUsername,
	setPassword,
	handleLogin
}) => {

	return (
		<Form onSubmit={handleLogin}>
			<Form.Group>
				<Form.Label>username:</Form.Label>
				<Form.Control
					id='username'
					type='text'
					value={username}
					name='Username'
					onChange={({ target }) => setUsername(target.value)}
				/>
				<Form.Label>password:</Form.Label>
				<Form.Control
					id='password'
					type='password'
					value={password}
					name='Username'
					onChange={({ target }) => setPassword(target.value)}
				/>
				<Button variant='primary' id='login-button' type='submit'>Login</Button>
			</Form.Group>

		</Form>
	)
}

LoginForm.propTypes = {
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	setUsername: PropTypes.func.isRequired,
	setPassword: PropTypes.func.isRequired,
	handleLogin: PropTypes.func.isRequired

}

export default LoginForm

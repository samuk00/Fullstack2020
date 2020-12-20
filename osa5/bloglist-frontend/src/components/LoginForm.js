import React from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({
	username,
	password,
	setUsername,
	setPassword,
	handleLogin
}) => {

	return (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					id='username'
					type='text'
					value={username}
					name='Username'
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					id='password'
					type='password'
					value={password}
					name='Username'
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<div>
				<button id='login-button' type='submit'>Login</button>
			</div>
		</form>
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

import React from 'react'

const successStyle = {
	padding: '20px',
	fontSize: '20px',
	color: 'green',
	backgroundColor: 'lightgrey',
	border: '3px solid green',
	borderRadius: '10px'
}

const failureStyle = {
	padding: '20px',
	fontSize: '20px',
	color: 'red',
	backgroundColor: 'lightgrey',
	border: '3px solid red',
	borderRadius: '10px'
}

const Notification = (props) => {

	if (props.message === null) return null

	if (props.message === 'Wrong username or password') {
		return (
			<div>
				<p id='invalidCredentials' style={failureStyle}>{props.message}</p>
			</div>
		)
	}

	if (props.message.startsWith('a new blog')) {
		return (
			<div>
				<p style={successStyle}>{props.message}</p>
			</div>
		)
	}

	if (props.message.startsWith('At least')) {
		return (
			<div>
				<p style={failureStyle}>{props.message}</p>
			</div>
		)
	}
}

export default Notification

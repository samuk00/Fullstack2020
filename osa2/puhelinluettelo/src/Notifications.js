import React from 'react'

const successStyle = {
    padding: "20px",
    fontSize: "20px",
    color: "green",
    backgroundColor: "lightgrey",
    border: "3px solid green",
    borderRadius: "10px"
}

const failureStyle = {
    padding: "20px",
    fontSize: "20px",
    color: "red",
    backgroundColor: "lightgrey",
    border: "3px solid red",
    borderRadius: "10px"
}

const Notification = (props) => {
    const { message } = props

    if (message.content === '') {
        return null
    }

    if (message.type === 'success') {
        return <p style={successStyle}>{message.content}</p>
    }

    if (message.type === 'failure') {
        return <p style={failureStyle}>{message.content}</p>
    }

}

export default Notification
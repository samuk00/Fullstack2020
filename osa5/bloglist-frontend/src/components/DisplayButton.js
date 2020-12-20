import React from 'react'
import PropTypes from 'prop-types'

const DisplayButton = (props) => {
	return <button onClick={props.handleClick}>{props.buttontext}</button>
}

DisplayButton.propTypes = {
	handleClick: PropTypes.func.isRequired,
	buttontext: PropTypes.string.isRequired
}

export default DisplayButton

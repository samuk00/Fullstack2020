import React from 'react'

const Filter = (props) => {
    const { handleChange } = props
    return (
        <div>
                filter shown with <input onChange={handleChange} />
        </div>
      
    )
}

export default Filter
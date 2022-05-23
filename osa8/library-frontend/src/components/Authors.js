import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries"

const Authors = (props) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")
  const [disableBorn, setDisableBorn] = useState(true)

  const authors = props.authors

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (!props.show) {
    return null
  }

  const handleBornChange = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: parseInt(born) } })
    setBorn("")
  }

  const handleChange = (event) => {
    if (event.target.value !== "") {
      setDisableBorn(false)
      setName(event.target.value)
    } else {
      setDisableBorn(true)
    }
  }

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Set birthyear</h3>
        <div>
          <form onSubmit={handleBornChange}>
            <div>
              <select onChange={handleChange}>
                <option value="">Choose author</option>
                {authors.map((a, index) => (
                  <option key={index} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              born
              <input
                disabled={disableBorn === true ? true : false}
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Authors

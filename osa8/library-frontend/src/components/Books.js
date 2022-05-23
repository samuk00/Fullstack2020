import React from "react"

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const books = props.books
  const genres = props.genres

  let genreArr = []
  genres.forEach((book) => {
    if (!genreArr.some((el) => book.genres.includes(el))) {
      genreArr = genreArr.concat(book.genres)
    }
  })

  return (
    <div>
      <h2>books</h2>
      {props.genre ? (
        <p>
          Selected genre: <strong>{props.genre}</strong>
        </p>
      ) : (
        <p>Books from all genres</p>
      )}
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genreArr.map((genre, index) => (
        <button
          key={index}
          onClick={() => {
            props.setGenre(genre)
            props.filterBooks({ variables: { genre: genre } })
          }}
        >
          {genre}
        </button>
      ))}
      <button
        onClick={() => {
          props.setGenre(null)
          props.filterBooks({ variables: { genre: null } })
        }}
      >
        all genres
      </button>
    </div>
  )
}

export default Books

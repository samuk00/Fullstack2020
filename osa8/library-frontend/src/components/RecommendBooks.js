import React from "react"

const RecommendBooks = (props) => {
  if (!props.show) {
    return null
  }

  if (!props.user.me) {
    return <div>loading...</div>
  }
  const recommendbooks = props.books.filter((book) =>
    book.genres.includes(props.user.me.favoriteGenre)
  )

  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        <p>
          books in your favorite genre{" "}
          <strong>{props.user.me.favoriteGenre}</strong>
        </p>
      </div>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendbooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendBooks

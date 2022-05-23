import React, { useState, useEffect } from "react"
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, GET_USER } from "./queries"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import RecommendBooks from "./components/RecommendBooks"

import { useQuery, useApolloClient, useLazyQuery } from "@apollo/client"

const App = () => {
  const [page, setPage] = useState("books")
  const [token, setToken] = useState(null)
  const [genre, setGenre] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const genres = useQuery(ALL_GENRES)
  const [filterBooks, filtered] = useLazyQuery(ALL_BOOKS)
  const [getUser, user] = useLazyQuery(GET_USER)

  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem("user")
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    setPage("books")
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return <Login setToken={setToken} />
  }

  if (books.loading || authors.loading || genres.loading || user.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button
          onClick={() => {
            setPage("recommendbooks")
            getUser()
          }}
        >
          recommend
        </button>
        <button onClick={logout}>logout</button>
      </div>
      <Authors authors={authors.data.allAuthors} show={page === "authors"} />
      <Books
        books={filtered.data ? filtered.data.allBooks : books.data.allBooks}
        genres={genres.data.allBooks}
        show={page === "books"}
        genre={genre}
        setGenre={setGenre}
        filterBooks={filterBooks}
      />
      <NewBook show={page === "add"} />
      <RecommendBooks
        show={page === "recommendbooks"}
        user={user.data}
        books={books.data.allBooks}
      />
    </div>
  )
}

export default App

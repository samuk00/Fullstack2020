import { useMutation } from "@apollo/client"
import React, { useState, useEffect } from "react"
import { ALL_BOOKS, LOGIN } from "../queries"

const Login = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, result] = useMutation(LOGIN, {
    refetchQueries: [{ query: ALL_BOOKS }],
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem("user", token)
    }
  }, [result.data, props])

  const handleLogin = async (event) => {
    event.preventDefault()
    await login({ variables: { username, password } })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username :{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:{" "}
          <input
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login

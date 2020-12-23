import anecdoteService from "../services/anecdoteService"

/*const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const initialState = anecdotesAtStart.map(asObject)

const getId = () => (100000 * Math.random()).toFixed(0)
*/

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}


export const likeAnecdote = (id, updated) => {
  return async dispatch => {
    await anecdoteService.update(id, updated)
    dispatch({
      type: 'LIKE',
      data: { id }
    })
  }
}



export const sortAnecdotes = (() => {
  return {
    type: 'SORT'
  }
})


const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'LIKE':
      const id = action.data.id
      const targetAnecdote = state.find(anec => anec.id === id)
      const changedAnecdote = {
        ...targetAnecdote,
        votes: targetAnecdote.votes + 1
      }
      return state.map(anec => anec.id !== id ? anec : changedAnecdote)

    case 'ADD':
      return state.concat(action.data)

    case 'SORT':
      return state.slice().sort((a, b) => {
        return b.votes - a.votes
      })
    default:
      return state
  }
}

export default anecdoteReducer
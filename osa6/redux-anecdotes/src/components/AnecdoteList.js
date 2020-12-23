import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === null) {
            return state.anecdotes.slice().sort((a, b) => {
                return b.votes - a.votes
            })
        }
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    const vote = async (anecdote) => {
        const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
        dispatch(likeAnecdote(anecdote.id, updatedAnecdote))
        dispatch(sortAnecdotes())
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default AnecdoteList

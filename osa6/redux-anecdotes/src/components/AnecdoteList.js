import React from 'react'
import { connect } from 'react-redux'
import { likeAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = async (anecdote) => {
        const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
        props.likeAnecdote(anecdote.id, updatedAnecdote)
        props.sortAnecdotes()
        props.setNotification(`you voted '${anecdote.content}'`, 5)
    }

    return (
        <div>
            {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
    if(state.filter === null){
        return {
            anecdotes: state.anecdotes.slice().sort((a, b) => {
                return b.votes - a.votes
            }),
            filter: state.filter
        }
    }

    return {
        anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())),
        filter: state.filter
    }
}

const mapDispatchToProps = { 
    likeAnecdote,
    sortAnecdotes,
    setNotification
 }

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes

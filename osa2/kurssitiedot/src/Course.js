import React from 'react'

const Course = (props) => {
    const { course } = props
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course

// Sub components
const Header = (props) => {
    const name = props.name
    return (
        <h2>{name}</h2>
    )
}

const Content = (props) => {
    const { parts } = props
    console.log(parts)
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Total = (props) => {
    const { parts } = props

    const total = parts.reduce((sum, order) => sum + order.exercises, 0)

    return (
        <strong>total of {total} exercises</strong>
    )
}

const Part = (props) => {
    const { part } = props
    console.log(part)
    return (
        <p>{part.name} {part.exercises}</p>
    )
}
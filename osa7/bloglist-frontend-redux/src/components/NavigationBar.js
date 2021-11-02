import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Button, Container } from 'react-bootstrap'

const NavigatonBar = ({ username }) => {

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
    }
    
    return (
        <Navbar variant="light" expand="lg">
            <Container>
                <Link to="/">Blogs</Link>
                <Link to="/users">Users</Link>
                {username} logged in <Button onClick={handleLogout}>Logout</Button>
            </Container>
        </Navbar>
    )
}

export default NavigatonBar

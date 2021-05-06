import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'

function NavigationBar() {
    return (
        <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Dating Services</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Sign In</Nav.Link>
            <Nav.Link href="#pricing">Register</Nav.Link>
          </Nav>
        </Navbar>
      </>
    )
}

export default NavigationBar

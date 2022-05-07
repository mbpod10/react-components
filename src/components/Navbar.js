import React from 'react'

import "./CSS/Navbar.module.css"
import { Navbar as NavBAR } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const Navbar = () => {
  return (
    <NavBAR bg="dark" variant="dark">
      <Container>
        <NavBAR.Brand href="#home">NavBAR</NavBAR.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Container>
    </NavBAR>
  )
}

export default Navbar
import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
function navOne() {
    const data = {
        link: [
            {
                id: 1,
                title: 'Agroferm.com',
                link: '/'
            },
            {
                id: 2,
                title: 'Agroferm Pro',
                link: '/pro'
            },
            {
                id: 3,
                title: 'Agroferm Commodity',
                link: '/Commodity'
            },
            {
                title: 'Agroferm Edukan',
                link: '/edukan'
            },
        ]
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" style={{ background: '#002c3c' }}>
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {data.link.map(e => {
                                return (
                                    <Nav.Link href="#features" style={{ color: "#fff" }}>{e.title}</Nav.Link>

                                )
                            })}
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets" style={{ color: "#fff" }}>More deets</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default navOne
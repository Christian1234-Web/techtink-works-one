import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Search, Star } from 'react-feather'

function navTwo() {
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
            <Navbar collapseOnSelect expand="lg" style={{ background: '#045' }}>
                <Container>
                    <Navbar.Brand href="#home" >
                        <div className='d-flex'>
                            <div className='mt-2' style={{ width: "40px" }}>
                                <Star size={40} color='#fff' />
                            </div>
                            <div style={{ color: "#f50", fontWeight: "700", fontSize: "30px" }}>
                                AGROFERM
                            </div>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav.Link href="#deets" className='d-flex bg-white' style={{ color: "#eee", height: "40px", padding: "0px", width: "90%", borderRadius: '5px' }}>
                            <NavDropdown style={{ color: "#eee", background:"#eee" }} title="Product" className='p-0' id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                            <input className="form-control  me-2 h-100" id='navTwoInput' style={{ paddingLeft: "10px", width: "100%" }} type="search" placeholder="Search for products" aria-label="Search" />
                            <div style={{ background: "#f50", padding: "9px", borderTopRightRadius: "5px" }}>
                                <Search size={20} color='#fff' />
                            </div>
                        </Nav.Link>

                        <Nav>
                            <Nav.Link href="#deets" style={{ color: "#fff" }}>More deet</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default navTwo
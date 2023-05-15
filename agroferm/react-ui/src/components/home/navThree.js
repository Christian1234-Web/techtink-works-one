import React, { useRef, useState } from 'react'
import { Navbar, Container, Nav, NavDropdown, Overlay, Tooltip } from 'react-bootstrap'
import { AlignJustify } from 'react-feather'
function NavThree() {

    const [showOne, setShowOne] = useState(false);
    const [showTwo, setShowTwo] = useState(false);
    const [showThree, setShowThree] = useState(false);

    const targetOne = useRef(null);
    const targetTwo = useRef(null);
    const targetThree = useRef(null);


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
            <Navbar collapseOnSelect expand="lg" className='shadow' style={{ background: '#fff' }}>
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <AlignJustify size={20} />
                            <NavDropdown title="All Categories" className='' id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1"
                                    ref={targetOne} onMouseEnter={() => setShowOne(true)} onMouseLeave={() => setShowOne(false)} style={{}}
                                >
                                    Action</NavDropdown.Item>
                                <Overlay target={targetOne.current}
                                    style={{ background: "#fff" }}
                                    show={showOne} placement="right">
                                    {(props) => (
                                        <Tooltip color='red'
                                            style={{ backgroundColor: "#fff" }}


                                            onMouseEnter={() => setShowOne(true)} onMouseLeave={() => setShowOne(false)} id="overlay-example" {...props}
                                        >
                                            one
                                        </Tooltip>
                                    )}
                                </Overlay>
                                <NavDropdown.Item href="#action/3.2"
                                    ref={targetTwo} onMouseEnter={() => setShowTwo(true)} onMouseLeave={() => setShowTwo(false)} style={{}}
                                >Another action</NavDropdown.Item>
                                <Overlay target={targetTwo.current} show={showTwo} placement="right">
                                    {(props) => (
                                        <Tooltip onMouseEnter={() => setShowTwo(true)} onMouseLeave={() => setShowTwo(false)} id="overlay-example" {...props}>
                                            two
                                        </Tooltip>
                                    )}
                                </Overlay>
                                <NavDropdown.Item href="#action/3.3"
                                    ref={targetThree} onMouseEnter={() => setShowThree(true)} onMouseLeave={() => setShowThree(false)} style={{}}
                                >Something</NavDropdown.Item>
                                <Overlay target={targetThree.current} show={showThree} placement="right">
                                    {(props) => (
                                        <Tooltip onMouseEnter={() => setShowThree(true)} onMouseLeave={() => setShowThree(false)} id="overlay-example" {...props}>
                                            three
                                        </Tooltip>
                                    )}
                                </Overlay>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link href="#deets" style={{ color: "#f50" }}> Deals</Nav.Link>

                            <NavDropdown title="Services" className='' id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1" > Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2" >Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Help" className='' id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1" >  Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2" >Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3" >Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>

                            {/* {data.link.map(e => {
                                return (
                                    <Nav.Link href="#features" style={{ color: "#fff" }}>{e.title}</Nav.Link>

                                )
                            })} */}
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets" style={{ border: "1px solid #888", borderRadius: "5px", fontSize: "11px" }}>BECOME A SELLER</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    )
}

export default NavThree
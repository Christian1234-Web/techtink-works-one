import React from 'react'
import { Truck, Edit, Folder, Target } from 'react-feather'
import { Card, Row, Col } from 'react-bootstrap'
function WhyChoose() {
    const data = {
        card: [
            {
                id: 1,
                title: 'Agroferm Logistics',
                text: 'Easily compare, book and manage freight to anywhere in the world.',
                icon: <Truck size={24} />,
                link: 'LEARN MORE'
            },
            {
                id: 2,
                title: 'Private Label',
                text: 'Put your brand on quality third-party products.',
                icon: <Edit size={24} />,
                link: 'LEARN MORE'
            },
            {
                id: 3,
                title: 'Buy-back and trade-in',
                text: 'Get money for your used electronic items.',
                icon: <Folder size={24} />,
                link: 'LEARN MORE'
            },
            {
                id: 4,
                title: 'Sourcing simplified',
                text: 'Choose from 700k+ products',
                icon: <Target size={24} />,
                link: 'LEARN MORE'
            }
        ]
    }
    return (
        <>
            <section style={{ background: "#002c3c", borderRadius: "5px", paddingLeft: "40px", paddingRight: "40px", paddingTop: "20px", paddingBottom: "15px", marginBottom: "40px" }}>
                <div>
                    <h1 className='text-white fs-3 pb-2'>Why choose Agroferm?</h1>
                </div>
                <Row>
                    {data.card.map(e => {
                        return (
                            <Col lg={3} >
                                <Card className='mb-2' style={{ width: '20rem', height: "13rem" }}>
                                    <Card.Body >
                                        <Card.Title>{e.icon} {e.title}</Card.Title>
                                        <Card.Text>
                                            {e.text}
                                        </Card.Text>
                                        <br />
                                        <Card.Link href="#" style={{ color: "#034", fontWeight: "700" }}>{e.link}</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>

            </section>

        </>
    )
}

export default WhyChoose
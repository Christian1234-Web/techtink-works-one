import React, { useState } from 'react'
import { Card, Carousel, Row, Col } from 'react-bootstrap';
import IdeaImgOne from "../../assets/images/idea_one.png";
import IdeaImgTwo from "../../assets/images/idea_two.jpg";
import IdeaImgThree from "../../assets/images/ideaThree.png";
import IdeaImgFour from "../../assets/images/ideaFour.jpg";
import IdeaImgFive from "../../assets/images/ideaFive.jpg";
import IdeaImgSix from "../../assets/images/ideaSix.jpg";
import IdeaImgSeven from "../../assets/images/ideaSeven.jpg";

function DealFive() {
    const [index, setIndex] = useState(0);

    const data = {
        food: [
            {
                id: 1,
                title: 'Coco Yam Oat Drink Barista 1lt',
                img: IdeaImgOne,
                rate: '23% OFF',
                footer: '106 AED'
            },
            {
                id: 2,
                title: 'Powerful Oat Drink Barista 1lt',
                img: IdeaImgTwo,
                rate: '27% OFF',
                footer: '206 AFD'
            },
            {
                id: 3,
                title: 'Wow Oat Drink Barista 1lt',
                img: IdeaImgThree,
                rate: '17% ON',
                footer: '246 AFE'
            },
            {
                id: 4,
                title: 'Wow Oat Drink Barista 1lt',
                img: IdeaImgFour,
                rate: '17% ON',
                footer: '246 AFE'
            },
            {
                id: 5,
                title: 'Wow Oat Drink Barista 1lt',
                img: IdeaImgFive,
                rate: '17% ON',
                footer: '246 AFE'
            },
            {
                id: 6,
                title: 'Wow Oat Drink Barista 1lt',
                img: IdeaImgSix,
                rate: '17% ON',
                footer: '246 AFE'
            },
            {
                id: 7,
                title: 'Wow Oat Drink Barista 1lt',
                img: IdeaImgSeven,
                rate: '17% ON',
                footer: '246 AFE'
            },
            {
                id: 8,
                title: 'Wow Oat Drink Barista 1lt',
                img: IdeaImgOne,
                rate: '17% ON',
                footer: '246 AFE'
            }
        ]
    }

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <>

            <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
                <Carousel.Item>
                    <Row>
                        {data.food.map(e => {
                            return (
                                <Col key={e.id} lg={2} style={{ width: '11rem' }}>
                                    <Card style={{ width: '10rem' }}>
                                        <Card.Title style={{ color: 'red', padding: '5px', fontSize: '10px' }}>{e.rate}</Card.Title>
                                        <Card.Img variant="top" src={e.img} />
                                        <Card.Body>
                                            <Card.Text>
                                                {e.title}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Body>
                                            <Card.Text style={{ color: 'red' }}>
                                                {e.footer}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </Carousel.Item>

                <Carousel.Item>
                    <Row>
                        {data.food.map(e => {
                            return (
                                <Col key={e.id} lg={2} style={{ width: '11rem' }}>
                                    <Card style={{ width: '10rem' }}>
                                        <Card.Title style={{ color: 'red', padding: '5px', fontSize: '10px' }}>{e.rate}</Card.Title>
                                        <Card.Img variant="top" src={e.img} />
                                        <Card.Body>
                                            <Card.Text>
                                                {e.title}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Body>
                                            <Card.Text style={{ color: 'red' }}>
                                                {e.footer}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </Carousel.Item>

            </Carousel>

        </>
    )
}

export default DealFive
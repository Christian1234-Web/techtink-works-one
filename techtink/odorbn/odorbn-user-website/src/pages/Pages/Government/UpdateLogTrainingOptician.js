import React, { useCallback, useEffect, useState } from 'react';
import {
    Button, Card, CardBody, CardHeader, Col, Container, Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem, Row, ListGroup, ListGroupItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import { request } from '../../../services/utilities';

// Import Images

const UpdateLogTrainingOptician = ({ user, training, optician }) => {


    const [open, setOpen] = useState('1');
    const user_full_name = user?.firstName + ' ' + user?.surname
    const date = new Date();


    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    const trainingChanges = changes => {
        let each_change = changes?.map((e, i) => (
            <ListGroupItem key={i}>
                <h5 className='text-start'>{date.toDateString()} </h5>
                {e.dateOfOrientation ? <div>
                    <i className="ri-bill-line align-middle me-2"></i> You made changes to training date of Orientation
                </div> : ''
                }
                {e.schoolAttended ? <div>
                    <i className="ri-bill-line align-middle me-2"></i> You made changes to training school attended
                </div> : ''}
            </ListGroupItem>
        )
        )
        return each_change;
    }
    const opticianChanges = changes => {
        let each_change = changes?.map((e, i) => (
            <ListGroupItem key={i}>
                <h5 className='text-start'>{date.toDateString()} </h5>
                {e.emergencyAddress ? <div>
                    <i className="ri-bill-line align-middle me-2"></i> You made changes to emergency address 
                </div> : ''
                }
                {e.emergencyName ? <div>
                    <i className="ri-bill-line align-middle me-2"></i> You made changes to emergency name
                </div> : ''}
                {e.identificationNumber ? <div>
                    <i className="ri-bill-line align-middle me-2"></i> You made changes to Identification number
                </div> : ''}
                {e.meansOfIdentification ? <div>
                    <i className="ri-bill-line align-middle me-2"></i> You made changes to means of identification
                </div> : ''}

            </ListGroupItem>
        )
        )
        return each_change;
    }

    return (
        <React.Fragment>
            <div className="text-capitalize">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">{user_full_name} Update Log</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Accordion open={open} toggle={toggle} flush>

                                            {training?.changes !== null && training?.changes !== undefined ? <AccordionItem>
                                                <AccordionHeader targetId={`training#${`2`}`}> Update log for {`Training`} </AccordionHeader>
                                                <AccordionBody accordionId={`training#${`2`}`}>
                                                    <ListGroup flush>
                                                        <>{trainingChanges(training?.changes)}</>
                                                    </ListGroup>
                                                </AccordionBody>
                                            </AccordionItem> : ''}

                                            {optician?.changes !== null && optician?.changes !== undefined ? <AccordionItem>
                                                <AccordionHeader targetId={`optician#${`1`}`}> Update log for {`Optician`}</AccordionHeader>
                                                <AccordionBody accordionId={`optician#${`1`}`}>
                                                    <ListGroup flush>
                                                        <>{opticianChanges(optician?.changes)}</>
                                                    </ListGroup>
                                                </AccordionBody>
                                            </AccordionItem> : ''}


                                            {user?.changes?.map((e, i) => {
                                                return (
                                                    <AccordionItem key={i}>
                                                        <AccordionHeader targetId={`user#${i}`}> Update log for {user_full_name} </AccordionHeader>
                                                        <AccordionBody accordionId={`user#${i}`}>
                                                            <ListGroup flush>
                                                                <ListGroupItem key={i}>
                                                                    <h5 className='text-start'>{new Date(e.dateCommenced).toDateString()} </h5>
                                                                    <i className="ri-bill-line align-middle me-2"></i> {e.name}
                                                                </ListGroupItem>
                                                            </ListGroup>
                                                        </AccordionBody>
                                                    </AccordionItem>
                                                )
                                            })}
                                        </Accordion>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
export default UpdateLogTrainingOptician;

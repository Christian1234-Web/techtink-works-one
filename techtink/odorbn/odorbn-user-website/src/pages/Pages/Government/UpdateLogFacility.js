import React, { useState } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem, Row, ListGroup, ListGroupItem
} from 'reactstrap';



const UpdateLogFacility = ({ user, practices }) => {


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

    const practiceChanges = changes => {
        let each_change = changes?.map((e, i) => (
            <ListGroupItem key={i}>
                <h5 className='text-start'>{date.toDateString()} </h5>
                {e.name ? <div>
                    <i className="ri-bill-line align-middle me-2"></i> You made changes to practice name
                </div> : ''
                }
                {e.address ? <div>
                    <i className="ri-bill-line align-middle me-2"></i> You made changes to practice address
                </div> : ''}
                {e.cacRegNum ? <div>
                    <i className="ri-bill-line align-middle me-2"></i> You made changes to CAC registration number
                </div> : ''}
                {e.lga ? <div>
                    <i className="ri-bill-line align-middle me-2"></i> You made changes to Local Government Area
                </div> : ''}

                {e.mission ? <div>
                    <i className="ri-bill-line align-middle me-2"></i> You made changes to mission
                </div> : ''}

                {e.nameOfRegPractitionerInCharge ? <div>
                    <i className="ri-bill-line align-middle me-2"></i>You made changes to name of practitioner in change
                </div> : ''}

                {e.optometricRegNum ?
                    <div>
                        <i className="ri-bill-line align-middle me-2"></i> You made changes to optometrist number
                    </div> : ''}

                {e.phone ? <div>
                    <i className="ri-bill-line align-middle me-2"></i> You made changes to phone number
                </div> : ''}
                {e.qualificationOfPractitionerInCharge ? <div>
                    <i className="ri-bill-line align-middle me-2"></i> You made changes to qualification of practitioner in charge
                </div> : ''}
                {e.state ? <div>
                    <i className="ri-bill-line align-middle me-2"></i> {e.state ? 'You made changes to State of Origin' : ''}
                </div> : ''}

                {e.type ? <div>
                    <i className="ri-bill-line align-middle me-2"></i>You made changes to practice type </div> : ''}
            </ListGroupItem>
        )
        )
        return each_change;
    }

    // console.log(practices[0])
    return (
        <React.Fragment>
            <div className="">
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
                                            {practices?.map((e, i) => {
                                                return (
                                                    <AccordionItem key={i}>
                                                        <AccordionHeader targetId={`facility#${i}`}> Update log for {e.name}</AccordionHeader>
                                                        <AccordionBody accordionId={`facility#${i}`}>
                                                            <ListGroup flush>
                                                                <>{practiceChanges(e.changes)}</>
                                                            </ListGroup>
                                                        </AccordionBody>
                                                    </AccordionItem>
                                                )
                                            })}

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

export default UpdateLogFacility;

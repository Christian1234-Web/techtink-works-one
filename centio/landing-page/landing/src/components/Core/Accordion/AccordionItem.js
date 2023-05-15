import React from 'react'
import { Accordion} from "react-bootstrap";
import AccordionTrigger from './AccordionTrigger';

const AccordionItem = ({question,answer,accKey})=>{
    return(
        <div className="accordion-item">
            <h2 className="accordion-header">
                <AccordionTrigger variant="link" eventKey={accKey} className="accordion-button btn-reset text-start">
                {question}
            </AccordionTrigger></h2>
            <Accordion.Collapse eventKey={accKey} className="accordion-collapse">
                <p className="accordion-body text-dark">
                {answer}
                </p>
            </Accordion.Collapse>
        </div>
    )
}

export default AccordionItem;
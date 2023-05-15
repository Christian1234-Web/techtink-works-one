import React, { useState } from 'react';
import { Tab, Tabs } from "react-bootstrap";
import DealFive from './dealFive';
import DealFour from './dealFour';
// import { Link } from "react-router-dom";
import DealOne from './dealOne';
import DealSeven from './dealSeven';
import DealSix from './dealSix';
import DealThree from './dealThree';
import DealTwo from './dealTwo';
function Deal() {

    return (
        <div className='mt-4'>
            <section className='d-flex justify-content-between'>
                <h1 className='fs-4'>Deals</h1>
                <p>SHOW ALL</p>
            </section>
            <Tabs defaultActiveKey="dealOne" id="uncontrolled-tab-example" style={{ background: "#eee" }} className="mb-3">
                <Tab eventKey="dealOne" title="Food & Beverages">
                    <DealOne />
                </Tab>
                <Tab eventKey="dealTwo" title="Poultry Farm & Birds">
                    <DealTwo />
                </Tab>
                <Tab eventKey="dealThree" title="Chicken & Egg Products">
                    <DealThree />
                </Tab>

                <Tab eventKey="dealFour" title="Tuber Of Roots">
                    <DealFour />
                </Tab>
                <Tab eventKey="dealFive" title="Coco Yam & Yam Variety">
                    <DealFive />
                </Tab>
                <Tab eventKey="dealSix" title="Maize & Guinea Corn">
                    <DealSix />
                </Tab>
                <Tab eventKey="dealSeven" title="Fruits & Vegetables">
                    <DealSeven />
                </Tab>
            </Tabs>
        </div>
    )
}

export default Deal
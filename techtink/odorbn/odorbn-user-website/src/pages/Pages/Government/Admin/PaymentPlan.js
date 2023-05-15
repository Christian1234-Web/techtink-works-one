import React, { useCallback, useEffect, useState } from 'react'
import { Label, Col, Row, Input, Modal, ModalBody, Table, ModalHeader, Form, Button, Container, Card, CardBody, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { request } from '../../../../services/utilities';
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import Swal from 'sweetalert2';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';

import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


const PaymentPlan = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState([]);

    const toggle = () => {
        if (modal) {
            setIsEdit(false);
            clearInput();
            setModal(false);
        } else {
            setIsEdit(true);
            setModal(true);
        }
    };

    const clearInput = () => {
        setName('');
        setType('');
        setAmount('');
    }
    const createPlan = async () => {
        setLoading(true);
        const data = { name, amount, type };
        try {
            const url = `plan/create`;
            const rs = await request(url, 'POST', true, data);
            fetchPlan();
            setModal(false);
            setLoading(false);
            if (rs.success === true) {
                return MySwal.fire({
                    text: 'Plan created successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const deletePlan = async (id) => {
        if (window.confirm('Are you sure')) {
            try {
                const url = `plans/delete/${id}`;
                const rs = await request(url, 'DELETE', true);
                fetchPlan();
            } catch (err) {
                console.log(err);
            }
        }
    }
    const editPlan = i => {
        let item = plan[i];
        setName(item.name);
        setType(item.type);
        setAmount(item.amount);
        toggle()
    }


    const fetchPlan = useCallback(async (page) => {
        setLoading(true);
        const p = page || 1;
        try {
            const url = `plan`;
            const rs = await request(url, 'GET', true);
            setPlan(rs.result);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }, []);

    useEffect(() => {
        fetchPlan();
    }, [fetchPlan]);

    return (

        <div>
            <Modal id="composemodal" className="modal-lg" isOpen={modal} toggle={toggle} centered>
                <ModalHeader className="p-3 bg-light" toggle={toggle}>
                    Add plan
                </ModalHeader>

                <ModalBody>
                    <Form>
                        <Row>
                            {isEdit === true ? '' : <Col md={3}>
                                <div className="mb-3">
                                    <Label htmlFor="firstNameinput" className="form-label">Select Practice</Label>
                                    <select id="ForminputState" className="form-select" onChange={e => setType(e.target.value)} data-choices data-choices-sorting="true" >
                                        <option>Select practice type</option>
                                        <option value='facility'>Facility</option>
                                        <option value='optician'>Optician</option>
                                        <option value='training'>Supervised Ophthalmic Laboratory Experience</option>
                                        <option value='optometrist'>Optometrist</option>
                                        <option value='internship'>Internship</option>
                                        <option value='indexing'>Indexing</option>
                                    </select>
                                </div>
                            </Col>}

                            <Col md={6}>
                                <Label htmlFor="firstNameinput" className="form-label">Name</Label>

                                <Input type="text" className="form-control" value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Enter plan name" id="firstNameinput" />
                            </Col>
                            <Col md={isEdit === true ? 6 : 3}>
                                <Label htmlFor="firstNameinput" className="form-label">Amount</Label>
                                <Input type="number" className="form-control"
                                    onChange={e => setAmount(e.target.value)} value={amount}
                                    placeholder="Enter amount" id="firstNameinput" />
                            </Col>

                        </Row>
                        <Col sm={12}>
                            <hr />
                        </Col>
                    </Form>
                    <Col className='float-end'>
                        <Button color='primary' onClick={createPlan}>
                            Save
                        </Button>
                    </Col>
                </ModalBody>

            </Modal>

            <Container fluid>
                <>{loading === true ? <LoaderGrow /> : ''}</>
                <div className="page-content">
                    <div className='mt-4'>
                        <BreadCrumb title="Payment Plan" pageTitle="Admin" />

                    </div>
                    <Card>
                        <CardHeader>
                            <div className="align-items-center">
                                <h4 className="card-title mb-0 flex-grow-1">Payment Plan</h4>
                            </div>
                        </CardHeader>

                        <CardBody>
                            <div>
                                <div className='d-flex justify-content-between'>
                                    <div>

                                    </div>
                                    <div className="form-group m-0 ">
                                        <div className="input-group">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    setModal(true);
                                                }}
                                            >
                                                Add plan
                                            </button>

                                        </div>
                                    </div>
                                </div>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Monitoring</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {plan?.map((e, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{e.name}</td>
                                                    <td>{e.type}</td>
                                                    <td>{e.monitoring}</td>
                                                    <td>{e.amount}</td>
                                                    <td>
                                                        <div className="hstack  flex-wrap">
                                                            <button onClick={() => editPlan(i)} type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16"
                                                                id="Tooltip1"><i className="ri-edit-line"></i></button>
                                                            <button onClick={() => deletePlan(e.id)} type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16"
                                                                id="Tooltip1"><i className="ri-delete-bin-line"></i></button>
                                                        </div>
                                                    </td >
                                                </tr >
                                            )
                                        })}
                                    </tbody>
                                </Table>

                                <div className="align-items-center mt-2 row g-3 text-center text-sm-start">
                                    <div className="col-sm">
                                        <div className="text-muted">Available Results <span className="fw-semibold">
                                            {plan?.length}
                                        </span>
                                            {/* of <span className="fw-semibold">125</span> */}
                                            {/* Results */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Container>



        </div>
    )
}

export default PaymentPlan;
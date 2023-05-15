import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import { request } from '../../../services/utilities';

// Import Images

const ListTables = ({ user }) => {
    const [modal_list, setmodal_list] = useState(false);
    const [transactions, setTransactions] = useState([]);
    function tog_list() {
        setmodal_list(!modal_list);
    }

    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }

    const renewDate = (e) => {
        let date = new Date(e).toUTCString().split(" ");
        let newDate = `${date[0]} ${date[2]} ${date[1]} ${parseInt(date[3]) + 1}`;
        return newDate;
    }; 

    const fetchTransactions = useCallback(async () => {
        try {
            const url = `payment/user/get?userId=${user}`;
            const rs = await request(url, 'GET', true);
            setTransactions(rs.data);
        } catch (err) {
            console.log(err);
        }
    }, [user]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    return (
        <React.Fragment>
            <div className="">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Transactions</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">

                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap" id="customerTable">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th className="sort" data-sort="customer_name">Payment Id</th>
                                                        <th className="sort" data-sort="customer_name">Date</th>
                                                        <th className="sort" data-sort="email">Description</th>
                                                        <th className="sort" data-sort="phone">Next Due</th>
                                                        <th className="sort" data-sort="date">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {transactions.map(e => {
                                                        return (
                                                            <tr key={e.id}>
                                                                <td className="id"><Link to={`${e.user?.type}/invoice/${e.id}`} className="fw-medium link-primary">#{e.paymentId}</Link></td>
                                                                <td className="customer_name">{new Date(e.createdAt).toDateString()}</td>
                                                                <td className="email">registration fee</td>
                                                                <td className="phone">{renewDate(e.createdAt)}</td>
                                                                <td className="date">{e.plan?.amount}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                            <div className="noresult" style={{ display: "none" }}>
                                                <div className="text-center">
                                                    <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
                                                        colors="primary:#121331,secondary:#08a88a" style={{ width: "75px", height: "75px" }}>
                                                    </lord-icon>
                                                    <h5 className="mt-2">Sorry! No Result Found</h5>
                                                    <p className="text-muted mb-0">We've searched more than 150+ Orders We did not find any
                                                        orders for you search.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-end">
                                            <div className="pagination-wrap hstack gap-2">
                                                <Link className="page-item pagination-prev disabled" to="#">
                                                    Previous
                                                </Link>
                                                <ul className="pagination listjs-pagination mb-0"></ul>
                                                <Link className="page-item pagination-next" to="#">
                                                    Next
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>

            {/* Add Modal */}
            <Modal isOpen={modal_list} toggle={() => { tog_list(); }} centered >
                <ModalHeader className="bg-light p-3">
                    Add Customer
                    <Button type="button" onClick={() => { setmodal_list(false); }} className="btn-close" aria-label="Close" >
                    </Button>
                </ModalHeader>
                <form>
                    <ModalBody>
                        <div className="mb-3" id="modal-id" style={{ display: "none" }}>
                            <label htmlFor="id-field" className="form-label">ID</label>
                            <input type="text" id="id-field" className="form-control" placeholder="ID" readOnly />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="customername-field" className="form-label">Customer Name</label>
                            <input type="text" id="customername-field" className="form-control" placeholder="Enter Name" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email-field" className="form-label">Email</label>
                            <input type="email" id="email-field" className="form-control" placeholder="Enter Email" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone-field" className="form-label">Phone</label>
                            <input type="text" id="phone-field" className="form-control" placeholder="Enter Phone no." required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="date-field" className="form-label">Joining Date</label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                    dateFormat: "d M, Y"
                                }}
                                placeholder="Select Date"
                            />
                        </div>

                        <div>
                            <label htmlFor="status-field" className="form-label">Status</label>
                            <select className="form-control" data-trigger name="status-field" id="status-field" >
                                <option value="">Status</option>
                                <option value="Active">Active</option>
                                <option value="Block">Block</option>
                            </select>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => setmodal_list(false)}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">Add Customer</button>
                            <button type="button" className="btn btn-success" id="edit-btn">Update</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>

            {/* Remove Modal */}
            <Modal isOpen={modal_delete} toggle={() => { tog_delete(); }} className="modal fade zoomIn" id="deleteRecordModal" centered >
                <div className="modal-header">
                    <Button type="button" onClick={() => setmodal_delete(false)} className="btn-close" aria-label="Close"> </Button>
                </div>
                <ModalBody>
                    <div className="mt-2 text-center">
                        <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop"
                            colors="primary:#f7b84b,secondary:#f06548" style={{ width: "100px", height: "100px" }}></lord-icon>
                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>Are you Sure ?</h4>
                            <p className="text-muted mx-4 mb-0">Are you Sure You want to Remove this Record ?</p>
                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <button type="button" className="btn w-sm btn-light" onClick={() => setmodal_delete(false)}>Close</button>
                        <button type="button" className="btn w-sm btn-danger " id="delete-record">Yes, Delete It!</button>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

export default ListTables;

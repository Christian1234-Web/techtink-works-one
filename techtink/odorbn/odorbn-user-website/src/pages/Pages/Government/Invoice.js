import React, { useCallback, useEffect, useState } from "react";
import { CardBody, Row, Col, Card, Table, CardHeader, Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import MetaTags from 'react-meta-tags';
import { Link, useParams,useHistory } from "react-router-dom";

import logoDark from "../../../assets/images/odorbnlogowhite.png";
import logoLight from "../../../assets/images/odorbnlogo.png";
import { request } from "../../../services/utilities";
import { USER_COOKIE } from "../../../services/constants";
import { LoaderGrow } from "../../AdvanceUi/Loader/loader";
import SSRStorage from "../../../services/storage";
const storage = new SSRStorage();
 
const Invoice = () => {
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(false);
    let id = useParams();
    const history = useHistory();
    const printInvoice = () => {
        window.print();
    };

    const checkToken = async () => {
        const user = await storage.getItem(USER_COOKIE);
        if (user === null || undefined) {
            return history.push(`/signin`);
        }
    };
    setTimeout(checkToken, 5000); 

    const fetchInvoice = useCallback(async () => {
        setLoading(true);
        const url = `payment/${id.id}`;
        try {
            const rs = await request(url, 'GET', true);
            setInvoice(rs.data);
            setLoading(false);
        }
        catch (err) {
            setLoading(false);
            console.log(err);
        }
    }, [id.id]);

    useEffect(() => {
        fetchInvoice();
    }, [fetchInvoice]);

    return (
        <div className="page-content">
            <MetaTags>
                <title>Invoice Details | Odorbn</title>
            </MetaTags>
            <Container fluid>
                <>{loading === true ? <LoaderGrow /> : ''}</>
                <Row className="justify-content-center">
                    <Col xxl={9}>
                        <Card id="demo">
                            <CardHeader>
                                <Row>
                                    <div className="flex-grow-1">
                                        <img
                                            src={logoDark}
                                            className="card-logo card-logo-dark"
                                            alt="logo dark"
                                            height="100%"
                                            width='95%'
                                            style={{ objectFit: 'cover' }}

                                        />
                                        <img
                                            src={logoLight}
                                            className="card-logo card-logo-light"
                                            alt="logo light"
                                            height="100%"
                                            width='95%'
                                            style={{ objectFit: 'cover' }}
                                        />

                                    </div>
                                </Row>
                            </CardHeader>
                            <CardHeader className="border-bottom-dashed p-4">
                                <div className="d-sm-flex">
                                    <div className="flex-shrink-0 mt-sm-0 mt-3">
                                        <h6>
                                            <span className="text-muted fw-normal">
                                                User Name:
                                            </span>{" "}
                                            {invoice?.user?.firstName || '--'}  {invoice?.user?.surname || '--'}
                                        </h6>
                                        <h6>
                                            <span className="text-muted fw-normal">Email:</span>{" "}
                                            {invoice?.user?.email || '--'}
                                        </h6>

                                        <h6 className="mb-0">
                                            <span className="text-muted fw-normal">Contact No:</span>{" "}
                                            {invoice?.user?.phone || '--'}
                                        </h6>
                                        <div className="mt-sm-5 mt-4">
                                            <h6 className="text-muted text-uppercase fw-semibold">
                                                Address
                                            </h6>
                                            <p className="text-muted mb-1">
                                                {invoice?.user?.address || '--'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="p-4">
                                <Row className="g-3">
                                    <Col lg={3} xs={6}>
                                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                                            Invoice No
                                        </p>
                                        <h5 className="fs-14 mb-0">#{invoice?.paymentId}</h5>
                                    </Col>
                                    <Col lg={3} xs={6}>
                                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                                            Date
                                        </p>
                                        <h5 className="fs-14 mb-0">
                                            {new Date(invoice?.createdAt).toDateString()}
                                        </h5>
                                    </Col>
                                    <Col lg={3} xs={6}>
                                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                                            Payment Status
                                        </p>
                                        <span className="badge badge-soft-success fs-11">Paid</span>
                                    </Col>
                                    <Col lg={3} xs={6}>
                                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                                            Total Amount
                                        </p>
                                        <h5 className="fs-14 mb-0">₦{new Intl.NumberFormat().format(invoice?.plan?.amount)}.00</h5>
                                    </Col>
                                </Row>
                            </CardBody>
                            {/* <CardBody className="p-4 border-top border-top-dashed">
                                <Row className="g-3">
                                    <Col sm={6}>
                                        <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                            Billing Address
                                        </h6>
                                        <p className="fw-semibold mb-2">David Nichols</p>
                                        <p className="text-muted mb-1">305 S San Gabriel Blvd</p>
                                        <p className="text-muted mb-1">
                                            California, United States - 91776
                                        </p>
                                        <p className="text-muted mb-1">Phone: +(123) 456-7890</p>
                                        <p className="text-muted mb-0">Tax: 12-3456789</p>
                                    </Col>
                                    <Col sm={6}>
                                        <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                            Shipping Address
                                        </h6>
                                        <p className="fw-semibold mb-2">Donald Palmer</p>
                                        <p className="text-muted mb-1">345 Elm Ave, Solvang</p>
                                        <p className="text-muted mb-1">
                                            California, United States - 91776
                                        </p>
                                        <p className="text-muted mb-0">Phone: +(234) 987-01234</p>
                                    </Col>
                                </Row>
                            </CardBody> */}
                            <br /><br />

                            <CardBody className="p-4">
                                <div className="table-responsive">
                                    <Table className="table-borderless  table-nowrap align-middle mb-0">
                                        <thead>
                                            <tr className="table-active">
                                                <th scope="col" style={{ width: "50px" }}>
                                                    #
                                                </th>
                                                <th scope="col text-capitalize">{invoice?.plan?.type} Details</th>
                                                <th scope="col">Description</th>
                                                <th scope="col" className="text-end">
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">01</th>
                                                <td className="text-start">
                                                    <span className="fw-semibold">
                                                        {invoice?.plan?.name}
                                                    </span>
                                                    <p className="text-muted mb-0">
                                                        {invoice?.plan?.name}
                                                    </p>
                                                </td>
                                                <td>{invoice?.plan?.description}</td>
                                                <td className="text-end">
                                                    ₦{new Intl.NumberFormat().format(invoice?.plan?.amount)}.00
                                                </td>
                                            </tr>
                                            <br /><br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <tr className="border-top border-top-dashed">
                                                <td colSpan="3"></td>
                                                <td colSpan="2" className="fw-semibold p-0">
                                                    <Table className="table-borderless text-start table-nowrap align-middle mb-0">
                                                        <tbody>
                                                            <tr>
                                                                <td>Sub Total</td>
                                                                <td className="text-end">  ₦{new Intl.NumberFormat().format(invoice?.plan?.amount)}.00</td>
                                                            </tr>
                                                            <tr className="d-none">
                                                                <td>Penalty</td>
                                                                ₦{new Intl.NumberFormat().format(invoice?.plan?.penalty)}.00
                                                            </tr>
                                                            <tr className="border-top border-top-dashed">
                                                                <th scope="row">Total Amount</th>
                                                                <td className="text-end">  ₦{new Intl.NumberFormat().format(invoice?.plan?.amount)}.00</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="mt-3 d-none">
                                    <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                        Payment Details:
                                    </h6>
                                    <p className="text-muted mb-1">
                                        Payment Method:{" "}
                                        <span className="fw-semibold">Mastercard</span>
                                    </p>
                                    <p className="text-muted mb-1">
                                        Card Holder:{" "}
                                        <span className="fw-semibold">David Nichols</span>
                                    </p>
                                    <p className="text-muted mb-1">
                                        Card Number:{" "}
                                        <span className="fw-semibold">xxx xxxx xxxx 1234</span>
                                    </p>
                                    <p className="text-muted">
                                        Total Amount: <span className="fw-semibold">$415.96</span>
                                    </p>
                                </div>
                                <div className="mt-4 d-none">
                                    <div className="alert alert-info">
                                        <p className="mb-0">
                                            <span className="fw-semibold">NOTES:</span> All accounts
                                            are to be paid within 7 days from receipt of invoice. To
                                            be paid by cheque or credit card or direct payment online.
                                            If account is not paid within 7 days the credits details
                                            supplied as confirmation of work undertaken will be
                                            charged the agreed quoted fee noted above.
                                        </p>
                                    </div>
                                </div>
                                <div className="hstack gap-2 justify-content-between d-print-none mt-4">
                                    <Link to={`/${invoice?.user?.type}-dashboard`} className="btn btn-danger">
                                        Go Back
                                    </Link>
                                    <Link
                                        to="#"
                                        onClick={printInvoice}
                                        className="btn btn-success"
                                    >
                                        <i className="ri-printer-line align-bottom me-1"></i> Print
                                    </Link>

                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Invoice;

import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { request } from '../../../../services/utilities';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';

import { USER_COOKIE } from '../../../../services/constants';
import SSRStorage from '../../../../services/storage';
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import { Store } from '../../../../services/store';
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
import { UncontrolledTooltip, Table, Badge, Container } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const storage = new SSRStorage();
const MySwal = withReactContent(Swal);

// import {Loa}

function Facility() {

    const store = useContext(Store)
    const [loading, setLoading] = useState(false);

    const [comment, setComment] = useState(' ');
    const [idx, setIdx] = useState(null);
    const [adminType, setAdminType] = store.adminType;
    const [tab_one, setTab_one] = useState('');
    const [tab_two, setTab_two] = useState('');
    const [tab_three, setTab_three] = useState('');
    const isRenderRef = useRef();
    const [practices, setPractices] = useState([]);
    const [modal_list, setmodal_list] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [meta, setMeta] = useState(null);
    const [count, setCount] = useState(1);




    const handleError = () => {
        return MySwal.fire({
            text: ' Something went wrong!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })
    }


    const enableEdit = async (id) => {
        const data = { type: 'practice', id };
        try {
            const url = `tickets/edit/enable`;
            const rs = await request(url, 'POST', true, data);
            if (rs.success === true) {
                return MySwal.fire({
                    text: 'Edit enable sucessfully',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            fetchPractices();
        } catch (err) {
            console.log(err);
        }
    }
    const deleteFacility = async (id) => {
        const user = await storage.getItem(USER_COOKIE);
        if (window.confirm('Are you sure')) {
            try {

                const url = `practices/delete/${id}?senderid=${user.id}`;
                const rs = await request(url, 'DELETE', true);
                fetchPractices();
            } catch (err) {
                console.log(err);
            }
        }
    }
    const fetchPractices = useCallback(async (page) => {
        const p = page || 1;
        const url = `practices?limit=10&page=${p}`;
        try {
            setLoading(true);
            const rs = await request(url, 'GET', true);
            setPractices(rs.data);
            // console.log(rs.data  )
            setMeta(rs.paging);
            setCount(Math.ceil(rs.paging.total / rowsPerPage));
            setLoading(false);
        } catch (err) {
            setLoading(false);
            if (err.message === 'No record') {
                setPractices([]);
            } else {
                handleError();
            }
            console.log(err);

        }
    }, [rowsPerPage]);

    const searchPractice = async e => {
        const data = { payload: e }
        try {
            const url = `search/practices`;
            const rs = await request(url, 'POST', true, data);
            console.log(rs.data)
            setPractices(rs.data.practice);

        } catch (err) {
            if (err.message === 'No record') {
                return MySwal.fire({
                    text: `${err.message}`,
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            handleError();
            console.log(err);
        }
    }
    useEffect(() => {
        fetchPractices();
    }, [fetchPractices]);

    const renderFacility = practices.map((e, i) => {
        if (practices.length > 0) {
            return (
                <tr key={i}>
                    <th scope="row"><Link to="#" className="fw-medium">{e.facilityNum}</Link></th>
                    <td>
                        {e.name || e.i_name}
                    </td>
                    <td>{e.address}</td>
                    <td>{e.nameOfRegPractitionerInCharge}</td>
                    <td ><Link to={`facility/registered/invoice/${e.payments ? e.payments[0]?.id : '#'}`}>
                        {e.payments ? <>#{`${e.payments[0]?.paymentId}`}</> : ''}
                    </Link>
                    </td>
                    {/* <td>{e.isApprovedByAdmin !== true ? 'Not up to date' : 'Up to date'}  </td> */}
                    <td>{e.isApprovedBySD === null ? 'Awaiting Approval' : e.isApprovedBySD === false ? 'Disapproved' : 'Approved'}</td>
                    <td>{e.isApprovedByHOD === null ? 'Awaiting Approval' : e.isApprovedByHOD === false ? 'Disapproved' : 'Approved'}</td>
                    <td>{e.isApprovedByAdmin === null ? 'Awaiting Approval' : e.isApprovedByAdmin === false ? 'Disapproved' : 'Approved'}</td>
                    <td>
                        <div className="hstack  flex-wrap">
                            <Badge color="success" style={{ cursor: 'pointer' }} onClick={() => enableEdit(e.id)}> Enable </Badge>
                            <Link to={`/admin-registered-fi/${`practice`}/${e.id}`} className="link-success btn-icon btn-sm" id="Tooltip3">
                                <i className="ri-compass-3-line fs-16"></i>
                            </Link>
                        </div>
                        <UncontrolledTooltip placement="top" target="Tooltip3">View Details  </UncontrolledTooltip>
                    </td>
                </tr >
            )
        } else {
            return (
                <div className="text-danger text-center"> No record </div>
            )
        }
    });


    const handlePagination = page => {
        fetchPractices(page.selected + 1)
        setCurrentPage(page.selected + 1)
    }
    // const count = Number((meta.total / rowsPerPage).toFixed(0))

    return (
        <>
            <Container fluid>

                <div className="page-content">
                    <div className='mt-4'>
                        <BreadCrumb title="Registered Facility" pageTitle="Admin" />

                    </div>
                    <>{loading === true ? <LoaderGrow /> : ''}</>
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">Registered Facilities</h4>
                                <div className="form-group m-0 w-50">
                                    <div className="input-group">
                                        <input type="text" width='100' className="form-control" onChange={e => searchPractice(e.target.value)}
                                            placeholder="Search by practice or user name..."
                                            aria-label="Recipient's username" />
                                        <button className="btn btn-primary" type="button"><i
                                            className="mdi mdi-magnify"></i></button>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">

                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Facility Number</th>
                                            <th scope="col">Facility Name</th>
                                            <th scope="col">Facility Address</th>
                                            <th scope="col">Optometrist In Charge</th>
                                            <th scope="col">Invoice</th>
                                            {/* <th scope="col">Status</th> */}
                                            <th scope="col">S.D Approval</th>
                                            <th scope="col">H.O.D Approval</th>
                                            <th scope="col">Admin Approval</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>{renderFacility}</tbody>
                                </Table>
                                <div>
                                    <ReactPaginate
                                        nextLabel='Next'
                                        breakLabel='...'
                                        previousLabel='Prev'
                                        pageCount={count}
                                        activeClassName='active'
                                        breakClassName='page-item'
                                        pageClassName={'page-item'}
                                        breakLinkClassName='page-link'
                                        nextLinkClassName={'page-link'}
                                        pageLinkClassName={'page-link'}
                                        nextClassName={'page-item next'}
                                        previousLinkClassName={'page-link'}
                                        previousClassName={'page-item prev'}
                                        onPageChange={page => handlePagination(page)}
                                        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                                        containerClassName={'pagination react-paginate justify-content-end p-1'}
                                    />
                                </div>
                                <div className="align-items-center mt-2 row g-3 text-center text-sm-start">
                                    <div className="col-sm">
                                        <div className="text-muted">Available Results <span className="fw-semibold">
                                            {practices.length}
                                        </span>
                                            {/* of <span className="fw-semibold">125</span> */}
                                            {/* Results */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Facility
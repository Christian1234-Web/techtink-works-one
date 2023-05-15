import React, { useCallback, useEffect, useRef, useState } from 'react'
import { request } from '../../../../services/utilities';
import { USER_COOKIE } from '../../../../services/constants';
import SSRStorage from '../../../../services/storage';
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import ReactPaginate from "react-paginate";
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { Link } from 'react-router-dom';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Badge, UncontrolledTooltip, Table, Container } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

// import {Loa}

function ApprovedTraining() {

    const [loading, setLoading] = useState(false);

    const [comment, setComment] = useState(' ');
    const [idx, setIdx] = useState(null);
    const [searchArray, setSearchArray] = useState([]);
    const isRenderSearch = useRef();
    const [tab_one, setTab_one] = useState('');
    const [tab_two, setTab_two] = useState('');
    const [tab_three, setTab_three] = useState('');

    const [trainings, setTrainings] = useState([]);

    const [training_category, setTraining_category] = useState([]);
    const isRenderCategory = useRef();
    const isRenderTraining = useRef();
    const [modal_list, setmodal_list] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [meta, setMeta] = useState(null);
    const [count, setCount] = useState(1);
    const [error, setError] = useState(1);



    const handleError = () => {
        return MySwal.fire({
            text: ' Something went wrong!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })
    }

    const enableEdit = async (id) => {
        const data = { type: 'training', id };
        try {
            const url = `tickets/edit/enable`;
            const rs = await request(url, 'POST', true, data);
            if (rs.success === true) {
                return MySwal.fire({
                    text: 'Edit enable successfully',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
   


    const fetchByCategory = useCallback(async (page) => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        let type = 'approved';
      
        const p = page || 1;
        const url = `trainings/${type}/all?limit=5&page=${p}&term=${user.type.trim()}`;

        try {
            setLoading(true);
            const rs = await request(url, 'GET', true);
            setTrainings(rs.data);
            setMeta(rs.paging);
            setCount(Math.ceil(rs.paging.total / rowsPerPage));
            setLoading(false);

        } catch (err) {
            setLoading(false);
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
    }, [rowsPerPage]);
    const searchOpticianTraining = async (e) => {
        const data = { payload: e };
        try {
            const url = `search/trainings`;
            const rs = await request(url, 'POST', true, data);
            setSearchArray(rs.data.training);
            isRenderTraining.current.style.display = 'none';
            isRenderSearch.current.style.display = '';
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
        fetchByCategory();
    }, [fetchByCategory]);


    const renderTraining = trainings.map((e, i) => {
        if (trainings.length > 0) {
            return (
                <tr key={i}>
                    <th scope="row"><Link to="#" className="fw-medium">{e.id}</Link></th>
                    <td>{e.user?.firstName} {e.user?.surname}</td>
                    <td>{new Date(e.createdAt).toDateString()}</td>
                    <td>$2,300</td>
                    <td>{e.status !== "Approved" ? <span className="ri-close-circle-line align-middle text-danger"><span className='text-dark mx-1'>{e.status}</span></span> :
                        <span className="ri-checkbox-circle-line align-middle text-success"><span className='mx-1'>{e.status}</span></span>
                    }
                    </td>
                    <td>{e.isApprovedBySD === null ? 'Awaiting Approval' : e.isApprovedBySD === false ? 'Disapproved' : 'Approved'}</td>
                    <td>{e.isApprovedByHOD === null ? 'Awaiting Approval' : e.isApprovedByHOD === false ? 'Disapproved' : 'Approved'}</td>
                    <td>{e.isApprovedByAdmin === null ? 'Awaiting Approval' : e.isApprovedByAdmin === false ? 'Disapproved' : 'Approved'}</td>
                    <td>
                        <div className="hstack  flex-wrap">
                            <Badge color="success" style={{ cursor: 'pointer' }} onClick={() => enableEdit(e.id)}> Enable </Badge>
                            <Link to={`/admin-approved-it/${`training`}/${e.id}`} className="link-success btn-icon btn-sm" id="Tooltip3"><i className="ri-compass-3-line fs-16"></i></Link>
                        </div>
                        <UncontrolledTooltip placement="top" target="Tooltip3">View Details  </UncontrolledTooltip>
                    </td>
                </tr>
            )
        } else {
            return (
                <div className="text-danger text-center"> No record </div>
            )
        }
    });
    const renderBySearch = searchArray.map((e, i) => {
        if (searchArray.length > 0) {
            return (
                <tr key={i}>
                    <th scope="row"><Link to="#" className="fw-medium">{e.id}</Link></th>
                    <td>{e.createdBy}</td>
                    <td>{new Date(e.createdAt).toDateString()}</td>
                    <td>$2,300</td>
                    <td>{e.status !== "Approved" ?
                        <span className="ri-close-circle-line align-middle text-danger"><span className='text-dark mx-1'>{e.status}</span></span> :
                        <span className="ri-checkbox-circle-line align-middle text-success"><span className='mx-1'>{e.status}</span></span>
                    }
                    </td>
                    <td>{e.isApprovedBySD === null ? 'Awaiting Approval' : e.isApprovedBySD === false ? 'Disapproved' : 'Approved'}</td>
                    <td>{e.isApprovedByHOD === null ? 'Awaiting Approval' : e.isApprovedByHOD === false ? 'Disapproved' : 'Approved'}</td>
                    <td>{e.isApprovedByAdmin === null ? 'Awaiting Approval' : e.isApprovedByAdmin === false ? 'Disapproved' : 'Approved'}</td>
                    <td>
                        <div className="hstack flex-wrap">
                            <Badge color="success" style={{ cursor: 'pointer' }} onClick={() => enableEdit(e.id)}> Enable </Badge>
                            <Link to={`/admin-approved-if/${`training`}/${e.id}`} className="link-success btn-icon btn-sm" id="Tooltip3"><i className="ri-compass-3-line fs-16"></i></Link>
                        </div>
                        <UncontrolledTooltip placement="top" target="Tooltip3">View Details  </UncontrolledTooltip>
                    </td>
                </tr>
            )
        } else {
            return (
                <div className="text-danger text-center"> No record </div>
            )
        }
    })

    const handlePagination = page => {
        fetchByCategory(page.selected + 1);
        setCurrentPage(page.selected + 1);
    }
    return (
        <>
            <Container fluid>
                <div className="page-content">
                    <>{loading === true ? <LoaderGrow /> : ''}</>
                    <div className='mt-4'>
                        <BreadCrumb title="Approved  Supervised Ophthalmic Laboratory Experience" pageTitle="Admin" />

                    </div>
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">Approved  Supervised Ophthalmic Laboratory Experience</h4>
                                <div className="form-group m-0 w-50">
                                    <div className="input-group">
                                        <input type="text" className="form-control" onChange={e => searchOpticianTraining(e.target.value)}
                                            placeholder="Search by school attended or user name..."
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
                                            <th scope="col"> ID</th>
                                            <th scope="col">Customer</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Invoice</th>
                                            <th scope="col">User Status</th>
                                            <th scope="col">S.D Approval</th>
                                            <th scope="col">H.O.D Approval</th>
                                            <th scope="col">Admin Approval</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody ref={isRenderTraining} style={{ display: '' }}>{renderTraining}</tbody>
                                    <tbody ref={isRenderSearch} style={{ display: 'none' }}>{renderBySearch}</tbody>

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
                                            {trainings.length}
                                        </span>
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

export default ApprovedTraining
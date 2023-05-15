import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { request } from '../../../../services/utilities';
import { USER_COOKIE } from '../../../../services/constants';
import SSRStorage from '../../../../services/storage';
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import { Store } from '../../../../services/store';
import ReactPaginate from "react-paginate";
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { Link } from 'react-router-dom';
import { Modal, Button, ModalHeader, ModalBody, Badge, ModalFooter, UncontrolledTooltip, Table, Container } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

// import {Loa}

function Indexing() {

    const store = useContext(Store)
    const [loading, setLoading] = useState(false);
    const [approved, setApproved] = useState(null);
    const [approve, setApprove] = useState('all');
    const [data, setData] = useState('');
    const [comment, setComment] = useState(' ');
    const [index, setIndex] = useState(null);
    const [idx, setIdx] = useState(null);
    const [url, setUrl] = useState(null);
    const [adminType, setAdminType] = store.adminType;

    const [tab_one, setTab_one] = useState('');
    const [tab_two, setTab_two] = useState('');
    const [tab_three, setTab_three] = useState('');
    const isRenderRef = useRef();
    const isRenderCategory = useRef();
    const [indexings, setIndexings] = useState([]);
    const [indexingsCategory, setIndexingsCategory] = useState([]);
    const [searchArray, setSearchArray] = useState([]);
    const isApprovedRef = useRef();
    const isRenderIndexing = useRef();
    const isRenderSearch = useRef();

    const [modal_list, setmodal_list] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [meta, setMeta] = useState(null);
    const [count, setCount] = useState(1);
    const [msg, setMsg] = useState(null);




    const handleError = () => {
        return MySwal.fire({
            text: ' Something went wrong!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })
    }

    const enableEdit = async (id) => {
        const data = { type: 'indexing', id };
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
        } catch (err) {
            console.log(err);
        }
    }

    const fetchIndexings = useCallback(async (page) => {
        setTab_two(' ');
        setTab_three(' ');
        setTab_one('text-success');

        const p = page || 1;
        const url = `indexings?limit=10&page=${p}`;

        try {
            setLoading(true);
            const rs = await request(url, 'GET', true);
            setIndexings(rs.data);
            setMeta(rs.paging);
            setCount(Math.ceil(rs.paging.total / rowsPerPage));
            setLoading(false);
        } catch (err) {
            setLoading(false);
            if (err.message === 'No record') {
                setIndexings([]);
            } else {
                handleError();
            }
            console.log(err);

        }
    }, [rowsPerPage]);

    const fetchApproveIndexings = async (page) => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);

        const p = page || 1;
        setTab_three(' ');
        setTab_one(' ');
        setTab_two('text-success');

        const url = `indexings/approved/all?limit=10&page=${p}&term=${user.type.trim()}`;
        try {
            setLoading(true);
            const rs = await request(url, 'GET', true);
            console.log(rs);
            isRenderRef.current.style.display = 'none';
            isRenderSearch.current.style.display = 'none'
            isRenderCategory.current.style.display = '';
            setIndexingsCategory(rs.data);
            setMeta(rs.paging);
            setCount(Math.ceil(rs.paging.total / rowsPerPage));
            setLoading(false);
            // console.log(rs, rs.paging.total);
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
    };
    const fetchUnApproveIndexings = async (page) => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);

        setTab_one(' ');
        setTab_two('');
        setTab_three('text-success');

        const p = page || 1;
        const url = `indexings/unapproved/all?limit=10&page=${p}&term=${user.type.trim()}`;

        try {
            setLoading(true);
            const rs = await request(url, 'GET', true);
            console.log(rs);
            isRenderRef.current.style.display = 'none';
            isRenderSearch.current.style.display = 'none'
            isRenderCategory.current.style.display = '';
            setIndexingsCategory(rs.data);
            setMeta(rs.paging);
            setCount(Math.ceil(rs.paging.total / rowsPerPage));
            setLoading(false);
            // console.log(rs, rs.paging.total);
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
    };
    const searchIndexing = async (e) => {
        const data = { payload: e }
        try {
            const url = `search/indexings`;
            const rs = await request(url, 'POST', true, data);
            setSearchArray(rs.data.indexing);
            isRenderRef.current.style.display = 'none';
            isRenderCategory.current.style.display = 'none';
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
        fetchIndexings();
    }, [fetchIndexings]);


    const renderIndexing = indexings.map((e, i) => {
        if (indexings.length > 0) {
            return (
                <tr key={i}>
                    <th scope="row"><Link to="#" className="fw-medium">{e.user.indexing.id}</Link></th>
                    <td>
                        {e.user.indexing.createdBy}

                    </td>
                    <td>{new Date(e.user.indexing.createdAt).toDateString()}</td>
                    <td>$2,300</td>

                    <td>{e.user.indexing.status !== "Approved" ? <span className="ri-close-circle-line align-middle text-danger"><span className='text-dark mx-1'>{e.user.indexing.status}</span></span> :
                        <span className="ri-checkbox-circle-line align-middle text-success"><span className='mx-1'>{e.user.indexing.status}</span></span>
                    }
                    </td>
                    <td>{e.user.indexing.isApprovedBySD === null ? 'Awaiting Approval' : e.user.indexing.isApprovedBySD === false ? 'Disapproved' : 'Approved'}</td>
                    <td>{e.user.indexing.isApprovedByHOD === null ? 'Awaiting Approval' : e.user.indexing.isApprovedByHOD === false ? 'Disapproved' : 'Approved'}</td>
                    <td>{e.user.indexing.isApprovedByAdmin === null ? 'Awaiting Approval' : e.user.indexing.isApprovedByAdmin === false ? 'Disapproved' : 'Approved'}</td>
                    <td>
                        <div className="hstack  flex-wrap">
                            <Badge color="success" style={{ cursor: 'pointer' }} onClick={() => enableEdit(e.user.indexing.id)}> Enable </Badge>
                            <Link to={`/admin-dashboard-if/${`indexing`}/${e.user.id}`} className="link-success btn-icon btn-sm" id="Tooltip3"><i className="ri-compass-3-line fs-16"></i></Link>
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
    const renderByCategory = indexingsCategory.map((e, i) => {
        if (indexingsCategory.length > 0) {
            return (
                <tr key={i}>
                    <th scope="row"><Link to="#" className="fw-medium">{e.indexing.id}</Link></th>
                    <td>{e.indexing.createdBy}</td>
                    <td>{new Date(e.indexing.createdAt).toDateString()}</td>
                    <td>$2,300</td>
                    <td>{e.indexing.status !== "Approved" ? <span className="ri-close-circle-line align-middle text-danger"><span className='text-dark mx-1'>{e.indexing.status}</span></span> :
                        <span className="ri-checkbox-circle-line align-middle text-success"><span className='mx-1'>{e.indexing.status}</span></span>
                    }
                    </td>
                    <td>{e.indexing.isApprovedBySD === null ? 'Awaiting Approval' : e.indexing.isApprovedBySD === false ? 'Disapproved' : 'Approved'}</td>
                    <td>{e.indexing.isApprovedByHOD === null ? 'Awaiting Approval' : e.indexing.isApprovedByHOD === false ? 'Disapproved' : 'Approved'}</td>
                    <td>{e.indexing.isApprovedByAdmin === null ? 'Awaiting Approval' : e.indexing.isApprovedByAdmin === false ? 'Disapproved' : 'Approved'}</td>
                    <td>
                        <div className="hstack flex-wrap">
                            <Badge color="success" style={{ cursor: 'pointer' }} onClick={() => enableEdit(e.indexing.id)}> Enable </Badge>

                            <Link to={`/admin-dashboard-if/${`indexing`}/${e.user.id}`} className="link-success btn-icon btn-sm" id="Tooltip3"><i className="ri-compass-3-line fs-16"></i></Link>

                        </div>
                        <UncontrolledTooltip placement="top" target="Tooltip3">View Details  </UncontrolledTooltip>

                    </td >
                </tr >
            )
        } else {
            return (
                <div className="text-danger text-center"> No record </div>
            )
        }
    })
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
                            <Link to={`/admin-dashboard-if/${`indexing`}/${e.userId}`} className="link-success btn-icon btn-sm" id="Tooltip3"><i className="ri-compass-3-line fs-16"></i></Link>
                        </div>
                        <UncontrolledTooltip placement="top" target="Tooltip3">View Details  </UncontrolledTooltip>

                    </td >
                </tr >
            )
        } else {
            return (
                <div className="text-danger text-center"> No record </div>
            )
        }
    })

    const handlePagination = page => {
        fetchIndexings(page.selected + 1)
        setCurrentPage(page.selected + 1)
    };
    return (
        <>
            <Container fluid>
                <div className="page-content row">
                    <div className='mt-4'>
                        <BreadCrumb title="Registered Indexing" pageTitle="Admin" />

                    </div>
                    <>{loading === true ? <LoaderGrow /> : ''}</>
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">Registered Indexings</h4>
                                <div className="form-group m-0">
                                    <div className="input-group">
                                        <input type="text" className="form-control" onChange={e => searchIndexing(e.target.value)}
                                            placeholder="Search by matric no, name of user, institution code..."
                                            aria-label="Recipient's username" />
                                        <button className="btn btn-primary" type="button"><i
                                            className="mdi mdi-magnify"></i></button>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <div className="">

                                        <Link className={`mx-3 ${tab_one}`} to="#" onClick={() => fetchIndexings()}>All</Link>
                                        <Link className={`mx-3 ${tab_two}`} to="#" onClick={() => fetchApproveIndexings()}>Approved</Link>
                                        <Link className={`mx-3 ${tab_three}`} to="#" onClick={() => fetchUnApproveIndexings()}>Pending</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Indexing Id</th>
                                            <th scope="col">Customer</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Invoice</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">S.D Approval</th>
                                            <th scope="col">H.O.D Approval</th>
                                            <th scope="col">Admin Approval</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody ref={isRenderRef} style={{ display: '' }}>{renderIndexing}</tbody>
                                    <tbody ref={isRenderSearch} style={{ display: 'none' }}>{renderBySearch}</tbody>
                                    <tbody ref={isRenderCategory} style={{ display: 'none' }}>{renderByCategory}</tbody>

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
                                            {indexings.length}
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

export default Indexing
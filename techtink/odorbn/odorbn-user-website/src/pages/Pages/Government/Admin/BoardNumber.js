import React, { useCallback, useEffect, useState } from 'react'
import { Label, Col, Row, Input, Modal, ModalBody, Table, ModalHeader, Container, CardBody, CardHeader, Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import { request } from '../../../../services/utilities';
import ReactPaginate from "react-paginate";
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import Repeater from './repeater/RepeatingForm'
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import Swal from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


const BoardNumber = () => {

    const [modal, setModal] = useState(false);
    const [number, setNumber] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(1);
    const [board, setBoard] = useState([]);
    const boardArr = []

    const toggle = () => {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
    };

    const handlePagination = page => {
        fetchBoardNumber(page.selected + 1)
        setCurrentPage(page.selected + 1)
    }
    const createBoardNumber = async () => {
        setLoading(true);
        const data = boardArr;
        try {
            const url = `boards/create`;
            const rs = await request(url, 'POST', true, data);
            fetchBoardNumber();
            setModal(false);
            setLoading(false);
            if (rs.success === true) {
                return MySwal.fire({
                    text: ' File Downloaded Successfully!',
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
    const deleteNumber = async (id) => {
        if (window.confirm('Are you sure')) {
            try {
                const url = `boards/delete/${id}`;
                const rs = await request(url, 'DELETE', true);
                fetchBoardNumber();
            } catch (err) {
                console.log(err);
            }
        }
    }
    const downloadCsv = async () => {
        try {
            const url = `boards/template/get?type=`;
            const rs = await request(url, 'GET', true);
            if (rs.success === true) {
                const linkSource = rs.result;
                const downloadLink = document.createElement('a');
                const fileName = 'boardNumbers.csv';
                downloadLink.href = linkSource;
                downloadLink.setAttribute('target', '_blank');
                downloadLink.setAttribute('ref', 'noreferrer noopene');
                downloadLink.download = fileName;
                downloadLink.click();
                return MySwal.fire({
                    text: ' File Downloaded Successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
    const onChange = e => {
        setLoading(true);

        const reader = new FileReader(),
            files = e.target.files;
        reader.onload = async function () {
            const data = { data: reader.result };
            try {
                const url = `boards/file/save`;
                const rs = await request(url, 'POST', true, data);
                if (rs.success === true) {
                    fetchBoardNumber();
                    setModal(false);
                    setLoading(false);

                    return MySwal.fire({
                        text: 'File Uploaded Successfully!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (err) {
                console.log(err);
                alert('Failed to upload file');
            }
        }
        reader.readAsDataURL(files[0]);

    }
    const fetchBoardNumber = useCallback(async (page) => {
        const p = page || 1;
        setLoading(true)
        try {
            const url = `boards/all?page=${p}&limit=10`;
            const rs = await request(url, 'GET', true);
            setBoard(rs.data);
            setMeta(rs.paging);
            setCount(Math.ceil(rs.paging.total / rowsPerPage));
            setLoading(false)

        } catch (err) {
            setLoading(false)
            console.log(err);
        }
    }, [rowsPerPage]);

    useEffect(() => {
        fetchBoardNumber();
    }, [fetchBoardNumber])
    return (
        <div>
            <>{loading === true ? <LoaderGrow /> : ''}</>
            <Modal id="composemodal" className="modal-lg" isOpen={modal} toggle={toggle} centered>
                <ModalHeader className="p-3 bg-light" toggle={toggle}>
                    Add Board Number
                </ModalHeader>

                <ModalBody>

                    <Col md={12} >
                        <Repeater boardArr={boardArr} />
                    </Col>
                </ModalBody>

                <div className='d-flex  justify-content-between p-2'>
                    <div >
                        <button onClick={downloadCsv} className='btn btn-primary mx-2'>Download CSV</button>
                        <input onChange={onChange} type='file' accept='.csv' className='btn w-50 btn-light' />
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn-ghost-danger"
                            onClick={() => {
                                setModal(false);
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                createBoardNumber();
                            }}
                        >
                            Add
                        </button>
                    </div>

                </div>
            </Modal>

            <Container fluid>
                <>{loading === true ? <LoaderGrow /> : ''}</>
                <div className="page-content">
                    <div className='mt-4'>
                        <BreadCrumb title="Board Numbers" pageTitle="Admin" />

                    </div>
                    <Card>
                        <CardHeader>
                            <div className="align-items-center">
                                <h4 className="card-title mb-0 flex-grow-1">Board Numbers</h4>
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
                                                Add Board Number
                                            </button>

                                        </div>
                                    </div>
                                </div>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th scope="col"> Id</th>
                                            <th scope="col">Number</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {board?.map((e, i) => {
                                            return (
                                                <tr key={i}>
                                                    <th scope="row"><Link to="#" className="fw-medium">{e.id}</Link></th>
                                                    <td>{e.number}</td>
                                                    <td>{new Date(e.createdAt).toDateString()}</td>
                                                    <td>
                                                        <div className="hstack  flex-wrap">
                                                            <button onClick={() => deleteNumber(e.id)} type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16"
                                                                id="Tooltip1"><i className="ri-delete-bin-line"></i></button>
                                                        </div>
                                                    </td >
                                                </tr >
                                            )
                                        })}
                                    </tbody>
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
                                            {board.length}
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

export default BoardNumber
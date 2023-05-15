import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
    Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Label,
    Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane, UncontrolledDropdown
} from 'reactstrap';
import classnames from 'classnames';
import SwiperCore, { Autoplay } from "swiper";
import MetaTags from 'react-meta-tags';
import { USER_COOKIE } from '../../../../services/constants';
import SSRStorage from '../../../../services/storage';
import { Store } from '../../../../services/store';

//Images
import profileBg from '../../../../assets/images/profile-bg.jpg';
import avatar1 from '../../../../assets/images/users/user-dummy-img.jpg';

import { request } from '../../../../services/utilities';
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import ListTables from '../ListTables';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Optometrist from '../Views/Optometrist';
import Comment from '../EmailInbox';
import UpdateLogInternshipOptometrist from '../UpdateLogInternshipOptometrist';
const MySwal = withReactContent(Swal);

const SimplePage = () => {
    const store = useContext(Store);
    const [, setUsername] = store.username;
    const [, setPassport] = store.passport;

    const history = useHistory();
    let [optometrist_countdown] = store.optometrist_countdown   

    const [loading, setLoading] = useState(false);
    const [idx, setIdx] = useState(null);
    const [internshipDocuments, setInternshipDocuments] = useState([]);
    const [error, setError] = useState('');
    const [aUser, setAUser] = useState([]);

    const [optometrists, setOptometrists] = useState(null);
    const [optometristTraining, setOptometristTraining] = useState(null);
 
    const [updateModal, setUpdateModal] = useState(false);

    const [color_one_optometrist, setColor_one_optometrist] = useState('text-success');
    const [color_two_optometrist, setColor_two_optometrist] = useState('');


    const optimRefTwo = useRef();
    const optometristRef = useRef();


    SwiperCore.use([Autoplay]);

    const handleError = () => {
        return MySwal.fire({
            text: ' Failed to load user details!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })
    }
    const [activeTab, setActiveTab] = useState('1');
    const [activityTab, setActivityTab] = useState('1');

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };


    const downLoadFIle = (e) => {
        const linkSource = e;
        const downloadLink = document.createElement('a');
        const fileName = 'test';
        downloadLink.href = linkSource;
        downloadLink.setAttribute('target', '_blank')
        downloadLink.setAttribute('ref', 'noreferrer noopene')
        downloadLink.download = fileName;
        downloadLink.click();
    }
    function tog_standard() {
        setUpdateModal(!updateModal);
    }

    const fetchUser = useCallback(async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        if (user === null) {
            return history.push(`/signin#facility`);
        }
        if (user.type !== 'optometrist') {
            return history.push(`/${user.type}-dashboard`);
        }
        await setIdx(user.id);
        try {
            setLoading(true);
            const url = `users/${user.id}`;
            const rs = await request(url, 'GET', true);
            setAUser(rs.data);
            setUsername(rs.data?.firstName);
            setPassport(rs.data?.passport);
            const urf = `documents/user/${user.id}`;
            const fls = await request(urf, 'GET', true);
            setOptometrists(rs.data.internship);
            setOptometristTraining(rs.data.internship);
            setInternshipDocuments(fls.data.documents);
            setColor_one_optometrist('text-success');
            setColor_two_optometrist('');
            setLoading(false);
            if (rs.data.isUpdated === false) {
                setUpdateModal(true);
            }
        } catch (err) {
            setLoading(false);
            handleError();
            console.log(err);
        }
    }, [history]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);
    return (
        <React.Fragment>
            <Modal id="myModal"
                isOpen={updateModal}
                toggle={() => {
                    tog_standard();
                }}
                backdrop={'static'}
            >
                <ModalHeader>

                    <button
                        type="button"
                        className="btn-close float-end"
                        onClick={() => {
                            setUpdateModal(false);
                        }}
                        aria-label="Close"
                    >
                    </button>
                </ModalHeader>
                <ModalBody>
                    <h5 className="fs-15">
                        Your profile is not updated kindly click the button below to  profile page.
                    </h5>
                    {/* <p className="text-muted">Your profile is not updated kindly click the button below to update profile.</p> */}
                </ModalBody>

                <ModalFooter>
                    <Link to={`dashboard-profile/edit/${idx}`} className="btn btn-primary"><i
                        className="ri-edit-box-line align-bottom"></i> Profile</Link>
                </ModalFooter>
            </Modal>
            <div className="page-content">
                <MetaTags>
                    <title>Profile | Dashboard | ORORBN</title>
                </MetaTags>
                <>{loading === true ? <LoaderGrow /> : ''}</>
                <Container fluid className='text-capitalize' >
                    <div className="profile-foreground position-relative mx-n4 mt-n4">
                        <div className="profile-wid-bg">
                            <img src={profileBg} alt="" className="profile-wid-img" />
                        </div>
                    </div>
                    <div className="pt-4 mb-4 mb-lg-3 pb-lg-4">
                        <Row className="g-4">
                            <div className="col-auto">
                                <div className="avatar-lg">
                                    <img src={aUser.passport === null || aUser.passport === undefined || aUser.passport === '[NULL]' ? avatar1 : aUser.passport} alt="user-img"
                                        className="img-thumbnail rounded-circle" />
                                </div>
                            </div>

                            <Col>
                                <div className="p-2">
                                    <h3 className="text-white mb-1">{aUser.firstName} {aUser.surname}</h3>
                                    <p className="text-white-75">Owner & Founder</p>
                                    <div className="hstack text-white-50 gap-1">
                                        <div className="me-2"><i
                                            className="ri-map-pin-user-line me-1 text-white-75 fs-16 align-middle"></i>{aUser.city}
                                            {aUser.nationality}</div>
                                        <div><i
                                            className="ri-building-line me-1 text-white-75 fs-16 align-middle"></i>{aUser.addressOrigin}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col lg={12}>
                            <div>
                                <div className="d-flex">
                                    <Nav pills className="animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1"
                                        role="tablist">
                                        <NavItem>
                                            <NavLink
                                                href="#dashboard"
                                                className={classnames({ active: activeTab === '1' })}
                                                onClick={() => { toggleTab('1'); }}
                                            >
                                                <i className="ri-airplay-fill d-inline-block d-md-none"></i> <span
                                                    className="d-none d-md-inline-block">Dashboard</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#payments"
                                                className={classnames({ active: activeTab === '2' })}
                                                onClick={() => { toggleTab('2'); }}
                                            >
                                                <i className="ri-list-unordered d-inline-block d-md-none"></i> <span
                                                    className="d-none d-md-inline-block">Payments</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#documents"
                                                className={classnames({ active: activeTab === '3' })}
                                                onClick={() => { toggleTab('3'); }}
                                            >
                                                <i className="ri-price-tag-line d-inline-block d-md-none"></i> <span
                                                    className="d-none d-md-inline-block">Documents</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#update-logs"
                                                className={classnames({ active: activeTab === '4' })}
                                                onClick={() => { toggleTab('4'); }}
                                            >
                                                <i className="ri-folder-4-line d-inline-block d-md-none"></i> <span
                                                    className="d-none d-md-inline-block">Update log</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#messages"
                                                className={classnames({ active: activeTab === '5' })}
                                                onClick={() => { toggleTab('5'); }}
                                            >
                                                <i className="ri-folder-4-line d-inline-block d-md-none"></i> <span
                                                    className="d-none d-md-inline-block">Messages</span>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <div className="flex-shrink-0">
                                        <Link to={`dashboard-profile/edit/${idx}`} className="btn btn-success"><i
                                            className="ri-edit-box-line align-bottom"></i> Edit Profile</Link>
                                    </div>
                                </div>

                                <TabContent activeTab={activeTab} className="pt-4">
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col xxl={3}>

                                                <Card>
                                                    <CardBody>
                                                        <h5 className="card-title mb-3">Info</h5>
                                                        <div className="table-responsive">
                                                            <Table className="table-borderless mb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Full Name :</th>
                                                                        <td className="text-muted">{aUser.firstName} {aUser.surname}</td>

                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Mobile :</th>
                                                                        <td className="text-muted">{aUser.phone}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">E-mail :</th>
                                                                        <td className="text-muted">{aUser.email}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Location :</th>
                                                                        <td className="text-muted">{aUser.city}{aUser.addressOrigin}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Joining Date</th>
                                                                        <td className="text-muted">24 Nov 2021</td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </CardBody>
                                                </Card>

                                            </Col>
                                            <Col xxl={9}>
                                                <Row>
                                                    <Col lg={12} >

                                                        {/* optometrist section */}

                                                        <div ref={optometristRef} style={{ display: '' }}>
                                                            <div className="card bg-primary">
                                                                <div className="card-body p-0">
                                                                    <div className="alert alert-danger rounded-top alert-solid alert-label-icon border-0 rounded-0 m-0 d-flex align-items-center" role="alert">
                                                                        <i className="ri-error-warning-line label-icon"></i>
                                                                        <div className="flex-grow-1 text-truncate">
                                                                            {/* Your Subscription expires in <b>315</b> days. */}
                                                                        </div>
                                                                       
                                                                    </div>

                                                                    <div className="row align-items-center">
                                                                        <div className="col-sm-8">
                                                                            <div className="p-3">
                                                                                <p className="fs-16 lh-base text-white">Welcome!<span className="fw-semibold"> {aUser.firstName}</span> {aUser.surname}</p>

                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-4">
                                                                            <p className="fs-16 lh-base text-white"> {optometristTraining === null || optometristTraining?.isApprovedByAdmin === false ? '' : optometrist_countdown === 'Expired' ? 'You can now register for full registration' : <>full registration {optometrist_countdown}</>} </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Optometrist
                                                                optometrists={optometrists}
                                                                optometristTraining={optometristTraining}
                                                                idx={idx}
                                                                user={aUser}
                                                                setOptometrists={setOptometrists}
                                                                color_one_optometrist={color_one_optometrist}
                                                                setColor_one_optometrist={setColor_one_optometrist}
                                                                color_two_optometrist={color_two_optometrist}
                                                                setColor_two_optometrist={setColor_two_optometrist}
                                                            />

                                                        </div>
                                                        
                                                        {/*End of optometrist section */}
                                                    </Col>

                                                </Row>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <ListTables
                                            user={aUser?.id}
                                        />
                                    </TabPane>

                                    <TabPane tabId="3">
                                        <Card>
                                            <CardBody>
                                                <div className="d-flex align-items-center mb-4">
                                                    <h5 className="card-title flex-grow-1 mb-0">Documents</h5>
                                                    <div className="flex-shrink-0">
                                                    </div>
                                                </div>
                                                <Row>
                                                    <Col lg={12}>
                                                        <div className="table-responsive">
                                                            <Table className="table-borderless align-middle mb-0">
                                                                <thead className="table-light">
                                                                    <tr>
                                                                        <th scope="col">File Name</th>
                                                                        <th scope="col">Upload Date</th>
                                                                        <th scope="col">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {(internshipDocuments || []).map((item, key) => (
                                                                        <tr key={key}>
                                                                            <td>
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="avatar-sm">
                                                                                        <div
                                                                                            className={`avatar-title bg-soft-danger text-danger rounded fs-20`}>
                                                                                            <i className='ri-file-pdf-fill'></i>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="ms-3 flex-grow-1">
                                                                                        <h6 className="fs-15 mb-0"><Link to="#">{item.name}</Link>
                                                                                        </h6>
                                                                                    </div>
                                                                                </div>
                                                                            </td>

                                                                            <td>{new Date(item.createdAt).toDateString()}</td>
                                                                            <td>
                                                                                <UncontrolledDropdown direction='start'>
                                                                                    <DropdownToggle tag="a" className="btn btn-light btn-icon" id="dropdownMenuLink15" role="button">
                                                                                        <i className="ri-equalizer-fill"></i>
                                                                                    </DropdownToggle>
                                                                                    <DropdownMenu>
                                                                                        <DropdownItem onClick={() => downLoadFIle(item.file)}><i className="ri-eye-fill me-2 align-middle text-muted" />View</DropdownItem>
                                                                                        <DropdownItem divider />
                                                                                        <DropdownItem onClick={() => downLoadFIle(item.file)}><i className="ri-download-2-fill me-2 align-middle text-muted" />Download</DropdownItem>
                                                                                    </DropdownMenu>
                                                                                </UncontrolledDropdown>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                            <p>{`Available result ${internshipDocuments.length}`}</p>
                                                        </div>
                                                        {/* <div className="text-center mt-3">
                                                            <Link to="#" className="text-success "><i
                                                                className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>
                                                                Load more </Link>
                                                        </div> */}
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </TabPane>

                                    <TabPane tabId="4">
                                        <UpdateLogInternshipOptometrist user={aUser} internship={optometristTraining} optometrist={aUser?.optometrist} />
                                    </TabPane>
                                    <TabPane tabId="5">
                                        <Comment user={aUser} />
                                    </TabPane>
                                </TabContent>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    );
};

export default SimplePage;
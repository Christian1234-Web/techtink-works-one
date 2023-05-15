import React, { useEffect, useState, useContext, useCallback, Fragment } from 'react';
import { useHistory, useParams,Link } from 'react-router-dom';
import classnames from "classnames";
import { Store } from '../../../../services/store';
import SSRStorage from '../../../../services/storage';
import { USER_COOKIE } from '../../../../services/constants';
import { request } from '../../../../services/utilities';
import Flatpickr from "react-flatpickr";


import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    Input,
    Label,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
    ListGroup, ListGroupItem, Button
} from "reactstrap";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import { useDropzone } from 'react-dropzone';
import { FileText, X, DownloadCloud } from 'react-feather';
const MySwal = withReactContent(Swal);

function WizardOptometrist() {

    const store = useContext(Store);
    let [read_only_optometristIntern, setRead_only_optometristIntern] = store.read_only_optometristIntern;
    const [user] = store.user;
    let [optometrist_approval, setOptometrist_approval] = store.optometrist_approval;
    let [optometrist_btn_save, setOptometrist_btn_save] = store.optometrist_btn_save;
    let [optometrist_btn_update, setOptometrist_btn_update] = store.optometrist_btn_update;
    const [loading, setLoading] = useState(false);
    const [activeArrowTab, setactiveArrowTab] = useState(4);
    const [passedarrowSteps, setPassedarrowSteps] = useState([1]);
    const [supervisor, setSupervisor] = useState([]);
    const [hospital, setHospital] = useState([]);
    const history = useHistory();
    const [files, setFiles] = useState([]);
    const [imgSix, setImgSix] = useState('');
    const [, setDocArr] = useState([]);
    const docArr = [];
    const [allFiles, setAllFiles] = useState([]);
    const id = useParams();
    // const [first_name, setFirst_name] = useState();
    // const [middle_name, setMiddle_name] = useState('');
    // const [last_name, setLast_name] = useState('');
    // const [user_email, setUser_email] = useState('');
    // const [user_phone, setUser_phone] = useState('');
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(' ');
    // ?
    const [supervisor_phone, setSupervisor_phone] = useState('');
    const [supid, setSupid] = useState('');
    const [hosid, setHosid] = useState('');

    const [supervisor_date_of_resumption, setSupervisor_date_of_resumption] = useState('');
    const [supervisor_board_no, setSupervisor_board_no] = useState('');
    const [supervisor_email, setSupervisor_email] = useState('');
    const [supervisor_middle_name, setSupervisor_middle_name] = useState('');
    const [supervisor_first_name, setSupervisor_first_name] = useState(' ');
    const [supervisor_last_name, setSupervisor_last_name] = useState('');

    const [hospital_email, setHospital_email] = useState('');
    const [hospital_name, setHospital_name] = useState(' ');
    const [hospital_address, setHospital_address] = useState('');
    const [hospital_phone, setHospital_phone] = useState('');

    const [user_school_Optometrist, setUser_school_Optometrist] = useState('');
    const [user_date_of_orientation_Optometrist, setUser_date_of_orientation_Optometrist] = useState('');
    // ?
    const handleSuccess = () => {
        return MySwal.fire({
            text: 'Posting Registration Form Submitted!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        })
    }
    const handleError = () => {
        return MySwal.fire({
            text: ' Something went wrong!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })
    }
    const warningError = () => {
        return MySwal.fire({
            text: ' Please fill the forms!',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000
        })
    }
    const handleErrorEmail = () => {
        return MySwal.fire({
            text: 'User Already Enrolled In Another Program Different Kindly Register Again With Another Email!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2800
        })
    }
    function toggleArrowTab(tab) {


        if (activeArrowTab !== tab) {
            var modifiedSteps = [...passedarrowSteps, tab];

            if (tab >= 4 && tab <= 8) {
                setactiveArrowTab(tab);
                setPassedarrowSteps(modifiedSteps);
            }
        }
    }

    const addSupervisor = () => {
        const data = {
            firstName: supervisor_first_name, otherNames: supervisor_middle_name, surname: supervisor_last_name,
            dateOfResumption: supervisor_date_of_resumption, email: supervisor_email,
            phone: supervisor_phone, boardNumber: supervisor_board_no
        }
        let x = new Array(data);
        setSupervisor(x);
        // console.log(supervisor);
    }

    const addHospital = () => {
        const data = {
            name: hospital_name, address: hospital_address, email: hospital_email, phone: hospital_phone
        }
        let x = new Array(data);
        setHospital(x);
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: acceptedFiles => {
            documents.push(...acceptedFiles.map(file => Object.assign(file)));
            setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))]);
        }
    });

    const renderFilePreview = file => {
        if (file.type.startsWith('image')) {
            return <img className='rounded' id='img_upload' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
        } else {
            return <FileText size='28' />
        }
    }

    const handleRemoveFile = async file => {
        if (window.confirm('are you sure')) {
            if (!file.id) {
                const filteredF = files.filter(i => i.name !== file.name)
                const filteredD = documents.filter(i => i.name !== file.name)
                setFiles([...filteredF]);
                setDocuments([...filteredD]);
            } else {
                try {
                    setLoading(true);
                    const filteredD = documents.filter(i => i.name !== file.name);
                    const url = `documents/delete/${file.id}`;
                    const rs = await request(url, 'DELETE', true);
                    if (rs.success === true) {
                        setDocuments([...filteredD]);
                    }
                    setLoading(false);
                } catch (err) {
                    setLoading(false);
                    console.log(err);
                }

            }

        }
    }

    const renderFileSize = size => {
        if (Math.round(size / 100) / 10 > 1000) {
            return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
        } else {
            return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
        }
    }

    const fileList = files.map((file, index) => (
        <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
            <div className='file-details d-flex align-items-center'>
                <div className='file-preview me-1'>{renderFilePreview(file)}</div>
                <div>
                    <p className='file-name mb-0'>{file.name}</p>
                    <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
                </div>
            </div>
            <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
                <X size={14} />
            </Button>
        </ListGroupItem>
    ))


    const DocumentList = documents.map((file, index) => (
        <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
            <div className='file-details d-flex align-items-center'>
                <div className='file-preview me-1'> <FileText size='28' /></div>
                <div>
                    <p className='file-name mb-0'>{file.name}</p>
                    {/* <p className='file-size mb-0'>{renderFileSize(file.size)}</p> */}
                </div>
            </div>
            <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
                <X size={14} />
            </Button>
        </ListGroupItem>
    ));
    const uploadedFiles = () => {
        setLoading(true);
        let count = 0;
        const filteredD = documents.filter(i => !i.id)
        const files_ = documents.length > 1 ? filteredD : files;
        console.log(files_);
        const formData = new FormData();
        for (let i = 0; i < files_.length; i++) {
            let file = files_[i];
            formData.append("file", file);
            formData.append("upload_preset", "geekyimages");
            fetch(`https://api.cloudinary.com/v1_1/doxlmaiuh/image/upload`, {
                method: "POST",
                body: formData
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let dataFile = { name: data.original_filename, file: data.secure_url };
                    if (dataFile?.name !== null) {
                        allFiles.push(dataFile);
                    }
                    count++
                    console.log(count);
                    if (count === files_.length) {
                        setLoading(false);
                        return MySwal.fire({
                            text: 'Files Uploaded Successfully!',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                });

        }
    }

    const createInternship = async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        if (hospital === [] || supervisor === []) {
            return warningError();
        }
        if (hospital_name === '' || supervisor_first_name === '') {
            return warningError();
        }
        const data = {
            userId: user.id, schoolAttended: user_school_Optometrist, dateOfOrientation: user_date_of_orientation_Optometrist, supervisors: supervisor, status: 'pending',
            hospitals: hospital, documents: allFiles
        }
        // console.log(data);
        try {
            setLoading(true)
            const url = `internships/create?senderid=${user.id}`;
            const rs = await request(url, 'POST', true, data);
            // console.log(rs);
            setError('Successful!');
            setLoading(false);
            console.log(rs);
            if (rs.success === true) {
                history.push(`/optometrist-dashboard/internship/${rs?.id}`);
            }
            // handleSuccess();
            // existPageOptometrist();

        } catch (err) {
            setLoading(false);
            if (err.message === 'user already enrolled for another program') {
                return handleErrorEmail();
            }
            if (err.message === 'email not verified') {
                return MySwal.fire({
                    text: 'Kindly verify your email',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2800
                });
            }
            if (err.message === 'you need approval to update records, kindly contact support') {
                return MySwal.fire({
                    text: 'You need approval to update records, kindly contact support!',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2800
                });
            }
            setError('Failed!');
            handleError();
            console.log(err);
        }
    }
    const createInternshipAndExit = async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        if (hospital === [] || supervisor === []) {
            return warningError();
        }
        if (hospital_name === '' || supervisor_first_name === '') {
            return warningError();
        }

        const data = {
            userId: user.id, schoolAttended: user_school_Optometrist, dateOfOrientation: user_date_of_orientation_Optometrist,
            supervisors: supervisor, hospitals: hospital, status: 'continue', documents: allFiles
        }
        // console.log(data);
        try {
            setLoading(true);
            const url = `internships/create?senderid=${user?.id}`;
            const rs = await request(url, 'POST', true, data);
            setError('Successful!');
            setLoading(false);
            if (rs.success === true) {
                history.push(`/optometrist-dashboard/internship/${rs?.id}`);
            }
            // handleSuccess();
            // existPageOptometrist();
        } catch (err) {
            setLoading(false);
            if (err.message === 'user already enrolled for another program') {
                return handleErrorEmail();
            }
            if (err.message === 'email not verified') {
                return MySwal.fire({
                    text: 'Kindly verify your email',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2800
                });
            }
            if (err.message === 'you need approval to update records, kindly contact support') {
                return MySwal.fire({
                    text: 'You need approval to update records, kindly contact support!',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2800
                });
            }
            setError('Failed!');
            handleError();
            console.log(err);
        }

    }
    const updateInternship = async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);

        if (hospital_name === '' || supervisor_first_name === '') {
            return warningError();
        }
        const data = {
            userId: user.id, schoolAttended: user_school_Optometrist, dateOfOrientation: user_date_of_orientation_Optometrist, supervisors: supervisor, status: 'pending',
            hospitals: hospital
        }

        const dataHos = {
            name: hospital_name, address: hospital_address, email: hospital_email, phone: hospital_phone
        }
        const dataSup = {
            firstName: supervisor_first_name, otherNames: supervisor_middle_name, surname: supervisor_last_name, dateOfResumption: supervisor_date_of_resumption, email: supervisor_email,
            phone: supervisor_phone, boardNumber: supervisor_board_no
        }
        const docu = { documents: allFiles };

        try {
            setLoading(true);
            const url_sup = `trainings/supervisor/${supid}?senderid=${user.id}`;
            const url_hos = `trainings/hospital/${hosid}?senderid=${user.id}`;
            const url = `internships/update/${id.id}?senderid=${user?.id}`;

            const rsh = await request(url_hos, 'PATCH', true, dataHos);
            const rss = await request(url_sup, 'PATCH', true, dataSup);
            const rs = await request(url, 'PATCH', true, data);
            const fs = await request(`documents/upload?name=internship&id=${id.id}`, 'POST', true, docu);
            setError('Successful!');
            setFiles([]);
            setAllFiles([]);
            setLoading(false);
            handleSuccess();
            history.push('/optometrist-dashboard');

        } catch (err) {
            setLoading(false);
            setError('Failed!');
            if (err.message === 'you need approval to update records, kindly contact support') {
                return MySwal.fire({
                    text: 'You need approval to update records, kindly contact support!',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2800
                });
            }
            handleError();
            console.log(err);
        }

    }
    const updateInternshipAndExit = async () => {
        // const user = await (new SSRStorage()).getItem(USER_COOKIE);

        if (hospital_name === '' || supervisor_first_name === '') {
            return warningError();
        }
        const data = {
            userId: user.id, schoolAttended: user_school_Optometrist, dateOfOrientation: user_date_of_orientation_Optometrist, supervisors: supervisor, status: 'continue',
            hospitals: hospital
        };
        const dataHos = {
            name: hospital_name, address: hospital_address, email: hospital_email, phone: hospital_phone
        }
        const dataSup = {
            firstName: supervisor_first_name, otherNames: supervisor_middle_name, surname: supervisor_last_name, dateOfResumption: supervisor_date_of_resumption, email: supervisor_email,
            phone: supervisor_phone, boardNumber: supervisor_board_no
        };
        const docu = { documents: allFiles };
        try {
            setLoading(true);
            const url_sup = `trainings/supervisor/${supid}?senderid=${user.id}`;
            const url_hos = `trainings/hospital/${hosid}?senderid=${user.id}`;
            const url = `internships/update/${id.id}?senderid=${user?.id}`;

            const rsh = await request(url_hos, 'PATCH', true, dataHos);
            const rss = await request(url_sup, 'PATCH', true, dataSup);
            const rs = await request(url, 'PATCH', true, data);
            const fs = await request(`documents/upload?name=internship&id=${id.id}`, 'POST', true, docu);
            setError('Successful!');
            setFiles([]);
            setAllFiles([]);
            setLoading(false);
            handleSuccess();
            history.push('/optometrist-dashboard');
        } catch (err) {
            setLoading(false);
            setError('Failed!');
            if (err.message === 'you need approval to update records, kindly contact support') {
                return MySwal.fire({
                    text: 'You need approval to update records, kindly contact support!',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2800
                });
            }
            handleError();
            console.log(err);
        }

    }

    const fetchUserDetails = useCallback(async () => {
        if (id.id) {
            try {
                setLoading(true);
                const url = `internships/${id.id}`;
                const rs = await request(url, 'GET', true);
                console.log(rs)
                let item = rs.data;
                setDocuments(rs.data.documents);
                setOptometrist_btn_save(false);
                setUser_date_of_orientation_Optometrist(item.dateOfOrientation);
                setUser_school_Optometrist(item.schoolAttended);

                setSupervisor_first_name(item.supervisors[0].firstName);
                setSupervisor_middle_name(item.supervisors[0].otherNames);
                setSupervisor_last_name(item.supervisors[0].surname);
                setSupid(item.supervisors[0].id);
                setHosid(item.hospitals[0].id);
                setSupervisor_email(item.supervisors[0].email);
                setSupervisor_phone(item.supervisors[0].phone);
                setSupervisor_board_no(item.supervisors[0].boardNumber);
                setSupervisor_date_of_resumption(item.supervisors[0].dateOfResumption)

                setHospital_name(item.hospitals[0].name);
                setHospital_address(item.hospitals[0].address);
                setHospital_email(item.hospitals[0].email);
                setHospital_phone(item.hospitals[0].phone);
                if (item.status === 'Pending') {
                    setRead_only_optometristIntern(true);
                } else {
                    setRead_only_optometristIntern(false);
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

    }, [id.id, setDocuments]);

    useEffect(() => {
        fetchUserDetails();
    }, [fetchUserDetails]);
    return (
        <div className='page-content'>
            <Container fluid>
                <Col xl={12}>
                    <Card>
                        <CardHeader>
                            <h4 className="card-title mb-0">Internship Form</h4>
                        </CardHeader>
                        {loading === true ? <LoaderGrow /> : ''}
                        <CardBody className="form-steps">
                            <Form>
                                <div className="mb-4">
                                    <Nav
                                        className="nav nav-tabs nav-tabs-custom nav-success nav-justified mb-3"
                                        role="tablist"
                                    >
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                id="steparrow-gen-info-tab"
                                                className={classnames({
                                                    active: activeArrowTab === 4,
                                                    done: activeArrowTab <= 7 && activeArrowTab > 3,
                                                })}
                                                onClick={() => {
                                                    toggleArrowTab(4);
                                                }}
                                            >
                                                Intern
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                id="steparrow-gen-info-tab"
                                                className={classnames({
                                                    active: activeArrowTab === 5,
                                                    done: activeArrowTab <= 7 && activeArrowTab > 4,
                                                })}
                                                onClick={() => {
                                                    toggleArrowTab(5);
                                                }}
                                            >
                                                Supervisor
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                id="steparrow-gen-info-tab"
                                                className={classnames({
                                                    active: activeArrowTab === 6,
                                                    done: activeArrowTab <= 7 && activeArrowTab > 5,
                                                })}
                                                onClick={() => {
                                                    toggleArrowTab(6);
                                                }}
                                            >
                                                Clinical/Hospital
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                id="steparrow-gen-info-tab"
                                                className={classnames({
                                                    active: activeArrowTab === 7,
                                                    done: activeArrowTab <= 7 && activeArrowTab > 6,
                                                })}
                                                onClick={() => {
                                                    toggleArrowTab(7);
                                                }}
                                            >
                                                Upload Documents
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>

                                <TabContent activeTab={activeArrowTab}>
                                    <TabPane id="steparrow-gen-info" tabId={4}>
                                        <div>
                                            <Row>
                                                <Col lg={4}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-email-input"
                                                        >
                                                            First Name
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="steparrow-gen-info-email-input"
                                                            // placeholder="Enter name"
                                                            value={user?.firstName}
                                                            readOnly
                                                            style={{ background: '#fff' }}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-username-input"
                                                        >
                                                            Middle Name
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="steparrow-gen-info-username-input"
                                                            // placeholder=" Enter name"
                                                            value={user?.otherNames}
                                                            readOnly
                                                            style={{ background: '#fff' }}

                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-email-input"
                                                        >
                                                            Surname
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="steparrow-gen-info-email-input"
                                                            // placeholder="Enter surname"
                                                            value={user?.surname}
                                                            readOnly
                                                            style={{ background: '#fff' }}

                                                        />
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col lg={6}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-email-input"
                                                        >
                                                            Email Address
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="steparrow-gen-info-email-input"
                                                            // placeholder="Enter email"
                                                            value={user?.email}
                                                            readOnly
                                                            style={{ background: '#fff' }}

                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-username-input"
                                                        >
                                                            Phone Number
                                                        </Label>
                                                        <Input
                                                            type="number"
                                                            className="form-control"
                                                            id="steparrow-gen-info-username-input"
                                                            value={user?.phone}
                                                            readOnly
                                                            style={{ background: '#fff' }}

                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-email-input"
                                                        >
                                                            School Attended
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="steparrow-gen-info-email-input"
                                                            placeholder="Enter school attended"
                                                            value={user_school_Optometrist}
                                                            onChange={(e) => setUser_school_Optometrist(e.target.value)}
                                                            readOnly={read_only_optometristIntern}
                                                            style={{ background: '#fff' }}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-email-input"
                                                        >
                                                            Date of Orientation
                                                        </Label>
                                                        <Label
                                                            className=" mx-2 form-label text-danger"
                                                            htmlFor="steparrow-gen-info-email-input"
                                                            id="showdateorientationerrormsg"
                                                        >
                                                        </Label>
                                                        <Flatpickr
                                                            className="form-control"
                                                            options={{
                                                                dateFormat: "d M, Y"
                                                            }}
                                                            disabled={read_only_optometristIntern}
                                                            style={{ background: '#fff' }}
                                                            value={user_date_of_orientation_Optometrist}
                                                            onChange={e => setUser_date_of_orientation_Optometrist(e)}
                                                        />

                                                    </div>
                                                </Col>
                                            </Row>

                                        </div>
                                        <div className="d-flex align-items-start gap-3 mt-4">
                                            <Link to='/Optometrist-dashboard'>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-label previestab"
                                                >
                                                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                                    Go Back
                                                </button>
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn  btn-label right ms-auto nexttab nexttab"
                                                style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} onClick={() => {
                                                    let dateOrien = document.getElementById('showdateorientationerrormsg');
                                                    if (user_date_of_orientation_Optometrist !== '') {
                                                        toggleArrowTab(activeArrowTab + 1);
                                                        dateOrien.innerHTML = '';

                                                    } else {
                                                        dateOrien.innerHTML = 'Compulsory';
                                                    }
                                                }}
                                            >
                                                <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                                Next
                                            </button>
                                        </div>
                                    </TabPane>

                                    <TabPane id="steparrow-description-info" tabId={5}>
                                        <div>
                                            <Row>
                                                <Col lg={4}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-email-input"
                                                        >
                                                            Supervisor  First Name
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="steparrow-gen-info-email-input"
                                                            placeholder="Enter supervisor name"
                                                            value={supervisor_first_name}
                                                            onChange={(e) => setSupervisor_first_name(e.target.value)}
                                                            readOnly={read_only_optometristIntern}
                                                            style={{ background: '#fff' }}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-username-input"
                                                        >
                                                            Supervisor   Middle Name
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="steparrow-gen-info-username-input"
                                                            placeholder=" Enter supervisor middle name"
                                                            value={supervisor_middle_name}
                                                            onChange={(e) => setSupervisor_middle_name(e.target.value)}
                                                            readOnly={read_only_optometristIntern}
                                                            style={{ background: '#fff' }}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-email-input"
                                                        >
                                                            Surname
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="steparrow-gen-info-email-input"
                                                            placeholder="Enter supervisor surname"
                                                            value={supervisor_last_name}
                                                            onChange={(e) => setSupervisor_last_name(e.target.value)}
                                                            readOnly={read_only_optometristIntern}
                                                            style={{ background: '#fff' }}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={6}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-email-input"
                                                        >
                                                            Board Number
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="steparrow-gen-info-email-input"
                                                            placeholder="Enter board number"
                                                            value={supervisor_board_no}
                                                            onChange={e => setSupervisor_board_no(e.target.value)}
                                                            readOnly={read_only_optometristIntern}
                                                            style={{ background: '#fff' }}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-username-input"
                                                        >
                                                            Email Address
                                                        </Label>
                                                        <Label
                                                            className="form-label text-danger mx-2"
                                                            htmlFor="steparrow-gen-info-username-input"
                                                            id='sup_email'
                                                        >
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="steparrow-gen-info-username-input"
                                                            placeholder=" Enter supervisor email address"
                                                            onBlur={(e) => {
                                                                let sup_email = document.getElementById('sup_email');
                                                                let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                                                                if (e.target.value === '' || e.target.value === null) {
                                                                    sup_email.innerHTML = 'Invalid email address';
                                                                }
                                                                else if (!filter.test(e.target.value)) {
                                                                    sup_email.innerHTML = 'Invalid email address';
                                                                } else {
                                                                    sup_email.innerHTML = ''
                                                                }
                                                            }}
                                                            value={supervisor_email}
                                                            onChange={e => setSupervisor_email(e.target.value)}
                                                            readOnly={read_only_optometristIntern}
                                                            style={{ background: '#fff' }}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-email-input"
                                                        >
                                                            Phone Number
                                                        </Label>
                                                        <Label
                                                            id="supervisoerrmsg"
                                                            className="form-label text-danger mx-2"
                                                            htmlFor="steparrow-gen-info-email-input"
                                                        >
                                                        </Label>
                                                        <Input
                                                            type="number"
                                                            maxLength={12}
                                                            className="form-control"
                                                            id="steparrow-gen-info-email-input"
                                                            placeholder="Enter supervisor phone number"
                                                            value={supervisor_phone}
                                                            onChange={e => setSupervisor_phone(e.target.value)}
                                                            onBlur={(e) => {
                                                                let supervisoerrmsg = document.getElementById('supervisoerrmsg');
                                                                let value = e.target.value;
                                                                if (value === '' || value === null) {
                                                                    supervisoerrmsg.innerHTML = "Invalid phone number";
                                                                }
                                                                else if (value.length >= 13) {
                                                                    supervisoerrmsg.innerHTML = "Invalid phone number";
                                                                } else {
                                                                    supervisoerrmsg.innerHTML = "";

                                                                }

                                                            }}
                                                            readOnly={read_only_optometristIntern}
                                                            style={{ background: '#fff' }}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-email-input"
                                                        >
                                                            Date of Resumption
                                                        </Label>

                                                        <Flatpickr
                                                            className="form-control"
                                                            options={{
                                                                dateFormat: "d M, Y"
                                                            }}
                                                            disabled={read_only_optometristIntern}
                                                            style={{ background: '#fff' }}
                                                            value={supervisor_date_of_resumption}
                                                            onChange={e => setSupervisor_date_of_resumption(e)}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>

                                        </div>
                                        <div className="d-flex align-items-start gap-3 mt-4">
                                            <button
                                                type="button"
                                                className="btn btn-light btn-label previestab"
                                                onClick={() => {
                                                    toggleArrowTab(activeArrowTab - 1);
                                                }}
                                            >
                                                <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                                Previous
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-label right ms-auto nexttab nexttab"
                                                style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                                onClick={() => {
                                                    let sup_email = document.getElementById('sup_email').innerHTML;
                                                    let supervisoerrmsg = document.getElementById('supervisoerrmsg').innerHTML;
                                                    if (sup_email === '' || sup_email === null && supervisoerrmsg === '' || supervisoerrmsg === null) {
                                                        addSupervisor();
                                                        toggleArrowTab(activeArrowTab + 1);
                                                    }
                                                }}

                                            >
                                                <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                                Next
                                            </button>
                                        </div>
                                    </TabPane>

                                    <TabPane id="steparrow-gen-info" tabId={6}>
                                        <div>
                                            <Row>
                                                <Col lg={12}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-email-input"
                                                        >
                                                            Name
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="steparrow-gen-info-email-input"
                                                            placeholder="Enter name"
                                                            value={hospital_name}
                                                            onChange={e => setHospital_name(e.target.value)}
                                                            readOnly={read_only_optometristIntern}
                                                            style={{ background: '#fff' }}
                                                        />
                                                    </div>
                                                </Col>

                                            </Row>

                                            <Row>
                                                <Col lg={6}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-email-input"
                                                        >
                                                            Email Address
                                                        </Label>
                                                        <Label
                                                            className="form-label text-danger mx-2"
                                                            htmlFor="steparrow-gen-info-email-input"
                                                            id='hos_email'
                                                        >
                                                        </Label>

                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="steparrow-gen-info-email-input"
                                                            placeholder="Enter email"
                                                            onBlur={(e) => {
                                                                let hos_email = document.getElementById('hos_email');
                                                                let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                                                                if (!filter.test(e.target.value)) {
                                                                    hos_email.innerHTML = 'Invalid email address';
                                                                } else {
                                                                    hos_email.innerHTML = ''
                                                                }
                                                            }}
                                                            value={hospital_email}
                                                            onChange={e => setHospital_email(e.target.value)}
                                                            readOnly={read_only_optometristIntern}
                                                            style={{ background: '#fff' }}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-username-input"
                                                        >
                                                            Phone Number
                                                        </Label>
                                                        <Label
                                                            className="form-label mx-2 text-danger"
                                                            htmlFor="steparrow-gen-info-username-input"
                                                            id='hosphone'
                                                        >

                                                        </Label>
                                                        <Input
                                                            type="number"
                                                            maxLength={12}
                                                            className="form-control"
                                                            id="steparrow-gen-info-username-input"
                                                            placeholder=" Enter phone number"
                                                            value={hospital_phone}
                                                            onChange={e => setHospital_phone(e.target.value)}
                                                            readOnly={read_only_optometristIntern}
                                                            onBlur={(e) => {
                                                                let hosphone = document.getElementById('hosphone');
                                                                let value = e.target.value;
                                                                if (value === '' || value === null) {
                                                                    hosphone.innerHTML = "Invalid phone number";
                                                                }
                                                                else if (value.length >= 13) {
                                                                    hosphone.innerHTML = "Invalid phone number";
                                                                } else {
                                                                    hosphone.innerHTML = "";

                                                                }

                                                            }}
                                                            style={{ background: '#fff' }}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={12}>
                                                    <div className="mb-3">
                                                        <Label
                                                            className="form-label"
                                                            htmlFor="steparrow-gen-info-email-input"
                                                        >
                                                            Hospital Address
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="steparrow-gen-info-email-input"
                                                            placeholder="Enter address"
                                                            value={hospital_address}

                                                            onChange={e => setHospital_address(e.target.value)}
                                                            readOnly={read_only_optometristIntern}
                                                            style={{ background: '#fff' }}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>

                                        </div>
                                        <div className="d-flex align-items-start gap-3 mt-4">
                                            <button
                                                type="button"
                                                className="btn btn-light btn-label previestab"
                                                onClick={() => {
                                                    toggleArrowTab(activeArrowTab - 1);
                                                }}
                                            >
                                                <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                                Previous
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-label right ms-auto nexttab nexttab"
                                                style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                                onClick={() => {
                                                    let hos_email = document.getElementById('hos_email').innerHTML;
                                                    let hosphone = document.getElementById('hosphone').innerHTML;
                                                    // console.log(hos_email, hosphone)
                                                    if (hos_email === '' || hos_email === null && hosphone === '' || hosphone === null) {
                                                        addHospital();
                                                        toggleArrowTab(activeArrowTab + 1);
                                                    }

                                                }}
                                            >
                                                <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                                Next
                                            </button>
                                        </div>
                                    </TabPane>

                                    <TabPane id="pills-experience" tabId={7}>
                                        <Col xxl={12}>
                                            <div {...getRootProps({ className: 'dropzone' })}>
                                                <input {...getInputProps()} />
                                                <div className='d-flex align-items-center justify-content-center flex-column'>
                                                    <DownloadCloud size={64} />
                                                    <h5>Drop Files here or click to upload</h5>
                                                    <p className='text-secondary'>
                                                        Drop files here or click{' '}
                                                        <a href='/' onClick={e => e.preventDefault()}>
                                                            browse
                                                        </a>{' '}
                                                        thorough your machine
                                                    </p>
                                                </div>
                                                <div>
                                                    <ol>
                                                        <li>A Copy of detailed result endorsed by the appropriate Education Authority
                                                            as evidence of Educational qualification</li>
                                                        <li>A copy of Admission later into the programme issued  by the admitting authority</li>
                                                        <li>A certified copy of Birth Certificate / Statutory Declaration of Age</li>
                                                        <li>A copy of testimonial from the Principal of last school attended</li>
                                                        <li>A copy of marriage Certification / Addidavit ( if married )</li>
                                                        <li>A copy of recent Passport Size Photograph</li>

                                                    </ol>
                                                </div>
                                            </div>
                                            {files.length || documents.length ? (
                                                <Fragment>
                                                    <ListGroup className='my-2'>{documents?.length >= 1 ? DocumentList : fileList}</ListGroup>
                                                    <div className='d-flex justify-content-end'>
                                                        <div></div>
                                                        {/* <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                                                        Remove All
                                                    </Button> */}
                                                        <Button color='primary' onClick={() => uploadedFiles()}>Upload Files</Button>
                                                    </div>
                                                </Fragment>
                                            ) : null}

                                        </Col>
                                        {/* <div className="col-lg-12 col-md-6">
                                        <div>
                                            <div className="form-check">
                                                <input className="form-check-input"
                                                    type="checkbox" id="id_sign" />
                                                <label className="form-check-label" >
                                                    I HEREBY ACCEPT RESPONSIBILITY FOR ANY WRONG INFORMATION INCLUDED IN THIS FORM.
                                                </label>
                                            </div>
                                        </div>
                                    </div> */}
                                        <div className="d-flex align-items-start gap-3 mt-4">
                                            <button
                                                type="button"
                                                className="btn btn-light btn-label previestab"
                                                onClick={() => {
                                                    toggleArrowTab(activeArrowTab - 1);
                                                }}
                                            >
                                                <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                                Previous
                                            </button>
                                            {/* <div className="text-end">
                                            <button type="button" onClick={() => existPageOptometrist()} className="btn btn-danger" >Cancel</button>
                                        </div> */}
                                            {id.id ?

                                                <div className='right  ms-auto'>
                                                    <button
                                                        type="button"
                                                        className="btn  right ms-auto mx-2"
                                                        style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                                        onClick={() => {
                                                            updateInternshipAndExit();
                                                            // toggleArrowTab(activeArxxxrowTab + 1);
                                                        }}
                                                        disabled={read_only_optometristIntern}
                                                    >
                                                        Update and Exit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn right ms-auto"
                                                        style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                                        onClick={() => {
                                                            updateInternship();
                                                            // toggleArrowTab(activeArrowTab + 1);
                                                        }}
                                                        disabled={read_only_optometristIntern}
                                                    >
                                                        Update and Submit
                                                    </button>
                                                </div>
                                                :
                                                <div className='right  ms-auto'>
                                                    <button
                                                        type="button"
                                                        className="btn  right ms-auto mx-2"
                                                        style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                                        onClick={() => {
                                                            createInternshipAndExit();
                                                            // toggleArrowTab(activeArxxxrowTab + 1);
                                                        }}
                                                    >
                                                        Save and Exit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn right ms-auto"
                                                        style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                                        onClick={() => {
                                                            createInternship();
                                                            // toggleArrowTab(activeArrowTab + 1);
                                                        }}
                                                    >
                                                        Submit
                                                    </button>
                                                </div>}

                                        </div>
                                    </TabPane>
                                </TabContent>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Container>
        </div>

    )
}

export default WizardOptometrist;
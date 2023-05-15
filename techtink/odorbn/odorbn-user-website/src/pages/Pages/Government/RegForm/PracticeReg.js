import React, { useState, Fragment, useContext, useEffect, useCallback } from 'react'
import { Card, CardBody, Container, Col, Form, Nav, NavItem, NavLink, TabContent, Label, TabPane, ListGroupItem, Button, ListGroup, Row, Input } from "reactstrap";
import { request } from '../../../../services/utilities';
import { Link, useHistory, useParams } from 'react-router-dom';
import RepeatingForm from './RepeatingForm';
import RepeatingFacility from './RepeatingFacility';
import { Store } from '../../../../services/store';
import Flatpickr from "react-flatpickr";
import classnames from "classnames";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import { useDropzone } from 'react-dropzone';
import { FileText, X, DownloadCloud } from 'react-feather';
import avatar1 from '../../../../assets/images/users/user-dummy-img.jpg';

const MySwal = withReactContent(Swal);


function PracticeReg() {
    const store = useContext(Store);
    let [facility_approval, setFacility_approval] = store.facility_approval;
    let [read_only, setRead_only] = store.read_only;
    const [user] = store.user;
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    const [practice, setPractice] = useState(null);
    const [mission, setMission] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [address, setAddress] = useState('');
    const [lga, setLga] = useState([]);
    const [state, setState] = useState([]);
    const [dateCommenced, setDateCommenced] = useState();
    const [nameOfRegPractitionerInCharge, setNameOfRegPractitionerInCharge] = useState('')
    const [optometricRegNum, setOptometricRegNum] = useState('');
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('');
    const [isAttachedToGHP, setIsAttachedToGHP] = useState(null);
    const [qualificationOfPractitionerInCharge, setQualificationOfPractitionerInCharge] = useState('')
    const [cacRegNum, setCacRegNum] = useState('');
    const [director, setDirector] = useState([]);
    const [facility, setFacilty] = useState([]);
    const [selected_state, setSelected_state] = useState('');
    const [selected_lga, setSelected_lga] = useState('');
    const [count, setCount] = useState(0);
    const [isImage, setIsImage] = useState(false);
    const id = useParams();
    const history = useHistory();
    const [activeArrowTab, setactiveArrowTab] = useState(4);
    const [passedarrowSteps, setPassedarrowSteps] = useState([1]);
    const [files, setFiles] = useState([]);
    const [imgSix, setImgSix] = useState('');
    const [, setDocArr] = useState([]);
    const [practiceType, setPracticeType] = useState([]);
    const [hide, setHide] = useState('none');
    const docArr = [];
    const [switchDirectorBtn, setSwitchDirectorBtn] = useState(false);
    const [switchFacilityBtn, setSwitchFacilityBtn] = useState(false);
    const [director_id, setDirector_id] = useState(null);
    const [facility_id, setFacility_id] = useState(null);
    const [name_director, setName_director] = useState('');
    const [address_director, setAddress_director] = useState('');
    const [name_facility, setName_facility] = useState('');
    const [planId, setPlanId] = useState(null);
    const [showDropdown1, setShowDropdown1] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);
    const [showDropdown3, setShowDropdown3] = useState(false);
    const [showDropdown4, setShowDropdown4] = useState(false);

    const [allFiles, setAllFiles] = useState([])
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const arr = [];

    const handleError = () => {
        return MySwal.fire({
            text: 'Something went wrong!',
            icon: 'error',
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
    const warningError = () => {
        return MySwal.fire({
            text: ' Please fill the forms!',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000
        })
    }
    const is_signError = () => {
        return MySwal.fire({
            text: 'Please sign the form!',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000
        })
    }

    const handleUpdate = () => {
        return MySwal.fire({
            text: 'Update Successful!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
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
    const onChange = e => {
        const reader = new FileReader(),
            files = e.target.files;
        setImage(e.target.files[0]);
        uploadImage(e.target.files[0], 'prac');
        reader.onload = function () {
            setImage(reader.result);
        }
        reader.readAsDataURL(files[0]);
    }
    const onChange2 = e => {
        const reader = new FileReader(),
            files = e.target.files;
        setImage2(e.target.files[0]);
        uploadImage(e.target.files[0], 'ceo');
        reader.onload = function () {
            setImage2(reader.result);
        }
        reader.readAsDataURL(files[0]);
    }
    const uploadImage = (e, x) => {
        setLoading(true);
        const formData = new FormData();
        let file = e;
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
                setLoading(false);
                if (x === 'ceo') {
                    setImage2(data.secure_url);
                } else {
                    setImage(data.secure_url);
                }
                setIsImage(true)
                setLoading(false);
                return MySwal.fire({
                    text: 'Image Uploaded Successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                })
            });
    }
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: acceptedFiles => {
            documents.push(...acceptedFiles.map(file => Object.assign(file)))
            setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))]);
        }
    })

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
        const formData = new FormData();
        for (let i = 0; i < files_.length; i++) {
            let file = files_[i];
            // count++
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

    const handleRemoveAllFiles = () => {
        setFiles([]);
        setDocuments([]);

    }
    const refreshUpdate = useCallback(async () => {
        try {
            setLoading(true);
            const url = `practices/${id?.id}`;
            const rs = await request(url, 'GET', true);
            console.log(rs.data)
            setDirector(rs.data.directors);
            setFacilty(rs.data.facilities);
            setDocuments(rs.data.documents);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }, [id.id, setDirector, setFacilty]);
    const fetchTypeOfPractice = useCallback(async () => {
        console.log('facility plan');

        try {
            const url = `plan/find/slug?slug=facility`
            const rs = await request(url, 'GET', true);
            setPracticeType(rs.data);
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        if (practice?.type.trim() === "Foreign Foundation" || practice?.type.trim() === 'Local Foundation') {
            setHide('');
        }
        fetchTypeOfPractice();
    }, [fetchTypeOfPractice]);


    const createPractice = async () => {
        const id_sign_two = document.getElementById('id_sign_two');
        if (name === '') {
            return warningError();
        }
        if (id_sign_two.checked === false) {
            return is_signError();
        }
        const data = {
            dateCommenced, isAttachedToGMP: isAttachedToGHP, state: selected_state, lga: selected_lga, email, mission,
            qualificationOfPractitionerInCharge, cacRegNum, optometricRegNum, nameOfRegPractitionerInCharge, address, documents: allFiles,
            phone, type, name, directors: director, facilities: facility, userId: user?.id, status: "pending", planId, passport: image, ceoPassport: image2
        }
        try {
            setLoading(true);
            const url = `practices/create?senderid=${user?.id}`;
            const rs = await request(url, 'POST', true, data);
            setLoading(false);
            if (rs.success === true) {
                history.push(`/facility-dashboard/facility/${rs?.id}`);
            }
            setFiles([]);

        }
        catch (err) {
            setLoading(false);
            if (err.message === 'email not verified') {
                return MySwal.fire({
                    text: 'Email not verified!',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2800
                });
            }
            if (err.message === 'user already enrolled for another program') {
                return handleErrorEmail();
            }
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
    const submitExistPractice = async () => {
        const id_sign_two = document.getElementById('id_sign_two');

        if (name === '') {
            return warningError();
        }
        if (id_sign_two.checked === false) {
            return is_signError();
        }
        const data = {
            dateCommenced, isAttachedToGMP: isAttachedToGHP, state: selected_state, lga: selected_lga, email, mission,
            qualificationOfPractitionerInCharge, cacRegNum, optometricRegNum, nameOfRegPractitionerInCharge, address, documents: allFiles,
            phone, type, name, directors: director, facilities: facility, userId: user?.id, status: "continue", planId, passport: image, ceoPassport: image2
        }
        try {
            setLoading(true);
            const url = `practices/create?senderid=${user?.id}`;
            const rs = await request(url, 'POST', true, data);
            setLoading(false);
            if (rs.success === true) {
                history.push(`/facility-dashboard/facility/${rs?.id}`);
            }
            setFiles([]);
        }
        catch (err) {
            setLoading(false);
            if (err.message === 'email not verified') {
                return MySwal.fire({
                    text: 'Email not verified!',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2800
                });
            }
            if (err.message === 'user already enrolled for another program') {
                return handleErrorEmail();
            }
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
    const updatePractice = async () => {
        const id_sign_two = document.getElementById('id_sign_two');

        if (name === '') {
            return warningError();
        }
        if (id_sign_two.checked === false) {
            return is_signError();
        }
        const data = {
            dateCommenced, isAttachedToGMP: isAttachedToGHP, state: selected_state, lga: selected_lga, email, planId, passport: image,
            qualificationOfPractitionerInCharge, cacRegNum, optometricRegNum, nameOfRegPractitionerInCharge, address, mission, ceoPassport: image2,
            phone, type, name, directors: director, facilities: facility, userId: user?.id, status: "pending"
        }
        const docu = { documents: allFiles };
        try {
            setLoading(true);
            const url = `practices/update/${id.id}?senderid=${user?.id}`;
            const rs = await request(url, 'PATCH', true, data);
            const fs = await request(`documents/upload?name=practice&id=${id.id}`, 'POST', true, docu);
            if (rs.success === true) {
                history.push(`/facility-dashboard/facility/${id?.id}`);
            }
            setLoading(false);
            setFiles([]);
            handleUpdate();
            history.push('/facility-dashboard');
        }
        catch (err) {
            setLoading(false);
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
    const updateExit = async () => {
        const id_sign_two = document.getElementById('id_sign_two');

        if (name === '') {
            return warningError();
        }
        if (id_sign_two.checked === false) {
            return is_signError();
        }
        const data = {
            dateCommenced, isAttachedToGMP: isAttachedToGHP, state: selected_state, lga: selected_lga, email, planId, passport: image,
            qualificationOfPractitionerInCharge, cacRegNum, optometricRegNum, nameOfRegPractitionerInCharge, address, mission, ceoPassport: image2,
            phone, type, name, directors: director, facilities: facility, userId: user?.id, status: "continue"
        }
        const docu = { documents: allFiles };
        try {
            setLoading(true);
            const url = `practices/update/${id.id}?senderid=${user?.id}`;
            const rs = await request(url, 'PATCH', true, data);
            const fs = await request(`documents/upload?name=practice&id=${id.id}`, 'POST', true, docu);
            setLoading(false);
            setFiles([]);
            handleUpdate();
            history.push('/facility-dashboard');

        }
        catch (err) {
            setLoading(false);
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
    const addFacility = (facilityData) => {
        facility.push(facilityData);
        setCount(count + 1);
    }
    const addDirector = (directorData) => {
        director.push(directorData);
        setCount(count + 1);
    }
    const removeDirector = (i) => {
        director.splice(i, 1);
        setCount(count + 1);
    }
    const removeFacility = (i) => {
        facility.splice(i, 1);
        setCount(count + 1);
    }
    const editFacilityPractice = (i) => {
        let item = facility[i];
        setName_facility(item.name);
        setFacility_id(item.id);
        setSwitchFacilityBtn(true);
    }
    const editDirectorFacility = (i) => {
        let item = director[i];
        setName_director(item.name);
        setAddress_director(item.address)
        setDirector_id(item.id);
        setSwitchDirectorBtn(true);
    }
    const deleteDirectorForm = async (id, i) => {

        const url = `practices/director/${id}`;
        if (window.confirm('are you sure')) {
            try {
                const rs = await request(url, 'DELETE', true);
                removeDirector(i);
                alert('deleted successful');
            } catch (err) {
                removeDirector(i);
                alert('opps something went wrong');
                console.log(err);
            }
        }

    }
    const deleteFacilityForm = async (id, i) => {

        const url = `practices/facility/${id}`;
        if (window.confirm('are you sure')) {
            try {
                const rs = await request(url, 'DELETE', true);
                removeFacility(i);
                alert('deleted successful');
            } catch (err) {
                removeFacility(i);
                alert('opps something went wrong');
                console.log(err);
            }
        }

    }
    const fetchLga = async (state) => {
        const url = `migrations/lgas?state=${state}`;
        try {
            const rs = await request(url, 'GET', true);
            setLga(rs.lgas);
        } catch (err) {
            console.log(err);
        }
    };
    const fetchPracticeById = useCallback(async () => {
        if (id.id) {
            const url = `practices/${id.id}`;
            try {
                const rs = await request(url, 'GET', true);
                // console.log(rs)
                let item = rs.data;
                setFacility_approval(item.status);
                setPractice(item);
                setName(item.name);
                setAddress(item.address);
                setPlanId(item.planId);
                setSelected_lga(item.lga);
                setSelected_state(item.state);
                setType(item.type);
                setImage(item.passport);
                setImage2(item.ceoPassport);
                setDateCommenced(item.dateCommenced);
                setNameOfRegPractitionerInCharge(item.nameOfRegPractitionerInCharge);
                setOptometricRegNum(item.optometricRegNum);
                setEmail(item.email);
                setPhone(item.phone);
                setMission(item.mission)
                setIsAttachedToGHP(item.isAttachedToGMP);
                setQualificationOfPractitionerInCharge(item.qualificationOfPractitionerInCharge);
                setCacRegNum(item.cacRegNum);
                setDirector(item.directors);
                setFacilty(item.facilities);
                setDocuments(item.documents);
                if (item.status !== 'continue') {
                    setRead_only(true);
                } else {
                    setRead_only(false);

                }
            } catch (err) {
                console.log(err);
            }
        }
    }, [id.id]);

    const fetchStates = useCallback(async () => {
        const url = `migrations/states`;
        try {
            const rs = await request(url, 'GET', true);
            setState(rs.states);
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        fetchStates();
        fetchPracticeById();
    }, [fetchStates, fetchPracticeById])
    return (
        <div className='page-content'>
            <Container fluid>
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardBody>
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
                                                Practice Registration
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
                                                Documents Uploads
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>
                                <div className="row">
                                    <>{loading === true ? <LoaderGrow /> : ' '}</>
                                    <Form>

                                        <TabContent activeTab={activeArrowTab}>
                                            <TabPane id="steparrow-gen-info" tabId={4}>
                                                <Row className='d-none'>
                                                    <Col xxl={3}>
                                                        <Card className="bg-black">
                                                            <CardBody className='p-4'>
                                                                <div className="text-center ">
                                                                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                                                                        <img src={image === null || image === undefined ? avatar1 : image}
                                                                            className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                                                            alt="user-profile" />
                                                                        <div className="avatar-xs p-0 rounded-circle profile-photo-edit">

                                                                            <Input id="profile-img-file-input" type="file" onChange={onChange} hidden accept='image/*'
                                                                                className="profile-img-file-input" />
                                                                            <Label htmlFor="profile-img-file-input"
                                                                                className="profile-photo-edit avatar-xs">
                                                                                <span className="avatar-title rounded-circle bg-light text-body">
                                                                                    <i className="ri-camera-fill"></i>
                                                                                </span>
                                                                            </Label>
                                                                        </div>
                                                                    </div>
                                                                    <div>Practitioner In-charge Passport</div>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                    <Col xxl={8}>
                                                        <Card className="float-end">
                                                            <CardBody className='p-4'>
                                                                <div className="text-center ">
                                                                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                                                                        <img src={image === null || image === undefined ? avatar1 : image}
                                                                            className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                                                            alt="user-profile" />
                                                                        <div className="avatar-xs p-0 rounded-circle profile-photo-edit">

                                                                            <Input id="profile-img-file-input" type="file" onChange={onChange} hidden accept='image/*'
                                                                                className="profile-img-file-input" />
                                                                            <Label htmlFor="profile-img-file-input"
                                                                                className="profile-photo-edit avatar-xs">
                                                                                <span className="avatar-title rounded-circle bg-light text-body">
                                                                                    <i className="ri-camera-fill"></i>
                                                                                </span>
                                                                            </Label>
                                                                        </div>
                                                                    </div>
                                                                    <div>Practitioner In-charge Passport</div>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                                <div>
                                                    <div className="">
                                                        <div className="card">
                                                            <div className="card-header align-items-center d-flex">
                                                                <h4 className="card-title mb-0 flex-grow-1">Practice Registration Form</h4>

                                                            </div>
                                                            <div className="card-body">
                                                                <div className="live-preview">
                                                                    <div className="row gy-4">
                                                                        <div className="col-xxl-4 col-md-4">
                                                                            <div>
                                                                                <label htmlFor="basiInput" className="form-label">Name of practice</label>
                                                                                <input type="text" value={practice !== null ? name : name} onChange={(e) => setName(e.target.value)}
                                                                                    className="form-control" id="basiInput" placeholder='Name of practice'
                                                                                    readOnly={read_only}
                                                                                    style={{ background: '#fff' }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xxl-4 col-md-4">
                                                                            <div>
                                                                                <label htmlFor="basiInput" className="form-label">CAC Reg. No</label>
                                                                                <input type="text" value={practice !== null ? cacRegNum : cacRegNum} onChange={(e) => setCacRegNum(e.target.value)}
                                                                                    className="form-control" id="basiInput" placeholder='Enter cac reg number'
                                                                                    readOnly={read_only}
                                                                                    style={{ background: '#fff' }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xxl-4 col-md-4">
                                                                            <label htmlFor="placeholderInput" className="form-label">Type of Practice</label>
                                                                            {practice !== null && showDropdown2 !== true ? <input type="text" value={practice.type}
                                                                                className="form-control" id="basiInput" placeholder='Name of practice'
                                                                                style={{ background: '#fff' }}
                                                                                onClick={() => {
                                                                                    setShowDropdown2(true);
                                                                                }}

                                                                            /> : <div>
                                                                                <select className="form-select mb-3" aria-label="Default select example" onChange={(e) => {
                                                                                    let item = practiceType[e.target.value];
                                                                                    setType(item?.name);
                                                                                    setPlanId(item?.id);
                                                                                    if (item?.description === 'local-ngo' || item?.description === 'foreign-ngo') {
                                                                                        setHide('');
                                                                                    } else {
                                                                                        setHide('none');
                                                                                    }
                                                                                }}>
                                                                                    <option selected="" className='text-capitalize'>Select type of practice </option>
                                                                                    {practiceType.map((e, i) => {
                                                                                        return (
                                                                                            <option key={e.id} value={i}>{e.name}</option>
                                                                                        )
                                                                                    })}
                                                                                </select>
                                                                            </div>}
                                                                            <div>

                                                                                <input type="text"
                                                                                    className="form-control mt-2" id="basiInput" placeholder='Enter vision/mission'
                                                                                    value={mission}
                                                                                    onChange={e => setMission(e.target.value)}
                                                                                    style={{ background: '#fff', display: hide }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xxl-12 col-md-6">
                                                                            <div>
                                                                                <label htmlFor="placeholderInput" className="form-label">Practice address</label>
                                                                                <input type="text" className="form-control"
                                                                                    value={practice !== null ? address : address}
                                                                                    onChange={(e) => setAddress(e.target.value)}
                                                                                    id="placeholderInput" placeholder="Practice address"
                                                                                    readOnly={read_only} style={{ background: '#fff' }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xxl-6 col-md-6">
                                                                            <label htmlFor="placeholderInput" className="form-label" >State of Practice</label>
                                                                            {practice !== null && showDropdown1 !== true ? <input type="text" className="form-control"
                                                                                value={practice.state}
                                                                                onClick={() => {
                                                                                    setShowDropdown1(true);
                                                                                }}

                                                                                id="placeholderInput" placeholder="Practice address"
                                                                                style={{ background: '#fff' }}
                                                                            /> :
                                                                                <select className="form-select mb-3 text-capitalize" value={selected_state} onChange={(e) => {
                                                                                    setSelected_state(e.target.value);
                                                                                    fetchLga(e.target.value);
                                                                                }} aria-label="Default select example">
                                                                                    <option className='text-capitalize' >Select state of practice</option>

                                                                                    {state.map(e => {
                                                                                        return (
                                                                                            <option className='text-capitalize' key={e.id} >{e}</option>
                                                                                        )
                                                                                    })}
                                                                                </select>
                                                                            }

                                                                        </div>
                                                                        <div className="col-xxl-6 col-md-6">
                                                                            <label htmlFor="placeholderInput" className="form-label">L.G.A of Practice</label>
                                                                            {practice !== null && showDropdown3 !== true ? <input type="text" className="form-control"
                                                                                value={practice.lga}
                                                                                id="placeholderInput" placeholder="Practice address"
                                                                                onClick={() => {
                                                                                    setShowDropdown3(true);
                                                                                }}
                                                                                style={{ background: '#fff' }} /> :
                                                                                <select className="form-select mb-3 text-capitalize" value={selected_lga} onChange={(e) => setSelected_lga(e.target.value)} aria-label="Default select example">
                                                                                    {lga.map(e => {
                                                                                        return (
                                                                                            <option className='text-capitalize' key={e.id} >{e}</option>
                                                                                        )
                                                                                    })}
                                                                                </select>
                                                                            }

                                                                        </div><div className="col-xxl-6 col-md-6">
                                                                            <div>
                                                                                <label htmlFor="placeholderInput" className="form-label mx-2">Practice E-mail</label>
                                                                                <label htmlFor="placeholderInput" id='emailvalidate' className="form-label text-danger"></label>

                                                                                <input type="email" value={practice !== null ? email : email} onBlur={(e) => {
                                                                                    let emailvalidate = document.getElementById('emailvalidate');
                                                                                    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                                                                                    if (!filter.test(e.target.value)) {
                                                                                        emailvalidate.innerHTML = 'Invalid email address';
                                                                                    } else {
                                                                                        emailvalidate.innerHTML = ''
                                                                                    }
                                                                                }} onChange={(e) => setEmail(e.target.value)} className="form-control"
                                                                                    id="placeholderInput" placeholder="Email" readOnly={read_only} style={{ background: '#fff' }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xxl-6 col-md-6">
                                                                            <div>
                                                                                <label htmlFor="placeholderInput" className="form-label">Phone number</label>
                                                                                <input type="number" maxLength={12} value={practice !== null ? phone : phone} onChange={(e) => setPhone(e.target.value)} className="form-control"
                                                                                    id="placeholderInput" placeholder="Phone" readOnly={read_only} style={{ background: '#fff' }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xxl-5 col-md-6">
                                                                            <div>
                                                                                <label htmlFor="exampleInputdate" className="form-label">DATE PRACTICE COMMENCED</label>

                                                                                <Flatpickr
                                                                                    className="form-control"
                                                                                    options={{
                                                                                        dateFormat: "d M, Y"
                                                                                    }}
                                                                                    value={practice !== null ? dateCommenced : dateCommenced}
                                                                                    onChange={(e => setDateCommenced(e))}
                                                                                    disabled={read_only}
                                                                                    style={{ background: '#fff' }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xxl-7 col-md-6 pt-2">
                                                                            <div>

                                                                                <div className="col-lg-12 pt-4">
                                                                                    <fieldset className="row mb-3 mr-3">
                                                                                        <legend className="col-form-label col-sm-8 pt-0">IS THE PRACTICE ATTACHED TO A GENERAL MEDICAL PRACTICE?</legend>
                                                                                        <div className="col-sm-4">
                                                                                            <div className="form-check form-check-inline">
                                                                                                <input className="form-check-input"
                                                                                                    value={practice !== null ? isAttachedToGHP : isAttachedToGHP}
                                                                                                    checked={isAttachedToGHP === true ? true : null}
                                                                                                    // checked={true}
                                                                                                    onChange={() => setIsAttachedToGHP(true)}
                                                                                                    disabled={read_only}
                                                                                                    type="radio" id="allTransactions" name="allFilters" />
                                                                                                <label className="form-check-label" htmlFor="allTransactions">Yes</label>
                                                                                            </div>
                                                                                            <div className="form-check form-check-inline">
                                                                                                <input className="form-check-input"
                                                                                                    value={practice !== null ? isAttachedToGHP : isAttachedToGHP}
                                                                                                    checked={isAttachedToGHP === false ? true : null}
                                                                                                    onChange={() => setIsAttachedToGHP(false)}
                                                                                                    disabled={read_only}
                                                                                                    type="radio" id="allTransactions" name="allFilters" />
                                                                                                <label className="form-check-label" htmlFor="allTransactions">No</label>
                                                                                            </div>

                                                                                        </div>
                                                                                    </fieldset>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-xxl-12 col-md-6">
                                                                            <div className='mb-4'>
                                                                                <RepeatingForm
                                                                                    director={director}
                                                                                    addDirector={addDirector}
                                                                                    name_director={name_director}
                                                                                    setName_director={setName_director}
                                                                                    address_director={address_director}
                                                                                    setAddress_director={setAddress_director}
                                                                                    director_id={director_id}
                                                                                    userId={user?.id}
                                                                                    refreshUpdate={refreshUpdate}
                                                                                    switchDirectorBtn={switchDirectorBtn}
                                                                                    setSwitchDirectorBtn={setSwitchDirectorBtn}
                                                                                    practiceId={practice}


                                                                                />
                                                                            </div>

                                                                            <div className="col-xl-12">
                                                                                <div className="table-responsive mt-4 mt-xl-0">
                                                                                    <table className="table table-success table-striped table-nowrap align-middle mb-0">
                                                                                        <thead >
                                                                                            <tr>
                                                                                                <th scope="col">ID</th>
                                                                                                <th scope="col">Name of Director</th>
                                                                                                <th scope="col">Address of Director</th>
                                                                                                <th scope='col'>
                                                                                                    Action
                                                                                                </th>

                                                                                            </tr>
                                                                                        </thead>
                                                                                        {director.map((e, i) => {
                                                                                            return (
                                                                                                <tbody key={i}>
                                                                                                    <tr>
                                                                                                        <td className="fw-medium">{i + 1}</td>
                                                                                                        <td>{e.name}</td>
                                                                                                        <td>{e.address}</td>
                                                                                                        <td>
                                                                                                            <div className="hstack gap-3 flex-wrap">
                                                                                                                {facility_approval === 'continue' ? <Link className="link-success fs-15"><i onClick={() => editDirectorFacility(i)} className="ri-edit-2-line"></i></Link>
                                                                                                                    : " "}
                                                                                                                {facility_approval === 'continue' ? <Link className="link-danger fs-15"><i
                                                                                                                    onClick={() => deleteDirectorForm(e.id, i)}
                                                                                                                    className="ri-delete-bin-line"></i></Link> :
                                                                                                                    " "}
                                                                                                                {facility_approval === ' ' ? <Link className="link-danger fs-15"><i
                                                                                                                    onClick={() => removeDirector(i)}
                                                                                                                    className="ri-delete-bin-line"></i></Link> : ' '}

                                                                                                            </div>
                                                                                                        </td>

                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            )
                                                                                        })}
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xxl-4 col-md-6">
                                                                            <div>
                                                                                <label htmlFor="basiInput" className="form-label">NAME OF REGISTERED PRACTITIONER IN-CHARGE</label>
                                                                                <input type="text"
                                                                                    value={practice !== null ? nameOfRegPractitionerInCharge : nameOfRegPractitionerInCharge}
                                                                                    onChange={(e) => setNameOfRegPractitionerInCharge(e.target.value)}
                                                                                    readOnly={read_only} style={{ background: '#fff' }}
                                                                                    className="form-control" id="basiInput" placeholder='Practitioner in-charge' />
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-xxl-4 col-md-6">
                                                                            <div>
                                                                                <label htmlFor="formtextInput" className="form-label">QUALIFICATION OF PRACTITIONER(S) IN-CHARGE:</label>
                                                                                {practice !== null && showDropdown4 !== true ? <input type="text" value={practice.qualificationOfPractitionerInCharge}
                                                                                    style={{ background: '#fff' }} onClick={() => setShowDropdown4(true)}
                                                                                    className="form-control" id="basiInput" /> :
                                                                                    <select className="form-select mb-3"
                                                                                        onChange={(e) => setQualificationOfPractitionerInCharge(e.target.value)} aria-label="Default select example">
                                                                                        <option selected="">Select Qualification </option>
                                                                                        <option value="WAEC">WAEC </option>
                                                                                        <option value="OND">OND</option>
                                                                                        <option value="BSC">BSC</option>
                                                                                    </select>}

                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xxl-4 col-md-6">
                                                                            <div>
                                                                                <label htmlFor="basiInput" className="form-label">REG. NO. WITH NIGERIAN OPTOMETRIC ASSOCIATION:</label>
                                                                                <input type="text"
                                                                                    value={practice !== null ? optometricRegNum : optometricRegNum}
                                                                                    onChange={(e) => setOptometricRegNum(e.target.value)}
                                                                                    className="form-control" id="basiInput" readOnly={read_only} style={{ background: '#fff' }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-sm-6 col-xl-4  col-md-6'>
                                                                            <Card className="">
                                                                                <CardBody className='p-4'>
                                                                                    <div className="text-center ">
                                                                                        <div className="profile-user  position-relative d-inline-block mx-auto  mb-2">
                                                                                            <img src={image === null || image === undefined ? avatar1 : image}
                                                                                                className="rounded   user-profile-image"
                                                                                                alt="user-profile" width='200px' height='200px' style={{ border: '1px solid #e9ebec', backgroundColor: '#f3f3f9', padding: '0.25rem' }} />
                                                                                            <div className="avatar-xs p-0 rounded-circle profile-photo-edit">

                                                                                                <Input id="profile-img-file-input" type="file" onChange={onChange} hidden accept='image/*'
                                                                                                    className="profile-img-file-input" />
                                                                                                <Label htmlFor="profile-img-file-input"
                                                                                                    className="profile-photo-edit avatar-xs">
                                                                                                    <span className="avatar-title rounded-circle bg-light text-body">
                                                                                                        <i className="ri-camera-fill"></i>
                                                                                                    </span>
                                                                                                </Label>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div>Practitioner In-charge Passport</div>
                                                                                    </div>
                                                                                </CardBody>
                                                                            </Card>
                                                                        </div>
                                                                        <div className='col-sm-6 col-xl-4  col-md-6'>
                                                                            <Card className="" >
                                                                                <CardBody className='p-4'>
                                                                                    <div className="text-center ">
                                                                                        <div className="profile-user position-relative d-inline-block mx-auto  mb-2">
                                                                                            <img src={image2 === null || image2 === undefined ? avatar1 : image2}
                                                                                                className="rounded user-profile-image"
                                                                                                alt="user-profile" width='200px' height='200px' style={{ border: '1px solid #e9ebec', backgroundColor: '#f3f3f9', padding: '0.25rem' }} />
                                                                                            <div className="avatar-xs p-0 rounded-circle profile-photo-edit">

                                                                                                <Input id="profile-img-file-input2" type="file" onChange={onChange2} hidden accept='image/*'
                                                                                                    className="profile-img-file-input2" />
                                                                                                <Label htmlFor="profile-img-file-input2"
                                                                                                    className="profile-photo-edit avatar-xs">
                                                                                                    <span className="avatar-title rounded-circle bg-light text-body">
                                                                                                        <i className="ri-camera-fill"></i>
                                                                                                    </span>
                                                                                                </Label>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div>CEO Passport</div>
                                                                                    </div>
                                                                                </CardBody>
                                                                            </Card>
                                                                        </div>
                                                                        <div className="col-xxl-12 col-md-6">
                                                                            <div className='mb-4'>
                                                                                <RepeatingFacility
                                                                                    facility={facility}
                                                                                    addFacility={addFacility}
                                                                                    name_facility={name_facility}
                                                                                    setName_facility={setName_facility}
                                                                                    facility_id={facility_id}
                                                                                    userId={user?.id}
                                                                                    refreshUpdate={refreshUpdate}
                                                                                    switchFacilityBtn={switchFacilityBtn}
                                                                                    setSwitchFacilityBtn={setSwitchFacilityBtn}
                                                                                    practiceId={practice}

                                                                                />
                                                                            </div>
                                                                            <div className="col-xl-12">
                                                                                <div className="table-responsive mt-4 mt-xl-0">
                                                                                    <table className="table table-success table-striped table-nowrap align-middle mb-0">
                                                                                        <thead >
                                                                                            <tr>
                                                                                                <th scope="col">ID</th>
                                                                                                <th scope="col">Name of Facility</th>
                                                                                                <th scope='col'>
                                                                                                    <div>Action</div>
                                                                                                </th>

                                                                                            </tr>
                                                                                        </thead>
                                                                                        {facility.map((e, i) => {
                                                                                            return (
                                                                                                <tbody key={i}>
                                                                                                    <tr>
                                                                                                        <td className="fw-medium">{i + 1}</td>
                                                                                                        <td>{e ? e.name : ''}</td>
                                                                                                        <td>
                                                                                                            <div className="hstack gap-3 flex-wrap">
                                                                                                                {facility_approval === 'continue' ? <Link className="link-success fs-15"><i onClick={() => editFacilityPractice(i)} className="ri-edit-2-line"></i></Link>
                                                                                                                    : " "}
                                                                                                                {facility_approval === 'continue' ? <Link className="link-danger fs-15"><i
                                                                                                                    onClick={() => deleteFacilityForm(e.id, i)}
                                                                                                                    className="ri-delete-bin-line"></i></Link> :
                                                                                                                    " "}
                                                                                                                {facility_approval === ' ' ? <Link className="link-danger fs-15"><i
                                                                                                                    onClick={() => removeFacility(i)}
                                                                                                                    className="ri-delete-bin-line"></i></Link> : ' '}

                                                                                                            </div>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            )
                                                                                        })}
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-start gap-3 mt-4">
                                                        <div className="text-end">
                                                            <Link to='/facility-dashboard' className="btn btn-danger" >Cancel</Link>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="btn  btn-label right ms-auto nexttab nexttab"
                                                            style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} onClick={() => {
                                                                let emailvalidate = document.getElementById('emailvalidate');
                                                                if (emailvalidate.innerHTML !== 'Invalid email address') {
                                                                    toggleArrowTab(activeArrowTab + 1);

                                                                }
                                                            }}
                                                        >
                                                            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                                            Next
                                                        </button>
                                                    </div>
                                                </div>
                                            </TabPane>

                                            <TabPane id="steparrow-description-info" tabId={5}>
                                                <div>
                                                    <div className="card-header align-items-center d-flex">
                                                        <h4 className="card-title mb-0 flex-grow-1">Practice Registration Documents Uploads</h4>

                                                    </div>

                                                </div>
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
                                                <div className="col-lg-12 col-md-6">
                                                    <div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" id="id_sign_two"
                                                                disabled={read_only}
                                                            />
                                                            <label className="form-check-label" htmlFor="gridCheck">
                                                                I HEREBY ACCEPT RESPONSIBILITY FOR ANY WRONG INFORMATION INCLUDED IN THIS FORM.
                                                            </label>
                                                        </div>
                                                    </div>
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

                                                    {id.id ?

                                                        <div className='right  ms-auto'>
                                                            <button
                                                                type="button"
                                                                className="btn  right ms-auto mx-2"
                                                                style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                                                onClick={() => {
                                                                    updateExit();
                                                                    // toggleArrowTab(activeArxxxrowTab + 1);
                                                                }}
                                                                disabled={read_only}
                                                            >
                                                                Update and Exit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn right ms-auto"
                                                                style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                                                onClick={() => {
                                                                    updatePractice();
                                                                    // toggleArrowTab(activeArrowTab + 1);
                                                                }}
                                                                disabled={read_only}
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
                                                                    submitExistPractice();
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
                                                                    createPractice();
                                                                }}
                                                            >
                                                                Submit
                                                            </button>
                                                        </div>}

                                                </div>
                                            </TabPane>
                                        </TabContent>
                                    </Form>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}
export default PracticeReg;
import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { httpRequest } from '../../../services/utilities';
// import { Card, Col, Container, Input, Label, Row, Button } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import AuthSlider from '../authCarousel';
import SSRStorage from '../../../services/storage';
import { TOKEN_COOKIE, USER_COOKIE } from '../../../services/constants';
// import { facebook, google } from "../../../";
import { google, facebook } from '../../../config';
import { GoogleLogin } from "react-google-login";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { LoaderGrow } from '../../AdvanceUi/Loader/loader';
import classnames from "classnames";
import { Card, Col, Container, Row, CardBody, CardHeader, Nav, NavItem, NavLink, Form, Input, Label, Button } from 'reactstrap';
import { Store } from '../../../services/store';
const storage = new SSRStorage();
const MySwal = withReactContent(Swal);


const CoverSigninAdmin = () => {
    const store = useContext(Store)
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [adminType, setAdminType] = store.adminType;
    const [key, setKey] = useState('password');
    const [error, setError] = useState('');
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleError = () => {
        return MySwal.fire({
            text: 'Can not sign in please try again later!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })
    }

    const toggleKey = () => {
        if (open === false) {
            setKey('text');
            setOpen(true);
        } else {
            setKey('password');
            setOpen(false);

        }
    }


    const loginAdmin = async () => {
        const data = { email, password }
        if (password === null || password === '' || email === '' || email === null) {
            return setError('fill your details')
        }
        try {
            setLoading(true);
            let url = 'users/signin';
            const rs = await httpRequest(url, 'POST', data);
            const rsData = rs.data;
            // console.log(rs, 'details');
            setLoading(false);
            if (rs.success === true) {
                setError('successful');
                if (rs.data.userType.trim().toLowerCase() !== 'user') {
                    setAdminType(rs.data.userType.trim().toLowerCase());
                    storage.setItem(TOKEN_COOKIE, rs);
                    storage.setItem(USER_COOKIE, rsData);
                    return history.push('/registered-facility');
                } else {
                    setError('Kindly login through the right page');
                }
            }

        } catch (err) {
            setLoading(false);
            console.log(err, 'err');
            if (err.message === 'Invalid credentials' || err.message === 'invalid credenials' || err.message === 'invalid credentials') {
                return setError('Invalid email or password!!')
            } else {
                handleError();
            }

        }
    }

    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>

                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <MetaTags>
                        <title> SignIn | Odorbn</title>
                    </MetaTags>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden">

                                    <Row className="g-0">
                                        <AuthSlider />
                                        <>{loading === true ? <LoaderGrow /> : ''}</>
                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                <div>
                                                    <h5 className="text-primary">Welcome Back  Admin!</h5>
                                                    <p className="text-muted">Sign in to continue with Odorbn.</p>
                                                </div>

                                                <div className="mt-4">
                                                    <form action="/">
                                                        <div className="mb-3">
                                                            <label htmlFor="useremail" className="form-label">Email
                                                            </label>
                                                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="useremail" placeholder="Enter email address" required />
                                                            <div className="invalid-feedback">
                                                                Please enter email
                                                            </div>
                                                        </div>


                                                        <div className="mb-3">
                                                            <div className="float-end">
                                                                <Link to="/auth-pass-reset-cover" className="text-muted">Forgot password?</Link>
                                                            </div>
                                                            <Label className="form-label" htmlFor="password-input">Password</Label>
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <Input type={key} className="form-control pe-5" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" id="password-input" />
                                                                <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon"><i onClick={() => toggleKey()} className="ri-eye-fill align-middle"></i></button>
                                                            </div>
                                                        </div>
                                                        <span className="text-danger" style={{ textAlign: 'left' }}>{error}</span>

                                                        <div className="mt-4">
                                                            <div className="mt-4">
                                                                <button onClick={() => loginAdmin()} id='facility' className="btn btn-success w-100" type="button">Sign In </button>
                                                            </div>
                                                        </div>


                                                    </form>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div >

                <footer className="footer">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center">
                                    <p className="mb-0">&copy; {new Date().getFullYear()} Odorbn.
                                        {/* Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand */}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer>

            </div >
        </React.Fragment >
    );
};

export default CoverSigninAdmin;
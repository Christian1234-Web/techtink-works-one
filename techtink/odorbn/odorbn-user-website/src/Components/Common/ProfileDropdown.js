import React, { useEffect, useState, useContext, useCallback, memo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { TOKEN_COOKIE, USER_COOKIE } from '../../services/constants';
import SSRStorage from '../../services/storage';
import { Store } from '../../services/store';
//import images
import avatar1 from "../../assets/images/users/user-dummy-img.jpg";
import { request } from '../../services/utilities';
const storage = new SSRStorage();

const ProfileDropdown = () => {
    const store = useContext(Store);
    let [optician_countdown, setOptician_countdown] = store.optician_countdown;
    const [passport] = store.passport;
    const [user_type, setUser_type] = store.user_type;
    const [, setUser] = store.user;
    const [adminType, setAdminType] = store.adminType;
    const [aUser, setAUser] = useState([]);
    const [username, setUsername] = store.username;
    const history = useHistory();
    let [count, setCount] = useState(20);

    //Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };
    const handleUserName = useCallback(async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        try {
            const url = `users/${user.id}`;
            const rs = await request(url, 'GET', true);
            console.log(rs.data);
            setAUser(rs.data);
            setUser(rs.data);
            console.log('dsjdsk');

            setUsername(rs.data.firstName);
            setUser_type(rs.data.type);
            setAdminType(rs.data.userType);
        }
        catch (err) {
            console.log(err);
        }
    }, [setAUser, setAdminType, setUser_type, setUsername]);
    const logOut = () => {
        if (user_type === 'indexing') {
            storage.removeItem(USER_COOKIE);
            storage.removeItem(TOKEN_COOKIE);
            return history.push(`/indexing-login`);
        }
        else if (user_type === 'superadmin' || user_type === 'admin' || user_type === 'hod' || user_type === 'sd') {
            storage.removeItem(USER_COOKIE);
            storage.removeItem(TOKEN_COOKIE);
            return history.push(`/admin-login`);
        }
        else {
            storage.removeItem(USER_COOKIE);
            storage.removeItem(TOKEN_COOKIE);
            return history.push(`/signin#${user_type}`);
        }
    }

    useEffect(() => {
        handleUserName();
    }, [handleUserName]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(seconds => seconds - 1);
            // setOptician_countdown(seconds => seconds - 1);
            if (count <= 0) {
                setOptician_countdown("Expired");
                // counting();
                // clearInterval(counting);
            } else {
                setOptician_countdown(`0d 0h 0m ${count}s `);
            }
        }, 1000);

        // console.log();

        return () => clearInterval(interval);
    }, [optician_countdown]);


    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={passport === null || passport === undefined || passport === '' || passport === '[NULL]' ? avatar1 : passport}
                            alt="Header Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text text-capitalize">{username ? username : ''} </span>
                        </span>
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <h6 className="dropdown-header">{username ? username : 'User'}!</h6>
                    {user_type !== null ?
                        <DropdownItem onClick={() => logOut()}><i
                            className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                                className="align-middle" data-key="t-logout" >Logout</span></DropdownItem>
                        : <Link to={'/signin'}>
                            <DropdownItem><i
                                className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                                    className="align-middle" data-key="t-logout" >Logout</span></DropdownItem>
                        </Link>}
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default memo(ProfileDropdown);
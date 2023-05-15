import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { TOKEN_COOKIE, USER_COOKIE } from '../../../../services/constants';
import SSRStorage from '../../../../services/storage';
import { Store } from '../../../../services/store';
//import images
import avatar1 from "../../../../assets/images/users/user-dummy-img.jpg";
import { request } from '../../../../services/utilities';
const storage = new SSRStorage();

const ProfileDropdown = () => {
    const store = useContext(Store);
    const [, setUser_type] = store.user_type;
    const [, setAdminType] = store.adminType;
    const [passport] = store.passport;

    const [username, setUsername] = store.username;

    const history = useHistory();
    //Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };
    const handleUserName = useCallback(async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        try {
            const url = `users/${user.id}`
            const rs = await request(url, 'GET', true);
            // console.log(rs);
            setUsername(rs.data.firstName);
            setUser_type(rs.data.type);
            setAdminType(rs.data.userType);
        }
        catch (err) { 
            console.log(err)
        }
    }, [setUser_type, setUsername, setAdminType])
    console.log(passport)

    const logOut = () => {
        storage.removeItem(USER_COOKIE);
        storage.removeItem(TOKEN_COOKIE);
        history.push(`/admin-login`);
    }
    // setTimeout(handleUserName, 5000);

    useEffect(() => {
        handleUserName();
    }, [handleUserName])

    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={avatar1}
                            alt="Header Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text text-capitalize">{username ? username : 'Admin'}</span>
                            <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">Founder</span>
                        </span>
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">

                    <h6 className="dropdown-header">{username ? username : 'Admin'}!</h6>
                    <DropdownItem onClick={() => logOut()}><i
                        className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle" data-key="t-logout" >Logout</span></DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Nav,
	NavItem,
	NavLink,
	UncontrolledTooltip,
	Dropdown,
	DropdownItem,
	DropdownToggle,
	DropdownMenu,
} from 'reactstrap';
import classnames from 'classnames';
import { connect, useDispatch, useSelector } from 'react-redux';

import { setActiveTab, changeLayoutMode } from '../../reducers/actions';

//Import Images
import logo from '../../assets/images/logo_.svg';
import { socket } from '../../pages/Chat/socket';
//i18n
import { updateRecentChat } from '../../reducers/chat/actions';

function LeftSidebarMenu(props) {
	const dispatch = useDispatch();
	const { layoutMode } = useSelector(state => ({
		layoutMode: state.Layout.layoutMode,
	}));
	let update_recent_chat_list = useSelector(state => state.Chat.recent_chat);

	const mode = layoutMode === 'dark' ? 'light' : 'dark';

	const onChangeLayoutMode = value => {
		if (changeLayoutMode) {
			dispatch(changeLayoutMode(value));
		}
	};

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [dropdownOpen2, setDropdownOpen2] = useState(false);
	const [dropdownOpenMobile, setDropdownOpenMobile] = useState(false);
	const [lng, setlng] = useState('English');

	const toggle = () => setDropdownOpen(!dropdownOpen);
	const toggle2 = () => setDropdownOpen2(!dropdownOpen2);
	const toggleMobile = () => setDropdownOpenMobile(!dropdownOpenMobile);
	const toggleTab = tab => {
		props.setActiveTab(tab);
	};

	const activeTab = props.activeTab;

	/* changes language according to clicked language menu item */
	const changeLanguageAction = lng => {
		/* set the selected language to i18n */
		// i18n.changeLanguage(lng);
		if (lng === 'sp') setlng('Spanish');
		else if (lng === 'gr') setlng('German');
		else if (lng === 'rs') setlng('Russian');
		else if (lng === 'it') setlng('Italian');
		else if (lng === 'eng') setlng('English');
	};
	const addOne = () => {
		let num = 0;

		return num++;
	};
	return (
		<React.Fragment>
			<div className="side-menu flex-lg-column me-lg-1">
				{/* LOGO */}
				<div className="navbar-brand-box">
					<Link to="#" className="logo logo-dark">
						<span className="logo-sm">
							<img src={logo} alt="logo" height="30" />
						</span>
					</Link>

					<Link to="#" className="logo logo-light">
						<span className="logo-sm">
							<img src={logo} alt="logo" height="30" />
						</span>
					</Link>
				</div>
				{/* end navbar-brand-box  */}

				{/* Start side-menu nav */}
				<div className="flex-lg-column my-auto">
					<Nav
						pills
						className="side-menu-nav justify-content-center"
						role="tablist"
					>
						<NavItem id="profile">
							<NavLink
								id="pills-user-tab"
								href="#profile"
								className={classnames({ active: activeTab === 'profile' })}
								onClick={() => {
									toggleTab('profile');
								}}
							>
								<i className="ri-user-2-line"></i>
							</NavLink>
						</NavItem>
						<UncontrolledTooltip target="profile" placement="top">
							Profile
						</UncontrolledTooltip>
						<NavItem
							id="Chats"
							onClick={() =>
								dispatch(updateRecentChat(update_recent_chat_list + 1))
							}
						>
							<NavLink
								id="pills-chat-tab"
								href="#chat"
								className={classnames({ active: activeTab === 'chat' })}
								onClick={() => {
									toggleTab('chat');
								}}
							>
								<i className="ri-message-3-line"></i>
							</NavLink>
						</NavItem>
						<UncontrolledTooltip target="Chats" placement="top">
							Chats
						</UncontrolledTooltip>
						<NavItem id="Groups">
							<NavLink
								id="pills-groups-tab"
								href="#groups"
								className={classnames({ active: activeTab === 'group' })}
								onClick={() => {
									toggleTab('group');
								}}
							>
								<i className="ri-group-line"></i>
							</NavLink>
						</NavItem>
						<UncontrolledTooltip target="Groups" placement="top">
							Groups
						</UncontrolledTooltip>
						<NavItem id="Contacts">
							<NavLink
								id="pills-contacts-tab"
								href="#contacts"
								className={classnames({ active: activeTab === 'contacts' })}
								onClick={() => {
									toggleTab('contacts');
								}}
							>
								<i className="ri-contacts-line"></i>
							</NavLink>
						</NavItem>
						<UncontrolledTooltip target="Contacts" placement="top">
							Contacts
						</UncontrolledTooltip>
						<NavItem id="Settings">
							<NavLink
								id="pills-setting-tab"
								href="#settings"
								className={classnames({ active: activeTab === 'settings' })}
								onClick={() => {
									toggleTab('settings');
								}}
							>
								<i className="ri-settings-2-line"></i>
							</NavLink>
						</NavItem>
						<UncontrolledTooltip target="Settings" placement="top">
							Settings
						</UncontrolledTooltip>
						<Dropdown
							nav
							isOpen={dropdownOpenMobile}
							toggle={toggleMobile}
							className="profile-user-dropdown d-inline-block d-lg-none dropup"
						>
							<DropdownToggle nav>
								<img
									src={'avatar1'}
									alt="chatvia"
									className="profile-user rounded-circle"
								/>
							</DropdownToggle>
							<DropdownMenu className="dropdown-menu-end">
								<DropdownItem
									onClick={() => {
										toggleTab('profile');
									}}
								>
									Profile{' '}
									<i className="ri-profile-line float-end text-muted"></i>
								</DropdownItem>
								<DropdownItem
									onClick={() => {
										toggleTab('settings');
									}}
								>
									Setting{' '}
									<i className="ri-settings-3-line float-end text-muted"></i>
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem href="/logout">
									Log out{' '}
									<i className="ri-logout-circle-r-line float-end text-muted"></i>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</Nav>
				</div>
				{/* end side-menu nav */}

				<div className="flex-lg-column d-none d-lg-block">
					<Nav className="side-menu-nav justify-content-center">
						<Dropdown
							nav
							isOpen={dropdownOpen2}
							className="btn-group dropup profile-user-dropdown"
							toggle={toggle2}
						>
							<DropdownToggle nav>
								<i className="ri-global-line"></i>
							</DropdownToggle>
							{/* <DropdownMenu>
                                <DropdownItem onClick={() => changeLanguageAction('eng')} active={lng === "English"}>
                                    <img src={usFlag} alt="user" className="me-1" height="12" /> <span className="align-middle">English</span>
                                </DropdownItem>

                                <DropdownItem onClick={() => changeLanguageAction('sp')} active={lng === "Spanish"}>
                                    <img src={spain} alt="user" className="me-1" height="12" /> <span className="align-middle">Spanish</span>
                                </DropdownItem>

                                <DropdownItem onClick={() => changeLanguageAction('gr')} active={lng === "German"}>
                                    <img src={germany} alt="user" className="me-1" height="12" /> <span className="align-middle">German</span>
                                </DropdownItem>

                                <DropdownItem onClick={() => changeLanguageAction('it')} active={lng === "Italian"}>
                                    <img src={italy} alt="user" className="me-1" height="12" /> <span className="align-middle">Italian</span>
                                </DropdownItem>

                                <DropdownItem onClick={() => changeLanguageAction('rs')} active={lng === "Russian"}>
                                    <img src={russia} alt="user" className="me-1" height="12" /> <span className="align-middle">Russian</span>
                                </DropdownItem>
                            </DropdownMenu> */}
						</Dropdown>
						<li className="nav-item">
							<NavLink id="light-dark" onClick={() => onChangeLayoutMode(mode)}>
								<i className="ri-sun-line theme-mode-icon"></i>
							</NavLink>
							<UncontrolledTooltip target="light-dark" placement="right">
								Dark / Light Mode
							</UncontrolledTooltip>
						</li>
						<Dropdown
							nav
							isOpen={dropdownOpen}
							className="nav-item btn-group dropup profile-user-dropdown online"
							toggle={toggle}
						>
							<DropdownToggle className="nav-link" tag="a">
								<div className="avatar-xs mx-auto d-block chat-user-img online">
									<img
										src={'avatar1'}
										alt=""
										className="profile-user rounded-circle"
									/>
									{socket.connected === true ? (
										<>
											{' '}
											<span
												style={{ left: '100%', top: '120%' }}
												className="user-status"
											></span>
										</>
									) : (
										''
									)}
								</div>
							</DropdownToggle>
							<DropdownMenu>
								<DropdownItem
									onClick={() => {
										toggleTab('profile');
									}}
								>
									Profile{' '}
									<i className="ri-profile-line float-end text-muted"></i>
								</DropdownItem>
								<DropdownItem
									onClick={() => {
										toggleTab('settings');
									}}
								>
									Setting{' '}
									<i className="ri-settings-3-line float-end text-muted"></i>
								</DropdownItem>
								<DropdownItem divider />
							</DropdownMenu>
						</Dropdown>
					</Nav>
				</div>
				{/* Side menu user */}
			</div>
		</React.Fragment>
	);
}

const mapStatetoProps = state => {
	return {
		...state.Layout,
	};
};

export default connect(mapStatetoProps, {
	setActiveTab,
})(LeftSidebarMenu);

import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Badge, Alert } from 'reactstrap';

//Simple bar
import SimpleBar from 'simplebar-react';

//components
import AttachedFiles from './AttachedFiles';
import CustomCollapse from './CustomCollapse';

//actions
import { closeUserSidebar } from '../../reducers/actions';

//i18n
import { useTranslation } from 'react-i18next';
// import { sortedContacts } from './SelectContact';
//image
import { request, staffname } from '../../services/utilities';
import SelectContact from './SelectContact';

let sortedContacts = [
	{
		group: 'A',
		children: [{ id: 0, name: 'Demo' }],
	},
];

function UserProfileSidebar(props) {
	const [isOpen1, setIsOpen1] = useState(true);
	const [isOpen2, setIsOpen2] = useState(false);
	const [isOpen3, setIsOpen3] = useState(false);
	const [members, setMembers] = useState(null);
	const [groupMembers, setGroupMembers] = useState([]);

	const [selectedContact, setSelectedContact] = useState([]);
	const [isOpenAlertSuccess, setIsOpenAlertSuccess] = useState(false);
	const [isOpenAlert, setIsOpenAlert] = useState(false);
	const [note, setNote] = useState('');

	const [files] = useState([
		{ name: 'Admin-A.zip', size: '12.5 MB', thumbnail: 'ri-file-text-fill' },
		{ name: 'Image-1.jpg', size: '4.2 MB', thumbnail: 'ri-image-fill' },
		{ name: 'Image-2.jpg', size: '3.1 MB', thumbnail: 'ri-image-fill' },
		{ name: 'Landing-A.zip', size: '6.7 MB', thumbnail: 'ri-file-text-fill' },
	]);

	/* intilize t variable for multi language implementation */
	const { t } = useTranslation();

	const toggleCollapse1 = () => {
		setIsOpen1(!isOpen1);
		setIsOpen2(false);
		setIsOpen3(false);
	};

	const toggleCollapse2 = () => {
		setIsOpen2(!isOpen2);
		setIsOpen1(false);
		setIsOpen3(false);
	};

	const toggleCollapse3 = () => {
		setIsOpen3(!isOpen3);
		setIsOpen1(false);
		setIsOpen2(false);
	};
	const handleCheck = (e, contactId) => {
		var selected = selectedContact;
		if (e.target.checked) {
			let x = selected.find(x => x === contactId);
			if (!x) {
				selected.push(contactId);
				setSelectedContact(selected);
			}
		}
	};

	const removeMember = async () => {
		try {
			if (selectedContact.length >= 1) {
				const url_contact = `messages/chat/room/user/remove`;
				let data_contact = { room_id: members?.id, ids: selectedContact };
				const rsad = await request(url_contact, 'POST', true, data_contact);
				setNote('Remove successfully!!!');
				setSelectedContact([]);
				toggleCollapse3();
				setIsOpenAlertSuccess(true);
				fetchGroupMembers();
			} else if (selectedContact.length === 1) {
				setNote('Minimum 1 members required!!!');
				setIsOpenAlertSuccess(false);
				setIsOpenAlert(true);
			} else {
				setNote('Please Select Members!!!');
				setIsOpenAlertSuccess(false);
				setIsOpenAlert(true);
			}
			setTimeout(function () {
				setIsOpenAlert(false);
				setIsOpenAlertSuccess(false);
			}, 3000);
		} catch (err) {
			console.log(err);
		}
	};
	const addMember = async () => {
		try {
			if (selectedContact.length >= 1) {
				const url_contact = `messages/chat/room/user/add`;
				let data_contact = { room_id: members?.id, ids: selectedContact };
				const rsad = await request(url_contact, 'POST', true, data_contact);
				setNote('Added successfully!!!');
				setSelectedContact([]);
				toggleCollapse2();
				setIsOpenAlertSuccess(true);
				fetchGroupMembers();
			} else if (selectedContact.length === 1) {
				setNote('Minimum 1 members required!!!');
				setIsOpenAlertSuccess(false);
				setIsOpenAlert(true);
			} else {
				setNote('Please Select Members!!!');
				setIsOpenAlertSuccess(false);
				setIsOpenAlert(true);
			}
			setTimeout(function () {
				setIsOpenAlert(false);
				setIsOpenAlertSuccess(false);
			}, 3000);
		} catch (err) {
			console.log(err);
		}
	};
	// closes sidebar
	const closeuserSidebar = () => {
		props.closeUserSidebar();
	};
	let isTyping = false;
	let unRead = 0;
	let status = 'away';
	let isGroup = true;
	const time = new Date().toLocaleTimeString();

	const fetchGroupMembers = useCallback(async () => {
		if (props.active_group) {
			try {
				const url = `messages/chat/rooms?room_id=${props.active_group}`;
				const rs = await request(url, 'GET', true);
				setMembers(rs.result);
				let data = rs.result?.staffs?.reduce((r, e) => {
					try {
						let group = e.first_name[0].toUpperCase();
						if (!r[group]) r[group] = { group, children: [e] };
						else r[group].children.push(e);
					} catch (error) {
						console.log(error);
						return sortedContacts;
					}
					return r;
				}, {});
				let result = Object.values(data);
				result.sort(function (a, b) {
					return a.group.localeCompare(b.group);
				});
				setGroupMembers(result);
				sortedContacts = result;
			} catch (err) {
				console.log(err);
			}
		}
	}, [props.active_group]);

	useEffect(() => {
		fetchGroupMembers();
	}, [fetchGroupMembers]);
	return (
		<React.Fragment>
			<div
				style={{ display: props.userSidebar === true ? 'block' : 'none' }}
				className="user-profile-sidebar"
			>
				<div className="px-3 px-lg-4 pt-3 pt-lg-4">
					<div className="user-chat-nav  text-end">
						<Button
							color="none"
							type="button"
							onClick={closeuserSidebar}
							className="nav-btn"
							id="user-profile-hide"
						>
							<i className="ri-close-line"></i>
						</Button>
					</div>
				</div>
				{props.active_group === 0 ? (
					<div>
						<div className="text-center p-4 border-bottom">
							<div className="mb-4 d-flex justify-content-center">
								{props.activeUser?.profile_pic === null ? (
									<div className="avatar-lg">
										<span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-24 text-capitalize">
											{props.activeUser?.first_name.charAt(0)}
										</span>
									</div>
								) : (
									<img
										src={props.activeUser?.profile_pic}
										className="rounded-circle avatar-lg img-thumbnail"
										alt="chatvia"
									/>
								)}
							</div>

							<h5 className="font-size-16 mb-1 text-truncate text-capitalize">
								{staffname(props?.activeUser)}
							</h5>
							<p className="text-muted text-truncate mb-1">
								{(() => {
									switch ('Online') {
										case 'online':
											return (
												<>
													<i className="ri-record-circle-fill font-size-10 text-success me-1"></i>
												</>
											);

										case 'away':
											return (
												<>
													<i className="ri-record-circle-fill font-size-10 text-warning me-1"></i>
												</>
											);

										case 'offline':
											return (
												<>
													<i className="ri-record-circle-fill font-size-10 text-secondary me-1"></i>
												</>
											);

										default:
											return;
									}
								})()}
								Active
							</p>
						</div>
						<SimpleBar
							style={{ maxHeight: '100%' }}
							className="p-4 user-profile-desc"
						>
							<div id="profile-user-accordion" className="custom-accordion">
								<Card className="shadow-none border mb-2">
									{/* import collaps */}
									<CustomCollapse
										title="About"
										iconClass="ri-user-2-line"
										isOpen={isOpen1}
										toggleCollapse={toggleCollapse1}
									>
										<div>
											<p className="text-muted mb-1">{t('Name')}</p>
											<h5 className="font-size-14">
												{staffname(props?.activeUser)}{' '}
											</h5>
										</div>

										<div className="mt-4">
											<p className="text-muted mb-1">{t('Email')}</p>
											<h5 className="font-size-14">
												{props.activeUser?.email || '--'}
											</h5>
										</div>

										<div className="mt-4">
											<p className="text-muted mb-1">{t('Time')}</p>
											<h5 className="font-size-14">{time}</h5>
										</div>

										<div className="mt-4">
											<p className="text-muted mb-1">{t('Location')}</p>
											<h5 className="font-size-14 mb-0">
												{props.activeUser?.address || '--'}
											</h5>
										</div>
									</CustomCollapse>
								</Card>
								{/* End About card */}

								<Card className="mb-1 shadow-none border">
									{/* import collaps */}
									<CustomCollapse
										title="Attached Files"
										iconClass="ri-attachment-line"
										isOpen={isOpen2}
										toggleCollapse={toggleCollapse2}
									>
										{/* attached files */}
										<AttachedFiles files={files} />
									</CustomCollapse>
								</Card>

								{isGroup === true && (
									<Card className="mb-1 shadow-none border">
										{/* import collaps */}
										<CustomCollapse
											title="Members"
											iconClass="ri-group-line"
											isOpen={isOpen3}
											toggleCollapse={toggleCollapse3}
										>
											<Card className="p-2 mb-2">
												<div className="d-flex align-items-center">
													<div className="chat-user-img align-self-center me-3">
														<div className="avatar-xs">
															<span className="avatar-title rounded-circle bg-soft-primary text-primary">
																S
															</span>
														</div>
													</div>
													<div>
														<div className="text-left">
															<h5 className="font-size-14 mb-1">
																{t('Sara Muller')}
																<Badge
																	color="danger"
																	className="badge-soft-danger float-end"
																>
																	{t('Admin')}
																</Badge>
															</h5>
															{/* <p className="text-muted font-size-13 mb-0">{member.status}</p> */}
														</div>
													</div>
												</div>
											</Card>

											<Card className="p-2 mb-2">
												<div className="d-flex align-items-center">
													<div className="chat-user-img align-self-center me-3">
														<div className="avatar-xs">
															<span className="avatar-title rounded-circle bg-soft-primary text-primary">
																O
															</span>
														</div>
													</div>
													<div>
														<div className="text-left">
															<h5 className="font-size-14 mb-1">
																{t('Ossie Wilson')}
															</h5>
															{/* <p className="text-muted font-size-13 mb-0">{member.status}</p> */}
														</div>
													</div>
												</div>
											</Card>

											<Card className="p-2 mb-2">
												<div className="d-flex align-items-center">
													<div className="chat-avatar">
														<img
															src={'avatar7'}
															className="rounded-circle chat-user-img avatar-xs me-3"
															alt="chatvia"
														/>
													</div>
													<div>
														<div className="text-left">
															<h5 className="font-size-14 mb-1">
																{t('Paul Haynes')}
															</h5>
															{/* <p className="text-muted font-size-13 mb-0">{member.status}</p> */}
														</div>
													</div>
												</div>
											</Card>
										</CustomCollapse>
									</Card>
								)}
							</div>
						</SimpleBar>
					</div>
				) : (
					<div>
						<div className="text-center p-4 border-bottom">
							<div className="mb-4 d-flex justify-content-center">
								{members?.old_id === null ? (
									<div className="avatar-lg">
										<span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-24">
											{members?.name.charAt(0)}
										</span>
									</div>
								) : (
									<img
										src={members?.name}
										className="rounded-circle avatar-lg img-thumbnail"
										alt="chatvia"
									/>
								)}
							</div>

							<h5 className="font-size-16 mb-1 text-truncate">
								{members?.name}
							</h5>
							<p className="text-muted text-truncate mb-1">
								{(() => {
									switch (status) {
										case 'online':
											return (
												<>
													<i className="ri-record-circle-fill font-size-10 text-success me-1"></i>
												</>
											);

										case 'away':
											return (
												<>
													<i className="ri-record-circle-fill font-size-10 text-warning me-1"></i>
												</>
											);

										case 'offline':
											return (
												<>
													<i className="ri-record-circle-fill font-size-10 text-secondary me-1"></i>
												</>
											);

										default:
											return;
									}
								})()}
								Active
							</p>
						</div>
						<SimpleBar
							style={{ maxHeight: '100%' }}
							className="p-4 user-profile-desc"
						>
							<div className="text-muted">
								<p className="mb-4">{t(members?.description)}</p>
							</div>
							<Alert isOpen={isOpenAlert} color="danger">
								{note}
							</Alert>
							<Alert isOpen={isOpenAlertSuccess} color="success">
								{note}
							</Alert>
							<div id="profile-user-accordion" className="custom-accordion">
								<Card className="mb-1 shadow-none border">
									{/* import collaps */}
									<CustomCollapse
										title="Add Members"
										iconClass="ri-group-line"
										isOpen={isOpen2}
										toggleCollapse={toggleCollapse2}
									>
										<span
											onClick={addMember}
											className="text-center"
											style={{
												border: '1px solid #e6e9ec',
												borderRadius: '50%',
												width: '7%',
												float: 'right',
												cursor: 'pointer',
											}}
										>
											{' '}
											<i className="ri-add-line"></i>
										</span>
										{/* attached files */}
										<SelectContact handleCheck={handleCheck} />
									</CustomCollapse>
								</Card>

								<Card className="mb-1 shadow-none border">
									{/* import collaps */}
									<CustomCollapse
										title="Members"
										iconClass="ri-group-line"
										isOpen={isOpen3}
										toggleCollapse={toggleCollapse3}
									>
										<span
											onClick={removeMember}
											className="text-center"
											style={{
												border: '1px solid #e6e9ec',
												borderRadius: '50%',
												width: '7%',
												float: 'right',
												cursor: 'pointer',
											}}
										>
											{' '}
											<i className="icon-feather-minus-circle"></i>
										</span>
										{groupMembers?.map(e => {
											return (
												<Card className="p-2 mb-2" key={e.group + 'key'}>
													<div>
														<div className="p-3 font-weight-bold text-primary">
															{e.group}
														</div>

														<ul className="list-unstyled contact-list">
															{e.children.map((child, keyChild) => (
																<li key={keyChild}>
																	<div className="form-check">
																		<input
																			type="checkbox"
																			className="form-check-input"
																			onChange={e => handleCheck(e, child.id)}
																			id={'memberCheck' + child.id}
																			value={child.name}
																		/>
																		<label
																			className="form-check-label"
																			htmlFor={'memberCheck' + child.id}
																		>
																			{staffname(child)}
																		</label>
																	</div>
																</li>
															))}
														</ul>
													</div>
												</Card>
											);
										})}
									</CustomCollapse>
								</Card>
							</div>
						</SimpleBar>
					</div>
				)}
			</div>
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	const { users, active_user, active_group } = state.Chat;
	const { userSidebar } = state.Layout;
	return { users, active_user, userSidebar, active_group };
};

export default connect(mapStateToProps, { closeUserSidebar })(
	UserProfileSidebar
);

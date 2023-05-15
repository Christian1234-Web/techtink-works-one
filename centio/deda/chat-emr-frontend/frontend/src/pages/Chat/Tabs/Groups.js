import React, { Component } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	UncontrolledTooltip,
	Form,
	Label,
	Input,
	Collapse,
	CardHeader,
	CardBody,
	Alert,
	InputGroup,
	Card,
	Badge,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ModalHeaderx from '../../../components/ModalHeader';

import { withTranslation } from 'react-i18next';

//simple bar
import SimpleBar from 'simplebar-react';

//components
import SelectContact from '../../../components/Chat/SelectContact';

//actions
import { activeGroup, getGroups } from '../../../reducers/actions';
import { request } from '../../../services/utilities';

class Groups extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			isOpenCollapse: false,
			groups: this.props.groups,
			chatGroups: this.props.chatGroups,
			selectedContact: [],
			isOpenAlert: false,
			message: '',
			groupName: '',
			groupDesc: '',
			show: 'none',
		};
		this.toggle = this.toggle.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.openUserChat = this.openUserChat.bind(this);
		this.fetchGroups = this.fetchGroups.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.toggleCollapse = this.toggleCollapse.bind(this);
		this.addRoom = this.addRoom.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.handleChangeGroupName = this.handleChangeGroupName.bind(this);
		this.handleChangeGroupDesc = this.handleChangeGroupDesc.bind(this);
	}

	toggle() {
		this.setState({ modal: !this.state.modal });
	}
	toggleModal() {
		this.setState({ show: 'block' });
	}
	closeModal() {
		this.setState({ show: 'none' });
	}

	toggleCollapse() {
		this.setState({ isOpenCollapse: !this.state.isOpenCollapse });
		document.body.classList.add('modal-open');
	}
	componentDidMount() {
		this.fetchGroups();
	}
	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			this.setState({ chatGroups: this.props.chatGroups });
		}
	}

	async addRoom() {
		try {
			if (this.state.selectedContact.length >= 2) {
				let data = {
					name: this.state.groupName,
					user_id: this.props.loggedUser,
				};
				const url = `messages/chat/rooms/add`;
				const url_contact = `messages/chat/room/user/add`;
				const rs = await request(url, 'POST', true, data);
				let data_contact = {
					room_id: rs?.data?.id,
					ids: this.state.selectedContact,
				};
				const rsad = await request(url_contact, 'POST', true, data_contact);
				if (rsad.success === true) {
					this.fetchGroups();
				}
				this.closeModal();
			} else if (this.state.selectedContact.length === 1) {
				this.setState({
					message: 'Minimum 2 members required!!!',
					isOpenAlert: true,
				});
			} else {
				this.setState({
					message: 'Please Select Members!!!',
					isOpenAlert: true,
				});
			}
			setTimeout(
				function () {
					this.setState({ isOpenAlert: false });
				}.bind(this),
				3000
			);
		} catch (err) {
			console.log(err);
		}
	}
	async fetchGroups() {
		try {
			const url = `messages/chat/rooms?room_id=`;
			const rs = await request(url, 'GET', true);
			if (rs.success === true) {
				let activeG = rs.result.filter(e => e.deletedBy === null);
				this.props.getGroups(activeG);
				this.setState({ chatGroups: activeG });
			}
		} catch (err) {
			console.log(err);
		}
	}

	openUserChat(room) {
		this.props.activeGroup(room);
	}
	// not using this

	handleCheck(e, contactId) {
		var selected = this.state.selectedContact;
		if (e.target.checked) {
			let x = selected.find(x => x === contactId);
			if (!x) {
				selected.push(contactId);
				this.setState({ selectedContact: selected });
			}
		}
	}

	handleChangeGroupName(e) {
		this.setState({ groupName: e.target.value });
	}

	handleChangeGroupDesc(e) {
		this.setState({ groupDesc: e.target.value });
	}

	render() {
		const { t } = this.props;
		const { show, chatGroups } = this.state;
		const isNew = true;
		const unRead = 10;
		return (
			<React.Fragment>
				<div
					className="onboarding-modal modal fade animated show body"
					role="dialog"
					style={{ display: show }}
				>
					<div className="modal-dialog modal-md modal-centered">
						<div className="modal-content text-center modal-scroll">
							<ModalHeaderx
								title="Create New Group"
								closeModal={this.closeModal}
							/>
							<div className="onboarding-content with-gradient">
								{/* Start add group Modal */}
								<ModalBody className="p-4">
									<Form>
										<div className="mb-4">
											<Label
												className="form-label"
												htmlFor="addgroupname-input"
											>
												{'Group Name'}
											</Label>
											<Input
												type="text"
												className="form-control"
												id="addgroupname-input"
												value={this.state.groupName}
												onChange={e => this.handleChangeGroupName(e)}
												placeholder="Enter Group Name"
											/>
										</div>
										<div className="mb-4">
											<Label className="form-label">{'Group Members'}</Label>
											<Alert isOpen={this.state.isOpenAlert} color="danger">
												{this.state.message}
											</Alert>
											<div className="mb-3">
												<Button
													color="light"
													size="sm"
													type="button"
													onClick={this.toggleCollapse}
												>
													{'Select Members'}
												</Button>
											</div>

											<Collapse
												isOpen={this.state.isOpenCollapse}
												id="groupmembercollapse"
											>
												<Card className="border">
													<CardHeader>
														<h5 className="font-size-15 mb-0">{'Contacts'}</h5>
													</CardHeader>
													<CardBody className="p-2">
														<SimpleBar style={{ maxHeight: '150px' }}>
															{/* contacts */}
															<div id="addContacts">
																<SelectContact handleCheck={this.handleCheck} />
															</div>
														</SimpleBar>
													</CardBody>
												</Card>
											</Collapse>
										</div>
										<div>
											<Label
												className="form-label"
												htmlFor="addgroupdescription-input"
											>
												Description
											</Label>
											<textarea
												className="form-control"
												id="addgroupdescription-input"
												value={this.state.groupDesc}
												onChange={e => this.handleChangeGroupDesc(e)}
												rows="3"
												placeholder="Enter Description"
											></textarea>
										</div>
									</Form>
								</ModalBody>
								<ModalFooter>
									<Button type="button" color="link" onClick={this.toggleModal}>
										{'Close'}
									</Button>
									<Button type="button" color="primary" onClick={this.addRoom}>
										Create Group
									</Button>
								</ModalFooter>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="p-4">
						<div className="user-chat-nav float-end">
							<div id="create-group">
								{/* Button trigger modal */}
								<Button
									onClick={this.toggleModal}
									type="button"
									color="link"
									className="text-decoration-none text-muted font-size-18 py-0"
								>
									<i className="ri-group-line me-1"></i>
								</Button>
							</div>
							<UncontrolledTooltip target="create-group" placement="bottom">
								Create group
							</UncontrolledTooltip>
						</div>
						<h4 className="mb-4">{t('Groups')}</h4>

						<div className="search-box chat-search-box">
							<InputGroup size="lg" className="bg-light rounded-lg">
								<Button
									color="link"
									className="text-decoration-none text-muted pr-1"
									type="button"
								>
									<i className="ri-search-line search-icon font-size-18"></i>
								</Button>
								<Input
									type="text"
									className="form-control bg-light"
									placeholder="Search groups..."
								/>
							</InputGroup>
						</div>
						{/* end search-box */}
					</div>

					{/* Start chat-group-list */}
					<SimpleBar
						style={{ maxHeight: '100%' }}
						className="p-4 chat-message-list chat-group-list"
					>
						<ul className="list-unstyled chat-list">
							{chatGroups?.map((group, key) => (
								<li key={key}>
									<Link to="#" onClick={() => this.openUserChat(group.id)}>
										<div className="d-flex align-items-center">
											<div className="chat-user-img me-3 ms-0">
												<div className="avatar-xs">
													<span className="avatar-title rounded-circle bg-soft-primary text-primary">
														{group.name.charAt(0).toUpperCase()}
													</span>
												</div>
											</div>
											<div className="flex-grow-1 overflow-hidden">
												<h5 className="text-truncate font-size-14 mb-0 text-capitalize">
													{group.name}
													{/* {unRead !== 0 ? (
														<Badge
															color="none"
															pill
															className="badge-soft-danger float-end"
														>
															{unRead >= 20 ? unRead + '+' : unRead}
														</Badge>
													) : null}

													{isNew && (
														<Badge
															color="none"
															pill
															className="badge-soft-danger float-end"
														>
															New
														</Badge>
													)} */}
												</h5>
											</div>
										</div>
									</Link>
								</li>
							))}
						</ul>
					</SimpleBar>
					{/* End chat-group-list */}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	const { groups, chatGroups } = state.Chat;
	return { groups, chatGroups };
};

export default connect(mapStateToProps, { activeGroup, getGroups })(
	withTranslation()(Groups)
);

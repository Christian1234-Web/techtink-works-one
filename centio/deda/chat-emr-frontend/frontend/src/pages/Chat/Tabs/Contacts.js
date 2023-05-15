import React, { Component } from 'react';
import {
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	UncontrolledTooltip,
	Form,
	Label,
	Input,
	InputGroup,
} from 'reactstrap';
import SimpleBar from 'simplebar-react';

import { connect } from 'react-redux';

import { withTranslation } from 'react-i18next';
import { request, staffname } from '../../../services/utilities';
import {
	setconversationNameInOpenChat,
	activeUser,
	activeGroup,
} from '../../../reducers/actions';
//use sortedContacts variable as global variable to sort contacts
let sortedContacts = [
	{
		group: 'A',
		children: [{ name: 'Demo' }],
	},
];

class Contacts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			contacts: this.props.contacts,
			all_contacts: [],
			allcontacts: [],
		};
		this.toggle = this.toggle.bind(this);
		this.fetchContacts = this.fetchContacts.bind(this);
		this.openUserChat = this.openUserChat.bind(this);
	}

	componentDidMount() {
		this.fetchContacts();
	}

	toggle() {
		this.setState({ modal: !this.state.modal });
	}
	openUserChat(chat) {
		// set activeUser
		this.props.activeGroup(0);
		this.props.activeUser(chat?.id);
	}
	async fetchContacts() {
		try {
			const url = `hr/staffs?page=1&limit=500`;
			const rs = await request(url, 'GET', true);
			let data = rs.result.reduce((r, e) => {
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
			this.setState({ all_contacts: result });
			this.setState({ allcontacts: result });

			sortedContacts = result;
		} catch (err) {
			console.log(err);
		}
	}

	async filterUser(e) {
		let sortContacts = this.state.all_contacts;
		if (e) {
			let firstContacts = sortContacts?.filter(
				x => e.split('')[0].toLowerCase() == x.group.toLowerCase()
			);
			this.setState({ all_contacts: firstContacts });
		} else {
			this.setState({ all_contacts: this.state.allcontacts });
		}
	}

	render() {
		const { t } = this.props;
		const { all_contacts } = this.state;

		return (
			<React.Fragment>
				<div>
					<div className="p-4">
						{/* <div className="user-chat-nav float-end">
                            <div id="add-contact"> */}
						{/* Button trigger modal */}
						{/* <Button type="button" color="link" onClick={this.toggle} className="text-decoration-none text-muted font-size-18 py-0">
                                    <i className="ri-user-add-line"></i>
                                </Button>
                            </div> */}
						{/* <UncontrolledTooltip target="add-contact" placement="bottom">
                                Add Contact
                            </UncontrolledTooltip> */}
						{/* </div> */}
						<h4 className="mb-4">Contacts</h4>

						{/* Start Add contact Modal */}
						<Modal isOpen={this.state.modal} centered toggle={this.toggle}>
							<ModalHeader
								tag="h5"
								className="font-size-16"
								toggle={this.toggle}
							>
								{t('Add Contacts')}
							</ModalHeader>
							<ModalBody className="p-4">
								<Form>
									<div className="mb-4">
										<Label
											className="form-label"
											htmlFor="addcontactemail-input"
										>
											{t('Email')}
										</Label>
										<Input
											type="email"
											className="form-control"
											id="addcontactemail-input"
											placeholder="Enter Email"
										/>
									</div>
									<div>
										<Label
											className="form-label"
											htmlFor="addcontact-invitemessage-input"
										>
											{t('Invatation Message')}
										</Label>
										<textarea
											className="form-control"
											id="addcontact-invitemessage-input"
											rows="3"
											placeholder="Enter Message"
										></textarea>
									</div>
								</Form>
							</ModalBody>
							<ModalFooter>
								<Button type="button" color="link" onClick={this.toggle}>
									Close
								</Button>
								<Button type="button" color="primary">
									Invite Contact
								</Button>
							</ModalFooter>
						</Modal>
						{/* End Add contact Modal */}

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
									onChange={e => this.filterUser(e.target.value)}
									placeholder={t('Search users..')}
								/>
							</InputGroup>
						</div>
						{/* End search-box */}
					</div>
					{/* end p-4 */}

					{/* Start contact lists */}
					<SimpleBar
						style={{ maxHeight: '100%' }}
						id="chat-room"
						className="p-4 chat-message-list chat-group-list"
					>
						{all_contacts.map((contact, key) => {
							return (
								<div key={key} className={key + 1 === 1 ? '' : 'mt-3'}>
									<div className="p-3 fw-bold text-primary">
										{contact.group}
									</div>

									<ul className="list-unstyled contact-list">
										{contact.children.map((child, key) => (
											<li key={key} onClick={() => this.openUserChat(child)}>
												<div className="d-flex align-items-center">
													<div className="flex-grow-1">
														<h5 className="font-size-14 m-0">
															{staffname(child)}
														</h5>
													</div>
													<UncontrolledDropdown>
														<DropdownToggle tag="a" className="text-muted">
															<i className="ri-more-2-fill"></i>
														</DropdownToggle>
														<DropdownMenu className="dropdown-menu-end">
															<DropdownItem>
																{t('Share')}{' '}
																<i className="ri-share-line float-end text-muted"></i>
															</DropdownItem>
															<DropdownItem>
																{t('Block')}{' '}
																<i className="ri-forbid-line float-end text-muted"></i>
															</DropdownItem>
															<DropdownItem>
																{t('Remove')}{' '}
																<i className="ri-delete-bin-line float-end text-muted"></i>
															</DropdownItem>
														</DropdownMenu>
													</UncontrolledDropdown>
												</div>
											</li>
										))}
									</ul>
								</div>
							);
						})}
					</SimpleBar>
					{/* end contact lists */}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	const { contacts } = state.Chat;

	return { contacts };
};

export default connect(mapStateToProps, { activeUser, activeGroup })(
	withTranslation()(Contacts)
);

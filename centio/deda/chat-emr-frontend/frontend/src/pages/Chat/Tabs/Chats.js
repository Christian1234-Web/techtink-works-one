import React, { Component } from 'react';
import { Input, InputGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//simplebar
import SimpleBar from 'simplebar-react';

//actions
import {
	setconversationNameInOpenChat,
	activeUser,
	activeGroup,
} from '../../../reducers/actions';

//components
import OnlineUsers from './OnlineUsers';
import { request, staffname } from '../../../services/utilities';

class Chats extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchChat: '',
			recent_chat: this.props.recent_chat,
			chat: [],
		};
		this.handleChange = this.handleChange.bind(this);
		this.openUserChat = this.openUserChat.bind(this);
	}

	componentDidMount() {
		this.fetchRecipient();
		var li = document.getElementById('conversation' + this.props.active_user);
		if (li) {
			li.classList.add('active');
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			this.fetchRecipient();
		}
	}

	// componentWillReceiveProps(nextProps) {
	// if (this.props.recentChatList !== nextProps.recentChatList) {
	//     this.setState({
	//         recentChatList: nextProps.recentChatList,
	//     });
	// }
	// }

	async fetchRecipient() {
		try {
			const url = `messages/chat/recipients?sender_id=${this.props?.loggedUser?.id}`;
			const rs = await request(url, 'GET', true);
			this.setState({ chat: rs.result });
		} catch (err) {
			console.log(err);
		}
	}
	handleChange(e) {
		this.setState({ searchChat: e.target.value });
		var search = e.target.value;
		let conversation = this.state.chat;
		let filteredArray = [];

		//find conversation name from array
		for (let i = 0; i < conversation.length; i++) {
			if (
				conversation[i].first_name.toLowerCase().includes(search) ||
				conversation[i].last_name.toUpperCase().includes(search)
			)
				filteredArray.push(conversation[i]);
		}

		//set filtered items to state
		if (filteredArray.length >= 1) {
			this.setState({ chat: filteredArray });
		}
		//if input value is blanck then assign whole recent chatlist to array
		if (search === '') this.setState({ chat: this.state.chat });
	}

	openUserChat(e, chat) {
		e.preventDefault();
		this.props.activeGroup(0);
		this.props.activeUser(chat.id);
	}

	render() {
		const { chat } = this.state;
		let isTyping = false;
		let unRead = 0;
		let status = 'away';
		const checkUnread = msg => {
			let msgr = msg.filter(e => e.is_read === false);
			return msgr.length;
		};
		return (
			<React.Fragment>
				<div>
					<div className="px-4 pt-4">
						<h4 className="mb-4">Chats</h4>
						<div className="search-box chat-search-box">
							<InputGroup size="lg" className="mb-3 rounded-lg">
								<span
									className="input-group-text text-muted bg-light pe-1 ps-3"
									id="basic-addon1"
								>
									<i className="ri-search-line search-icon font-size-18"></i>
								</span>
								<Input
									type="text"
									value={this.state.searchChat}
									onChange={e => this.handleChange(e)}
									className="form-control bg-light"
									placeholder="Search users"
								/>
							</InputGroup>
						</div>
						{/* Search Box */}
					</div>

					{/* online users */}
					<OnlineUsers activeChat={chat} />

					{/* Start chat-message-list  */}
					<div className="px-2">
						<h5 className="mb-3 px-3 font-size-16">Recent</h5>
						<SimpleBar
							style={{ maxHeight: '100%' }}
							className="chat-message-list"
						>
							<ul
								className="list-unstyled chat-list chat-user-list"
								id="chat-list"
							>
								{chat?.map((chat, key) => (
									<li
										key={key}
										id={'conversation' + key}
										className={
											chat.is_read
												? 'unread'
												: isTyping
												? 'typing'
												: key === this.props.active_user
												? 'active'
												: ''
										}
									>
										<Link to="#" onClick={e => this.openUserChat(e, chat)}>
											<div className="d-flex">
												{chat.profile_pic === null ? (
													// status
													<div
														className={
															'chat-user-img ' +
															status +
															' align-self-center me-3 ms-0'
														}
													>
														<div className="avatar-xs">
															<span className="avatar-title rounded-circle bg-soft-primary text-primary">
																{chat.first_name.charAt(0)}
															</span>
														</div>
														{status && <span className="user-status"></span>}
													</div>
												) : (
													<div
														className={
															'chat-user-img ' +
															status +
															' align-self-center me-3 ms-0'
														}
													>
														<div className="avatar-xs">
															<span className="avatar-title rounded-circle bg-soft-primary text-capitalize text-primary">
																{chat.first_name.charAt(0)}
															</span>
														</div>{' '}
														{status && <span className="user-status"></span>}
													</div>
												)}

												<div className="flex-grow-1 overflow-hidden">
													<h5 className="text-truncate font-size-15 mb-1">
														{staffname(chat)}
													</h5>
													<p className="chat-user-message text-truncate mb-0">
														{isTyping ? (
															<>
																typing
																<span className="animate-typing">
																	<span className="dot ms-1"></span>
																	<span className="dot ms-1"></span>
																	<span className="dot ms-1"></span>
																</span>
															</>
														) : (
															<>
																{/* {
                                                                            chat.messages && (chat.messages.length > 0 && chat.messages[(chat.messages).length - 1].isImageMessage === true) ? <i className="ri-image-fill align-middle me-1"></i> : null
                                                                        }
                                                                        {
                                                                            chat.messages && (chat.messages.length > 0 && chat.messages[(chat.messages).length - 1].isFileMessage === true) ? <i className="ri-file-text-fill align-middle me-1"></i> : null
                                                                        } */}
																{chat.messages && chat.messages.length > 0
																	? chat.messages[chat.messages.length - 1].body
																	: null}
															</>
														)}
													</p>
												</div>
												<div className="font-size-11">
													{chat.messages && chat.messages.length > 0
														? new Date(
																chat.messages[
																	chat.messages.length - 1
																].createdAt
														  ).toLocaleTimeString()
														: null}
												</div>
												{checkUnread(chat.messages) === 0 ? null : (
													<div
														className="unread-message"
														id={'unRead' + chat.id}
													>
														<span className="badge badge-soft-danger rounded-pill">
															{chat.messages && chat.messages.length > 0
																? checkUnread(chat.messages) >= 20
																	? checkUnread(chat.messages) + '+'
																	: checkUnread(chat.messages)
																: ''}
														</span>
													</div>
												)}
											</div>
										</Link>
									</li>
								))}
							</ul>
						</SimpleBar>
					</div>
					{/* End chat-message-list */}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	const { active_user, recent_chat } = state.Chat;
	return { active_user, recent_chat };
};

export default connect(mapStateToProps, {
	setconversationNameInOpenChat,
	activeUser,
	activeGroup,
})(Chats);

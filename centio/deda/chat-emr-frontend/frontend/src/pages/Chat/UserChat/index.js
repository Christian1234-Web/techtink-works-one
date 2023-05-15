import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	useMemo,
} from 'react';
import {
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
	UncontrolledDropdown,
	Modal,
	ModalHeader,
	ModalBody,
	CardBody,
	Button,
	ModalFooter,
} from 'reactstrap';
import { connect, useSelector, useDispatch } from 'react-redux';

import SimpleBar from 'simplebar-react';

import { withRouter } from 'react-router-dom';

//Import Components
import UserProfileSidebar from '../../../components/Chat/UserProfileSidebar';
import SelectContact from '../../../components/Chat/SelectContact';
import UserHead from './UserHead';
import ImageList from './ImageList';
import ChatInput from './ChatInput';
import FileList from './FileList';

//actions
import { openUserSidebar } from '../../../reducers/actions';
import { updateRecentChat } from '../../../reducers/chat/actions';

import { useTranslation } from 'react-i18next';
import { request } from '../../../services/utilities';
import { API_URI } from '../../../services/constants';
import { notifySuccess } from '../../../services/notify';
import Noti from '../audio1.mp3';
import { socket } from '../socket';
import { mergeScan } from 'rxjs';

function UserChat(props) {
	const ref = useRef();
	const dispatch = useDispatch();
	let update_recent_chat_list = useSelector(state => state.Chat.recent_chat);
	const [modal, setModal] = useState(false);
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [lastPong, setLastPong] = useState(null);
	/* intilize t variable for multi language implementation */
	const { t } = useTranslation();
	const staff = useSelector(state => state.user.profile);
	const newMessage = useSelector(action => action);
	//demo conversation messages
	const [messages, setMessages] = useState(null);
	// const [incomingMsg, setIncomingMsg] = useState(null);
	const [showOption, setShowOption] = useState(false);
	const [all_messages, setAll_messages] = useState([]);
	const [selectedContact, setSelectedContact] = useState([]);
	const today = false;
	const is_delivered = false;
	const isTyping = false;

	const fetchMesssages = useCallback(async () => {
		try {
			const urlG = `messages/chat?page=1&limit=500&room_id=${props.active_group}`;
			const urlC = `messages/chat?page=1&limit=500&sender_id=${staff?.details?.id}&recipient_id=${props.active_user}`;
			const url = props.active_group !== 0 ? urlG : urlC;
			const rs = await request(url, 'GET', true);
			setMessages(rs);
			let x = rs.result.reverse();
			setAll_messages(x);
			let idsm = [];
			let mapMessages = rs.result.forEach(e => {
				let id = idsm.find(x => x === e);
				if (!id) {
					idsm.push(e.id);
				}
			});
			socket.emit('mark_read', { chat_ids: idsm });
		} catch (err) {
			console.log(err);
		}
	}, [props?.active_user, props?.active_group]);

	useEffect(() => {
		fetchMesssages();
		// ref.current.recalculate();
		// if (ref.current.el) {
		//     ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
		// }
	}, [fetchMesssages]);

	const toggle = () => setModal(!modal);
	const playMusic = () => {
		let audio = new Audio(Noti);
		audio.play();
	};
	const subscribeChat = () => {
		if (socket) {
			socket.on(staff?.details.id, data => {
				// setIncomingMsg(data);
				if (staff?.details.id !== data.sender_id) {
					if (data.recipient_id === null) {
						// listening for groups msg;
						let x = { ...data, chat_id: null };
						setAll_messages([...all_messages, x]);
					} else {
						// listening for contact msg;
						setAll_messages([...all_messages, data]);
					}
					if (
						data.sender_id !== staff?.details?.id &&
						data.sender_id !== null
					) {
						playMusic();
						// notifySuccess(data?.body);
					}
				}

				scrolltoBottom();
			});
		}
	};
	subscribeChat();

	const addMessage = async (message, type) => {
		const datac = {
			recipient_id: props.active_user,
			sender_id: staff?.details?.id,
			body: message,
		};
		const datag = {
			body: message,
			recipient_id: null,
			sender_id: staff?.details?.id,
			sender_first_name: staff?.details.first_name,
			room_id: props.active_group,
		};
		let data = props.active_group === 0 ? datac : datag;
		socket.emit('send_chat', data);
		setAll_messages([
			...all_messages,
			props.active_group === 0 ? datac : datag,
		]);
		if (!(all_messages.length >= 1)) {
			dispatch(updateRecentChat(update_recent_chat_list + 1));
		}
		scrolltoBottom();
	};

	function scrolltoBottom() {
		if (ref.current.el) {
			ref.current.getScrollElement().scrollTop =
				ref.current.getScrollElement().scrollHeight;
		}
	}

	const deleteMessage = id => {
		let data = { chat_ids: [id], sender_id: staff?.details?.id };
		socket.emit('delete_chat', data);

		let conversation = all_messages;
		var filtered = conversation.filter(function (item) {
			return item.id !== id;
		});
		setAll_messages(filtered);
	};

	function handleCheck(e, contactId) {
		var selected = selectedContact;
		if (e.target.checked) {
			let x = selected.find(x => x === contactId);
			if (!x) {
				selected.push(contactId);
				setSelectedContact(selected);
			}
		}
	}
	return (
		<React.Fragment>
			<div className="user-chat w-100">
				<div className="d-lg-flex">
					<div className={'w-100'}>
						{/* render user head */}
						<UserHead />
						<SimpleBar
							style={{ maxHeight: '100%' }}
							ref={ref}
							className="chat-conversation p-3 p-lg-4"
							id="messages"
						>
							<ul className="list-unstyled mb-0">
								{all_messages?.map((chat, key) =>
									today && today === true ? (
										<li key={'dayTitle' + key}>
											<div className="chat-day-title">
												<span className="title">Today</span>
											</div>
										</li>
									) : props.active_group !== 0 && chat.recipient_id === null ? (
										<li
											key={key}
											className={
												chat.sender_id === staff?.details?.id ? 'right' : ''
											}
										>
											<div className="conversation-list">
												<div className="chat-avatar">
													{chat.sender_id === staff?.details?.id ? (
														<div className="avatar-xs">
															<span className="avatar-title rounded-circle bg-soft-primary text-primary">
																{staff?.details?.first_name.charAt(0)}
															</span>
														</div>
													) : chat.chat_id === null ? (
														<div className="chat-user-img align-self-center me-3">
															<div className="avatar-xs">
																<span className="avatar-title rounded-circle bg-soft-primary text-primary">
																	{chat.sender_first_name &&
																		chat.sender_first_name?.charAt(0)}
																</span>
															</div>
														</div>
													) : (
														<img
															src={chat.sender_first_name?.charAt(0)}
															alt="chatvia"
														/>
													)}
												</div>

												<div className="user-chat-content">
													<div className="ctext-wrap">
														<div className="ctext-wrap-content">
															{chat.body && <p className="mb-0">{chat.body}</p>}
															{/* {
                                                                        chat.imageMessage &&
                                                                        // image list component
                                                                        <ImageList images={chat.imageMessage} />
                                                                    }
                                                                    {
                                                                        chat.fileMessage &&
                                                                        //file input component
                                                                        <FileList fileName={chat.fileMessage} fileSize={chat.size} />
                                                                    }
                                                                    {
                                                                        chat.isTyping &&
                                                                        <p className="mb-0">
                                                                            typing
                                                                            <span className="animate-typing">
                                                                                <span className="dot ms-1"></span>
                                                                                <span className="dot ms-1"></span>
                                                                                <span className="dot ms-1"></span>
                                                                            </span>
                                                                        </p>
                                                                    }
                                                                    {
                                                                        !chat.isTyping && <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle">{chat.time}</span></p>
                                                                    } */}
														</div>
														{chat.sender_id === staff?.details?.id &&
															showOption === true && (
																<UncontrolledDropdown className="align-self-start">
																	<DropdownToggle tag="a">
																		<i className="ri-more-2-fill"></i>
																	</DropdownToggle>
																	<DropdownMenu>
																		{/* <DropdownItem>{t('Copy')} <i className="ri-file-copy-line float-end text-muted"></i></DropdownItem>
                                                                       <DropdownItem>{t('Save')} <i className="ri-save-line float-end text-muted"></i></DropdownItem>
                                                                       <DropdownItem onClick={toggle}>Forward <i className="ri-chat-forward-line float-end text-muted"></i></DropdownItem> */}
																		<DropdownItem
																			onClick={() => deleteMessage(chat.id)}
																		>
																			Delete{' '}
																			<i className="ri-delete-bin-line float-end text-muted"></i>
																		</DropdownItem>
																	</DropdownMenu>
																</UncontrolledDropdown>
															)}
													</div>
													{
														<div className="conversation-name">
															{chat.sender_id === staff?.details?.id
																? staff?.details?.first_name
																: chat?.sender_first_name}
														</div>
													}
												</div>
											</div>
										</li>
									) : props.active_group === 0 && chat.recipient_id !== null ? (
										<li
											key={key}
											className={
												chat.sender_id === staff?.details?.id ? 'right' : ''
											}
										>
											<div className="conversation-list">
												{
													//logic for display user name and profile only once, if current and last messaged sent by same receiver
													all_messages[key + 1] ? (
														all_messages[key].sender_id ===
														all_messages[key + 1].sender_id ? (
															<div className="chat-avatar">
																<div className="blank-div"></div>
															</div>
														) : (
															<div className="chat-avatar">
																{chat.sender_id === staff?.details?.id ? (
																	<div className="avatar-xs">
																		<span className="avatar-title rounded-circle bg-soft-primary text-primary">
																			{staff?.details?.first_name.charAt(0)}
																		</span>
																	</div>
																) : chat.room_id === null ? (
																	<div className="chat-user-img align-self-center me-3">
																		<div className="avatar-xs">
																			<span className="avatar-title rounded-circle bg-soft-primary text-primary">
																				{messages.sender?.first_name.charAt(0)}
																			</span>
																		</div>
																	</div>
																) : (
																	<div className="avatar-xs">
																		<span className="avatar-title rounded-circle bg-soft-primary text-primary">
																			{messages.recipient?.first_name.charAt(0)}
																		</span>
																	</div>
																)}
															</div>
														)
													) : (
														<div className="chat-avatar">
															{
																chat.sender_id === staff?.details?.id ? (
																	<div className="avatar-xs">
																		<span className="avatar-title rounded-circle bg-soft-primary text-primary">
																			{staff?.details?.first_name.charAt(0)}
																		</span>
																	</div>
																) : chat.room_id === null ? (
																	<div className="chat-user-img align-self-center me-3">
																		<div className="avatar-xs">
																			<span className="avatar-title rounded-circle bg-soft-primary text-primary">
																				{messages.recipient?.first_name.charAt(
																					0
																				)}
																			</span>
																		</div>
																	</div>
																) : (
																	<div className="chat-user-img align-self-center me-3">
																		<div className="avatar-xs">
																			<span className="avatar-title rounded-circle bg-soft-primary text-primary">
																				{messages.recipient?.first_name.charAt(
																					0
																				)}
																			</span>
																		</div>
																	</div>
																)
																// <img src={messages.recipient?.first_name} alt="chatvia" />
															}
														</div>
													)
												}

												<div className="user-chat-content">
													<div className="ctext-wrap">
														<div className="ctext-wrap-content">
															{chat.body && (
																<p
																	className="mb-0"
																	onMouseEnter={() => setShowOption(true)}
																>
																	{chat.body}
																</p>
															)}
															<div>
																{/* {
                                                                        chat.imageMessage &&
                                                                        // image list component
                                                                        <ImageList images={chat.imageMessage} />
                                                                    }
                                                                    {
                                                                        chat.fileMessage &&
                                                                        //file input component
                                                                        <FileList fileName={chat.fileMessage} fileSize={chat.size} />
                                                                    } */}
																{/* {
                                                                        chat.isTyping &&
                                                                        <p className="mb-0">
                                                                            typing
                                                                            <span className="animate-typing">
                                                                                <span className="dot ms-1"></span>
                                                                                <span className="dot ms-1"></span>
                                                                                <span className="dot ms-1"></span>
                                                                            </span>
                                                                        </p>
                                                                    }
                                                                    {
                                                                        !chat.isTyping && <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle">{chat.time}</span></p>
                                                                    } */}
															</div>
														</div>
														{chat.sender_id === staff?.details?.id &&
															showOption === true && (
																<UncontrolledDropdown
																	className="align-self-start"
																	onMouseLeave={() => setShowOption(false)}
																>
																	<DropdownToggle tag="a">
																		<i className="ri-more-2-fill"></i>
																	</DropdownToggle>
																	<DropdownMenu>
																		{/* <DropdownItem>{t('Copy')} <i className="ri-file-copy-line float-end text-muted"></i></DropdownItem>
                                                                       <DropdownItem>{t('Save')} <i className="ri-save-line float-end text-muted"></i></DropdownItem>
                                                                       <DropdownItem onClick={toggle}>Forward <i className="ri-chat-forward-line float-end text-muted"></i></DropdownItem> */}
																		<DropdownItem
																			onClick={() => deleteMessage(chat.id)}
																		>
																			Delete{' '}
																			<i className="ri-delete-bin-line float-end text-muted"></i>
																		</DropdownItem>
																	</DropdownMenu>
																</UncontrolledDropdown>
															)}
													</div>
													{messages?.result[key + 1] ? (
														messages?.result[key].sender_id ===
														messages?.result[key + 1].sender_id ? null : (
															<div className="conversation-name">
																{chat.sender_id === staff?.details?.id
																	? messages?.sender?.first_name
																	: messages?.recipient?.first_name}
															</div>
														)
													) : (
														<div className="conversation-name">
															{chat.sender_id === staff?.details?.id
																? messages?.sender?.first_name
																: messages?.recipient?.first_name}
														</div>
													)}
												</div>
											</div>
										</li>
									) : (
										''
									)
								)}
							</ul>
						</SimpleBar>

						<Modal backdrop="static" isOpen={modal} centered toggle={toggle}>
							<ModalHeader toggle={toggle}>Forward to...</ModalHeader>
							<ModalBody>
								<CardBody className="p-2">
									<SimpleBar style={{ maxHeight: '200px' }}>
										<SelectContact handleCheck={handleCheck} />
									</SimpleBar>
									<ModalFooter className="border-0">
										<Button color="primary">Forward</Button>
									</ModalFooter>
								</CardBody>
							</ModalBody>
						</Modal>

						<ChatInput onaddMessage={addMessage} />
					</div>
					<UserProfileSidebar activeUser={messages?.recipient} />
				</div>
			</div>
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	const { active_user, active_group } = state.Chat;
	// const { active_group } = state.Chat;
	const { userSidebar } = state.Layout;
	return { active_user, active_group, userSidebar };
};

export default withRouter(
	connect(mapStateToProps, { openUserSidebar })(UserChat)
);

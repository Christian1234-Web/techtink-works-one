/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleChat } from '../actions/general';

const InboxChat = () => {
	const dispatch = useDispatch();

	const inbox_visible = useSelector(state => state.general.inbox_visible);

	return (
		<div className={`floated-chat-w ${inbox_visible ? 'active' : ''}`}>
			<div className="floated-chat-i">
				<div className="chat-close" onClick={() => dispatch(toggleChat(false))}>
					<i className="os-icon os-icon-close"></i>
				</div>
				<div className="chat-head">
					<div className="user-w with-status status-green">
						<div className="user-name">
							<h6 className="user-title">John Mayers</h6>
							<div className="user-role">Account Manager</div>
						</div>
					</div>
				</div>
				<div className="chat-messages ps ps--theme_default">
					<div className="message">
						<div className="message-content">Hi, how can I help you?</div>
					</div>
					<div className="date-break">Mon 10:20am</div>
					<div className="message">
						<div className="message-content">
							Hi, my name is Mike, I will be happy to assist you
						</div>
					</div>
					<div className="message self">
						<div className="message-content">
							Hi, I tried ordering this product and it keeps showing me error
							code.
						</div>
					</div>
					<div className="message self">
						<div className="message-content">
							Hi, I tried ordering this product and it keeps showing me error
							code.
						</div>
					</div>
					<div className="message self">
						<div className="message-content">
							Hi, I tried ordering this product and it keeps showing me error
							code.
						</div>
					</div>
				</div>
				<div className="chat-controls">
					<input
						className="message-input"
						placeholder="Type your message here..."
					/>
					<div className="chat-extra">
						<a>
							<span className="extra-tooltip">Attach Document</span>
							<i className="os-icon os-icon-documents-07"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InboxChat;

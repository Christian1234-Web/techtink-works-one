import React, { Component } from 'react';

//Import Components
import ChatLeftSidebar from './ChatLeftSidebar';
import UserChat from './UserChat';
import { connect } from 'react-redux';
import '../../assets/scss/themes.scss';

class Index extends Component {
	render() {
		return (
			<React.Fragment>
				{/* chat left sidebar */}
				<ChatLeftSidebar recentChatList={this.props.users} />
				{/* user chat */}
				<UserChat recentChatList={this.props.users} />
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	const { users } = state.Chat;
	return { users };
};

export default connect(mapStateToProps, {})(Index);

import {
	ACTIVE_USER,
	ALL_CONTACT,
	ACTIVE_GROUP,
	CHAT_GROUPS,
	RECENT_CHAT,
} from './constants';

const INIT_STATE = {
	active_user: 1,
	active_group: 0,
	all_contact: [],
	chatGroups: [],
	recent_chat: 0,
};

const Chat = (state = INIT_STATE, action) => {
	switch (action.type) {
		case ALL_CONTACT:
			return {
				...state,
				all_contact: action.payload,
			};
		case RECENT_CHAT:
			return {
				...state,
				recent_chat: action.payload,
			};
		case CHAT_GROUPS:
			return {
				...state,
				chatGroups: action.payload,
			};
		case ACTIVE_USER:
			return {
				...state,
				active_user: action.payload,
			};
		case ACTIVE_GROUP:
			return {
				...state,
				active_group: action.payload,
			};
		default:
			return { ...state };
	}
};

export default Chat;

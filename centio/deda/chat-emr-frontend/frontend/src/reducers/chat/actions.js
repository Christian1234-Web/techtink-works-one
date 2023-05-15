import {
	ACTIVE_USER,
	ACTIVE_GROUP,
	CHAT_GROUPS,
	RECENT_CHAT,
} from './constants';

export const getGroups = data => ({
	type: CHAT_GROUPS,
	payload: data,
});

export const activeUser = userId => ({
	type: ACTIVE_USER,
	payload: userId,
});
export const activeGroup = userId => ({
	type: ACTIVE_GROUP,
	payload: userId,
});
export const updateRecentChat = data => ({
	type: RECENT_CHAT,
	payload: data,
});

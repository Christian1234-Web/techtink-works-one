import { io } from 'socket.io-client';

import { API_URI } from '../../services/constants';
export const socket = io(`${API_URI}/chat`, {
	transports: ['websocket', 'polling'],
});

export const initSocketChat = () => {
	console.log('socket chat initiatied by chris');

	if (socket) {
		socket.on('connect', () => {
			console.log(
				`connected to socket.io: ${socket.connected}: ${socket.id} christian`
			);
		});
		socket.io.on('reconnect', () => {
			console.log(`re-connected to socket.io by chris`);
		});

		socket.on('disconnect', reason => {
			console.log(`user disconnected: ${reason}`);
		});
	}
};

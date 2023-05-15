import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import reduxBlock from './redux-block';
import user from './user';
import general from './general';
import settings from './settings';
import role from './role';
import hr from './hr';
import patient from './patient';
import transaction from './transaction';
import utility from './utility';
import department from './department';
import Chat from './chat/reducers';
import Layout from './layout/reducer';
import sidepanel from './sidepanel';

const reducers = combineReducers({
	form: formReducer,
	routing: routerReducer,
	reduxBlock,
	user,
	general,
	settings,
	role,
	hr,
	utility,
	patient,
	transaction,
	department,
	Chat,
	Layout,
	sidepanel,
});

export default reducers;

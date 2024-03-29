import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ReduxBlockUi from 'react-block-ui/redux';
import IdleTimer from 'react-idle-timer';
import { ChatIndex } from './routes';

import ScrollToTop from './containers/ScrollToTop';
import TopBar from './components/TopBar';
import MainMenu from './components/Navigation/MainMenu';
import ModalDialogs from './components/Modals/ModalDialogs';
import Splash from './components/Splash';
import SlidingPane from './components/SlidingPane';
import SSRStorage from './services/storage';
import {
	FULLSCREEN_COOKIE,
	MODE_COOKIE,
	TOKEN_COOKIE,
	USER_RECORD,
	CK_ENCOUNTER,
	TIMEOUT,
	SIDE_PANEL,
} from './services/constants';
import { toggleProfile, signOut } from './actions/user';
import { setConnection, toggleChat } from './actions/general';
import { request } from './services/utilities';
import { notifyError } from './services/notify';
import { initSocket, subscribeIO, disconnectSocket } from './services/socket';

import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import NoMatch from './pages/NoMatch';
import PatientProfile from './pages/PatientProfile';
import StaffProfile from './pages/StaffProfile';
import ProcedureProfile from './pages/ProcedureProfile';
import AntenatalProfile from './pages/AntenatalProfile';
import AdmissionProfile from './pages/AdmissionProfile';
import IVFProfile from './pages/IVFProfile';
import NicuProfile from './pages/NicuProfile';
import LabourProfile from './pages/LabourProfile';
import InboxChat from './components/InboxChat';

const FrontDesk = lazy(() => import('./pages/FrontDesk/Home'));
const Nurse = lazy(() => import('./pages/Nurse/Home'));
const Pharmacy = lazy(() => import('./pages/Pharmacy/Home'));
const Procedure = lazy(() => import('./pages/Procedure/Home'));
const Hr = lazy(() => import('./pages/HR/Home'));
const Store = lazy(() => import('./pages/Store/Home'));
const Settings = lazy(() => import('./pages/Settings/Home'));
const Hmo = lazy(() => import('./pages/Hmo/Home'));
const ClinicalLab = lazy(() => import('./pages/ClinicalLab/Home'));
const PayPoint = lazy(() => import('./pages/PayPoint/Home'));
const Radiology = lazy(() => import('./pages/Radiology/Home'));
const Antenatal = lazy(() => import('./pages/Antenatal/Home'));
const IVF = lazy(() => import('./pages/IVF/Home'));
const Nicu = lazy(() => import('./pages/Nicu/Home'));
const LabourMgt = lazy(() => import('./pages/LabourMgt/Home'));
const Cafeteria = lazy(() => import('./pages/Cafeteria/Home'));
const MyAccount = lazy(() => import('./pages/MyAccount/Home'));
const Doctor = lazy(() => import('./pages/Doctor/Home'));
const Records = lazy(() => import('./pages/Records/Home'));
const Report = lazy(() => import('./pages/Report/Home'));
const Accounting = lazy(() => import('./pages/Accounting/Home'));
const Therapy = lazy(() => import('./pages/Therapy/Home'));
const Survey = lazy(() => import('./pages/Survey/Home'));

const storage = new SSRStorage();

class App extends Component {
	constructor(props) {
		super(props);
		this.myInterval = null;
		this.idleTimer = null;
		this.timeout = 1000 * 60 * Number(TIMEOUT);

		this.state = {
			remaining: this.timeout,
			isIdle: false,
			lastActive: new Date(),
			elapsed: 0,
			lastEvent: 'Events Emitted on Leader',
			leader: false,
		};

		// Bind event handlers and methods
		this.handleOnActive = this.handleOnActive.bind(this);
	}

	async componentDidMount() {
		const fullscreen = await storage.getItem(FULLSCREEN_COOKIE);
		const theme_mode = await storage.getItem(MODE_COOKIE);

		const { location, connected, loggedIn } = this.props;

		const isLogin = location.pathname === '/';
		window.document.body.className = `menu-position-side menu-side-left${
			fullscreen || isLogin ? ' full-screen' : ''
		} with-content-panel${theme_mode ? ' color-scheme-dark' : ''}`;

		if (this.idleTimer) {
			this.setState({
				remaining: this.idleTimer.getRemainingTime(),
				lastActive: this.idleTimer.getLastActiveTime(),
				elapsed: this.idleTimer.getElapsedTime(),
				leader: this.idleTimer.isLeader(),
				isIdle: this.idleTimer.isIdle(),
			});

			this.myInterval = setInterval(() => {
				this.setState({
					remaining: this.idleTimer.getRemainingTime(),
					lastActive: this.idleTimer.getLastActiveTime(),
					elapsed: this.idleTimer.getElapsedTime(),
					leader: this.idleTimer.isLeader(),
					isIdle: this.idleTimer.isIdle(),
				});
			}, 1000);
			console.log(this.myInterval);
		}

		if (!connected && loggedIn) {
			initSocket();
			subscribeIO();

			this.props.setConnection(true);
		}
	}

	componentWillUpdate(nextProps, nextState) {
		const { connected, loggedIn } = nextProps;
		if (!connected && loggedIn) {
			initSocket();
			subscribeIO();

			this.props.setConnection(true);
		}
	}

	doLogout = async () => {
		const { profile } = this.props;

		if (profile.role.slug === 'doctor') {
			await request(`hr/staffs/unset-room/${profile.details.id}`, 'GET', true);
			storage.removeItem('ACTIVE:ROOM');
		}

		storage.removeItem(USER_RECORD);
		storage.removeItem(SIDE_PANEL);
		storage.removeItem(TOKEN_COOKIE);
		storage.removeItem(CK_ENCOUNTER);

		this.props.toggleProfile(false);

		this.props.signOut();

		disconnectSocket();
		this.props.setConnection(false);

		this.idleTimer = null;
		clearInterval(this.myInterval);

		notifyError('session time out!');
		this.props.history.push('/?session=expired');
	};

	handleOnActive() {
		this.setState({ lastEvent: 'active' });
	}

	render() {
		const {
			loggedIn,
			preloading,
			is_modal_open,
			isStaffOpen,
			isPatientOpen,
			isProcedureOpen,
			isAntenatalOpen,
			isAdmissionOpen,
			isIVFOpen,
			isNicuOpen,
			isLabourOpen,
			theme_mode,
			menu_mode,
			profile,
		} = this.props;

		return preloading ? (
			<Splash />
		) : (
			<>
				<ToastContainer autoClose={3500} />
				<ScrollToTop>
					{loggedIn && profile ? (
						<>
							{!profile.passwordChanged ? (
								<Switch>
									<Route path="/change-password" component={ChangePassword} />
								</Switch>
							) : (
								<>
									<ReduxBlockUi block="REQUEST_START" unblock="REQUEST_STOP">
										<div className="all-wrapper with-side-panel solid-bg-all">
											<Suspense fallback={<Splash />}>
												<div className="layout-w">
													{/* user role determines main menu */}
													<MainMenu
														role={profile.role ? profile.role.slug : 'it-admin'}
														theme_mode={theme_mode}
														menu_mode={menu_mode}
													/>
													<div
														className="content-w content-w-l-18"
														id="main-content"
													>
														{/* user role determines topbar menu */}
														<TopBar
															role={
																profile.role ? profile.role.slug : 'it-admin'
															}
														/>
														<Switch>
															<Route path="/doctor" component={Doctor} />
															<Route path="/front-desk" component={FrontDesk} />
															<Route path="/nurse" component={Nurse} />
															<Route path="/pharmacy" component={Pharmacy} />
															<Route path="/procedure" component={Procedure} />
															<Route path="/radiology" component={Radiology} />
															<Route path="/therapy" component={Therapy} />
															<Route path="/antenatal" component={Antenatal} />
															<Route path="/ivf" component={IVF} />
															<Route path="/nicu" component={Nicu} />
															<Route path="/hr" component={Hr} />
															<Route path="/store" component={Store} />
															<Route path="/settings" component={Settings} />
															<Route path="/chat" component={ChatIndex} />
															<Route path="/hmo" component={Hmo} />
															<Route path="/lab" component={ClinicalLab} />
															<Route path="/labour-mgt" component={LabourMgt} />
															<Route path="/cafeteria" component={Cafeteria} />
															<Route path="/paypoint" component={PayPoint} />
															<Route path="/records" component={Records} />
															<Route path="/report" component={Report} />
															<Route path="/survey" component={Survey} />

															<Route
																path="/accounting"
																component={Accounting}
															/>
															<Route path="/my-account" component={MyAccount} />
															<Route component={NoMatch} />
														</Switch>
														{/* <div onClick={() => this.props.toggleChat(true)} class="floated-chat-btn"><i class="os-icon os-icon-mail-07"></i><span>inbox</span></div> */}
														<InboxChat />
													</div>
												</div>
												<SlidingPane isOpen={isStaffOpen}>
													<StaffProfile />
												</SlidingPane>
												<SlidingPane isOpen={isPatientOpen}>
													<PatientProfile />
												</SlidingPane>
												<SlidingPane isOpen={isProcedureOpen}>
													<ProcedureProfile />
												</SlidingPane>
												<SlidingPane isOpen={isAntenatalOpen}>
													<AntenatalProfile />
												</SlidingPane>
												<SlidingPane isOpen={isAdmissionOpen}>
													<AdmissionProfile />
												</SlidingPane>
												<SlidingPane isOpen={isIVFOpen}>
													<IVFProfile />
												</SlidingPane>
												<SlidingPane isOpen={isNicuOpen}>
													<NicuProfile />
												</SlidingPane>
												<SlidingPane isOpen={isLabourOpen}>
													<LabourProfile />
												</SlidingPane>
												<ModalDialogs />
											</Suspense>
										</div>
									</ReduxBlockUi>
									{is_modal_open && (
										<div className={`modal-backdrop fade show`} />
									)}
									<IdleTimer
										ref={ref => {
											this.idleTimer = ref;
										}}
										onActive={this.handleOnActive}
										onIdle={this.doLogout}
										timeout={this.timeout}
										crossTab={{
											emitOnAllTabs: true,
										}}
										stopOnIdle={true}
									/>
								</>
							)}
						</>
					) : (
						<Switch>
							<Route exact path="/" component={Login} />
							<Route component={NoMatch} />
						</Switch>
					)}
				</ScrollToTop>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		preloading: state.general?.preloading,
		is_modal_open: state.general?.is_modal_open,
		loggedIn: state.user?.loggedIn,
		profile: state.user?.profile,
		isStaffOpen: state.user?.isStaffOpen,
		isPatientOpen: state.user?.isPatientOpen,
		isProcedureOpen: state.sidepanel?.isProcedureOpen,
		isAntenatalOpen: state.sidepanel?.isAntenatalOpen,
		isAdmissionOpen: state.sidepanel?.isAdmissionOpen,
		isIVFOpen: state.sidepanel?.isIVFOpen,
		isNicuOpen: state.sidepanel?.isNicuOpen,
		isLabourOpen: state.sidepanel?.isLabourOpen,
		theme_mode: state.user?.theme_mode,
		menu_mode: state.user?.menu_mode,
		fullscreen: state.user?.fullscreen,
		connected: state.general.socket_connected,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		toggleProfile,
		signOut,
		setConnection,
		toggleChat,
	})(App)
);

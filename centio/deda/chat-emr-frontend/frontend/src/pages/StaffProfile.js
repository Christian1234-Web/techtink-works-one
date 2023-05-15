import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import { toggleProfile } from '../actions/user';
import StaffMenu from '../components/Navigation/StaffMenu';
import SSRStorage from '../services/storage';
import { USER_RECORD } from '../services/constants';
import Splash from '../components/Splash';
import HashRoute from '../components/HashRoute';
import { parseAvatar, staffname } from '../services/utilities';

const Profile = lazy(() => import('../components/Staff/Profile'));
const Payroll = lazy(() => import('../components/Staff/Payroll'));
const Transactions = lazy(() => import('../components/Staff/Transactions'));

const storage = new SSRStorage();

const Page = ({ location }) => {
	const hash = location.hash.substr(1);
	// const {  staff } = this.props;
	switch (hash) {
		case 'payroll':
			return <Payroll />;
		case 'transactions':
			return <Transactions />;
		case 'profile':
		default:
			return <Profile />;
	}
};

class StaffProfile extends Component {
	state = {
		profile_image: null,
	};
	closeProfile = () => {
		storage.removeItem(USER_RECORD);
		this.props.toggleProfile(false);
	};

	componentDidMount() {
		const image = localStorage.getItem('STAFFIMAGE');
		this.setState({ profile_image: image });
		const { location } = this.props;
		if (!location.hash) {
			this.props.history.push(`${location.pathname}#profile`);
		}
	}

	componentWillUnmount() {
		const { location } = this.props;
		this.props.history.push(location.pathname);
	}

	onChange = async e => {
		const reader = new FileReader(),
			files = e.target.files;

		reader.onload = function () {
			localStorage.setItem('STAFFIMAGE', reader.result);
		};
		const image = await localStorage.getItem('STAFFIMAGE');
		localStorage.removeItem('STAFFIMAGE');
		await this.setState({ profile_image: image });
		reader.readAsDataURL(files[0]);
	};
	render() {
		const { profile_image } = this.state;

		const { location, staff } = this.props;
		return (
			<div className="layout-w">
				<button
					aria-label="Close"
					className="close custom-close"
					type="button"
					onClick={this.closeProfile}
				>
					<span className="os-icon os-icon-close" />
				</button>
				{staff ? (
					<div
						className="content-w"
						style={{
							width: 'calc(100% - 18%)',
							overflow: 'hidden',
							padding: '10px 0 20px 10px',
						}}
					>
						<div className="content-i">
							<div className="content-box">
								<div className="row">
									<div className="col-block">
										<div className="support-index">
											<div className="support-ticket-content-w d-block">
												<div
													className="support-ticket-info"
													style={{ position: 'relative' }}
												>
													<div className="customer text-capitalize mb-0">
														<div
															className="avatar"
															style={{ boxShadow: 'none' }}
														>
															<img
																alt="staff profile"
																src={
																	profile_image !== null
																		? profile_image
																		: parseAvatar(staff?.profile_pic)
																}
																className="rounded-circle"
															/>
															<div
																className="avatar-xs p-0 rounded-circle profile-photo-edit position-absolute"
																style={{ top: '70%', left: '60%' }}
															>
																<input
																	id="profile-img-file-input"
																	type="file"
																	onChange={this.onChange}
																	hidden
																	accept="image/*"
																	className="profile-img-file-input form-control d-none"
																/>
																<label
																	htmlFor="profile-img-file-input"
																	className="profile-photo-edit avatar-xs"
																>
																	<span className="avatar-title rounded-circle bg-light text-body p-2">
																		<i className="icon-feather-camera"></i>
																	</span>
																</label>
															</div>
														</div>
														<h4 className="customer-name">
															{staffname(staff.details)}
														</h4>
														<div className="customer-tickets">
															{staff.details?.department?.name || '--'}
														</div>
													</div>
													{/* <div className="up-controls">
														<div className="row">
															<div className="col-lg-12 text-center mt-4">
																<Link
																	to={`${location.pathname}#edit`}
																	className="btn btn-primary btn-sm"
																>
																	<i className="os-icon os-icon-edit-32"></i>
																	<span> Edit Profile</span>
																</Link>
															</div>
														</div>
													</div> */}
												</div>
											</div>
										</div>
									</div>
									<div className="col">
										<StaffMenu />
										<div className="content-i">
											<div className="content-box p-0 mt-3">
												<div className="row">
													<Suspense fallback={<Splash />}>
														<Switch>
															<HashRoute
																hash={location.hash}
																component={Page}
															/>
														</Switch>
													</Suspense>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="content-w">
						<div className="top-bar color-scheme-transparent"></div>
						<div className="content-i">
							<div className="content-box text-center">
								<h5>Staff profile was not found</h5>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		staff: state.user.staff,
	};
};

export default withRouter(
	connect(mapStateToProps, { toggleProfile })(StaffProfile)
);

import React, { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from 'antd/lib/date-picker';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';

import waiting from '../../assets/images/waiting.gif';
import {
	request,
	itemRender,
	confirmAction,
	staffname,
} from '../../services/utilities';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifyError, notifySuccess } from '../../services/notify';
import TableLoading from '../TableLoading';
import { toggleSidepanel } from '../../actions/sidepanel';

const { RangePicker } = DatePicker;

class IVFHistory extends Component {
	state = {
		filtering: false,
		loading: false,
		startDate: '',
		endDate: '',
		ivfs: [],
		meta: null,
	};

	componentDidMount() {
		this.fetchIVF();
	}

	cancelRequest = async data => {
		try {
			const url = `ivf/${data.id}`;
			await request(url, 'DELETE', true);
			const new_arr = this.state.ivfs.filter(r => r.id !== data.id);
			this.setState({ ivfs: new_arr });
			notifySuccess(`IVF Cancelled!`);
		} catch (error) {
			console.log('this', error);
			notifyError('Error deleting all IVF Enrollment');
		}
	};

	confirmDelete = data => {
		confirmAction(this.cancelRequest, data);
	};

	fetchIVF = async page => {
		try {
			const { startDate, endDate } = this.state;
			const patient_id = this.props.patient.id;
			const p = page || 1;
			this.setState({ loading: true });
			const url = `ivf?page=${p}&limit=15&patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			const arr = [...result];
			this.setState({ ivfs: arr, loading: false, filtering: false, meta });
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
		}
	};

	onNavigatePage = nextPage => {
		this.props.startBlock();
		this.fetchivf(nextPage);
	};

	doFilter = e => {
		e.preventDefault();
		this.setState({ filtering: true });
		this.fetchIVF();
	};

	change = e => {
		//console.log(e.target.value)
		this.setState({ [e.target.name]: e.target.value });
	};

	dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		this.setState({
			...this.state,
			startDate: date[0],
			endDate: date[1],
		});
	};

	openIvf = ivf => {
		const { patient } = this.props;
		const info = { patient, type: 'ivf', item: ivf };
		this.props.toggleSidepanel(true, info);
	};

	render() {
		const { filtering, loading, meta, ivfs } = this.state;
		return (
			<div className="col-sm-12">
				<div className="element-wrapper">
					<h6 className="element-header">Patient IVF History</h6>
					<div className="element-box p-3 m-0">
						<form className="row">
							<div className="form-group col-md-10 mb-0">
								<RangePicker onChange={e => this.dateChange(e)} />
							</div>
							<div className="form-group mb-0 col-md-2 text-right">
								<div
									className="btn btn-sm btn-primary btn-upper text-white filter-btn"
									onClick={this.doFilter}
								>
									<i className="os-icon os-icon-ui-37" />
									<span>
										{filtering ? (
											<img src={waiting} alt="submitting" />
										) : (
											'Filter'
										)}
									</span>
								</div>
							</div>
						</form>
					</div>
					<div className="element-box p-3 m-0 mt-3">
						{loading ? (
							<TableLoading />
						) : (
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>ID</th>
											<th>Date of Enrollment</th>
											<th>Enrolled By</th>
											<th>Date Closed</th>
											<th>Closed By</th>
											<th>Status</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{ivfs.map((ivf, index) => {
											return (
												<tr key={index}>
													<td>{ivf.serial_code || '--'}</td>
													<td>
														{moment(ivf.createdAt).format('DD-MM-YYYY H:mma')}
													</td>
													<td>{staffname(ivf.staff)}</td>
													<td>
														{moment(ivf.date_closed).format(
															'DD-MMM-YYYY h:mm A'
														)}
													</td>
													<td>{staffname(ivf.closedBy)}</td>
													<td>
														{ivf.status === 0 ? (
															<span className="badge badge-secondary">
																Open
															</span>
														) : (
															<span className="badge badge-success">
																Closed
															</span>
														)}
													</td>
													<td className="row-actions">
														<Tooltip title="Open IVF">
															<a onClick={() => this.openIvf(ivf)}>
																<i className="os-icon os-icon-user-male-circle2" />
															</a>
														</Tooltip>
													</td>
												</tr>
											);
										})}
										{ivfs.length === 0 && (
											<tr className="text-center">
												<td colSpan="7">No ivf requests found!</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						)}
						{meta && (
							<div className="pagination pagination-center mt-4">
								<Pagination
									current={parseInt(meta.currentPage, 10)}
									pageSize={parseInt(meta.itemsPerPage, 10)}
									total={parseInt(meta.totalPages, 10)}
									showTotal={total => `Total ${total} ivfs`}
									itemRender={itemRender}
									onChange={current => this.onNavigatePage(current)}
									showSizeChanger={false}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(
	connect(null, { startBlock, stopBlock, toggleSidepanel })(IVFHistory)
);

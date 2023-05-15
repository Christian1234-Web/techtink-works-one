/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import Pagination from 'antd/lib/pagination';
import startCase from 'lodash.startcase';

import waiting from '../../assets/images/waiting.gif';
import { request, itemRender, patientname } from '../../services/utilities';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { searchAPI } from '../../services/constants';
import { notifyError } from '../../services/notify';
import { loadTransactions } from '../../actions/transaction';
import TransactionTable from '../../components/TransactionTable';
import { startBlock, stopBlock } from '../../actions/redux-block';
import TableLoading from '../../components/TableLoading';

const { RangePicker } = DatePicker;

const paymentStatus = [
	{ value: 0, label: 'Pending' },
	{ value: 1, label: 'Paid' },
];

const getOptionValues = option => option.id;
const getOptionLabels = option => patientname(option, true);

const getOptions = async q => {
	if (!q || q.length < 1) {
		return [];
	}

	const url = `${searchAPI}?q=${q}`;
	const res = await request(url, 'GET', true);
	return res;
};

class TransactionHistory extends Component {
	state = {
		filtering: false,
		loading: false,
		id: null,
		patient_id: '',
		startDate: '',
		endDate: '',
		status: '',
		meta: null,
		services: [],
		service: '',
	};

	componentDidMount() {
		this.fetchServices();
		this.fetchTransaction();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.patient_id !== this.state.patient_id) {
			this.fetchTransaction();
		}
	}

	fetchServices = async () => {
		try {
			this.props.startBlock();
			const url = 'service-categories';
			const rs = await request(url, 'GET', true);
			this.setState({ services: rs });
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
			notifyError('error fetching services');
		}
	};

	fetchTransaction = async page => {
		const { patient_id, startDate, endDate, status, service } = this.state;
		try {
			this.props.startBlock();
			const p = page || 1;
			const pid = patient_id || '';
			const service_id = service || '';
			this.setState({ loading: true });
			const url = `transactions?page=${p}&limit=15&patient_id=${pid}&startDate=${startDate}&endDate=${endDate}&service_id=${service_id}&status=${status}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			const arr = [...result];
			this.props.loadTransactions(arr);
			this.setState({ loading: false, filtering: false, meta });
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
			this.setState({ loading: false, filtering: false });
			notifyError(error.message || 'could not fetch transactions');
		}
	};

	onNavigatePage = nextPage => {
		this.fetchTransaction(nextPage);
	};

	doFilter = e => {
		e.preventDefault();
		this.setState({ filtering: true });

		this.fetchTransaction();
	};

	change = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	dateChange = e => {
		const date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		this.setState({
			...this.state,
			startDate: date[0],
			endDate: date[1],
		});
	};

	render() {
		const { filtering, loading, meta, services } = this.state;
		const { transactions } = this.props;
		return (
			<>
				<h6 className="element-header">Transaction History</h6>
				<div className="element-box m-0 mb-4 p-3">
					<form className="row">
						<div className="form-group col-md-3">
							<label htmlFor="patient_id">Patient</label>
							<AsyncSelect
								isClearable
								getOptionValue={getOptionValues}
								getOptionLabel={getOptionLabels}
								defaultOptions
								name="patient_id"
								id="patient_id"
								loadOptions={getOptions}
								onChange={e => {
									this.setState({ patient_id: e?.id });
								}}
								placeholder="Search patients"
							/>
						</div>
						<div className="form-group col-md-3">
							<label>From - To</label>
							<RangePicker onChange={e => this.dateChange(e)} />
						</div>
						<div className="form-group col-md-2">
							<label className="mr-2">Service</label>
							<select
								style={{ height: '35px' }}
								className="form-control"
								name="service"
								onChange={e => this.change(e)}
							>
								<option value="">Service</option>
								<option value="credit">Credit Deposit</option>
								<option value="transfer">Credit Transfer</option>
								{services.map((status, i) => {
									return (
										<option key={i} value={status.id}>
											{startCase(status.name)}
										</option>
									);
								})}
							</select>
						</div>
						<div className="form-group col-md-2">
							<label className="mr-2">Status</label>
							<select
								style={{ height: '35px' }}
								className="form-control"
								name="status"
								onChange={e => this.change(e)}
							>
								<option value="">Status</option>
								{paymentStatus.map((status, i) => {
									return (
										<option key={i} value={status.value}>
											{status.label}
										</option>
									);
								})}
							</select>
						</div>
						<div className="form-group col-md-2 mt-4">
							<div
								className="btn btn-sm btn-primary btn-upper text-white"
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

				<div className="element-box p-3 m-0">
					<div className="table-responsive">
						{loading ? (
							<TableLoading />
						) : (
							<>
								<TransactionTable
									transactions={transactions}
									showActionBtns={true}
									queue={false}
								/>
								{meta && (
									<div className="pagination pagination-center mt-4">
										<Pagination
											current={parseInt(meta.currentPage, 10)}
											pageSize={parseInt(meta.itemsPerPage, 10)}
											total={parseInt(meta.totalPages, 10)}
											showTotal={total => `Total ${total} transactions`}
											itemRender={itemRender}
											onChange={current => this.onNavigatePage(current)}
											showSizeChanger={false}
										/>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		transactions: state.transaction.transactions,
	};
};

export default connect(mapStateToProps, {
	loadTransactions,
	startBlock,
	stopBlock,
})(TransactionHistory);

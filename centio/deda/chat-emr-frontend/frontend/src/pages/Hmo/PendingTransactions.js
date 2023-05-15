/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import DatePicker from 'antd/lib/date-picker';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import Popover from 'antd/lib/popover';
import Tooltip from 'antd/lib/tooltip';
import Pagination from 'antd/lib/pagination';
import { Link } from 'react-router-dom';

import { searchAPI } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';
import {
	request,
	itemRender,
	formatCurrency,
	patientname,
	updateImmutable,
	parseSource,
	formatDate,
} from '../../services/utilities';
import { loadTransactions } from '../../actions/transaction';
import ModalServiceDetails from '../../components/Modals/ModalServiceDetails';
import InputCode from '../../components/FrontDesk/InputCode';
import { startBlock, stopBlock } from '../../actions/redux-block';
import TableLoading from '../../components/TableLoading';
import { confirmAction } from '../../services/utilities';
import { notifySuccess, notifyError } from '../../services/notify';

const { RangePicker } = DatePicker;

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

class PendingTransactions extends Component {
	state = {
		filtering: false,
		loading: false,
		showModal: false,
		transaction: null,
		id: null,
		hmos: [],
		patient_id: '',
		startDate: '',
		endDate: '',
		hmo_id: '',
		visible: null,
		meta: null,
		dateRange: [],
		filtered: false,
	};

	componentDidMount() {
		this.fetchTransactions();
	}

	fetchTransactions = async (
		page,
		patient_id = '',
		hmo_id = '',
		startDate = '',
		endDate = ''
	) => {
		try {
			const p = page || 1;
			this.setState({ loading: true });
			const url = `hmos/transactions?page=${p}&limit=12&patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}&status=0&hmo_id=${hmo_id}&service_id=`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			const arr = [...result];
			this.props.loadTransactions(arr);
			this.setState({ loading: false, filtering: false, meta });
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
		}
	};

	onNavigatePage = async nextPage => {
		const { patient_id, hmo_id, startDate, endDate } = this.state;
		this.props.startBlock();
		await this.fetchTransactions(
			nextPage,
			patient_id,
			hmo_id,
			startDate,
			endDate
		);
	};

	updateCode = async data => {
		console.log(data);
	};

	doFilter = e => {
		e.preventDefault();
		const { patient_id, hmo_id, startDate, endDate } = this.state;
		this.setState({ filtering: true, filtered: true });
		this.fetchTransactions(1, patient_id, hmo_id, startDate, endDate);
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
			dateRange: e,
		});
	};

	doHide = () => {
		this.setState({
			visible: { show: false, id: null },
		});
	};

	viewDetails = transaction => {
		document.body.classList.add('modal-open');
		this.setState({ transaction, showModal: true });
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({ transaction: null, showModal: false });
	};

	handleVisibleChange = (e, id) => {
		this.setState({ visible: { show: e, id } });
	};

	doApprove = async id => {
		try {
			const { transactions } = this.props;
			this.setState({ submitting: true });
			const url = `transactions/${id}/approve`;
			const rs = await request(url, 'PATCH', true);
			if (rs.success) {
				const uptdTransactions = updateImmutable(transactions, rs.transaction);
				this.props.loadTransactions(uptdTransactions);
				notifySuccess('Hmo transaction approved');
				this.setState({ submitting: false });
			} else {
				notifyError(rs.message);
				this.setState({ submitting: false });
			}
		} catch (e) {
			this.setState({ submitting: false });
			notifyError(e.message || 'could not approve transaction');
		}
	};

	approve = itemId => {
		confirmAction(
			this.doApprove,
			itemId,
			'Do you want to approve this transaction without code?',
			'Are you sure?'
		);
	};

	doTransfer = async id => {
		try {
			const { transactions } = this.props;
			this.setState({ submitting: true });
			const url = `transactions/${id}/transfer`;
			const rs = await request(url, 'PATCH', true);
			if (rs.success) {
				const uptdTransactions = transactions.filter(
					t => t.id !== rs.transaction.id
				);
				this.props.loadTransactions(uptdTransactions);
				notifySuccess('Hmo transaction transferred');
				this.setState({ submitting: false });
			} else {
				notifyError(rs.message);
				this.setState({ submitting: false });
			}
		} catch (e) {
			this.setState({ submitting: false });
			notifyError(e.message || 'could not transfer transaction');
		}
	};

	transfer = itemId => {
		confirmAction(
			this.doTransfer,
			itemId,
			'Do you want to transfer this transaction to paypoint?',
			'Are you sure?'
		);
	};

	render() {
		const {
			filtering,
			loading,
			hmos,
			showModal,
			transaction,
			visible,
			meta,
			dateRange,
			filtered,
		} = this.state;
		const { transactions } = this.props;
		return (
			<>
				<div className="element-actions">
					<Link
						to="/hmo/transactions/pending"
						className="btn btn-primary btn-outline-primary btn-sm"
					>
						Pending Transactions
					</Link>
					<Link
						to="/hmo/transactions/all"
						className="btn btn-primary btn-sm ml-2"
					>
						All transactions
					</Link>
				</div>
				<h6 className="element-header">Transactions</h6>
				<div className="element-box m-0 mb-4 p-3">
					<form className="row">
						<div className="form-group col-md-3">
							<label>Patient</label>
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
						<div className="form-group col-md-2">
							<label>Hmo</label>
							<select
								style={{ height: '35px' }}
								id="hmo_id"
								className="form-control"
								name="hmo_id"
								onChange={e => this.change(e)}
							>
								<option value="">Choose Hmo</option>
								{hmos.map((pat, i) => {
									return (
										<option key={i} value={pat.value}>
											{pat.label}
										</option>
									);
								})}
							</select>
						</div>
						<div className="form-group col-md-3">
							<label>Transaction Date</label>
							<RangePicker
								value={dateRange}
								onChange={e => this.dateChange(e)}
							/>
						</div>
						<div className="form-group col-md-2 mt-4">
							<div
								className="btn btn-primary btn-upper text-white filter-btn"
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
							{filtered && (
								<div
									className="btn btn-secondary text-white ml-2"
									onClick={async () => {
										this.setState({
											filtered: false,
											dateRange: [],
											startDate: '',
											endDate: '',
											hmo_id: '',
											patient_id: '',
										});
										await this.fetchTransactions(1);
									}}
								>
									<i className="os-icon os-icon-close" />
								</div>
							)}
						</div>
					</form>
				</div>
				<div className="element-box p-3 m-0 mt-3">
					<div className="table-responsive">
						{loading ? (
							<TableLoading />
						) : (
							<table className="table table-striped">
								<thead>
									<tr>
										<th>DATE</th>
										<th>PATIENT NAME</th>
										<th>HMO</th>
										<th>SERVICE</th>
										<th>AMOUNT (&#x20A6;)</th>
										<th>CODE</th>
										<th>STATUS</th>
										<th>ACTIONS</th>
									</tr>
								</thead>
								<tbody>
									{transactions.map((item, index) => {
										const reqItem = item.patientRequestItem;
										return (
											<tr key={index}>
												<td style={{ width: '120px' }}>
													{formatDate(item.createdAt, 'DD-MMM-YYYY H:mma')}
												</td>
												<td>{patientname(item.patient, true)}</td>
												<td>{`${item.scheme?.name || '--'} ${
													item.scheme && item.scheme.phoneNumber
														? `(${item.scheme?.phoneNumber})`
														: ''
												}`}</td>
												<td>
													<div className="flex">
														<span className="text-capitalize">
															<span className="text-capitalize">
																<strong>{parseSource(item.bill_source)}</strong>
																{(item?.bill_source === 'ward' ||
																	item?.bill_source === 'nicu-accommodation' ||
																	item?.bill_source === 'credit-deposit' ||
																	item?.bill_source === 'debit-charge') &&
																	`: ${item.description}`}
																{(item?.bill_source === 'consultancy' ||
																	item?.bill_source === 'labs' ||
																	item?.bill_source === 'scans' ||
																	item?.bill_source === 'procedure' ||
																	item?.bill_source === 'nursing-service') &&
																item.service?.item?.name
																	? `: ${item.service?.item?.name}`
																	: ''}
																{item?.bill_source === 'drugs' && (
																	<>
																		{` : ${reqItem.fill_quantity} ${
																			reqItem.drug.unitOfMeasure
																		} of ${reqItem.drugGeneric.name} (${
																			reqItem.drug.name
																		}) at ${formatCurrency(
																			reqItem.drugBatch.unitPrice
																		)} each`}
																	</>
																)}
															</span>
														</span>
													</div>
												</td>
												<td nowrap="nowrap">
													{item.amount ? formatCurrency(item.amount) : 0.0}
												</td>

												<td>{item.hmo_approval_code || '--'}</td>
												<td>
													{item.status === 0 && (
														<span className="badge badge-secondary text-white">
															pending
														</span>
													)}
													{item.status === -1 && (
														<span className="badge badge-info text-white">
															pending
														</span>
													)}
													{item.status === 1 && (
														<span className="badge badge-success">paid</span>
													)}
												</td>
												<td className="row-actions">
													{(!item.hmo_approval_code ||
														(item.hmo_approval_code &&
															item.hmo_approval_code === '')) &&
														item.status !== 1 && (
															<>
																<Popover
																	title=""
																	overlayClassName="select-bed"
																	content={
																		<InputCode
																			transaction={item}
																			transactions={transactions}
																			loadTransaction={trs =>
																				this.props.loadTransactions(trs)
																			}
																			doHide={this.doHide}
																		/>
																	}
																	trigger="click"
																	visible={
																		visible &&
																		visible.id === item.id &&
																		visible.show
																	}
																	onVisibleChange={e =>
																		this.handleVisibleChange(e, item.id)
																	}
																>
																	<Tooltip title="Enter Code">
																		<a className="text-primary text-white">
																			<i className="os-icon os-icon-thumbs-up" />
																		</a>
																	</Tooltip>
																</Popover>
																<Tooltip title="Approve Without Code">
																	<a
																		className="text-success text-white"
																		onClick={() => this.approve(item.id)}
																	>
																		<i className="os-icon os-icon-check-square" />
																	</a>
																</Tooltip>
																<Tooltip title="Transfer to Paypoint">
																	<a
																		className="info"
																		onClick={() => this.transfer(item.id)}
																	>
																		<i className="os-icon os-icon-mail-18" />
																	</a>
																</Tooltip>
															</>
														)}
												</td>
											</tr>
										);
									})}
									{transactions.length === 0 && (
										<tr>
											<td colSpan="9" className="text-center">
												No transaction
											</td>
										</tr>
									)}
								</tbody>
							</table>
						)}
					</div>
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
				</div>
				{showModal && transaction && (
					<ModalServiceDetails
						transaction={transaction}
						closeModal={() => this.closeModal()}
					/>
				)}
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
})(PendingTransactions);

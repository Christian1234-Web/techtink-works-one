import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';
import DatePicker from 'antd/lib/date-picker';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import startCase from 'lodash.startcase';

import waiting from '../../assets/images/waiting.gif';
import { searchAPI } from '../../services/constants';
import TransactionTable from '../../components/TransactionTable';
import { request, itemRender, patientname } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import TableLoading from '../../components/TableLoading';
import { loadTransactions } from '../../actions/transaction';

const { RangePicker } = DatePicker;

const PaypointQueue = () => {
	const [loaded, setLoaded] = useState(false);
	const [loading, setLoading] = useState(false);
	const [filtering, setFiltering] = useState(false);
	const [patient, setPatient] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 24,
		totalPages: 0,
	});
	const [services, setServices] = useState([]);
	const [service, setService] = useState('');

	const dispatch = useDispatch();

	const transactions = useSelector(state => state.transaction.transactions);

	const getOptionValues = option => option.id;
	const getOptionLabels = option => patientname(option, true);

	const fetchServices = useCallback(async () => {
		try {
			dispatch(startBlock());
			const url = 'service-categories';
			const rs = await request(url, 'GET', true);
			setServices(rs);
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('error fetching services');
		}
	}, [dispatch]);

	const getOptions = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const init = useCallback(
		async (page, service) => {
			try {
				setLoading(true);
				dispatch(startBlock());
				const p = page || 1;
				const patient_id = patient || '';
				const service_id = service || '';
				const url = `transactions/pending?page=${p}&limit=15&patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}&service_id=${service_id}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setMeta(meta);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				const arr = [...result];
				dispatch(loadTransactions(arr));
				setFiltering(false);
				setLoading(false);
				dispatch(stopBlock());
			} catch (e) {
				dispatch(stopBlock());
				notifyError(e.message || 'could not fetch transactions');
				setFiltering(false);
				setLoading(false);
			}
		},
		[dispatch, endDate, patient, startDate]
	);

	const onNavigatePage = nextPage => {
		init(nextPage, service);
	};

	const dateChange = e => {
		let date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		setStartDate(date[0]);
		setEndDate(date[1]);
	};

	useEffect(() => {
		if (!loaded) {
			fetchServices();
			init();
			setLoaded(true);
		}
	}, [fetchServices, init, loaded]);

	const doFilter = e => {
		e.preventDefault();
		setFiltering(true);
		init(1, service);
	};

	return (
		<>
			<h6 className="element-header">Pending Payments</h6>
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
								setPatient(e?.id);
							}}
							placeholder="Search patients"
						/>
					</div>
					<div className="form-group col-md-3">
						<label>From - To</label>
						<RangePicker onChange={e => dateChange(e)} />
					</div>
					<div className="form-group col-md-3">
						<label className="mr-2">Service</label>
						<select
							style={{ height: '35px' }}
							className="form-control"
							name="service"
							onChange={e => setService(e.target.value)}
						>
							<option value="">Select Service</option>
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
					<div className="form-group col-md-3 mt-4">
						<div
							className="btn btn-sm btn-primary btn-upper text-white"
							onClick={e => doFilter(e)}
						>
							<i className="os-icon os-icon-ui-37" />
							<span>
								{filtering ? <img src={waiting} alt="submitting" /> : 'Filter'}
							</span>
						</div>
					</div>
				</form>
			</div>

			<div className="element-box m-0 p-3">
				<div className="table-responsive">
					{loading ? (
						<TableLoading />
					) : (
						<>
							<TransactionTable
								transactions={transactions}
								showActionBtns={true}
								queue={true}
							/>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={parseInt(meta.currentPage, 10)}
										pageSize={parseInt(meta.itemsPerPage, 10)}
										total={parseInt(meta.totalPages, 10)}
										showTotal={total => `Total ${total} transactions`}
										itemRender={itemRender}
										onChange={current => onNavigatePage(current)}
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
};

export default withRouter(PaypointQueue);

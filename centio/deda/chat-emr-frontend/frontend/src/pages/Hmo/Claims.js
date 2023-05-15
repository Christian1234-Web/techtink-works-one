import { useState, useEffect, useCallback } from 'react';
import {
	request,
	patientname,
	formatCurrency,
	itemRender,
} from '../../services/utilities';
import { notifyError } from '../../services/notify';
import DatePicker from 'antd/lib/date-picker';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import moment from 'moment';
import waiting from '../../assets/images/waiting.gif';
import TableLoading from '../../components/TableLoading';
import startCase from 'lodash.startcase';
import Pagination from 'antd/lib/pagination';
import { searchAPI } from '../../services/constants';
import truncate from 'lodash.truncate';
import Tooltip from 'antd/lib/tooltip';

const { RangePicker } = DatePicker;

const HmoClaims = () => {
	const [claims, setClaims] = useState([]);
	const [patientSelect, setPatientSelect] = useState('');
	const [asynSwitch, setAsyncSwitch] = useState(false);

	const [hmoSelect, setHmoSelect] = useState('');
	const [hmos, setHmos] = useState([]);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [dateRange, setDateRange] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [filtering, setFiltering] = useState(false);
	const [filtered, setFiltered] = useState(false);
	const [meta, setMeta] = useState(null);
	const [checked, setChecked] = useState([]);
	const [allChecked, setAllChecked] = useState(false);
	const [printing, setPrinting] = useState(false);
	const [hmoTxt, setHmoTxt] = useState('');
	const [beingPrinted, setBeingPrinted] = useState(0);
	const [defaultV, serDefaultV] = useState({
		label: 'b',
		value: 'nnm',
	});

	const fetchClaims = useCallback(
		async p => {
			setLoading(true);
			try {
				const url = `hmos/claims?page=${p || 1}&limit=15&patient_id=${
					patientSelect ? patientSelect?.id : ''
				}&hmo_id=${hmoSelect}&start_date=${startDate}&end_date=${endDate}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				if (rs.success) {
					setClaims(result);
					setFiltering(false);
					setLoading(false);
					setMeta(meta);
					setAllChecked(false);
					setChecked([]);
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
				setFiltering(false);
				notifyError(error.message || 'could not fetch categories!');
			}
		},
		[endDate, startDate, patientSelect, hmoSelect]
	);

	const fetchHMOS = useCallback(async () => {
		try {
			const url = `hmos/schemes?limit=100`;
			const rs = await request(url, 'GET', true);
			const { result } = rs;
			if (result?.length) {
				setHmos([{ name: 'All', id: '' }, ...result]);
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	const dateChange = e => {
		const date = e?.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});
		setStartDate(e ? date[0] : '');
		setEndDate(e ? date[1] : '');
	};

	const doFilter = () => {
		setFiltering(true);
		fetchClaims();
	};

	const doPrint = async (e, id = null) => {
		try {
			e.preventDefault();
			setPrinting(true);
			const ids = !id ? checked.map(c => c.id).join('-') : [id];
			if (id) {
				setBeingPrinted(id);
			}

			const url = `hmos/claims/print?ids=${ids}`;
			const rs = await request(url, 'GET', true);
			if (rs.success) {
				setTimeout(() => {
					setPrinting(false);
					window.open(rs.url, '_blank').focus();
				}, 200);
				setBeingPrinted(0);
			} else {
				notifyError(rs.message || 'print request failed');
				setBeingPrinted(0);
			}
		} catch (error) {
			notifyError(error.message || 'print request failed');
			setBeingPrinted(0);
		}
	};

	const onNavigatePage = async current => {
		setPage(current);
		fetchClaims(current);
	};

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

	const checkAll = e => {
		setAllChecked(false);

		let checks = [];
		if (e.target.checked) {
			setAllChecked(true);

			for (const item of claims) {
				checks = [...checks, { id: item.id }];
			}

			setChecked(checks);
		} else {
			setChecked(checks);
		}
	};

	const onChecked = e => {
		let selected = [];
		if (e.target.checked) {
			selected = [...checked, { id: e.target.value }];
		} else {
			selected = checked.filter(
				c => parseInt(c.id, 10) !== parseInt(e.target.value, 10)
			);
		}

		setChecked(selected);
		if (selected.length === claims.length) {
			setAllChecked(true);
		} else {
			setAllChecked(false);
		}
	};

	const setPatient = e => {
		setHmoSelect('');
		setHmoTxt('All');
		setPatientSelect(e ? e : '');
	};

	useEffect(() => {
		fetchClaims();
		fetchHMOS();
	}, [fetchClaims, fetchHMOS]);

	return (
		<>
			<h6 className="element-header">Claims</h6>
			<div className="element-box m-0 mb-4 p-3">
				<form className="row">
					<div className="form-group col-md-3">
						<label>Patient</label>
						<AsyncSelect
							isClearable
							getOptionValue={getOptionValues}
							getOptionLabel={getOptionLabels}
							value={patientSelect}
							name="patient_id"
							id="patient_id"
							loadOptions={getOptions}
							onChange={e => setPatient(e)}
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
							onClick={() => setHmoTxt('')}
							onChange={e => {
								setPatientSelect('');
								setHmoSelect(e.target.value);
							}}
						>
							{hmoTxt ? (
								<option>{hmoTxt}</option>
							) : (
								hmos.map((hmo, i) => {
									return (
										<option key={i} value={hmo.id}>
											{hmo.name}
										</option>
									);
								})
							)}
						</select>
					</div>
					<div className="form-group col-md-3">
						<label>Transaction Date</label>
						<RangePicker onChange={e => dateChange(e)} />
					</div>
					{/* <div className="form-group col-md-2 mt-4">
						<div
							className="btn btn-primary btn-upper text-white filter-btn"
							onClick={() => {
								doFilter();
							}}>
							<i className="os-icon os-icon-ui-37" />
							<span>
								{filtering ? <img src={waiting} alt="submitting" /> : 'Filter'}
							</span>
						</div>
						{filtered && (
							<div
								className="btn btn-secondary text-white ml-2"
								onClick={async () => {
									setFiltered(true);
									setDateRange([]);
									setStartDate('');
									setEndDate('');
									setHmoSelect('');
									setPatientSelect('');
									fetchClaims(page);
								}}>
								<i className="os-icon os-icon-close" />
							</div>
						)}
					</div> */}
					<div className="form-group col-md-2 mt-4">
						<Tooltip
							title={
								!checked.length
									? 'Please select to print multiple'
									: 'Print selected'
							}
						>
							<button
								className={
									!checked.length ? 'btn ml-3' : 'btn btn-success ml-3'
								}
								onClick={doPrint}
								disabled={!checked.length}
							>
								{!printing ? (
									<i className="icon-feather-printer" />
								) : (
									<img src={waiting} alt="printing" />
								)}
							</button>
						</Tooltip>
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
									<th>
										<input
											type="checkbox"
											checked={allChecked}
											onChange={checkAll}
										/>
									</th>
									<th>DATE</th>
									<th>PATIENT NAME</th>
									<th>HMO</th>
									<th>SERVICES</th>
									<th nowrap="nowrap">TOTAL AMOUNT (&#x20A6;)</th>
									<th>CODE</th>
									<th>ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								{claims.map((item, index) => {
									let itemsConcat = '';
									let totalAmount = 0;
									let code = '';
									const isChecked = checked?.find(
										c => parseInt(c.id, 10) === item.id
									);
									for (const r of item.requests) {
										if (
											itemsConcat.length &&
											r?.item?.transaction?.service?.item.name
										) {
											itemsConcat +=
												', ' + startCase(r.item.transaction.service.item.name);
										} else if (r?.item?.transaction?.service?.item.name) {
											itemsConcat = startCase(
												r.item.transaction.service.item.name
											);
										}
										if (r.item?.transaction?.amount) {
											totalAmount += Math.abs(r.item.transaction.amount);
										}

										if (r?.item?.transaction?.hmo_approval_code) {
											code = r.item.transaction.hmo_approval_code;
										}
									}
									return (
										<tr key={index}>
											<td>
												<input
													value={item.id}
													key={item.id}
													type="checkbox"
													name="select"
													onChange={onChecked}
													id={`select${item.id}`}
													checked={!!isChecked}
												/>
											</td>
											<td style={{ width: '120px' }}>
												{moment(item.createdAt).format('DD-MM-YYYY H:mma')}
											</td>
											<td style={{ width: '240px' }}>
												{patientname(item.patient, true)}
											</td>
											<td>{`${item.patient?.hmo?.name || '--'}`}</td>
											<td>
												<div className="flex">
													<span className="text-capitalize">
														<span className="text-capitalize">
															{truncate(itemsConcat || '  --', {
																length: 80,
																omission: '...',
															})}
														</span>
													</span>
												</div>
											</td>
											<td nowrap="nowrap">{formatCurrency(totalAmount)}</td>

											<td>{code || '--'}</td>
											<td className="row-actions">
												{
													<Tooltip title="Print">
														<button
															value={item.id}
															className="btn btn-success ml-3"
															onClick={e => doPrint(e, item.id)}
														>
															{item.id === beingPrinted ? (
																<img src={waiting} alt="printing" />
															) : (
																<i className="icon-feather-printer" />
															)}
														</button>
													</Tooltip>
												}
											</td>
										</tr>
									);
								})}
								{claims.length === 0 && (
									<tr>
										<td colSpan="9" className="text-center">
											No Claims
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
							total={parseInt(meta.totalItems, 10)}
							showTotal={total => `Total ${total} claims`}
							itemRender={itemRender}
							onChange={current => {
								onNavigatePage(current);
							}}
							showSizeChanger={false}
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default HmoClaims;

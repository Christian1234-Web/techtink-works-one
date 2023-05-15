/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import {
	formatCurrency,
	itemRender,
	patientname,
	request,
	staffname,
} from '../../services/utilities';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';
import TableLoading from '../../components/TableLoading';
import { paginate } from '../../services/constants';
import DatePicker from 'antd/lib/date-picker';
import waiting from '../../assets/images/waiting.gif';
import { notifyError } from '../../services/notify';

const { RangePicker } = DatePicker;

const Cafeteria = () => {
	const [loading, setLoading] = useState(true);

	const [cafeteriaTransactions, setCafeteriaTransactions] = useState([]);
	const [meta, setMeta] = useState({ ...paginate });

	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [filtering, setFiltering] = useState(false);
	const [hmos, setHMOS] = useState([]);
	const [hmoId, setHMOId] = useState('');
	const [customerType, setCustomerType] = useState('');
	const [categoryType, setCategoryType] = useState('');
	const [status, setStatus] = useState('');
	const [hmoCategory, setHmoCategory] = useState('');
	const [category, setCategory] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [exporting, setExporting] = useState(false);
	const [fileAvailable, setFileAvailable] = useState(false);
	const [downloadUrl, setDownloadUrl] = useState('');

	const hmoCategories = [
		{ id: 1, name: 'All', slug: '' },
		{ id: 2, name: 'HMO', slug: 'hmo' },
		{ id: 3, name: 'NON HMO', slug: 'non_hmo' },
	];

	const dateChange = e => {
		const date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		setStartDate(date[0]);
		setEndDate(date[1]);
	};

	const fetchCafeteriaTransactions = useCallback(
		async page => {
			try {
				const p = page || 1;
				setLoading(true);
				setCurrentPage(p);
				setFileAvailable(false);
				setDownloadUrl('');
				const url = `transactions/search?bill_source=cafeteria&page=${p}&limit=10&term=${searchValue}&startDate=${startDate}&endDate=${endDate}&hmo_id=${hmoId}&filter=${customerType}&category=${categoryType}&status=${status}&hmo_cat=${hmoCategory}&type=report`;
				const rs = await request(url, 'GET', true);
				if (rs.success) {
					const { result, ...meta } = rs;
					setCafeteriaTransactions(result);
					setMeta(meta);
					setLoading(false);
					// window.scrollTo({ top: 0, behavior: 'smooth' });
				} else {
					notifyError(rs.message || 'error fetching data');
					setLoading(false);
				}
			} catch (err) {
				console.log('fetch drug err', err);
				setLoading(false);
			}
		},
		[
			categoryType,
			customerType,
			endDate,
			hmoId,
			searchValue,
			startDate,
			status,
			hmoCategory,
		]
	);

	const fetchHMOS = useCallback(async (type = '') => {
		try {
			const url = `hmos/schemes?limit=100&type=${type}`;
			const rs = await request(url, 'GET', true);
			const { result } = rs;
			setHMOS([{ id: '', name: 'All' }, ...result]);
		} catch (error) {
			console.log(error);
		}
	}, []);

	const fetchCafCategories = useCallback(async () => {
		try {
			const urlCategory = `cafeteria/categories/get`;
			const rsCategory = await request(urlCategory, 'GET', true);
			setCategory(rsCategory.result);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		fetchHMOS();
		fetchCafCategories();
	}, [fetchHMOS]);

	useEffect(() => {
		if (loading) {
			fetchCafeteriaTransactions(currentPage);
		}
	}, [fetchCafeteriaTransactions, loading]);

	const doFilter = async () => {
		setFiltering(true);
		setFileAvailable(false);
		setDownloadUrl('');
		await fetchCafeteriaTransactions();
		setFiltering(false);
	};

	const onNavigatePage = pageNumber => {
		fetchCafeteriaTransactions(pageNumber);
	};

	const onChangeHmoCat = e => {
		setHmoCategory(e.target.value);
		fetchHMOS(e.target.value);
	};

	const doExport = async e => {
		try {
			setExporting(true);
			const url = `transactions/export/sheets?bill_source=cafeteria&page=&limit=&term=${searchValue}&startDate=${startDate}&endDate=${endDate}&hmo_id=${hmoId}&filter=${customerType}&category=${categoryType}&status=${status}&hmo_cat=${hmoCategory}&type=report`;
			const rs = await request(url, 'GET', true);
			console.log(rs);
			if (rs.success) {
				setExporting(false);
				setFileAvailable(true);
				setDownloadUrl(rs.url);
				console.log(downloadUrl);
				console.log(rs.url);
			} else {
				notifyError(rs.message || 'error fetching data');
				setExporting(false);
			}
		} catch (err) {
			console.log('fetch drug err', err);
			setExporting(false);
		}
	};

	return (
		<div className="content-i">
			<div className="content-box">
				<div className="os-tabs-w mx-4">
					<div className="os-tabs-controls">
						<ul className="nav nav-tabs upper">
							<li className="nav-item">
								<a
									aria-expanded="false"
									className="nav-link active"
									data-toggle="tab"
									href="#tab_sales"
								>
									CAFETERIA
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="element-box m-0 mb-4 p-3">
					<form className="row">
						<div className="form-group col-md-3">
							<label>From - To</label>
							<RangePicker onChange={e => dateChange(e)} />
						</div>
						<div className="form-group col-md-3">
							<label className="mr-2 " htmlFor="id">
								Search
							</label>
							<input
								style={{ height: '32px' }}
								id="search"
								className="form-control"
								name="search"
								onChange={e => setSearchValue(e.target.value)}
								placeholder="search "
							/>
						</div>
						<div className="form-group col-md-2">
							<label>Hmo Category</label>
							<select
								style={{ height: '35px' }}
								id="hmo_cat_id"
								className="form-control"
								name="hmo_cat_id"
								onChange={onChangeHmoCat}
							>
								{/* <option value="">All</option>
								<option value="hmo">HMO</option>
								<option value="non_hmo">NON HMO</option> */}
								{hmoCategories?.map(cat => {
									return (
										<option key={cat.id} value={cat.slug}>
											{cat.name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="form-group col-md-2">
							<label>Hmo</label>
							<select
								style={{ height: '35px' }}
								id="hmo_id"
								className="form-control"
								name="hmo_id"
								onChange={e => setHMOId(e.target.value)}
							>
								{/* <option value="">Choose Hmo</option> */}
								{hmos?.map((pat, i) => {
									return (
										<option key={i} value={pat.id}>
											{pat.name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="form-group col-md-2">
							<label>Customer Type</label>
							<select
								style={{ height: '32px' }}
								id="category"
								className="form-control"
								name="category"
								value={customerType}
								onChange={e => setCustomerType(e.target.value)}
							>
								<option value="">Select Category</option>
								<option value="staff">Staff</option>
								<option value="patient">Patient</option>
								<option value="walk-in">Walk-in</option>
							</select>
						</div>
						<div className="form-group col-md-2">
							<label>Status</label>
							<select
								style={{ height: '32px' }}
								id="category"
								className="form-control"
								name="category"
								value={status}
								onChange={e => setStatus(e.target.value)}
							>
								<option value="">Status</option>
								<option value="paid">Paid</option>
								<option value="pending">Pending</option>
								<option value="owing">Owing</option>
							</select>
						</div>
						<div className="form-group col-md-2">
							<label>Category</label>
							<select
								style={{ height: '32px' }}
								id="category"
								className="form-control"
								name="category"
								value={categoryType}
								onChange={e => setCategoryType(e.target.value)}
							>
								<option value="">Select Category</option>
								{category?.map((category, i) => (
									<option value={`${category.category}`} key={i}>
										{category.category}
									</option>
								))}
							</select>
						</div>
						<div className="form-group col mt-4">
							<div
								className="btn btn-sm btn-primary btn-upper text-white filter-btn"
								onClick={doFilter}
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
				<div className="row">
					<div className="col-sm-12 col-lg-12 col-xl-12 col-xxl-12">
						<div className="element-box">
							<div className="element-wrapper">
								<div className="element-box-tp">
									<div className="element-box-tp">
										{loading ? (
											<TableLoading />
										) : (
											<>
												<table className="table table-striped table-bordered">
													<thead>
														<tr>
															<th>Customer Name</th>
															<th>HMO</th>
															<th>Item</th>
															<th>Date</th>
															<th className="text-center">QTY</th>
															<th className="text-center">TOTAL PRICE</th>
															<th className="text-right">AMOUNT PAID</th>
															<th className="text-right">PAYMENT METHOD</th>
															<th className="text-right">CREDIT</th>
														</tr>
													</thead>
													<tbody>
														{cafeteriaTransactions.map((item, i) => {
															const patient = item.patient
																? patientname(item.patient, true)
																: 'Guest';
															return (
																<tr key={i}>
																	<td>
																		{item.staff
																			? staffname(item.staff)
																			: patient}
																	</td>
																	<td>
																		{item?.patient?.hmo?.name ||
																			item?.hmo?.name ||
																			'--'}
																	</td>
																	<td>
																		<span>
																			{item?.transaction_details
																				?.map(t => `${t.name}`)
																				.join(', ') || '-'}
																		</span>
																	</td>
																	<td>
																		{moment(item.createdAt).format(
																			'MMM-DD-YYYY H:mma'
																		)}
																	</td>
																	<td>
																		{item?.transaction_details?.map(
																			t => `${t?.qty || 1}`
																		) || '-'}
																	</td>
																	<td>
																		{/* {item?.transaction_details?.map(
																			t => `${formatCurrency(t?.price)}`
																		) || '-'} */}

																		{formatCurrency(
																			item?.transaction_details
																				?.map(a => a.price)
																				.reduce((a, b) => a + b, 0)
																		)}
																	</td>
																	<td>
																		{item.transaction_type === 'credit'
																			? formatCurrency(item.amount)
																			: formatCurrency(item.amount_paid)}
																	</td>
																	<td>{item.payment_method || '--'}</td>
																	{/* <td>{startCase(item.transaction_type)}</td> */}
																	<td>
																		{item.status === 1 ? (
																			<span className="badge badge-success">
																				paid
																			</span>
																		) : item.status === 0 ? (
																			<span className="badge badge-secondary">
																				pending payment
																			</span>
																		) : (
																			<span className="badge badge-secondary">
																				owing
																			</span>
																		)}
																	</td>
																	{/* <td className="row-actions">
													{item.transaction_type === 'credit' && (
														<Tooltip title="Print Receipt">
															<a
																className="secondary"
																// onClick={() => print(item)}
															>
																<i className="os-icon os-icon-printer" />
															</a>
														</Tooltip>
													)}
												</td> */}
																</tr>
															);
														})}
													</tbody>
												</table>
												<div className="controls-below-table">
													<div className="table-records-pages"></div>
												</div>
												<div className="pagination pagination-center mt-4">
													<Pagination
														current={parseInt(meta.currentPage, 10)}
														pageSize={parseInt(meta.itemsPerPage, 10)}
														total={parseInt(meta.totalItems, 10)}
														showTotal={total => `Total ${total} items`}
														itemRender={itemRender}
														onChange={onNavigatePage}
														showSizeChanger={false}
													/>
												</div>
												<div>
													<div className="mt-2">
														Total Amount {formatCurrency(meta.totalAmount)}
													</div>
												</div>
												<div className="mt-4">
													{fileAvailable ? (
														<a
															className="btn btn-sm btn-primary btn-upper text-white"
															href={downloadUrl}
															target="_blank"
															download
														>
															<span>Download</span>
														</a>
													) : (
														<div
															className="btn btn-sm btn-primary btn-upper text-white"
															onClick={doExport}
														>
															<span>
																{exporting ? (
																	<img src={waiting} alt="submitting" />
																) : (
																	'Export to Excel'
																)}
															</span>
														</div>
													)}
												</div>
											</>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cafeteria;

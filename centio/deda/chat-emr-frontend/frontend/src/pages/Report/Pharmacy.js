/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import { itemRender, request } from '../../services/utilities';
import moment from 'moment';
import Pagination from 'antd/lib/pagination';
import TableLoading from '../../components/TableLoading';
import { paginate } from '../../services/constants';
import DatePicker from 'antd/lib/date-picker';
import waiting from '../../assets/images/waiting.gif';
import PharmacySales from '../../components/Pharmacy/PharmacySales';

const { RangePicker } = DatePicker;

const Pharmacy = () => {
	const [loading, setLoading] = useState(true);

	const [drugTransactions, setDrugTransactions] = useState([]);
	const [drugDispensation, setDrugDispensation] = useState([]);
	const [metaDispense, setMetaDispense] = useState({ ...paginate });
	const [meta, setMeta] = useState({ ...paginate });

	const [linkPharm, setLinkPharm] = useState(true);
	const [linkDen, setLinkDen] = useState(false);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [filtering, setFiltering] = useState(false);
	const [hmos, setHMOS] = useState([]);
	const [hmoId, setHMOId] = useState('');

	const dateChange = e => {
		const date = e.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		setStartDate(date[0]);
		setEndDate(date[1]);
	};

	const fetchDrugTransactions = useCallback(
		async page => {
			try {
				const p = page || 1;
				setLoading(true);
				const url = `transactions/search?bill_source=drugs&page=${p}&limit=10&term=${searchValue}&startDate=${startDate}&endDate=${endDate}&hmo_id=${hmoId}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setDrugTransactions(result);
				setMeta(meta);
				setLoading(false);
				window.scrollTo({ top: 0, behavior: 'smooth' });
			} catch (err) {
				console.log('fetch drug err', err);
				setLoading(false);
			}
		},
		[endDate, searchValue, startDate, hmoId]
	);

	const fetchDrugDispensations = useCallback(async page => {
		try {
			let p = page || 1;
			const url = `inventory/drugs/drug-records?page=${p}&limit=15`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			setDrugDispensation(result);
			setMetaDispense(meta);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (err) {
			console.log('fetch drug dispensation err', err);
		}
	}, []);

	const fetchHMOS = useCallback(async () => {
		try {
			const url = `hmos/schemes?limit=100`;
			const rs = await request(url, 'GET', true);
			const { result } = rs;
			setHMOS(result);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		fetchHMOS();
	}, []);

	useEffect(() => {
		if (loading) {
			fetchDrugTransactions();
			// fetchDrugDispensations();
		}
	}, []);

	const doFilter = async () => {
		setFiltering(true);
		await fetchDrugTransactions();
		setFiltering(false);
	};

	const handleLinkPharm = () => {
		setLinkPharm(true);
		setLinkDen(false);
	};

	const handleLinkDen = () => {
		setLinkPharm(false);
		setLinkDen(true);
	};

	const onNavigatePage = pageNumber => {
		fetchDrugTransactions(pageNumber);
	};
	const onNavigatePageDispense = pageNumber => {
		fetchDrugDispensations(pageNumber);
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
									href="#"
								>
									SALES
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
								placeholder="search name,patient id, drug, amount, qty"
							/>
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
								<option className="text-dark" value="">
									All
								</option>
								{hmos.map((pat, i) => {
									return (
										<option className="text-dark" key={i} value={pat.id}>
											{pat.name}
										</option>
									);
								})}
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
					<div className="col-md-12">
						<div className="element-box">
							<div className="element-wrapper">
								<div className="controls-above-table">
									<div className="row">
										<div className="col-sm-8">
											<div className="element-wrapper">
												<div className="os-tabs-w mx-1">
													<div className="os-tabs-controls os-tabs-complex">
														<ul className="nav nav-tabs upper">
															<li className="nav-item">
																<div
																	className={`nav-link ${
																		linkPharm ? 'active' : ''
																	}`}
																	onClick={handleLinkPharm}
																>
																	<a>Pharmacy</a>
																</div>
															</li>
															<li className="nav-item">
																<div
																	aria-expanded="false"
																	className={`nav-link ${
																		linkDen ? 'active' : ''
																	}`}
																	onClick={handleLinkDen}
																>
																	<a>Dispensed</a>
																</div>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								{loading ? (
									<TableLoading />
								) : (
									<>
										{linkPharm && (
											<PharmacySales
												drugTransactions={drugTransactions}
												meta={meta}
												onNavigatePage={onNavigatePage}
											/>
										)}

										<>
											{linkDen && (
												<>
													<div className="col-md-12">
														<div className="">
															<div className="element-wrapper">
																<table className="table table-striped table-bordered">
																	<thead>
																		<tr>
																			<th>BRAND NAME</th>
																			<th>GENERIC NAME</th>
																			<th>QUANTITY DISPENSED</th>
																		</tr>
																	</thead>
																	<tbody>
																		{drugDispensation.map((drug, index) => (
																			<tr key={index}>
																				<td>{drug.name}</td>
																				<td>{drug.genericName}</td>
																				<td>{Math.abs(drug.quantity)}</td>
																			</tr>
																		))}
																	</tbody>
																</table>
																<div className="controls-below-table"></div>
																<div className="pagination pagination-center mt-4">
																	<Pagination
																		current={parseInt(
																			metaDispense.currentPage,
																			10
																		)}
																		pageSize={parseInt(
																			metaDispense.itemsPerPage,
																			10
																		)}
																		total={parseInt(
																			metaDispense.totalPages,
																			10
																		)}
																		showTotal={total => `Total ${total} items`}
																		itemRender={itemRender}
																		onChange={onNavigatePageDispense}
																		showSizeChanger={false}
																	/>
																</div>
															</div>
														</div>
													</div>
												</>
											)}
										</>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Pharmacy;

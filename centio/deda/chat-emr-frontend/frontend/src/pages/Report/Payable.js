/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';

import { request } from '../../services/utilities';
import TableLoading from '../../components/TableLoading';
import { paginate } from '../../services/constants';
import waiting from '../../assets/images/waiting.gif';

const { RangePicker } = DatePicker;

const Payable = () => {
	const [loading, setLoading] = useState(true);
	const [display, setDisplay] = useState(false);

	const [, setCafeteriaTransactions] = useState([]);
	const [, setMeta] = useState({ ...paginate });

	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [filtering, setFiltering] = useState(false);

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
				const url = `transactions/search?bill_source=cafeteria&page=${p}&limit=10&term=${searchValue}&startDate=${startDate}&endDate=${endDate}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setCafeteriaTransactions(result);
				setMeta(meta);
				setLoading(false);
				window.scrollTo({ top: 0, behavior: 'smooth' });
			} catch (err) {
				console.log('fetch drug err', err);
				setLoading(false);
			}
		},
		[endDate, searchValue, startDate]
	);

	useEffect(() => {
		if (loading) {
			fetchCafeteriaTransactions();
		}
	}, [fetchCafeteriaTransactions, loading]);

	const doFilter = async () => {
		setFiltering(true);
		await fetchCafeteriaTransactions();
		setFiltering(false);
	};

	const handleDisplay = () => {
		setDisplay(!display);
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
									PAYABLE
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="element-box m-0 mb-4 p-3">
					<form className="row">
						<div className="form-group col-md-3">
							<label className="mr-2 ">From - To</label>
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
					<div className="col-sm-8 col-lg-9 col-xl-6 col-xxl-12">
						<div className="element-box">
							<div className="element-wrapper">
								<div className="element-box-tp">
									<div className="element-box-tp">
										{loading ? (
											<TableLoading />
										) : (
											<div className="tasks-section">
												<div
													className="tasks-header-w"
													style={{
														display: 'flex',
														borderBottom: '1px solid rgba(0, 0, 0, 0.1',
														marginBottom: '20px',
													}}
												>
													<a
														className="tasks-header-toggler"
														href="#"
														style={{ textDecoration: 'none' }}
													>
														<i
															className="os-icon os-icon-ui-23"
															onClick={handleDisplay}
														></i>
													</a>
													<h6
														className="tasks-header"
														style={{ marginLeft: '10px' }}
													>
														DRUGMART AND GREENS LTD
													</h6>
													<span
														className="tasks-sub-header ml-auto"
														style={{ marginLeft: '10px' }}
													>
														10457
													</span>
												</div>
												{display && (
													<div className="tasks-list-w">
														<ul className="tasks-list">
															<div className="table-responsive">
																<table
																	className="table table-striped table-bordered"
																	style={{ fontSize: '13px' }}
																>
																	<thead>
																		<tr>
																			<th>Date</th>
																			<th>Enrollee</th>
																			<th>Code</th>
																			<th className="text-center">Status</th>
																			<th className="text-right">Amount</th>
																			<th className="text-right">...</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr>
																			<td className="text-left">
																				<span>Today </span>
																				<span className="smaller lighter">
																					1:52pm
																				</span>
																			</td>
																			<td>10987</td>
																			<td>117898</td>
																			<td>
																				<div className="value">Diagnosis</div>
																				<span className="smaller lighter">
																					ICD10 (I10): Essential (primary)
																					hypertension
																				</span>
																			</td>
																			<td className="text-right">
																				₦600,000.00
																			</td>
																			<td className="row-actions">
																				<a href="#">
																					<i className="os-icon os-icon-grid-10"></i>
																				</a>
																				<a href="#">
																					<i className="os-icon os-icon-ui-44"></i>
																				</a>
																				<a className="danger" href="#">
																					<i className="os-icon os-icon-ui-15"></i>
																				</a>
																			</td>
																		</tr>
																		<tr>
																			<td className="text-left">
																				<span>Today </span>
																				<span className="smaller lighter">
																					1:52pm
																				</span>
																			</td>
																			<td>10987</td>
																			<td>117898</td>
																			<td>
																				<div className="value">Lab</div>
																				<span className="smaller lighter">
																					Electrolyte, Urea &amp; Creatinine
																					(EU&amp;Cr)
																				</span>
																			</td>
																			<td className="text-right">
																				₦1,700,000.00
																			</td>
																			<td className="row-actions">
																				<a href="#">
																					<i className="os-icon os-icon-grid-10"></i>
																				</a>
																				<a href="#">
																					<i className="os-icon os-icon-ui-44"></i>
																				</a>
																				<a className="danger" href="#">
																					<i className="os-icon os-icon-ui-15"></i>
																				</a>
																			</td>
																		</tr>
																		<tr>
																			<td className="text-left">
																				<span>Today </span>
																				<span className="smaller lighter">
																					1:52pm
																				</span>
																			</td>
																			<td>10987</td>
																			<td>117898</td>
																			<td>
																				<div className="value">Drugs</div>
																				<span className="smaller lighter">
																					500mg of ciprofloxacin 500mg (pack)
																				</span>
																			</td>
																			<td className="text-right">
																				₦6000,000.00
																			</td>
																			<td className="row-actions">
																				<a href="#">
																					<i className="os-icon os-icon-grid-10"></i>
																				</a>
																				<a href="#">
																					<i className="os-icon os-icon-ui-44"></i>
																				</a>
																				<a className="danger" href="#">
																					<i className="os-icon os-icon-ui-15"></i>
																				</a>
																			</td>
																		</tr>
																		<tr>
																			<td className="text-left">
																				<span>Today </span>
																				<span className="smaller lighter">
																					1:52pm
																				</span>
																			</td>
																			<td>10987</td>
																			<td>117898</td>
																			<td>
																				<div className="value">Diagnosis</div>
																				<span className="smaller lighter">
																					Caesarean section with two previous
																					abdominal surgery{' '}
																				</span>
																			</td>
																			<td className="text-right">
																				₦500,000.00
																			</td>
																			<td className="row-actions">
																				<a href="#">
																					<i className="os-icon os-icon-grid-10"></i>
																				</a>
																				<a href="#">
																					<i className="os-icon os-icon-ui-44"></i>
																				</a>
																				<a className="danger" href="#">
																					<i className="os-icon os-icon-ui-15"></i>
																				</a>
																			</td>
																		</tr>
																		<tr>
																			<td className="text-left">
																				<span>Today </span>
																				<span className="smaller lighter">
																					1:52pm
																				</span>
																			</td>
																			<td>10987</td>
																			<td>117898</td>
																			<td>
																				<div className="value">Diagnosis</div>
																				<span className="smaller lighter">
																					ICD10 (I10): Essential (primary)
																					hypertension
																				</span>
																			</td>
																			<td className="text-right">
																				₦1,600,000.00
																			</td>
																			<td className="row-actions">
																				<a href="#">
																					<i className="os-icon os-icon-grid-10"></i>
																				</a>
																				<a href="#">
																					<i className="os-icon os-icon-ui-44"></i>
																				</a>
																				<a className="danger" href="#">
																					<i className="os-icon os-icon-ui-15"></i>
																				</a>
																			</td>
																		</tr>
																		<tr>
																			<td className="text-left">
																				<span>Today </span>
																				<span className="smaller lighter">
																					1:52pm
																				</span>
																			</td>
																			<td>10987</td>
																			<td>117898</td>
																			<td>
																				<div className="value">Diagnosis</div>
																				<span className="smaller lighter">
																					ICD10 (I10): Essential (primary)
																					hypertension
																				</span>
																			</td>
																			<td className="text-right">
																				₦1,600,000.00
																			</td>
																			<td className="row-actions">
																				<a href="#">
																					<i className="os-icon os-icon-grid-10"></i>
																				</a>
																				<a href="#">
																					<i className="os-icon os-icon-ui-44"></i>
																				</a>
																				<a className="danger" href="#">
																					<i className="os-icon os-icon-ui-15"></i>
																				</a>
																			</td>
																		</tr>
																		<tr>
																			<td className="text-left">
																				<span>Today </span>
																				<span className="smaller lighter">
																					1:52pm
																				</span>
																			</td>
																			<td>10987</td>
																			<td>117898</td>
																			<td>
																				<div className="value">Diagnosis</div>
																				<span className="smaller lighter">
																					ICD10 (I10): Essential (primary)
																					hypertension
																				</span>
																			</td>
																			<td className="text-right">
																				₦1,600,000.00
																			</td>
																			<td className="row-actions">
																				<a href="#">
																					<i className="os-icon os-icon-grid-10"></i>
																				</a>
																				<a href="#">
																					<i className="os-icon os-icon-ui-44"></i>
																				</a>
																				<a className="danger" href="#">
																					<i className="os-icon os-icon-ui-15"></i>
																				</a>
																			</td>
																		</tr>
																		<tr>
																			<td className="text-left">
																				<span>Today </span>
																				<span className="smaller lighter">
																					1:52pm
																				</span>
																			</td>
																			<td>10987</td>
																			<td>117898</td>
																			<td>
																				<div className="value">Diagnosis</div>
																				<span className="smaller lighter">
																					ICD10 (I10): Essential (primary)
																					hypertension
																				</span>
																			</td>
																			<td className="text-right">
																				₦1,600,000.00
																			</td>
																			<td className="row-actions">
																				<a href="#">
																					<i className="os-icon os-icon-grid-10"></i>
																				</a>
																				<a href="#">
																					<i className="os-icon os-icon-ui-44"></i>
																				</a>
																				<a className="danger" href="#">
																					<i className="os-icon os-icon-ui-15"></i>
																				</a>
																			</td>
																		</tr>
																		<tr>
																			<td className="text-left">
																				<span>Today </span>
																				<span className="smaller lighter">
																					1:52pm
																				</span>
																			</td>
																			<td>10987</td>
																			<td>117898</td>
																			<td>
																				<div className="value">Diagnosis</div>
																				<span className="smaller lighter">
																					ICD10 (I10): Essential (primary)
																					hypertension
																				</span>
																			</td>
																			<td className="text-right">
																				₦1,600,000.00
																			</td>
																			<td className="row-actions">
																				<a href="#">
																					<i className="os-icon os-icon-grid-10"></i>
																				</a>
																				<a href="#">
																					<i className="os-icon os-icon-ui-44"></i>
																				</a>
																				<a className="danger" href="#">
																					<i className="os-icon os-icon-ui-15"></i>
																				</a>
																			</td>
																		</tr>
																		<tr>
																			<td className="text-left">
																				<span>Today </span>
																				<span className="smaller lighter">
																					1:52pm
																				</span>
																			</td>
																			<td>10987</td>
																			<td>117898</td>
																			<td>
																				<div className="value">Diagnosis</div>
																				<span className="smaller lighter">
																					ICD10 (I10): Essential (primary)
																					hypertension
																				</span>
																			</td>
																			<td className="text-right">
																				₦1,600,000.00
																			</td>
																			<td className="row-actions">
																				<a href="#">
																					<i className="os-icon os-icon-grid-10"></i>
																				</a>
																				<a href="#">
																					<i className="os-icon os-icon-ui-44"></i>
																				</a>
																				<a className="danger" href="#">
																					<i className="os-icon os-icon-ui-15"></i>
																				</a>
																			</td>
																		</tr>
																		<tr>
																			<td className="text-left">
																				<span>Today </span>
																				<span className="smaller lighter">
																					1:52pm
																				</span>
																			</td>
																			<td>10987</td>
																			<td>117898</td>
																			<td>
																				<div className="value">Diagnosis</div>
																				<span className="smaller lighter">
																					ICD10 (I10): Essential (primary)
																					hypertension
																				</span>
																			</td>
																			<td className="text-right">
																				₦1,600,000.00
																			</td>
																			<td className="row-actions">
																				<a href="#">
																					<i className="os-icon os-icon-grid-10"></i>
																				</a>
																				<a href="#">
																					<i className="os-icon os-icon-ui-44"></i>
																				</a>
																				<a className="danger" href="#">
																					<i className="os-icon os-icon-ui-15"></i>
																				</a>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</ul>
													</div>
												)}
											</div>
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

export default Payable;

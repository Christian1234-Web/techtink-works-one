/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import Pagination from 'antd/lib/pagination';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

import waiting from '../../assets/images/waiting.gif';
import { request, itemRender, patientname } from '../../services/utilities';
import { searchAPI } from '../../services/constants';

import { notifyError } from '../../services/notify';
import TableLoading from '../../components/TableLoading';

const { RangePicker } = DatePicker;

class Doctor extends Component {
	state = {
		filtering: false,
		loading: false,
		startDate: '',
		endDate: '',
		status: '',
		doctorReport: [],
		meta: null,
		patient_id: '',
		search: '',
	};

	componentDidMount() {
		this.fetchDoctorReport();
	}

	fetchDoctorReport = async page => {
		try {
			const { startDate, endDate, status, patient_id } = this.state;
			this.setState({ loading: true });
			const p = page || 1;
			const url = `front-desk/appointments?page=${p}&limit=10&patient_id=${patient_id}&startDate=${startDate}&endDate=${endDate}&consultation_type=${status}`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.setState({
				doctorReport: result,
				loading: false,
				filtering: false,
				meta,
			});
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			console.log(error);
			notifyError('Error fetching all doctor reports request');
		}
	};

	doFilter = e => {
		this.setState({ filtering: true });
		this.fetchDoctorReport();
	};

	change = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	dateChange = e => {
		let date = e?.map(d => {
			return moment(d._d).format('YYYY-MM-DD');
		});

		this.setState({
			...this.state,
			startDate: e ? date[0] : '',
			endDate: e ? date[1] : '',
		});
	};

	updatedoctorReports = doctorReport => {
		this.setState({ doctorReport });
	};

	handleChange = e => {
		this.setState({
			...this.state,
			search: e.target.value,
			filtering: false,
		});
	};

	onNavigatePage = nextPage => {
		this.fetchDoctorReport(nextPage);
	};

	getOptions = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `${searchAPI}?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	render() {
		const { filtering, loading, doctorReport, meta } = this.state;
		const getOptionValues = option => option.id;
		const getOptionLabels = option => patientname(option, true);

		return (
			<div className="content-i">
				<div className="content-box">
					{/* {JSON.stringify(doctorReport[0]?.item.transaction, null, 4)} */}
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
										Doctor Reports
									</a>
								</li>
							</ul>
						</div>
					</div>
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
									loadOptions={this.getOptions}
									onChange={e => {
										this.setState({
											filtered: false,
											patient_id: e !== null ? e.id : '',
										});
									}}
									placeholder="Search patients"
								/>
							</div>
							<div className="form-group col-md-3">
								<label>From - To</label>
								<RangePicker onChange={e => this.dateChange(e)} />
							</div>

							<div className="form-group col-md-2">
								<label>Consultation Type</label>
								<select
									style={{ height: '35px' }}
									id="status"
									className="form-control"
									name="status"
									onChange={e =>
										this.setState({ filtered: false, status: e.target.value })
									}
								>
									{/* <option value="">Choose Hmo</option> */}
									<option value="">All</option>
									<option value="follow-up" className="text-capitalize">
										follow up
									</option>
									<option value="initial" className="text-capitalize">
										initial
									</option>
								</select>
							</div>
							<div className="form-group col mt-4">
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
					<div className="row">
						<div className="col-sm-12 col-lg-12 col-xl-12 col-xxl-12">
							<div className="element-box">
								<div className="element-box p-3 m-0 mt-3">
									<div className="table-responsive">
										{loading ? (
											<TableLoading />
										) : (
											<>
												<>
													{
														<>
															<table className="table table-striped table-bordered">
																<thead>
																	<tr>
																		<th>Date</th>
																		<th>Doctor's Name</th>
																		<th>Patient's Name</th>
																		<th>Patient ID</th>
																		<th>Specialty</th>
																		<th>Consultation Type</th>
																	</tr>
																</thead>
																<tbody>
																	{doctorReport?.map((report, index) => (
																		<tr key={index}>
																			<td>
																				{moment(report.appointment_date).format(
																					'DD-MMM-YYYY h:mm a'
																				)}
																			</td>
																			<td>
																				{report.whomToSee?.first_name}{' '}
																				{report.whomToSee?.last_name || '--'}
																			</td>
																			<td>
																				{report.patient.surname}{' '}
																				{report.patient.other_names}
																			</td>
																			<td>
																				{report.patient.legacy_patient_id &&
																				report.patient.legacy_patient_id !== ''
																					? `${report.patient.id}(${report.patient.legacy_patient_id})`
																					: report.patient.id}
																			</td>

																			<td>
																				{report.whomToSee?.profession || '--'}
																			</td>
																			<td className="text-left">
																				{report.consultation_type || '--'}
																			</td>
																		</tr>
																	))}
																</tbody>
															</table>
															{meta && (
																<div className="pagination pagination-center mt-4">
																	<Pagination
																		current={parseInt(meta.currentPage, 10)}
																		pageSize={parseInt(meta.itemsPerPage, 10)}
																		total={parseInt(meta.totalPages, 10)}
																		showTotal={total =>
																			`Total ${total}   results`
																		}
																		itemRender={itemRender}
																		onChange={current =>
																			this.onNavigatePage(current)
																		}
																		showSizeChanger={false}
																	/>
																</div>
															)}
														</>
													}
												</>
											</>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Doctor;

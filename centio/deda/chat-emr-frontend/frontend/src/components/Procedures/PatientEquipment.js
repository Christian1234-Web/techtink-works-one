/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import { formatDate, itemRender } from '../../services/utilities';
// import { notifySuccess, notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';

import TableLoading from '../TableLoading';

class PatientEquipment extends Component {
	state = {
		loading: false,
		role: null,
		showModal: false,
		meta: null,
		notes: [],
	};

	componentDidMount() {
		this.fetchPatientEquipment();
	}

	fetchPatientEquipment = async page => {
		// 	try {
		// 		const p = page || 1;
		// 		this.setState({ loading: true });
		// 		const url = `dummy/list?page=${p}&limit=24`;
		// 		const rs = await request(url, 'GET', true);
		// 		const { result, ...meta } = rs;
		// 		const arr = [...result];
		// 		this.setState({ loading: false, meta, notes: arr });
		// 		this.props.stopBlock();
		// 	} catch (error) {
		// 		console.log(error);
		// 		this.props.stopBlock();
		// 		this.setState({ loading: false });
		// 		notifyError(error.message || 'could not fetch visit notes');
		// 	}
	};

	onNavigatePage = nextPage => {
		this.props.startBlock();
		this.fetchNotes(nextPage);
	};

	openPermissionModal = role => () => {
		document.body.classList.add('modal-open');
		this.setState({ role, showModal: true });
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({ role: null, showModal: false });
	};

	render() {
		const { loading, meta, notes } = this.state;
		return (
			<div className="row">
				<div className="m-0 w-100">
					{loading ? (
						<TableLoading />
					) : (
						<div className="">
							<div className="table-responsive">
								<div className="dataTables_wrapper container-fluid dt-bootstrap4">
									<div className="row">
										<div className="col-sm-12">
											<table
												className="table table-striped table-lightfont dataTable"
												style={{ width: '100%' }}
											>
												<thead style={{ borderCollapse: 'collapse' }}>
													<tr>
														<th rowSpan="1" colSpan="1">
															Date
														</th>

														<th rowSpan="1" colSpan="1">
															Equipment
														</th>
														<th rowSpan="1" colSpan="1">
															Assigned By
														</th>
														<th rowSpan="1" colSpan="1">
															Status
														</th>
													</tr>
												</thead>

												<tbody>
													{notes?.map((note, i) => {
														return (
															<tr key={i}>
																<td>
																	{formatDate(
																		note.note_date,
																		'DD-MMM-YYYY h:mma'
																	)}
																</td>

																<td>{note.equipment}</td>
																<td>{note.notedBy}</td>
																<td>{note.status}</td>
															</tr>
														);
													})}

													{notes && notes.length === 0 && (
														<tr className="text-center">
															<td colSpan="7">No Patient Equipment</td>
														</tr>
													)}
												</tbody>
											</table>
										</div>
									</div>
									<div className="row">
										{meta && (
											<div className="pagination pagination-center mt-4">
												<Pagination
													current={parseInt(meta.currentPage, 10)}
													pageSize={parseInt(meta.itemsPerPage, 10)}
													total={parseInt(meta.totalPages, 10)}
													showTotal={total => `Total ${total} equipments`}
													itemRender={itemRender}
													onChange={current => this.onNavigatePage(current)}
													showSizeChanger={false}
												/>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		roles: state.role.roles,
	};
};

export default connect(mapStateToProps, {
	startBlock,
	stopBlock,
})(PatientEquipment);

import React, { useCallback, useEffect, useState } from 'react';

import CreateEmbryology from '../Modals/CreateEmbryology';

import TableLoading from '../TableLoading';
import Pagination from 'antd/lib/pagination';
import { itemRender, patientname, request } from '../../services/utilities';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';

const Embryology = ({ patient }) => {
	const [showModal, setShowModal] = useState(false);
	const [patientEmbryology, setPatientEmbryology] = useState();
	const [loaded, setLoaded] = useState(false);
	// const [meta, setMeta] = useState({
	// 	currentPage: 1,
	// 	itemsPerPage: 2,
	// 	totalPages: 0,
	// });

	const newEntry = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		document.body.classList.remove('modal-open');
	};

	const fetchEmbryology = useCallback(async () => {
		const url = `embryology/?patient_id=${patient.id}`;

		const rs = await request(url, 'GET', true);

		setPatientEmbryology(rs.patient);

		setLoaded(true);
	}, [patient]);

	useEffect(() => {
		fetchEmbryology();
	}, []);

	console.log(patient.id, patientEmbryology);

	return (
		<div className="col-sm-12">
			<div className="element-wrapper embryology">
				<div className="element-actions flex-action">
					<a
						className="btn btn-sm btn-secondary text-white ml-3"
						onClick={() => newEntry()}
					>
						New Embryology
					</a>
					{showModal && (
						<CreateEmbryology patient={patient} closeModal={closeModal} />
					)}
				</div>
				<h6 className="element-header">Embryology</h6>
				{/* Enter tables */}
				<div className="element-box p-3 m-0 mt-3">
					<div className="bootstrap-table">
						{!loaded ? (
							<TableLoading />
						) : (
							<div className="fixed-table-container pb-0">
								<div className="fixed-table-body">
									{/* Table Begins */}
									<table
										className="table table-striped"
										style={{ backgroundColor: 'transparent' }}
									>
										<thead>
											<tr>
												<th>Request Date</th>
												<th>Patient</th>
												<th>By</th>
												<th>HMO</th>
												<th>actions</th>
											</tr>
										</thead>
										<tbody>
											{patientEmbryology?.embryology.map((emb, i) => {
												const patientName = patientname(patient, true);
												const hmoName = patientEmbryology.hmo?.name;
												return (
													<tr key={i}>
														<td>
															<span>
																{moment(emb.createdAt).format(
																	'DD-MMM-YYYY h:mmA'
																)}
															</span>
														</td>
														<td>
															<p className="item-title text-color m-0">
																{patientName}
															</p>
														</td>
														<td>
															<p className="item-title text-color m-0">
																{emb.ivfTreatment.createdBy}
															</p>
														</td>
														<td>
															<p className="item-title text-color m-0">
																{hmoName}
															</p>
														</td>
														<td>
															<Tooltip title="view">
																<i className="os-icon os-icon-eye"></i>
															</Tooltip>
															{/* <Tooltip title="view">
																<i className="os-icon os-icon-send"></i>
															</Tooltip> */}
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
									{/* Table ends */}
								</div>
								{/* {meta && (
									<div className="pagination pagination-center mt-4">
										<Pagination
											current={parseInt(meta.currentPage, 10)}
											pageSize={parseInt(meta.itemsPerPage, 10)}
											total={parseInt(meta.totalPages, 10)}
											showTotal={total => `Total ${total} lab requests`}
											itemRender={itemRender}
											// onChange={current => onNavigatePage(current)}
											showSizeChanger={false}
										/>
									</div>
								)} */}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Embryology;

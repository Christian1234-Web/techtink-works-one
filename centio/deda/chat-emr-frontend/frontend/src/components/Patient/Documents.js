import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import Popover from 'antd/lib/popover';
import Pagination from 'antd/lib/pagination';

import TableLoading from '../TableLoading';
import { notifySuccess, notifyError } from '../../services/notify';
import {
	formatDate,
	itemRender,
	request,
	upload,
} from '../../services/utilities';
import { API_URI, patientAPI, documentType } from '../../services/constants';
import UploadDocument from './UploadDocument';
import { startBlock, stopBlock } from '../../actions/redux-block';

const Documents = ({ patient }) => {
	const [loading, setLoading] = useState(true);
	const [documentList, setDocumentList] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [uploadVisible, setUploadVisible] = useState(false);
	const [meta, setMeta] = useState(null);

	const dispatch = useDispatch();

	const fetchDocuments = useCallback(
		async page => {
			try {
				const p = page || 1;
				const url = `${patientAPI}/${patient.id}/documents?page=${p}`;
				const rs = await request(url, 'GET', true);
				const { result, ...paginate } = rs;
				setMeta(paginate);
				setDocumentList(result);
				setLoading(false);
			} catch (e) {
				console.log(e);
				setLoading(false);
				notifyError(e.message || 'could not fetch documents');
			}
		},
		[patient]
	);

	useEffect(() => {
		if (loading) {
			fetchDocuments();
		}
	}, [fetchDocuments, loading]);

	const hide = () => {
		setUploadVisible(false);
	};

	const handleUploadVisibleChange = visible => {
		setUploadVisible(visible);
	};

	const onUpload = async (e, files, documentID) => {
		e.preventDefault();
		const file = files[0];
		if (file) {
			setUploading(true);
			try {
				let formData = new FormData();
				formData.append('file', file);
				formData.append('document_type', documentID);
				const url = `${API_URI}/${patientAPI}/${patient.id}/upload-document`;
				const rs = await upload(url, 'POST', formData);
				setUploading(false);
				if (rs.success) {
					setDocumentList([rs.document, ...documentList]);
					notifySuccess(`Patient ${rs.document.document_type} Uploaded`);
					setUploadVisible(false);
				} else {
					notifyError(rs.message || 'could not upload data');
				}
			} catch (error) {
				console.log(error);
				setUploading(false);
				notifyError(e.message || 'could not upload data');
			}
		}
	};

	const onNavigatePage = async nextPage => {
		dispatch(startBlock());
		await fetchDocuments(nextPage);
		dispatch(stopBlock());
	};

	const handleDownload = async id => {
		try {
			dispatch(startBlock());
			const url = `${patientAPI}/${patient.id}/documents/${id}`;
			const rs = await request(url, 'GET', true);
			if (rs.success) {
				setTimeout(() => {
					dispatch(stopBlock());
					window.open(rs.url, '_blank').focus();
				}, 1000);
			} else {
				dispatch(stopBlock());
				notifyError(rs.message || 'could not download document');
			}
		} catch (e) {
			dispatch(stopBlock());
			console.log(e);
			setLoading(false);
			notifyError(e.message || 'could not download document');
		}
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					<Popover
						content={
							<UploadDocument
								onHide={hide}
								uploading={uploading}
								doUpload={onUpload}
								documentType={documentType}
							/>
						}
						overlayClassName="upload-roster"
						onVisibleChange={handleUploadVisibleChange}
						visible={uploadVisible}
						trigger="click"
					>
						<a className="btn btn-sm btn-secondary text-white">
							<i className="os-icon os-icon-upload" />
							<span>Upload Document</span>
						</a>
					</Popover>
				</div>
				<h6 className="element-header">Documents</h6>
				<div className="element-box m-0 p-3">
					<div className="table-responsive">
						{loading ? (
							<TableLoading />
						) : (
							<>
								<table className="table table-striped">
									<thead>
										<tr>
											<th>ID</th>
											<th>Document Name</th>
											<th>Document Type</th>
											<th>Uploaded By</th>
											<th>Date</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{documentList.map((item, i) => {
											return (
												<tr key={i}>
													<td>{item.id}</td>
													<td>{item.document_name}</td>
													<td>{item.document_type}</td>
													<td>{item.createdBy}</td>
													<td>
														{formatDate(item.createdAt, 'DD-MMM-YYYY h:mm A')}
													</td>
													<td className="row-actions">
														<Tooltip title="Download File">
															<a onClick={() => handleDownload(item.id)}>
																<i className="os-icon os-icon-download-cloud" />
															</a>
														</Tooltip>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</>
						)}
					</div>
					{meta && (
						<div className="pagination pagination-center mt-4">
							<Pagination
								current={parseInt(meta.currentPage, 10)}
								pageSize={parseInt(meta.itemsPerPage, 10)}
								total={parseInt(meta.totalPages, 10)}
								showTotal={total => `Total ${total} documents`}
								itemRender={itemRender}
								onChange={current => onNavigatePage(current)}
								showSizeChanger={false}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Documents;

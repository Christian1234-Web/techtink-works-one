import React, { useState, useEffect, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Pagination from 'antd/lib/pagination';

import searching from '../../assets/images/searching.gif';
import { notifyError } from '../../services/notify';
import { request, itemRender } from '../../services/utilities';
import RadiologyBlock from '../RadiologyBlock';

const Radiology = ({ location, itemId, type, can_request = true, patient }) => {
	const [loaded, setLoaded] = useState(false);
	const [scans, setScans] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});

	const startDate = '';
	const endDate = '';

	const fetchScans = useCallback(
		async page => {
			try {
				const block = type || '';
				const url = `requests/${patient.id}/request/scans?page=${page}&limit=10&startDate=${startDate}&endDate=${endDate}&item_id=${itemId}&type=${block}`;
				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setScans(result);
				setMeta(meta);
				setLoaded(true);
			} catch (e) {
				notifyError(e.message || 'could not fetch scan requests');
				setLoaded(true);
			}
		},
		[patient, type, itemId]
	);

	useEffect(() => {
		if (!loaded) {
			fetchScans(1);
		}
	}, [fetchScans, loaded]);

	const updateScan = items => {
		setScans(items);
	};

	const onNavigatePage = nextPage => {
		fetchScans(nextPage);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions">
					{can_request && (
						<Link
							to={`${location.pathname}#radiology-request`}
							className="btn btn-primary btn-sm"
						>
							<i className="os-icon os-icon-plus" />
							New Radiology Request
						</Link>
					)}
				</div>
				<h6 className="element-header">Radiology Requests</h6>
				<div className="element-box p-3 m-0 mt-3">
					<div className="bootstrap-table">
						{!loaded ? (
							<div className="text-center">
								<img alt="searching" src={searching} />
							</div>
						) : (
							<div
								className="fixed-table-container"
								style={{ paddingBottom: '0px' }}
							>
								<div className="fixed-table-body">
									<RadiologyBlock
										loading={false}
										scans={scans}
										updateScan={updateScan}
										patient={patient}
									/>
								</div>
								{meta && (
									<div className="pagination pagination-center mt-4">
										<Pagination
											current={parseInt(meta.currentPage, 10)}
											pageSize={parseInt(meta.itemsPerPage, 10)}
											total={parseInt(meta.totalPages, 10)}
											showTotal={total => `Total ${total} scan results`}
											itemRender={itemRender}
											onChange={current => onNavigatePage(current)}
											showSizeChanger={false}
										/>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Radiology);

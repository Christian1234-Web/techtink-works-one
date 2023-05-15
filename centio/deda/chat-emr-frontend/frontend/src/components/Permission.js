/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';

import TableLoading from './TableLoading';
import {
	getPageList,
	itemRender,
	request,
	updateImmutable,
} from '../services/utilities';
import CreatePermission from './CreatePermission';
import EditPermission from './EditPermission';
import { notifyError } from '../services/notify';

const itemsPerPage = 10;

const Permission = ({ loaded, permissions, setPermissions }) => {
	const [meta, setMeta] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [list, setList] = useState([]);
	const [categories, setCategories] = useState([]);
	const [action, setAction] = useState('add');
	const [permissionItem, setPermissionItem] = useState(null);

	const fetchCategories = useCallback(async () => {
		try {
			const rs = await request('settings/permission-categories', 'GET', true);
			setCategories(rs);
		} catch (error) {
			notifyError(error.message || 'could not fetch permissions');
		}
	}, []);

	useEffect(() => {
		if (!meta) {
			setMeta({ currentPage: 1, itemsPerPage, totalPages: permissions.length });
			const items = getPageList(permissions, itemsPerPage, 1);
			setList(items);
			fetchCategories();
		}
	}, [fetchCategories, meta, permissions]);

	const onNavigatePage = page => {
		setCurrentPage(page);
		const items = getPageList(
			permissions,
			meta.itemsPerPage,
			parseInt(page, 10)
		);
		setList(items);
		setMeta({ ...meta, currentPage: page });
	};

	const setDataList = item => {
		const permissionsList = [item, ...permissions];
		const items = getPageList(permissionsList, meta.itemsPerPage, currentPage);
		setList(items);
		setMeta({ ...meta, currentPage, totalPages: permissionsList.length });
		setPermissions(permissionsList);
	};

	const edit = item => {
		setAction('edit');
		setPermissionItem(item);
	};

	const cancel = () => {
		setAction('add');
		setPermissionItem(null);
	};

	const editDataList = item => {
		const permissionsList = updateImmutable(permissions, item);
		const items = getPageList(permissionsList, meta.itemsPerPage, currentPage);
		setList(items);
		setPermissions(permissionsList);
	};

	return (
		<div className="row">
			<div className="col-lg-8">
				<div className="element-wrapper">
					<div className="element-box p-3 m-0">
						<div className="table-responsive">
							{!loaded ? (
								<TableLoading />
							) : (
								<table className="table table-striped">
									<thead>
										<tr>
											<th>S/N</th>
											<th>Name</th>
											<th>Category</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{list.map((item, i) => {
											return (
												<tr key={i}>
													<td>{item.id}</td>
													<td>{item.slug}</td>
													<td>{item.category?.name || '--'}</td>
													<td className="row-actions">
														{action === 'add' && (
															<Tooltip title="Edit">
																<a
																	onClick={() => edit(item)}
																	className="secondary"
																>
																	<i className="os-icon os-icon-edit-32" />
																</a>
															</Tooltip>
														)}
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							)}
						</div>
						{meta && loaded && (
							<div className="pagination pagination-center mt-4">
								<Pagination
									current={parseInt(currentPage, 10)}
									pageSize={parseInt(meta.itemsPerPage, 10)}
									total={parseInt(meta.totalPages, 10)}
									showTotal={total => `Total ${total} permissions`}
									itemRender={itemRender}
									onChange={current => onNavigatePage(current)}
									showSizeChanger={false}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="col-lg-4">
				{action === 'add' && (
					<CreatePermission categories={categories} setDataList={setDataList} />
				)}
				{action === 'edit' && (
					<EditPermission
						categories={categories}
						editDataList={editDataList}
						permissionItem={permissionItem}
						cancel={() => cancel()}
					/>
				)}
			</div>
		</div>
	);
};

export default Permission;

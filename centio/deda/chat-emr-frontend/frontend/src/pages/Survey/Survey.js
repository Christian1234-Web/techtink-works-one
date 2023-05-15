import React, { useState, useEffect, useCallback } from 'react';
import Pagination from 'antd/lib/pagination';

import { DatePicker } from 'antd';
import moment from 'moment';

import waiting from '../../assets/images/waiting.gif';

import { notifyError } from '../../services/notify';
import { itemRender, request } from '../../services/utilities';

import SurveyBlock from './SurveyBlock';

const Survey = () => {
	const [filtering, setFiltering] = useState(false);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [date, setDate] = useState('');
	const [allSurveys, setAllSurveys] = useState([]);
	const [meta, setMeta] = useState({
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 0,
	});

	const fectchSurveys = useCallback(
		async page => {
			try {
				setLoading(true);
				const p = page || 1;
				const url = `settings/surveyApi?page=${p}&q=${search}`;

				const rs = await request(url, 'GET', true);
				const { result, ...meta } = rs;
				setAllSurveys(result);

				setMeta({
					currentPage: meta.currentPage,
					itemsPerPage: meta.itemsPerPage,
					totalPages: meta.totalItems,
				});
				setLoading(false);
			} catch (error) {
				console.log(error);
				notifyError('error fetching Surveys');
			}
		},
		[search]
	);

	const doFilter = () => {
		setFiltering(true);
		fectchSurveys();
		setFiltering(false);
	};

	const onNavigatePage = nextPage => {
		fectchSurveys(nextPage);
	};

	useEffect(() => {
		if (loading) {
			fectchSurveys();
		}
	}, []);

	return (
		<div className="element-box p-3 m-0 mt-3">
			<div className="row">
				<div className="form-group col-md-5">
					<label className="mr-2 " htmlFor="search">
						Search
					</label>
					<input
						style={{ height: '32px' }}
						id="search"
						className="form-control"
						name="search"
						value={search}
						placeholder="search for staff"
						onChange={e => setSearch(e.target.value)}
					/>
				</div>
				<div className="form-group col-md-3">
					<label className="mr-2 " htmlFor="search">
						Select Date
					</label>

					<DatePicker
						className="form-control"
						onChange={e =>
							moment(e?._d).format('DD-MM-YYYY') < moment().format('DD-MM-YYYY')
								? setDate(moment(e?._d).format('DD-MM-YYYY'))
								: setDate('')
						}
						isClearable
					/>
				</div>

				<div className="form-group col-md-3 mt-4">
					<div
						className="btn btn-sm btn-primary btn-upper text-white filter-btn"
						onClick={doFilter}
					>
						<i className="os-icon os-icon-ui-37" />
						<span>
							{filtering ? <img src={waiting} alt="submitting" /> : 'Filter'}
						</span>
					</div>
				</div>
			</div>
			<div className="table table-responsive">
				<SurveyBlock loading={loading} allSurveys={allSurveys} />
			</div>
			{meta && (
				<div className="pagination pagination-center mt-4">
					<Pagination
						current={parseInt(meta.currentPage, 10)}
						pageSize={parseInt(meta.itemsPerPage, 10)}
						total={parseInt(meta.totalPages, 10)}
						showTotal={total => `Total ${total} surveys`}
						itemRender={itemRender}
						onChange={current => onNavigatePage(current)}
						showSizeChanger={false}
					/>
				</div>
			)}
		</div>
	);
};

export default Survey;

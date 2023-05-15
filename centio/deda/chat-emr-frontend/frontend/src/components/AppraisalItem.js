/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from 'antd/lib/tooltip';
import { Link } from 'react-router-dom';

import { formatDate, request, updateImmutable } from '../services/utilities';
import { loadPerformancePeriod } from '../actions/hr';
import { notifySuccess, notifyError } from '../services/notify';

const status = value => {
	if (value.isActive) {
		return <span className="badge badge-success-inverted">approved</span>;
	} else {
		return <span className="badge badge-danger-inverted">closed</span>;
	}
};

class AppraisalItem extends Component {
	closeAppraisal = async (e, data) => {
		try {
			e.preventDefault();
			const { performancePeriods } = this.props;
			const url = `hr/appraisal/update-period-status/${data.id}`;
			const rs = await request(url, 'POST', true);
			const upd = updateImmutable(performancePeriods, rs);
			this.props.loadPerformancePeriod(upd);
			notifySuccess('Closed appraisal');
		} catch (error) {
			console.log(error);
			notifyError('Error closing appraisal');
		}
	};

	render() {
		const { item, edit } = this.props;
		return (
			<tr>
				<td>{item.id}</td>
				<td>{item.performancePeriod}</td>
				<td>{formatDate(item.startDate, 'DD-MMM-YYYY')}</td>
				<td>{formatDate(item.endDate, 'DD-MMM-YYYY')}</td>
				<td className="text-center">{status(item)}</td>
				<td className="row-actions">
					<Tooltip title="Edit Appraisal">
						<a onClick={() => edit(item)}>
							<i className="os-icon os-icon-edit-32" />
						</a>
					</Tooltip>

					<Tooltip title="View Appraisal">
						<Link to={`/hr/appraisal/${item.id}/view`}>
							<i className="os-icon os-icon-folder" />
						</Link>
					</Tooltip>
					<Tooltip title="Close Appraisal">
						<a
							onClick={e => this.closeAppraisal(e, item)}
							className="danger"
							title="Close Appraisal"
						>
							<i className="os-icon os-icon-x-circle" />
						</a>
					</Tooltip>
				</td>
			</tr>
		);
	}
}

export default connect(null, { loadPerformancePeriod })(AppraisalItem);

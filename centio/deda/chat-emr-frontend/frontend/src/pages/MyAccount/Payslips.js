/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'antd/lib/pagination';
import moment from 'moment';

import { request, itemRender, formatCurrency } from '../../services/utilities';
import { payrollAPI } from '../../services/constants';
import { startBlock, stopBlock } from '../../actions/redux-block';
import ModalViewPayslip from '../../components/Modals/ModalViewPayslip';

const pageSize = 10;

class Payslips extends Component {
	state = {
		openModal: false,
		meta: null,
		list: [],
		payslip: null,
	};

	async componentDidMount() {
		await this.fetchPayroll(1);
	}

	fetchPayroll = async page => {
		try {
			const { staff } = this.props;
			this.props.startBlock();
			const p = page || 1;
			const staff_id = staff?.details?.id || '';
			const url = `${payrollAPI}/list-payroll?page=${p}&limit=${pageSize}&staff_id=${staff_id}&status=1`;
			const rs = await request(url, 'GET', true);
			const { result, ...meta } = rs;
			this.setState({ meta, list: [...result] });
			this.props.stopBlock();
		} catch (error) {
			console.log(error);
			this.props.stopBlock();
		}
	};

	onNavigatePage = async pageNumber => {
		await this.fetchPayroll(pageNumber);
	};

	doViewCurrentPayroll = item => {
		this.setState({ openModal: true, payslip: item });
		document.body.classList.add('modal-open');
	};

	closeModal = () => {
		document.body.classList.remove('modal-open');
		this.setState({ openModal: false, payslip: null });
	};

	render() {
		const { meta, list, openModal, payslip } = this.state;
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="element-wrapper">
						<h6 className="element-header">Payroll</h6>
						<div className="element-box m-0 p-3">
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>ID</th>
											<th>Total Allowance</th>
											<th>Total Deduction</th>
											<th>Total Paid</th>
											<th>Month</th>
											<th>Year</th>
											<th>Date Created</th>
											<th className="text-right">Actions</th>
										</tr>
									</thead>
									<tbody>
										{list.map((item, i) => {
											const date = moment(item.payment_month, 'YYYY-MM');
											return (
												<tr key={i}>
													<td>{item.id}</td>
													<td>{formatCurrency(item.total_allowance)}</td>
													<td>{formatCurrency(item.total_deduction)}</td>
													<td>
														{formatCurrency(
															item.total_allowance - item.total_deduction
														)}
													</td>
													<td>{date.format('MMMM')}</td>
													<td>{date.format('YYYY')}</td>
													<td>
														{moment(item.createdAt).format('D MMM, YYYY')}
													</td>
													<td className="row-actions">
														<a
															onClick={() => this.doViewCurrentPayroll(item)}
															className="primary"
															title="View Current Payslip"
														>
															<i className="os-icon os-icon-credit-card" />
														</a>
													</td>
												</tr>
											);
										})}
										{list.length === 0 && (
											<tr>
												<td colSpan="8" className="text-center">
													No payslips found!
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
							{meta && (
								<div className="pagination pagination-center mt-4">
									<Pagination
										current={meta.currentPage}
										pageSize={pageSize}
										total={meta.totalPages}
										showTotal={total => `Total ${total} items`}
										itemRender={itemRender}
										onChange={this.onNavigatePage}
										showSizeChanger={false}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
				{openModal && payslip && (
					<ModalViewPayslip payslip={payslip} closeModal={this.closeModal} />
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		staff: state.user.profile,
	};
};

export default connect(mapStateToProps, { startBlock, stopBlock })(Payslips);

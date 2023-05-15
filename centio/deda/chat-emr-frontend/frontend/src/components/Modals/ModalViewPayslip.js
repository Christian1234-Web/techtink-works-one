import React from 'react';
import moment from 'moment';

import ModalHeader from '../ModalHeader';
import { formatCurrency, staffname } from '../../services/utilities';

const ModalViewPayslip = ({ payslip, closeModal }) => {
	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog modal-centered">
				<div className="modal-content text-center">
					<ModalHeader
						title={`Payslip for Period: ${moment(
							payslip.payment_month,
							'YYYY-MM'
						).format('MMM YYYY')}`}
						closeModal={closeModal}
					/>
					<div className="onboarding-content with-gradient">
						<div className="table-responsive mt-4">
							<table className="table table-striped table-sm">
								<tbody>
									<tr>
										<th className="text-left">EMP Number:</th>
										<td className="text-right">
											{payslip.staff.employee_number || '--'}
										</td>
									</tr>
									<tr>
										<th className="text-left">Staff Name:</th>
										<td className="text-right">{staffname(payslip.staff)}</td>
									</tr>
									<tr>
										<th className="text-left">Designation:</th>
										<td className="text-right">
											{payslip.staff.job_title || '--'}
										</td>
									</tr>
									<tr>
										<th className="text-left">Bank A/C No:</th>
										<td className="text-right">
											{payslip.staff.account_number || '--'}
										</td>
									</tr>
								</tbody>
							</table>
							<h6 className="mt-3">Payment Details</h6>
							<div className="payroll-details">
								<table className="table table-striped table-sm">
									<tbody>
										<tr>
											<th className="text-left">Earnings</th>
											<th className="text-right">Amount</th>
										</tr>
										{payslip.allowances?.map((_, i) => {
											return (
												<tr key={i}>
													<td className="text-left"></td>
													<td className="text-right"></td>
												</tr>
											);
										})}
									</tbody>
									<tfoot>
										<tr>
											<td className="text-right" colSpan="2">
												<strong>Gross Pay:</strong>
												<span className="ml-4 text-bold">
													{formatCurrency(payslip.total_allowance)}
												</span>
											</td>
										</tr>
									</tfoot>
								</table>
							</div>
							<h6 className="mt-3">Deductions</h6>
							<div className="payroll-details deductions">
								<table className="table tabl-striped table-sm">
									<tbody>
										<tr>
											<th className="text-left">Deductions</th>
											<th className="text-right">Amount</th>
										</tr>
										{payslip.deductions?.map((_, i) => {
											return (
												<tr key={i}>
													<td className="text-left"></td>
													<td className="text-right"></td>
												</tr>
											);
										})}
									</tbody>
									<tfoot>
										<tr>
											<td className="text-right" colSpan="2">
												<strong>Total Deductions:</strong>
												<span className="ml-4 text-bold">
													{formatCurrency(payslip.total_deduction)}
												</span>
											</td>
										</tr>
									</tfoot>
								</table>
							</div>
							<table className="table table-striped table-sm table-lightfont mt-4">
								<tbody>
									<tr>
										<th className="text-left">Prepared By:</th>
										<td className="text-right">{payslip.createdBy}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalViewPayslip;

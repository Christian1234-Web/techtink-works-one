import React, { useMemo } from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { useDispatch, useSelector } from 'react-redux';
import createDecorator from 'final-form-calculate';

import ModalHeader from '../ModalHeader';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { ErrorBlock, formatCurrency, request } from '../../services/utilities';
import { notifySuccess } from '../../services/notify';
import { VAT } from '../../services/constants';

const OrderPayment = ({ orders, total, closeModal, showReceiptModal }) => {
	const dispatch = useDispatch();

	const paymentMethods = useSelector(state => state.utility.methods);

	const makePayment = async values => {
		try {
			const data = {
				...values,
				pay_later: values.pay_later ? 1 : 0,
				cartItems: orders.map(o => ({
					id: o.id,
					name: o.foodItem.name,
					qty: o.quantity,
					price: o.amount,
					staff_price: 0,
				})),
			};
			dispatch(startBlock());
			const rs = await request('cafeteria/orders/sale', 'POST', true, data);
			dispatch(stopBlock());
			if (rs.success) {
				if (!values.pay_later) {
					notifySuccess('payment accepted!');
					showReceiptModal(rs.data, true);
				} else {
					showReceiptModal(rs.data, false);
					notifySuccess('transaction saved!');
					closeModal();
				}
			} else {
				return {
					[FORM_ERROR]: rs.message || 'could not make sale',
				};
			}
		} catch (e) {
			dispatch(stopBlock());
			return { [FORM_ERROR]: 'could not make sale' };
		}
	};

	const calculateAmount = useMemo(
		() =>
			createDecorator({
				field: 'paid',
				updates: {
					balance: (paid, values) => {
						const totalAmount = parseFloat(values.total || 0);
						return totalAmount > 0 ? parseFloat(paid || 0) - totalAmount : 0;
					},
				},
			}),
		[]
	);

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '480px' }}
			>
				<div className="modal-content text-center">
					<ModalHeader title="Make Payment" closeModal={closeModal} />
					<div className="onboarding-content with-gradient">
						<Form
							onSubmit={makePayment}
							initialValues={{
								total,
								balance: 0,
								name: orders[0].name,
								customer: orders[0].customer,
								staff_id: orders[0].staff_id,
								patient_id: orders[0].patient_id,
							}}
							validate={values => {
								const errors = {};
								if (!values.paid) {
									errors.paid = 'Enter paid amount';
								}
								if (!values.payment_method && !values.pay_later) {
									errors.payment_method = 'Select payment method';
								}
								if (Number(values.balance) < 0) {
									errors.paid = 'You are owing';
								}
								return errors;
							}}
							decorators={[calculateAmount]}
							render={({ handleSubmit, submitting, submitError, values }) => {
								return (
									<form onSubmit={handleSubmit}>
										{submitError && (
											<div
												className="alert alert-danger"
												dangerouslySetInnerHTML={{
													__html: `<strong>Error!</strong> ${submitError}`,
												}}
											/>
										)}
										<div className="element-box-tp px-3 py-4">
											<div className="col-sm-12">
												<div className="form-group">
													<Field
														name="name"
														className="form-control no-arrows"
														component="input"
														type="text"
														placeholder="Name"
														readOnly
													/>
													<ErrorBlock name="customer" />
												</div>
											</div>
											<table className="table table-compact smaller text-faded mb-0">
												<thead>
													<tr>
														<th>Item</th>
														<th>Qty</th>
														<th className="text-right">Price</th>
														<th className="text-right">Total</th>
													</tr>
												</thead>
												<tbody>
													{orders.map((cart, i) => {
														return (
															<tr key={i}>
																<td>
																	<span>{cart.foodItem.name}</span>
																</td>
																<td>
																	<input
																		type="number"
																		className="form-control no-arrows m-0"
																		value={cart.quantity}
																		min="1"
																		style={{
																			width: '60px',
																			height: '25px',
																			padding: '0.375rem 0.25rem',
																		}}
																		readOnly
																	/>
																</td>
																<td className="text-right text-bright">
																	{formatCurrency(cart.amount)}
																</td>
																<td className="text-right text-bright">
																	{formatCurrency(
																		Number(cart.amount) * Number(cart.quantity)
																	)}
																</td>
															</tr>
														);
													})}
												</tbody>
											</table>
											<div className="row pt-4">
												<div className="col-md-12">
													<div className="form-group mb-0">
														<div className="input-group">
															<div className="input-group-prepend">
																<div className="input-group-text">
																	TOTAL (₦)
																</div>
															</div>
															<Field
																name="total"
																className="form-control no-arrows"
																component="input"
																type="number"
																placeholder="Total"
																readOnly
															/>
														</div>
													</div>
												</div>
												<div className="col-md-12">
													<div className="form-group text-right">
														{`VAT Inclusive: ₦${
															Number(values.total) * Number(VAT)
														}`}
													</div>
												</div>
												<div className="col-md-12">
													<div className="form-group">
														<div className="input-group">
															<div className="input-group-prepend">
																<div className="input-group-text">PAID (₦)</div>
															</div>
															<Field
																name="paid"
																className="form-control no-arrows"
																component="input"
																type="number"
																placeholder="Paid"
															/>
														</div>
														<ErrorBlock name="paid" />
													</div>
												</div>
												<div className="col-md-12">
													<div className="form-group">
														<div className="input-group">
															<div className="input-group-prepend">
																<div className="input-group-text">
																	BALANCE (₦)
																</div>
															</div>
															<Field
																name="balance"
																className="form-control no-arrows"
																component="input"
																type="number"
																placeholder="Balance"
																readOnly
															/>
														</div>
													</div>
												</div>
												<div className="col-md-12">
													<div className="form-group">
														<Field
															name="payment_method"
															component="select"
															className="form-control"
														>
															<option value="">Payment Method</option>
															{paymentMethods.map((pm, i) => (
																<option key={i} value={pm.id}>
																	{pm.name}
																</option>
															))}
														</Field>
														<ErrorBlock name="payment_method" />
													</div>
												</div>
												<div className="col-sm-6 d-flex align-items-center">
													<div className="d-flex relative mt-3">
														<div>
															<Field
																name="pay_later"
																id="pay_later"
																component="input"
																type="checkbox"
															/>
														</div>
														<label
															htmlFor="pay_later"
															className="ml-1"
															style={{ marginTop: '-2px' }}
														>
															Pay Later
														</label>
													</div>
												</div>
											</div>
											<div className="row mt-2">
												<div className="col-md-12 text-right">
													<button
														className="btn btn-primary"
														disabled={submitting}
														type="submit"
													>
														Process
													</button>
												</div>
											</div>
										</div>
									</form>
								);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderPayment;

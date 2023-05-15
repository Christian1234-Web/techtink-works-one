import React from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { useDispatch } from 'react-redux';
import Select from 'react-select';

import { Compulsory, ErrorBlock, request } from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { startBlock, stopBlock } from '../../actions/redux-block';
import { notifySuccess } from '../../services/notify';
import ModalHeader from '../ModalHeader';
import { cafeteriaAPI } from '../../services/constants';

const ReactSelectAdapter = ({ input, ...rest }) => (
	<Select
		getOptionValue={option => option.id}
		getOptionLabel={option => option.name}
		{...input}
		{...rest}
		searchable
	/>
);

const ModalAddFoodItem = ({ closeModal, addFoodItem }) => {
	const dispatch = useDispatch();

	const onSubmit = async values => {
		try {
			const data = { ...values, category: values.category.name };
			dispatch(startBlock());
			const url = `${cafeteriaAPI}/food-items`;
			const rs = await request(url, 'POST', true, data);
			dispatch(stopBlock());
			addFoodItem(rs);
			notifySuccess('food item');
			closeModal();
		} catch (e) {
			console.log(e.message);
			dispatch(stopBlock());
			return { [FORM_ERROR]: 'could not save food item' };
		}
	};

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div className="modal-dialog modal-centered">
				<div className="modal-content text-center">
					<ModalHeader title="Add Food Item" closeModal={closeModal} />
					<div className="onboarding-content with-gradient">
						<div className="form-block">
							<Form
								onSubmit={onSubmit}
								validate={values => {
									const errors = {};
									if (!values.name) {
										errors.name = 'enter name';
									}
									if (!values.category) {
										errors.category = 'select category';
									}
									if (!values.price) {
										errors.price = 'enter price';
									}
									if (!values.staff_price) {
										errors.staff_price = 'enter staff price';
									}
									if (!values.description) {
										errors.description = 'enter description';
									}

									return errors;
								}}
								render={({ handleSubmit, submitting, submitError }) => (
									<form onSubmit={handleSubmit}>
										{submitError && (
											<div
												className="alert alert-danger"
												dangerouslySetInnerHTML={{
													__html: `<strong>Error!</strong> ${submitError}`,
												}}
											/>
										)}
										<div className="row">
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Food Name <Compulsory />
													</label>
													<Field
														name="name"
														className="form-control"
														component="input"
														type="text"
														placeholder="Food Name"
													/>
													<ErrorBlock name="name" />
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Category <Compulsory />
													</label>
													<Field
														name="category"
														component={ReactSelectAdapter}
														options={[
															{ id: 'A la Carte', name: 'A la Carte' },
															{ id: 'Show Case', name: 'Show Case' },
														]}
													/>
													<ErrorBlock name="category" />
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Food Price <Compulsory />
													</label>
													<Field
														name="price"
														className="form-control"
														component="input"
														type="number"
														placeholder="Food Price"
													/>
													<ErrorBlock name="price" />
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Food Staff Price <Compulsory />
													</label>
													<Field
														name="staff_price"
														className="form-control"
														component="input"
														type="number"
														placeholder="Food Staff Price"
													/>
													<ErrorBlock name="staff_price" />
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-sm-6">
												<div className="form-group">
													<label>
														Description <Compulsory />
													</label>
													<Field
														name="description"
														className="form-control"
														component="input"
														type="text"
														placeholder="Description"
													/>
													<ErrorBlock name="description" />
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label>Food Unit</label>
													<Field
														name="unit"
														className="form-control"
														component="input"
														type="text"
														placeholder="Food Unit"
													/>
												</div>
											</div>
										</div>
										<div className="row mt-4">
											<div className="col-sm-12 text-right">
												<button
													className="btn btn-primary"
													disabled={submitting}
													type="submit"
												>
													{submitting ? (
														<img src={waiting} alt="submitting" />
													) : (
														'Save'
													)}
												</button>
											</div>
										</div>
									</form>
								)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalAddFoodItem;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset, change } from 'redux-form';
import Select from 'react-select';

import { renderTextInput, request } from '../services/utilities';
import { notifyError, notifySuccess } from '../services/notify';
import waiting from '../assets/images/waiting.gif';

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'enter name';
	}
	return errors;
};

class CreatePermission extends Component {
	state = {
		submitting: false,
		permissionCategory: null,
	};

	save = async data => {
		try {
			if (
				!data.permissionCategory ||
				(data.permissionCategory && data.permissionCategory === '')
			) {
				notifyError('select category');
				return;
			}

			this.setState({ submitting: true });
			const datum = { ...data, category_id: data.permissionCategory.id };
			const rs = await request('settings/permissions', 'POST', true, datum);
			this.props.setDataList(rs);
			this.setState({ submitting: false, permissionCategory: null });
			this.props.reset('create_permission');
			notifySuccess('permission created!');
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not create permission',
			});
		}
	};

	render() {
		const { submitting, permissionCategory } = this.state;
		const { error, handleSubmit, categories } = this.props;
		return (
			<div className="pipeline white lined-warning">
				<form onSubmit={handleSubmit(this.save)}>
					<h6 className="form-header">Create Permission</h6>
					{error && (
						<div
							className="alert alert-danger"
							dangerouslySetInnerHTML={{
								__html: `<strong>Error!</strong> ${error}`,
							}}
						/>
					)}
					<Field
						id="name"
						name="name"
						component={renderTextInput}
						label="Name"
						type="text"
						placeholder="Enter name"
					/>
					<div>
						<label>Select Category</label>
						<Select
							placeholder="Select category"
							defaultValue
							getOptionValue={option => option.id}
							getOptionLabel={option => option.name}
							onChange={e => {
								this.setState({ permissionCategory: e });
								this.props.change('permissionCategory', e);
							}}
							value={permissionCategory}
							isSearchable={true}
							options={categories}
						/>
					</div>
					<div className="form-buttons-w">
						<button
							className="btn btn-primary"
							disabled={submitting}
							type="submit"
						>
							{submitting ? <img src={waiting} alt="submitting" /> : 'save'}
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		initialValues: { permissionCategory: '' },
	};
};

CreatePermission = reduxForm({
	form: 'create_permission',
	validate,
})(CreatePermission);

export default connect(mapStateToProps, { reset, change })(CreatePermission);

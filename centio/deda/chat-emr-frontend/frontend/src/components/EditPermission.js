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

class EditPermission extends Component {
	state = {
		submitting: false,
		permissionCategory: null,
	};

	componentDidMount() {
		const category = this.props.permissionItem?.category || '';
		this.setState({ permissionCategory: category });
	}

	save = async data => {
		try {
			if (
				!data.permissionCategory ||
				(data.permissionCategory && data.permissionCategory === '')
			) {
				notifyError('select category');
				return;
			}

			const { permissionItem } = this.props;
			this.setState({ submitting: true });
			const datum = { ...data, category_id: data.permissionCategory.id };
			const uri = `settings/permissions/${permissionItem.id}`;
			const rs = await request(uri, 'PATCH', true, datum);
			this.props.editDataList(rs);
			this.setState({ submitting: false, permissionCategory: null });
			this.props.reset('edit_permission');
			this.props.cancel();
			notifySuccess('permission saved!');
		} catch (e) {
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || 'could not edit permission',
			});
		}
	};

	render() {
		const { submitting, permissionCategory } = this.state;
		const { error, handleSubmit, categories, cancel } = this.props;
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
						<button
							className="btn btn-secondary ml-2"
							type="button"
							onClick={() => cancel()}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: {
			permissionCategory: ownProps.permissionItem?.category || '',
			name: ownProps.permissionItem?.name || '',
		},
	};
};

EditPermission = reduxForm({
	form: 'edit_permission',
	validate,
})(EditPermission);

export default connect(mapStateToProps, { reset, change })(EditPermission);

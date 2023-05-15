import React, { useState, useEffect, useCallback } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect, useSelector, useDispatch } from 'react-redux';

import { renderTextInput, renderSelect } from '../../../services/utilities';
import { brims, fetalPositions, fetalLies } from '../../../services/constants';
import { updateAssessmentData } from '../../../actions/patient';

const validate = values => {
	const errors = {};
	return errors;
};

const GeneralAssessment = ({ handleSubmit, next, previous, patient }) => {
	const [items, setItems] = useState(null);
	const [loaded, setLoaded] = useState(false);

	const assessment = useSelector(state => state.patient.assessmentData);

	const dispatch = useDispatch();

	const retrieveData = useCallback(async () => {
		const item = assessment.general;
		setItems(item);

		dispatch(
			change('anc_general', 'heightOfFundus', item?.heightOfFundus || '')
		);
		dispatch(
			change('anc_general', 'fetalHeartRate', item?.fetalHeartRate || '')
		);
		dispatch(
			change('anc_general', 'positionOfFoetus', item?.positionOfFoetus || '')
		);
		dispatch(change('anc_general', 'fetalLie', item?.fetalLie || ''));
		dispatch(
			change(
				'anc_general',
				'relationshipToBrim',
				item?.relationshipToBrim || ''
			)
		);
	}, [assessment, dispatch]);

	useEffect(() => {
		if (!loaded) {
			retrieveData();
			setLoaded(true);
		}
	}, [loaded, retrieveData]);

	const update = (e, type) => {
		const data = { ...items, [type]: e.target.value };
		setItems(data);

		dispatch(
			updateAssessmentData({ ...assessment, general: data }, patient.id)
		);
	};

	const save = data => {
		console.log(data);
		dispatch(
			updateAssessmentData({ ...assessment, general: data }, patient.id)
		);
		next();
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={handleSubmit(save)}>
				<div className="row">
					<div className="col-sm-6">
						<Field
							id="heightOfFundus"
							name="heightOfFundus"
							component={renderTextInput}
							label="Height of Fundus (cm)"
							type="text"
							placeholder="Enter height of fundus"
							onChange={e => update(e, 'heightOfFundus')}
						/>
					</div>
					<div className="col-sm-6">
						<Field
							id="fetalHeartRate"
							name="fetalHeartRate"
							component={renderTextInput}
							label="Fetal Heart Rate"
							type="text"
							placeholder="Enter fetal heart rate"
							onChange={e => update(e, 'fetalHeartRate')}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<Field
							id="positionOfFoetus"
							name="positionOfFoetus"
							component={renderSelect}
							label="Presentation and Position of Foetus"
							placeholder="Select Presentation and Position of Foetus"
							data={fetalPositions}
							onChange={e => update(e, 'positionOfFoetus')}
						/>
					</div>
					<div className="col-sm-6">
						<Field
							id="fetalLie"
							name="fetalLie"
							component={renderSelect}
							label="Fetal Lie"
							placeholder="Select fetal lie"
							data={fetalLies}
							onChange={e => update(e, 'fetalLie')}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<Field
							id="relationshipToBrim"
							name="relationshipToBrim"
							component={renderSelect}
							label="Relationship to Brim"
							placeholder="Select Relationship to Brim"
							data={brims}
							onChange={e => update(e, 'relationshipToBrim')}
						/>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-sm-12 d-flex space-between">
						<button className="btn btn-primary" onClick={previous}>
							Previous
						</button>
						<button className="btn btn-primary" type="submit">
							Next
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default connect()(
	reduxForm({
		form: 'anc_general',
		validate,
	})(GeneralAssessment)
);

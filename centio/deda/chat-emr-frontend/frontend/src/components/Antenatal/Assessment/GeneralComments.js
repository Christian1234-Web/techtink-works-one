import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SunEditor from 'suneditor-react';

import { updateAssessmentData } from '../../../actions/patient';
import SSRStorage from '../../../services/storage';
import { CK_ASSESSMENT, defaultAssessment } from '../../../services/constants';

const storage = new SSRStorage();

const GeneralComments = ({ next, patient }) => {
	const [loaded, setLoaded] = useState(false);
	const [comment, setComment] = useState('');

	const assessment = useSelector(state => state.patient.assessmentData);

	const dispatch = useDispatch();

	const saveComment = useCallback(
		data => {
			setComment(data);
			dispatch(
				updateAssessmentData({ ...assessment, comment: data }, patient.id)
			);
		},
		[assessment, dispatch, patient]
	);

	const retrieveData = useCallback(async () => {
		const data = await storage.getItem(CK_ASSESSMENT);
		const assessmentData =
			data && data.patient_id === patient.id
				? data?.assessment?.comment
				: defaultAssessment.comment;
		setComment(assessmentData);
	}, [patient]);

	useEffect(() => {
		if (!loaded) {
			retrieveData();
			setLoaded(true);
		}
	}, [loaded, retrieveData]);

	const onSubmit = e => {
		e.preventDefault();
		console.log('submit');
		dispatch(updateAssessmentData({ ...assessment, comment }, patient.id));
		next();
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={onSubmit}>
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<SunEditor
								width="100%"
								placeholder="Please type here..."
								setContents={comment}
								name="comment"
								autoFocus={true}
								enableToolbar={true}
								setOptions={{
									height: 300,
									buttonList: [
										[
											'bold',
											'underline',
											'italic',
											'strike',
											'subscript',
											'superscript',
											'list',
											'align',
											'font',
											'fontSize',
											'image',
											'codeView',
										],
									],
								}}
								onChange={e => {
									saveComment(String(e));
								}}
							/>
						</div>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-sm-12 d-flex space-between">
						<button className="btn btn-primary" disabled>
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

export default GeneralComments;

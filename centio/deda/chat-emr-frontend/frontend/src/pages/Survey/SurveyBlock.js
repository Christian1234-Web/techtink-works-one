import React, { useState } from 'react';
import TableLoading from '../../components/TableLoading';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import ViewSurvey from './ViewSurvey';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../actions/general';

const SurveyBlock = ({ loading, allSurveys }) => {
	const dispatch = useDispatch();

	const [surveyViewer, setSurveyViewer] = useState(false);
	const [survey, setSurvey] = useState(null);

	const viewSurvey = survey => {
		dispatch(toggleModal(true));
		setSurveyViewer(true);
		setSurvey(survey);
	};

	const closeModal = () => {
		dispatch(toggleModal(false));
		setSurveyViewer(false);
	};

	return loading ? (
		<TableLoading />
	) : (
		<>
			<table id="table" className="table table-theme v-middle table-hover">
				<thead>
					<tr>
						<th>Code</th>
						<th>Date</th>
						<th>Patient Name</th>
						<th>Phone Number</th>
						<th>Clinic</th>
						<th>Actions</th>

						<th nowrap="nowrap"></th>
					</tr>
				</thead>
				<tbody>
					{allSurveys.map((survey, i) => {
						let clinic = survey.response.filter(
							question => question.clinic !== ''
						);

						return (
							<tr key={i}>
								<td>{survey.code}</td>

								<td>
									{moment(survey.response[0]?.createdAt).format(
										'DD-MMM-YYYY h:mmA'
									)}
								</td>
								<td>{survey.response[0].createdBy}</td>
								<td>{survey.phone || '--'}</td>
								<td>{survey.clinic || clinic[0]?.clinic}</td>
								<td>
									<Tooltip title="View Survey Details">
										<a onClick={() => viewSurvey(survey)}>
											<i className="os-icon os-icon-eye cursor" />
										</a>
									</Tooltip>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{surveyViewer && <ViewSurvey closeModal={closeModal} survey={survey} />}
		</>
	);
};

export default SurveyBlock;

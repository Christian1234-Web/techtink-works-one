import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';

import {
	renderTextInput,
	renderTextInputGroup,
	request,
} from '../../services/utilities';
import waiting from '../../assets/images/waiting.gif';
import { vitalsAPI } from '../../services/constants';
import { notifySuccess } from '../../services/notify';
import { updateVitals, readingDone } from '../../actions/patient';
import { messageService } from '../../services/message';

class TakeReadings extends Component {
	state = {
		submitting: false,
	};

	takeExtraReadings = async (data, title) => {
		const { patient, task } = this.props;

		try {
			let toSave = {
				readingType: title,
				reading: data,
				patient_id: patient ? patient.id : task.patient_id,
			};
			const rs = await request(vitalsAPI, 'POST', true, toSave);
			this.props.updateVitals(rs.readings);
		} catch (e) {}
	};

	takeReading = async data => {
		const { patient, info, task } = this.props;
		const { title } = info;

		try {
			this.setState({ submitting: true });

			let _data = data;

			const h = parseFloat(data.height);
			const w = parseFloat(data.weight);

			if (info.type === 'blood-pressure') {
				_data = { blood_pressure: `${data.systolic}/${data.diastolic}` };
			} else if (info.type === 'contractions') {
				_data = {
					contractions: `${data.rate || ''}/${data.duration || ''}`,
				};
			} else if (info.type === 'servico-graph') {
				_data = {
					servico_graph: `${data.alert || ''}/${data.action || ''}/${
						data.cervical_dilation || ''
					}/${data.fetal_head_station || ''}`,
				};
			} else if (info.type === 'bmi') {
				const h = parseFloat(data.height);
				const w = parseFloat(data.weight);
				_data = {
					bmi: (w / (h * h)).toFixed(2),
				};
			} else if (info.type === 'bsa') {
				_data = {
					bsa: (Math.sqrt(h) * (w / 3600)).toFixed(2),
				};
			} else {
				const keys = Object.keys(data);
				const values = Object.values(data);
				const single = values[0].replace(/[^\d.-]/g, '');
				_data = { [keys[0]]: single };
			}

			const toSave = {
				readingType: title,
				reading: _data,
				patient_id: patient ? patient.id : task.patient_id,
				task_id: task ? task.id : '',
				is_fluid: info.type === 'urine' ? 1 : 0,
			};
			const rs = await request(vitalsAPI, 'POST', true, toSave);
			if (rs.success) {
				this.props.updateVitals(rs.readings);

				if (info.type === 'bmi' || info.type === 'bsa') {
					// store individual readings for weight and height as well
					await this.takeExtraReadings({ weight: data.weight }, 'Weight');
					await this.takeExtraReadings({ height: data.height }, 'Height');
				}

				if (rs.readings.isAbnormal) {
					messageService.sendMessage({ type: 'refresh' });
				}

				notifySuccess(`${title} updated!`);
				this.props.reset('take-reading');
				this.setState({ submitting: false });
				if (task) {
					this.props.readingDone(task.id);
				}
				this.props.doHide(true);
			} else {
				this.setState({ submitting: false });
				throw new SubmissionError({
					_error: rs.message,
				});
			}
		} catch (e) {
			console.log(e);
			this.setState({ submitting: false });
			throw new SubmissionError({
				_error: e.message || `could not take reading for ${title}`,
			});
		}
	};

	render() {
		const { doHide, error, handleSubmit, info } = this.props;
		const { submitting } = this.state;
		const { title, inputs } = info;

		return (
			<div className="onboarding-modal fade animated show">
				<div className="modal-centered">
					<div className="modal-content text-center">
						<button className="close" type="button" onClick={doHide}>
							<span className="os-icon os-icon-close" />
						</button>
						<div className="onboarding-content with-gradient">
							<h4 className="onboarding-title">{`Take ${title} Reading`}</h4>
							<div className="form-block">
								<form onSubmit={handleSubmit(this.takeReading)}>
									{error && (
										<div
											className="alert alert-danger"
											dangerouslySetInnerHTML={{
												__html: `<strong>Error!</strong> ${error}`,
											}}
										/>
									)}
									<div className="row">
										<div className="col-sm-12">
											{inputs.map((item, i) => {
												return (
													<Field
														key={i}
														id={item.name}
														name={item.name}
														component={
															item.weight !== ''
																? renderTextInputGroup
																: renderTextInput
														}
														label={item.title}
														type="text"
														placeholder={`Enter ${item.title}`}
														icon={item.weight}
														append={item.weight !== ''}
													/>
												);
											})}
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12 text-right">
											<button
												className="btn btn-primary"
												disabled={submitting}
												type="submit"
											>
												{submitting ? (
													<img src={waiting} alt="submitting" />
												) : (
													'save'
												)}
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

TakeReadings = reduxForm({
	form: 'take-reading',
})(TakeReadings);

const mapStateToProps = (state, ownProps) => {
	return {
		vitals: state.patient.vitals,
	};
};

export default connect(mapStateToProps, { reset, updateVitals, readingDone })(
	TakeReadings
);

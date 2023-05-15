import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import { updateAssessmentData } from '../../../actions/patient';

import { formatCurrency, request } from '../../../services/utilities';

const RadiologyRequest = ({ previous, next, patient }) => {
	const [loaded, setLoaded] = useState(false);
	const [selectedScans, setSelectedScans] = useState([]);
	const [urgentScan, setUrgentScan] = useState(false);
	const [scanNote, setScanNote] = useState('');

	const dispatch = useDispatch();

	const assessment = useSelector(state => state.patient.assessmentData);

	const retrieveData = useCallback(async () => {
		const radiologyRequest = assessment.radiologyRequest;

		setUrgentScan(radiologyRequest?.urgent || false);
		setScanNote(radiologyRequest?.request_note || '');

		const scans = radiologyRequest ? [...radiologyRequest.tests] : [];

		setSelectedScans(scans);
	}, [assessment]);

	useEffect(() => {
		if (!loaded) {
			retrieveData();
			setLoaded(true);
		}
	}, [loaded, retrieveData]);

	const getServices = async q => {
		if (!q || q.length < 1) {
			return [];
		}

		const url = `services/scans?q=${q}`;
		const res = await request(url, 'GET', true);
		return res;
	};

	const onDispatchScan = (items, obj) => {
		const radiologyRequest = {
			requestType: 'scans',
			patient_id: patient.id,
			tests: [...items],
			request_note: obj?.note || '',
			urgent: obj?.urgent || false,
		};

		dispatch(
			updateAssessmentData({ ...assessment, radiologyRequest }, patient.id)
		);
	};

	const onSubmit = e => {
		e.preventDefault();
		const radiologyRequest = {
			requestType: 'scans',
			patient_id: patient.id,
			tests: [...selectedScans],
			request_note: scanNote,
			urgent: urgentScan,
		};
		dispatch(
			updateAssessmentData({ ...assessment, radiologyRequest }, patient.id)
		);
		next();
	};

	return (
		<div className="form-block encounter">
			<form onSubmit={onSubmit}>
				<div className="row">
					<div className="form-group col-sm-12">
						<label>Radiology Test</label>
						<AsyncSelect
							isMulti
							isClearable
							getOptionValue={option => option.id}
							getOptionLabel={option => option.name}
							defaultOptions
							value={selectedScans}
							name="service_request"
							loadOptions={getServices}
							onChange={e => {
								setSelectedScans(e || []);
								onDispatchScan(e, { note: scanNote, urgent: urgentScan });
							}}
							placeholder="Search Scans"
						/>
					</div>
				</div>
				<div className="row mt-2">
					<div className="col-sm-12">
						{selectedScans.map((scan, i) => (
							<span
								className={`badge badge-${
									scan ? 'info' : 'danger'
								} text-white ml-2`}
								key={i}
							>{`${scan.name}: ${formatCurrency(
								scan?.serviceCost?.tariff || 0
							)}`}</span>
						))}
					</div>
				</div>
				<div className="row mt-4">
					<div className="form-group col-sm-12">
						<div className="form-group">
							<label>Lab Request Note</label>
							<textarea
								className="form-control"
								name="scan_request_note"
								rows="3"
								placeholder="Enter request note"
								onChange={e => {
									setScanNote(e.target.value);
									onDispatchScan(selectedScans, {
										note: e.target.value,
										urgent: urgentScan,
									});
								}}
								value={scanNote}
							></textarea>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="form-group col-sm-6">
						<div className="form-check col-sm-12">
							<label className="form-check-label">
								<input
									className="form-check-input mt-0"
									name="scan_urgent"
									type="checkbox"
									checked={urgentScan}
									onChange={e => {
										setUrgentScan(!urgentScan);
										onDispatchScan(selectedScans, {
											note: scanNote,
											urgent: !urgentScan,
										});
									}}
								/>
								Please check if urgent
							</label>
						</div>
					</div>
					<div className="col-sm-6 text-right"></div>
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

export default RadiologyRequest;

import React, { useState } from 'react';
import { notifySuccess } from '../../services/notify';
import { request } from '../../services/utilities';

const SpermPreparation = ({ newEmbryologyId, setTab }) => {
	const [displayDate, setDisplayDate] = useState(false);
	const [spermType, setSpermType] = useState('');
	const [donorCode, setDonorCode] = useState('');
	const [method, setMethod] = useState('');
	const [process, setProcess] = useState('');
	const [slope, setSlope] = useState('');
	const [viscosity, setViscosity] = useState('');
	const [timeOfProduction, setTimeOfProduction] = useState('');
	const [timeReceived, setTimeReceived] = useState('');
	const [timeAnalyzed, setTimeAnalyzed] = useState('');
	const [volumeOne, setVolumeOne] = useState('');
	const [volumeTwo, setVolumeTwo] = useState('');
	const [volumeThree, setVolumeThree] = useState('');
	const [volumeFour, setVolumeFour] = useState('');
	const [cellOne, setCellOne] = useState('');
	const [cellTwo, setCellTwo] = useState('');
	const [cellThree, setCellThree] = useState('');
	const [cellFour, setCellFour] = useState('');
	const [cellDensityOne, setCellDensityOne] = useState('');
	const [cellDensityTwo, setCellDensityTwo] = useState('');
	const [cellDensityThree, setCellDensityThree] = useState('');
	const [cellDensityFour, setCellDensityFour] = useState('');
	const [cellMobilityOne, setCellMobilityOne] = useState('');
	const [cellMobilityTwo, setCellMobilityTwo] = useState('');
	const [cellMobilityThree, setCellMobilityThree] = useState('');
	const [cellMobilityFour, setCellMobilityFour] = useState('');
	const [progOne, setProgOne] = useState('');
	const [progTwo, setProgTwo] = useState('');
	const [progThree, setProgThree] = useState('');
	const [progFour, setProgFour] = useState('');
	const [abnorOne, setAbnorOne] = useState('');
	const [abnorTwo, setAbnorTwo] = useState('');
	const [abnorThree, setAbnorThree] = useState('');
	const [abnorFour, setAbnorFour] = useState('');
	const [agglutinationOne, setAgglutinationOne] = useState('');
	const [agglutinationTwo, setAgglutinationTwo] = useState('');
	const [agglutinationThree, setAgglutinationThree] = useState('');
	const [agglutinationFour, setAgglutinationFour] = useState('');
	const [comment, setComment] = useState('');
	const [doctor, setDoctor] = useState('');
	const [witness, setWitness] = useState('');

	const handleFormSubmit = async () => {
		const payload = {
			embryologyId: newEmbryologyId,
			type: spermType,
			method: method,
			comment: comment,
			process: process,
			slope: slope,
			donorCode: donorCode,
			viscousity: viscosity,
			timeOfProduction: timeOfProduction,
			timeReceived: timeReceived,
			timeAnalyzed: timeAnalyzed,
			witness: witness,
			// embryologistId: 0,
			cellInfo: [
				{
					type: 'one',
					volume: volumeOne,
					cells: cellOne,
					density: cellDensityOne,
					motility: cellMobilityOne,
					prog: progOne,
					abnor: abnorOne,
					agglutination: agglutinationOne,
				},
				{
					type: 'two',
					volume: volumeTwo,
					cells: cellTwo,
					density: cellDensityTwo,
					motility: cellMobilityTwo,
					prog: progTwo,
					abnor: abnorTwo,
					agglutination: agglutinationTwo,
				},
				{
					type: 'three',
					volume: volumeThree,
					cells: cellThree,
					density: cellDensityThree,
					motility: cellMobilityThree,
					prog: progThree,
					abnor: abnorThree,
					agglutination: agglutinationThree,
				},
				{
					type: 'four',
					volume: volumeFour,
					cells: cellFour,
					density: cellDensityFour,
					motility: cellMobilityFour,
					prog: progFour,
					abnor: abnorFour,
					agglutination: agglutinationFour,
				},
			],
		};
		try {
			const url = `embryology/sperm-prep/create`;
			const rs = await request(url, 'POST', true, payload);
			if (rs.success) {
				notifySuccess('Save Successfully!');
				setTimeout(() => {
					setTab('icsi');
				}, 1000);
			}
		} catch (error) {
			console.log('Submit Sperm Prep Error', error);
		}
	};
	return (
		<div
			className="p-2"
			style={{ height: '37rem', overflowY: 'scroll', overflowX: 'hidden' }}
		>
			<h6 className="element-header">SPERM PREPARATION</h6>
			<table className="table table-striped table-bordered">
				<tbody>
					<tr>
						<td tabIndex={1}>
							<div className="row">
								<div className="col-sm-4">
									<div className="form-check">
										<label className="form-check-label">
											<input
												className="form-check-input"
												name="spermType"
												type="radio"
												value="partner"
												onChange={e => setSpermType(e.target.value)}
											/>
											PARTNER
										</label>
									</div>
								</div>
								<div className="col-sm-4">
									<div className="form-check">
										<label className="form-check-label">
											<input
												className="form-check-input"
												name="spermType"
												type="radio"
												value="donor"
												onChange={e => setSpermType(e.target.value)}
											/>
											DONOR
										</label>
									</div>
								</div>
							</div>
						</td>
						<td tabIndex={1}>
							<div className="row">
								<div className="col-sm-6">
									<strong>DONOR CODE</strong>
								</div>
								<div className="col-sm-6">
									<input
										type="text"
										className="form-control"
										style={{ height: '30px' }}
										onChange={e => setDonorCode(e.target.value)}
									/>
								</div>
							</div>
						</td>
						<td tabIndex={1}>
							<div className="row">
								<div className="col-sm-4">
									<div className="form-check">
										<label className="form-check-label">
											<input
												className="form-check-input"
												name="spermMethod"
												type="radio"
												value="masturbation"
												onChange={e => setMethod(e.target.value)}
											/>
											MASTURBATION
										</label>
									</div>
								</div>
								<div className="col-sm-4">
									<div className="form-check">
										<label className="form-check-label">
											<input
												className="form-check-input"
												name="spermMethod"
												type="radio"
												value="withdrawal"
												onChange={e => setMethod(e.target.value)}
											/>
											WITHDRAWAL
										</label>
									</div>
								</div>
								<div className="col-sm-4">
									<div className="form-check">
										<label className="form-check-label">
											<input
												className="form-check-input"
												name="spermMethod"
												type="radio"
												value="tesa/pesa"
												onChange={e => setMethod(e.target.value)}
											/>
											TESA/PESA
										</label>
									</div>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td tabIndex={1}>
							<div className="row">
								<div className="col-sm-4">
									<div className="form-check">
										<label className="form-check-label">
											<input
												className="form-check-input"
												name="process"
												type="radio"
												value="fresh"
												onClick={e => setProcess(e.target.value)}
											/>
											FRESH
										</label>
									</div>
								</div>
								<div className="col-sm-4">
									<div className="form-check">
										<label className="form-check-label">
											<input
												className="form-check-input"
												name="process"
												type="radio"
												value="frozen"
												onClick={e => setProcess(e.target.value)}
											/>
											FROZEN
										</label>
									</div>
								</div>
							</div>
						</td>
						<td tabIndex={1}>
							<div className="row">
								<div className="col-sm-4">
									<div className="form-check">
										<label className="form-check-label">
											<input
												className="form-check-input"
												name="slope"
												type="radio"
												value="gradient"
												onChange={e => setSlope(e.target.value)}
											/>
											GRADIENT
										</label>
									</div>
								</div>
								<div className="col-sm-4">
									<div className="form-check">
										<label className="form-check-label">
											<input
												className="form-check-input"
												name="slope"
												type="radio"
												value="swim up"
												onChange={e => setSlope(e.target.value)}
											/>
											SWIM UP
										</label>
									</div>
								</div>
							</div>
						</td>
						<td tabIndex={1}>
							<div className="row">
								<div className="col-sm-4">
									<strong>VISCOSITY</strong>
								</div>
								<div className="col-sm-4">
									<div className="form-check">
										<label className="form-check-label">
											<input
												className="form-check-input"
												name="viscosity"
												type="radio"
												value="normal"
												onChange={e => setViscosity(e.target.value)}
											/>
											NORMAL
										</label>
									</div>
								</div>
								<div className="col-sm-4">
									<div className="form-check">
										<label className="form-check-label">
											<input
												className="form-check-input"
												name="viscosity"
												type="radio"
												value="abnormal"
												onChange={e => setViscosity(e.target.value)}
											/>
											ABNORMAL
										</label>
									</div>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>

			<form>
				<div className="row">
					<div className="col-md-4">
						<div className="form-group ">
							<label className="">Time of Production</label>
							<div className="">
								<input
									className="form-control"
									placeholder="Time of Production"
									type="time"
									onChange={e => setTimeOfProduction(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<div className="form-group ">
							<label className="">Time Received</label>
							<div className="">
								<input
									className="form-control"
									placeholder="Time Received"
									type="time"
									onChange={e => setTimeReceived(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<div className="form-group">
							<label className="">Time Analyzed</label>
							<div className="">
								<input
									className="form-control"
									placeholder="Time Analyzed"
									type="time"
									onChange={e => setTimeAnalyzed(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</div>
			</form>
			<div className="table-responsive">
				<table className="table table-striped table-bordered">
					<thead>
						<tr>
							<th></th>
							<th>VOL.(ML)</th>
							<th>
								CELLS
								<br />
								(MIL)
							</th>
							<th>
								SPERM
								<br />
								DENSITY
								<br />
								(10<sup>6</sup>/mil)
							</th>
							<th>
								SPERM
								<br />
								MOTILITY
								<br />
								(10<sup>6</sup>/mil)
							</th>
							<th>PROG</th>
							<th>
								ABNOR <br /> (%)
							</th>
							<th>
								AGGLUTINATION <br />
								(%)
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>INITIAL ASSES.1:</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setVolumeOne(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setCellOne(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setCellDensityOne(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setCellMobilityOne(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setProgOne(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setAbnorOne(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setAgglutinationOne(e.target.value)}
								/>
							</td>
						</tr>
						<tr>
							<td>PREP 1:</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setVolumeTwo(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setCellTwo(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setCellDensityTwo(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setCellMobilityTwo(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setProgTwo(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setAbnorTwo(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setAgglutinationTwo(e.target.value)}
								/>
							</td>
						</tr>
						<tr>
							<td>INITIAL ASSES.2:</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setVolumeThree(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setCellThree(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setCellDensityThree(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setCellMobilityThree(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setProgThree(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setAbnorThree(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setAgglutinationThree(e.target.value)}
								/>
							</td>
						</tr>
						<tr>
							<td>PREP 2:</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setVolumeFour(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setCellFour(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setCellDensityFour(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setCellMobilityFour(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setProgFour(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setAbnorFour(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setAgglutinationFour(e.target.value)}
								/>
							</td>
						</tr>
						<tr>
							<td>Comment</td>
							<td colSpan="7">
								<input
									className="form-control"
									placeholder="Comment"
									type="text"
									onChange={e => setComment(e.target.value)}
								/>
							</td>
						</tr>
					</tbody>
				</table>
				<form>
					<div className="row">
						<div className="col-sm-6">
							<div className="form-group">
								<label>DR</label>
								<input
									className="form-control"
									placeholder="Dr"
									type="text"
									onChange={e => setDoctor(e.target.value)}
								/>
							</div>
						</div>
						{/* <div className="col-sm-4">
							<div className="form-group">
								<label>EMBRIOLOGIST</label>
								<input
									className="form-control"
									placeholder="Embriologist"
									type="text"
								/>
							</div>
						</div> */}
						<div className="col-sm-6">
							<div className="form-group">
								<label>WITNESS</label>
								<input
									className="form-control"
									placeholder="Witness"
									type="text"
									onChange={e => setWitness(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div className="d-flex justify-content-between">
				<div></div>
				<div>
					<button
						type="button"
						className="btn btn-primary"
						onClick={handleFormSubmit}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default SpermPreparation;

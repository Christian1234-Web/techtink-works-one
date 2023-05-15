import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'antd/lib/date-picker';

import { request } from '../../services/utilities';
import { notifyError, notifySuccess } from '../../services/notify';

const { TimePicker } = DatePicker;

const TreatmentChart = ({
	closeModal,
	patient,
	setNewEmbryologyId,
	setTab,
}) => {
	const [fsh, setFsh] = useState('');
	const [tsh, setTsh] = useState('');
	const [lh, setLh] = useState('');
	const [amh, setAmh] = useState('');
	const [prl, setPrl] = useState('');
	const [tes, setTes] = useState('');
	const [no_eggs, setNo_eggs] = useState('');
	const [lab_ins, setLab_ins] = useState('');
	const [method, setMethod] = useState('');
	const [time, setTime] = useState('');
	const [left_o, setLeft_o] = useState('');
	const [right_o, setRight_o] = useState('');
	const [ocr, setOcr] = useState('');
	const [embr, setEmbr] = useState('');
	const [no_oo, setNo_oo] = useState('');
	const [total, setTotal] = useState('');

	const egg_collection = [
		{ name: 'Transvaginal', id: 1 },
		{ name: 'Abdominal', id: 2 },
	];

	const onSubmit = async () => {
		const treatment_self = document.getElementById('treatment_self');
		const treatment_oo = document.getElementById('treatment_oo');
		const hiv_posi = document.getElementById('hiv_posi');
		const hiv_neg = document.getElementById('hiv_neg');
		const hbsag_pos = document.getElementById('hbsag_pos');
		const hbsag_neg = document.getElementById('hbsag_neg');
		const hcv_pos = document.getElementById('hcv_pos');
		const hcv_neg = document.getElementById('hcv_neg');

		const treatmentChartType =
			treatment_self.checked === true
				? treatment_self.defaultValue
				: treatment_oo.checked === true
				? treatment_oo.defaultValue
				: '';
		const isHIVPositive =
			hiv_posi.checked === true
				? hiv_posi.defaultValue
				: hiv_neg.checked === true
				? hiv_neg.defaultValue
				: '';
		const isHBSagPositive =
			hbsag_pos.checked === true
				? hbsag_pos.defaultValue
				: hbsag_neg.checked === true
				? hbsag_neg.defaultValue
				: '';
		const isHcvPositive =
			hcv_pos.checked === true
				? hcv_pos.defaultValue
				: hcv_neg.checked === true
				? hcv_neg.defaultValue
				: '';

		const data = {
			treatmentChartType: treatmentChartType,
			isHIVPositive,
			isHBSagPositive,
			isHcvPositive,
			fsh,
			lh,
			prl,
			tsh,
			amh,
			tes,
			numOfEggsReceived: parseInt(no_eggs),
			instructionsForLab: parseInt(lab_ins),
			method,
			time,
			leftOvary: left_o,
			rightOvary: right_o,
			ocrDr: ocr,
			embr,
			numOfDocytes: parseInt(no_oo),
			total: parseInt(total),
			patientId: patient.id,
		};
		try {
			const url = `embryology/treatment/create`;
			const rs = await request(url, 'POST', true, data);
			console.log(rs);
			if (rs.success) {
				setNewEmbryologyId(rs.embryology.id);
				notifySuccess('Save Successfully!');
				setTimeout(() => {
					setTab('sperm-preparation');
				}, 1000);
			}
			// setFsh('');
			// setTsh('');
			// setLh('');
			// setAmh('');
			// setPrl('');
			// setTes('');
			// setNo_eggs('');
			// setLab_ins('');
			// setMethod('');
			// setTime('');
			// setLeft_o('');
			// setRight_o('');
			// setOcr('');
			// setEmbr('');
			// setNo_oo('');
			// setTotal('');
			// closeModal();
		} catch (err) {
			console.log(err);
			notifyError('Failed to Save!');
		}
	};

	return (
		<div
			className="p-2"
			style={{ height: '37rem', overflowY: 'scroll', overflowX: 'hidden' }}
		>
			<table className="table table-striped table-bordered">
				<tbody>
					<tr>
						<td tabIndex={1}>
							<div className="row">
								<label className="col-sm-12 col-form-label">
									<strong>TREATMENT CHART</strong>
								</label>
								<div className="col-sm-4">
									<div className="form-check">
										<input
											id="treatment_self"
											className="form-check-input"
											name="optionsRadios"
											type="radio"
											defaultValue="SELF TREATMENT"
										/>
										<label className="form-check-label mt-1">
											SELF TREATMENT
										</label>
									</div>
								</div>
								<div className="col-sm-4">
									<div className="form-check">
										<input
											id="treatment_oo"
											className="form-check-input"
											name="optionsRadios"
											type="radio"
											defaultValue="OOCYTE RECIPIENT"
										/>
										<label className="form-check-label mt-1">
											OOCYTE RECIPIENT
										</label>
									</div>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<h6 className="element-header">VIRAL SCREENING</h6>
			<table className="table table-striped table-bordered">
				<tbody>
					<tr>
						<td tabIndex={1}>
							<div className="row">
								<label className="col-sm-6 col-form-label">
									<strong>HIV 1 &amp; II</strong>
								</label>
								<div className="col-sm-6">
									<div className="form-check">
										<input
											id="hiv_posi"
											className="form-check-input"
											name="hiv"
											type="radio"
											defaultValue={true}
										/>
										<label className="form-check-label mt-1">POSITIVE</label>
									</div>
									<div className="form-check">
										<input
											id="hiv_neg"
											className="form-check-input"
											name="hiv"
											type="radio"
											defaultValue={false}
										/>
										<label className="form-check-label mt-1">NEGATIVE</label>
									</div>
								</div>
							</div>
						</td>
						<td tabIndex={1}>
							<div className="form-group row">
								<label className="col-sm-6 col-form-label">
									<strong>HBSag</strong>
								</label>
								<div className="col-sm-6">
									<div className="form-check">
										<input
											id="hbsag_pos"
											className="form-check-input"
											name="hbsag"
											type="radio"
											defaultValue="true"
										/>
										<label className="form-check-label mt-1">POSITIVE</label>
									</div>
									<div className="form-check">
										<input
											id="hbsag_neg"
											className="form-check-input"
											name="hbsag"
											type="radio"
											defaultValue="false"
										/>
										<label className="form-check-label mt-1">NEGATIVE</label>
									</div>
								</div>
							</div>
						</td>
						<td tabIndex={1}>
							<div className="form-group row">
								<label className="col-sm-6 col-form-label">
									<strong>HCV</strong>
								</label>
								<div className="col-sm-6">
									<div className="form-check">
										<input
											id="hcv_pos"
											className="form-check-input"
											name="hcv"
											type="radio"
											defaultValue="true"
										/>
										<label className="form-check-label mt-1">POSITIVE</label>
									</div>
									<div className="form-check">
										<input
											id="hcv_neg"
											className="form-check-input"
											name="hcv"
											type="radio"
											defaultValue="false"
										/>
										<label className="form-check-label mt-1">NEGATIVE</label>
									</div>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<h6 className="element-header">ENDOCRINOLOGY</h6>
			<table className="table table-striped table-bordered">
				<tbody>
					<tr>
						<td tabIndex="1">
							<div className="row">
								<div className="col-sm-2">
									<strong>FSH</strong>
								</div>
								<div className="col-sm-6">
									<input
										type="text"
										className="form-control"
										style={{ height: '30px' }}
										value={fsh}
										onChange={e => setFsh(e.target.value)}
									/>
								</div>
								<div className="col-sm-4" style={{ textAlign: 'right' }}>
									<small>N.R:2.5-20.0mlU/ml</small>
								</div>
							</div>
						</td>
						<td tabIndex="1">
							<div className="row">
								<div className="col-sm-2">
									<strong>LH</strong>
								</div>
								<div className="col-sm-6">
									<input
										type="text"
										className="form-control"
										style={{ height: '30px' }}
										value={lh}
										onChange={e => setLh(e.target.value)}
									/>
								</div>
								<div className="col-sm-4" style={{ textAlign: 'right' }}>
									<small>N.R:2.5-20.0mlU/ml</small>
								</div>
							</div>
						</td>
						<td tabIndex="1">
							<div className="row">
								<div className="col-sm-2">
									<strong>PRL</strong>
								</div>
								<div className="col-sm-6">
									<input
										type="text"
										className="form-control"
										style={{ height: '30px' }}
										value={prl}
										onChange={e => setPrl(e.target.value)}
									/>
								</div>
								<div className="col-sm-4" style={{ textAlign: 'right' }}>
									<small>N.R:2.5-20.0mlU/ml</small>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td tabIndex="1">
							<div className="row">
								<div className="col-sm-2">
									<strong>TSH</strong>
								</div>
								<div className="col-sm-6">
									<input
										type="text"
										className="form-control"
										style={{ height: '30px' }}
										value={tsh}
										onChange={e => setTsh(e.target.value)}
									/>
								</div>
								<div className="col-sm-4" style={{ textAlign: 'right' }}>
									<small>N.R:2.5-20.0mlU/ml</small>
								</div>
							</div>
						</td>
						<td tabIndex="1">
							<div className="row">
								<div className="col-sm-2">
									<strong>AMH</strong>
								</div>
								<div className="col-sm-6">
									<input
										type="text"
										className="form-control "
										style={{ height: '30px' }}
										value={amh}
										onChange={e => setAmh(e.target.value)}
									/>
								</div>
								<div className="col-sm-4" style={{ textAlign: 'right' }}>
									<small>N.R:2.5-20.0mlU/ml</small>
								</div>
							</div>
						</td>
						<td tabIndex="1">
							<div className="row">
								<div className="col-sm-2">
									<strong>TES</strong>
								</div>
								<div className="col-sm-6">
									<input
										type="text"
										className="form-control"
										style={{ height: '30px' }}
										value={tes}
										onChange={e => setTes(e.target.value)}
									/>
								</div>
								<div className="col-sm-4" style={{ textAlign: 'right' }}>
									<small>N.R:2.5-20.0mlU/ml</small>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>

			<h6 className="element-header">EGG DETAILS</h6>
			<div className="d-flex mb-4 mt-4  justify-content-between">
				<div className="w-100" style={{ borderRight: '1px solid #eee' }}>
					{/* <h6 className="element-header">OOCYTE RECIPIENT</h6> */}

					<form>
						<div className="row p-2">
							<div className="col-md-6">
								<div className="form-group">
									<label className="">Numbers of Eggs Received :</label>
									<input
										className="form-control"
										placeholder="Numbers of Eggs Received"
										type="number"
										value={no_eggs}
										onChange={e => setNo_eggs(e.target.value)}
									/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label className="">Instructions for Lab :</label>
									<input
										className="form-control"
										placeholder="Instructions for Lab"
										type="text"
										value={lab_ins}
										onChange={e => setLab_ins(e.target.value)}
									/>
								</div>
							</div>
						</div>
					</form>
				</div>

				<div className="w-100 p-2" style={{ zIndex: '222' }}>
					{/* <h6 className="element-header">EGG COLLECTION</h6> */}
					<form>
						<div className="row">
							<div className="col-md-6">
								<div className="form-group">
									<label className="">METHOD:</label>
									{/* <div className=""> */}
									<Select
										name="state_of_origin"
										placeholder="Select Method"
										options={egg_collection}
										getOptionValue={option => option.id}
										getOptionLabel={option => option.name}
										onChange={e => setMethod(e.name)}
									/>
									{/* </div> */}
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label className="">TIME:</label>
									<div className="">
										<TimePicker
											style={{ width: '18rem' }}
											onChange={e => setTime(e)}
										/>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<h6 className="element-header">OOCYTE RECOVERY</h6>
			<form>
				<div className="row">
					<div className="col-sm-4">
						<div className="form-group">
							<label> LEFT OVARY</label>
							<input
								className="form-control"
								placeholder="left ovary"
								type="text"
								value={left_o}
								onChange={e => setLeft_o(e.target.value)}
							/>
						</div>
					</div>
					<div className="col-sm-4">
						<div className="form-group">
							<label>RIGHT OVARY</label>
							<input
								className="form-control"
								placeholder="right ovary"
								type="text"
								value={right_o}
								onChange={e => setRight_o(e.target.value)}
							/>
						</div>
					</div>
					<div className="col-sm-4">
						<div className="form-group">
							<label>No of Oocyte Retrieved</label>
							<input
								className="form-control"
								placeholder="oocyte"
								value={no_oo}
								onChange={e => setNo_oo(e.target.value)}
								type="number"
							/>
						</div>
					</div>
					<div className="col-sm-4">
						<div className="form-group">
							<label>OCR DR:</label>
							<input
								className="form-control"
								placeholder="ocr"
								value={ocr}
								onChange={e => setOcr(e.target.value)}
								type="text"
							/>
						</div>
					</div>
					<div className="col-sm-4">
						<div className="form-group">
							<label>EMBR</label>
							<input
								className="form-control"
								placeholder="embr"
								value={embr}
								onChange={e => setEmbr(e.target.value)}
								type="text"
							/>
						</div>
					</div>

					<div className="col-sm-4">
						<div className="form-group">
							<label>TOTAL</label>
							<input
								className="form-control"
								value={total}
								onChange={e => setTotal(e.target.value)}
								placeholder="total"
								type="number"
							/>
						</div>
					</div>
				</div>
				<div className="d-flex justify-content-between">
					<div></div>
					<div>
						<button
							className="btn btn-primary"
							type="button"
							onClick={() => onSubmit()}
						>
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default TreatmentChart;

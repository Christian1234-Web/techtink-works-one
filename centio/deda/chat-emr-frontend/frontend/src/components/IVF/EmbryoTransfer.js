import React, { useState } from 'react';
import { notifySuccess } from '../../services/notify';
import { request } from '../../services/utilities';

const EmbryoTransfer = ({ newEmbryologyId, closeModal }) => {
	const [date, setDate] = useState('');
	const [numberOfEmbryoTransferred, setNumberOfEmbryoTransferred] =
		useState('');
	const [timeOfET, setTimeOfET] = useState('');
	const [dayOfTransfer, setDayOfTransfer] = useState('');
	const [DR, setDR] = useState('');
	const [stageOne, setStageOne] = useState('');
	const [stageTwo, setStageTwo] = useState('');
	const [stageThree, setStageThree] = useState('');
	const [stageFour, setStageFour] = useState('');
	const [stageFive, setStageFive] = useState('');
	const [stageSix, setStageSix] = useState('');
	const [stageSeven, setStageSeven] = useState('');

	const [gradeOne, setGradeOne] = useState('');
	const [gradeTwo, setGradeTwo] = useState('');
	const [gradeThree, setGradeThree] = useState('');
	const [gradeFour, setGradeFour] = useState('');
	const [gradeFive, setGradeFive] = useState('');
	const [gradeSix, setGradeSix] = useState('');
	const [gradeSeven, setGradeSeven] = useState('');

	const [commentOne, setCommentOne] = useState('');
	const [commentTwo, setCommentTwo] = useState('');
	const [commentThree, setCommentThree] = useState('');
	const [commentFour, setCommentFour] = useState('');
	const [commentFive, setCommentFive] = useState('');
	const [commentSix, setCommentSix] = useState('');
	const [commentSeven, setCommentSeven] = useState('');

	const [ICSIOne, setICSIOne] = useState('');
	const [ICSITwo, setICSITwo] = useState('');
	const [ICSIThree, setICSIThree] = useState('');
	const [ICSIFour, setICSIFour] = useState('');
	const [ICSIFive, setICSIFive] = useState('');
	const [ICSISix, setICSISix] = useState('');
	const [ICSISeven, setICSISeven] = useState('');

	const [IVFOne, setIVFOne] = useState('');
	const [IVFTwo, setIVFTwo] = useState('');
	const [IVFThree, setIVFThree] = useState('');
	const [IVFFour, setIVFFour] = useState('');
	const [IVFFive, setIVFFive] = useState('');
	const [IVFSix, setIVFSix] = useState('');
	const [IVFSeven, setIVFSeven] = useState('');

	const [fateOfExcessEmbryo, setFateOfExcessEmbryo] = useState('');

	const handleFormSubmit = async () => {
		const payload = {
			embryologyId: newEmbryologyId,
			date: date,
			dateOfEmbryoTransfered: `${date} ${timeOfET}`,
			numOfEmbryoTransfered: numberOfEmbryoTransferred,
			dr: DR,
			day: dayOfTransfer,
			fateOfExcessEmbryo: fateOfExcessEmbryo,
			transRecord: [
				{
					number: 1,
					stage: stageOne,
					grade: gradeOne,
					ivf: IVFOne,
					icsi: ICSIOne,
					comments: commentOne,
				},
				{
					number: 2,
					stage: stageTwo,
					grade: gradeTwo,
					ivf: IVFTwo,
					icsi: ICSITwo,
					comments: commentTwo,
				},
				{
					number: 3,
					stage: stageThree,
					grade: gradeThree,
					ivf: IVFThree,
					icsi: ICSIThree,
					comments: commentThree,
				},
				{
					number: 4,
					stage: stageFour,
					grade: gradeFour,
					ivf: IVFFour,
					icsi: ICSIFour,
					comments: commentFour,
				},
				{
					number: 5,
					stage: stageFive,
					grade: gradeFive,
					ivf: IVFFive,
					icsi: ICSIFive,
					comments: commentFive,
				},
				{
					number: 6,
					stage: stageSix,
					grade: gradeSix,
					ivf: IVFSix,
					icsi: ICSISix,
					comments: commentSix,
				},
				{
					number: 7,
					stage: stageSeven,
					grade: gradeSeven,
					ivf: IVFSeven,
					icsi: ICSISeven,
					comments: commentSeven,
				},
			],
		};
		try {
			const url = `embryology/transfer/create`;
			const rs = await request(url, 'POST', true, payload);
			if (rs.success) {
				notifySuccess('New Embryology Details Saved Successfully!');
				setTimeout(() => {
					closeModal();
				}, 2000);
			}
		} catch (error) {
			console.log('Submit Embryo Transfer Error', error);
		}
	};

	return (
		<div
			className="p-2"
			style={{ height: '37rem', overflowY: 'scroll', overflowX: 'hidden' }}
		>
			<form>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group"></div>
					</div>

					<div className="col-md-6">
						<div className="form-group">
							<label>EMBROYO TRANSFER</label>

							<input
								className="form-control"
								type="date"
								placeholder="Date"
								onChange={e => setDate(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</form>
			<table className="table table-striped table-bordered">
				<thead>
					<tr>
						<th>NUMBER OF EMBROYO TRANSFERED</th>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setNumberOfEmbryoTransferred(e.target.value)}
							/>
						</td>
						<th>TIME OF ET:</th>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="time"
								onChange={e => setTimeOfET(e.target.value)}
							/>
						</td>
						<th>DAY OF TRANSFER:</th>
						<td>
							{/* <input className="form-control" placeholder="" type="date" /> */}

							<select
								name="days"
								id="days"
								className="form-control"
								onChange={e => setDayOfTransfer(e.target.value)}
							>
								<option value="day1">Day 1</option>
								<option value="day2">Day 2</option>
								<option value="day3">Day 3</option>
								<option value="day4">Day 4</option>
								<option value="day5">Day 5</option>
								<option value="day6">Day 6</option>
							</select>
						</td>
					</tr>
				</thead>
			</table>

			<form>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label>DR:</label>
							<input
								className="form-control"
								placeholder="Dr"
								type="text"
								onChange={e => setDR(e.target.value)}
							/>
						</div>
					</div>

					{/* <div className="col-md-6">
						<div className="form-group">
							<label> EMBRIOLOGIST:</label>
							<input
								className="form-control"
								placeholder="Embriologist"
								type="text"
							/>
						</div>
					</div> */}
				</div>
			</form>

			<table className="table table-striped table-bordered">
				<thead>
					<tr>
						<th></th>
						<th>STAGE</th>
						<th>GRADE</th>
						<th>COMMENTS</th>
						<th>ICSI</th>
						<th>IVF</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setStageOne(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setGradeOne(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setCommentOne(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setICSIOne(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setIVFOne(e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>2</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setStageTwo(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setGradeTwo(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setCommentTwo(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setICSITwo(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setIVFTwo(e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>3</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setStageThree(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setGradeThree(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setCommentThree(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setICSIThree(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setIVFThree(e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>4</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setStageFour(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setGradeFour(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setCommentFour(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setICSIFour(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setIVFFour(e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>5</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setStageFive(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setGradeFive(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setCommentFive(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setICSIFive(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setIVFFive(e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>6</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setStageSix(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setGradeSix(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setCommentSix(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setICSISix(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setIVFSix(e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>7</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setStageSeven(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setGradeSeven(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setCommentSeven(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setICSISeven(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setIVFSeven(e.target.value)}
							/>
						</td>
					</tr>
				</tbody>
			</table>

			<h6 className="element-header">FATE OF EXCESS EMBRYO:</h6>
			<div className="col-md-6">
				<div className="form-group">
					<label></label>
					<select
						name="type"
						className="form-control"
						placeholder=""
						onChange={e => setFateOfExcessEmbryo(e.target.value)}
					>
						<option value="vitrified">Vitrified</option>
						<option value="discharged">Discharged</option>
					</select>
				</div>
			</div>

			{/* <form>
				<div className="row">
					<div className="col-md-4"></div>
					<div className="col-md-4"></div>
					<div className="col-md-4">
						<div className="form-group">
							<label> DATE</label>
							<input className="form-control" placeholder="" type="date" />
						</div>
					</div>
				</div>
			</form> */}

			{/* <form>
				<div className="row">
					<div className="col-md-4">
						<div className="form-group">
							<label> DATE</label>
							<input className="form-control" placeholder="" type="date" />
						</div>
					</div>
					<div className="col-md-4">
						<div className="form-group">
							<label>No OF EMBRYO VIT./DES.:</label>
							<input
								className="form-control"
								placeholder="No of embryo vit./des"
								type="text"
							/>
						</div>
					</div>
					<div className="col-md-4">
						<div className="form-group">
							<label>No OF STRAWS:</label>
							<input
								className="form-control"
								placeholder="No of straws"
								type="text"
							/>
						</div>
					</div>
				</div>
			</form> */}
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

export default EmbryoTransfer;

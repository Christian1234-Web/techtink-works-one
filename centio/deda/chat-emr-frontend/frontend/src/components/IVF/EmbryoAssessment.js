import React, { useState } from 'react';
import { notifySuccess } from '../../services/notify';
import { request } from '../../services/utilities';

const EmbryoAssessment = ({ newEmbryologyId, setTab }) => {
	// console.log('Embryo Assessment', newEmbryologyId);

	const [date, setDate] = useState('');
	const [numberOfCleavingEmbryo, setNumberOfCleavingEmbryo] = useState('');
	const [commentOne, setCommentOne] = useState('');
	const [cellOne, setCellOne] = useState('');
	const [cellTwo, setCellTwo] = useState('');
	const [cellThree, setCellThree] = useState('');
	const [cellFour, setCellFour] = useState('');
	const [cellFive, setCellFive] = useState('');
	const [cellSix, setCellSix] = useState('');
	const [cellSeven, setCellSeven] = useState('');
	const [cellEight, setCellEight] = useState('');
	const [cellNine, setCellNine] = useState('');
	const [cellTen, setCellTen] = useState('');
	const [cellEleven, setCellEleven] = useState('');
	const [cellTwelve, setCellTwelve] = useState('');
	const [cellThirteen, setCellThirteen] = useState('');
	const [cellFourteen, setCellFourteen] = useState('');
	const [cellFifteen, setCellFifteen] = useState('');
	const [cellSixteen, setCellSixteen] = useState('');

	const [fragOne, setFragOne] = useState('');
	const [fragTwo, setFragTwo] = useState('');
	const [fragThree, setFragThree] = useState('');
	const [fragFour, setFragFour] = useState('');
	const [fragFive, setFragFive] = useState('');
	const [fragSix, setFragSix] = useState('');
	const [fragSeven, setFragSeven] = useState('');
	const [fragEight, setFragEight] = useState('');
	const [fragNine, setFragNine] = useState('');
	const [fragTen, setFragTen] = useState('');
	const [fragEleven, setFragEleven] = useState('');
	const [fragTwelve, setFragTwelve] = useState('');
	const [fragThirteen, setFragThirteen] = useState('');
	const [fragFourteen, setFragFourteen] = useState('');
	const [fragFifteen, setFragFifteen] = useState('');
	const [fragSixteen, setFragSixteen] = useState('');

	const [gradeOne, setGradeOne] = useState('');
	const [gradeTwo, setGradeTwo] = useState('');
	const [gradeThree, setGradeThree] = useState('');
	const [gradeFour, setGradeFour] = useState('');
	const [gradeFive, setGradeFive] = useState('');
	const [gradeSix, setGradeSix] = useState('');
	const [gradeSeven, setGradeSeven] = useState('');
	const [gradeEight, setGradeEight] = useState('');
	const [gradeNine, setGradeNine] = useState('');
	const [gradeTen, setGradeTen] = useState('');
	const [gradeEleven, setGradeEleven] = useState('');
	const [gradeTwelve, setGradeTwelve] = useState('');
	const [gradeThirteen, setGradeThirteen] = useState('');
	const [gradeFourteen, setGradeFourteen] = useState('');
	const [gradeFifteen, setGradeFifteen] = useState('');
	const [gradeSixteen, setGradeSixteen] = useState('');
	const [commentTwo, setCommentTwo] = useState('');
	const [changeDoneBy, setChangeDoneBy] = useState('');
	const [biopsyDoneBy, setBiopsyDoneBy] = useState('');
	const [witness, setWitness] = useState('');

	const handleFormSubmit = async () => {
		const payload = {
			embryologyId: newEmbryologyId,
			date: date,
			changeOverDoneBy: changeDoneBy,
			biopsyDoneBy: biopsyDoneBy,
			witness: witness,
			numOfClavingEmbryos: numberOfCleavingEmbryo,
			day2Comment: commentOne,
			day3Comment: commentTwo,
			biopsy: [
				{
					type: 'Cell No',
					one: cellOne,
					two: cellTwo,
					three: cellThree,
					four: cellFour,
					five: cellFive,
					six: cellSix,
					seven: cellSeven,
					eight: cellEight,
					nine: cellNine,
					ten: cellTen,
					eleven: cellEleven,
					twelve: cellTwelve,
					thirteen: cellThirteen,
					fourteen: cellFourteen,
					fifteen: cellFifteen,
					sixteen: cellSixteen,
				},
				{
					type: 'Fragmentation',
					one: fragOne,
					two: fragTwo,
					three: fragThree,
					four: fragFour,
					five: fragFive,
					six: fragSix,
					seven: fragSeven,
					eight: fragEight,
					nine: fragNine,
					ten: fragTen,
					eleven: fragEleven,
					twelve: fragTwelve,
					thirteen: fragThirteen,
					fourteen: fragFourteen,
					fifteen: fragFifteen,
					sixteen: fragSixteen,
				},
				{
					type: 'Grade',
					one: gradeOne,
					two: gradeTwo,
					three: gradeThree,
					four: gradeFour,
					five: gradeFive,
					six: gradeSix,
					seven: gradeSeven,
					eight: gradeEight,
					nine: gradeNine,
					ten: gradeTen,
					eleven: gradeEleven,
					twelve: gradeTwelve,
					thirteen: gradeThirteen,
					fourteen: gradeFourteen,
					fifteen: gradeFifteen,
					sixteen: gradeSixteen,
				},
			],
		};
		try {
			const url = `embryology/assessment/create`;
			const rs = await request(url, 'POST', true, payload);
			if (rs.success) {
				notifySuccess('Save Successfully!');
				setTimeout(() => {
					setTab('transfer');
				}, 1000);
			}
		} catch (error) {
			console.log('Submit Embryology Assessment Error', error);
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
							<label>ASSESSMENT OF EMBROYO QUALITY</label>

							<input
								className="single-daterange form-control"
								placeholder="Date"
								type="date"
								onChange={e => setDate(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</form>

			<table className="table table-striped table-bordered">
				<tbody>
					<tr>
						<td>
							<strong>DAY 2</strong>
						</td>
						<td>Number of Cleaving Embryo(s)</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setNumberOfCleavingEmbryo(e.target.value)}
							/>
						</td>
					</tr>

					<tr>
						<td>COMMENT</td>
						<td colSpan="2">
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setCommentOne(e.target.value)}
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<br />

			<div style={{ overflowX: 'scroll', width: '100%' }}>
				<table className="table table-striped table-bordered overflow-scroll">
					<thead>
						<tr>
							<th colSpan="2">EMBROYO/DROP No:</th>
							<th>1</th>
							<th>2</th>
							<th>3</th>
							<th>4</th>
							<th>5</th>
							<th>6</th>
							<th>7</th>
							<th>8</th>
							<th>9</th>
							<th>10</th>
							<th>11</th>
							<th>12</th>
							<th>13</th>
							<th>14</th>
							<th>15</th>
							<th>16</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td rowSpan="3">
								DAY 3 <br />
								PROGRESS RECORD/
								<br />
								BIOPSY RECORD
							</td>
							<td>Cell No:</td>
							<td>
								<input
									className=""
									placeholder=""
									type="text"
									onChange={e => setCellOne(e.target)}
								/>
							</td>
							<td>
								<input
									className=""
									placeholder=""
									type="text"
									onChange={e => setCellTwo(e.target)}
								/>
							</td>
							<td>
								<input
									className=""
									placeholder=""
									type="text"
									onChange={e => setCellThree(e.target)}
								/>
							</td>
							<td>
								<input
									className=""
									placeholder=""
									type="text"
									onChange={e => setCellFour(e.target)}
								/>
							</td>
							<td>
								<input
									className=""
									placeholder=""
									type="text"
									onChange={e => setCellFive(e.target)}
								/>
							</td>
							<td>
								<input
									className=""
									placeholder=""
									type="text"
									onChange={e => setCellSix(e.target)}
								/>
							</td>
							<td>
								<input
									className=""
									placeholder=""
									type="text"
									onChange={e => setCellSeven(e.target)}
								/>
							</td>
							<td>
								<input
									className=""
									placeholder=""
									type="text"
									onChange={e => setCellEight(e.target)}
								/>
							</td>
							<td>
								<input
									className=""
									placeholder=""
									type="text"
									onChange={e => setCellNine(e.target)}
								/>
							</td>
							<td>
								<input
									className=""
									placeholder=""
									type="text"
									onChange={e => setCellTen(e.target)}
								/>
							</td>
							<td>
								<input
									className=""
									placeholder=""
									type="text"
									onChange={e => setCellEleven(e.target)}
								/>
							</td>
							<td>
								<input
									className=""
									placeholder=""
									type="text"
									onChange={e => setCellTwelve(e.target)}
								/>
							</td>
							<td>
								<input
									className=""
									placeholder=""
									type="text"
									onChange={e => setCellThirteen(e.target)}
								/>
							</td>
							<td>
								<input
									className=""
									placeholder=""
									type="text"
									onChange={e => setCellFourteen(e.target)}
								/>
							</td>
							<td>
								<input
									className=""
									placeholder=""
									type="text"
									onChange={e => setCellFifteen(e.target)}
								/>
							</td>
							<td>
								<input
									className=""
									placeholder=""
									type="text"
									onChange={e => setCellSixteen(e.target)}
								/>
							</td>
						</tr>
						<tr>
							<td>Fragmentation</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setFragOne(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setFragTwo(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setFragThree(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setFragFour(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setFragFive(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setFragSix(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setFragSeven(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setFragEight(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setFragNine(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setFragTen(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setFragEleven(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setFragTwelve(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setFragThirteen(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setFragFourteen(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setFragFifteen(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setFragSixteen(e.target.value)}
								/>
							</td>
						</tr>
						<tr>
							<td>Grade</td>
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
									onChange={e => setGradeTwo(e.target.value)}
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
									onChange={e => setGradeFour(e.target.value)}
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
									onChange={e => setGradeSix(e.target.value)}
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
									onChange={e => setGradeEight(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setGradeNine(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setGradeTen(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setGradeEleven(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setGradeTwelve(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setGradeThirteen(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setGradeFourteen(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setGradeFifteen(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setGradeSixteen(e.target.value)}
								/>
							</td>
						</tr>
						<tr>
							<td>COMMENT</td>
							<td colSpan="13">
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setCommentTwo(e.target.value)}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<form>
				<div className="row">
					<div className="col-md-4">
						<div className="form-group">
							<label>CHANGE OVER DONE BY</label>
							<input
								className="form-control"
								placeholder="Change over done by"
								type="text"
								onChange={e => setChangeDoneBy(e.target.value)}
							/>
						</div>
					</div>
					<div className="col-md-4">
						<div className="form-group">
							<label>BIOPSY DONE BY</label>
							<input
								className="form-control"
								placeholder="Biopsy done by"
								type="text"
								onChange={e => setBiopsyDoneBy(e.target.value)}
							/>
						</div>
					</div>
					<div className="col-md-4">
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

export default EmbryoAssessment;

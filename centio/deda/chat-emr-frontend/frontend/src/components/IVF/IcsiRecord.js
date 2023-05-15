import React from 'react';
import { useState } from 'react';
import { notifySuccess } from '../../services/notify';
import { request } from '../../services/utilities';

const IcsiRecord = ({ newEmbryologyId, setTab }) => {
	const [timeOne, setTimeOne] = useState('');
	const [timeTwo, setTimeTwo] = useState('');
	const [MII, setMII] = useState('');
	const [MIGV, setMIGV] = useState('');
	const [FRAG, setFRAG] = useState('');
	const [ABN, setABN] = useState('');
	const [commentOne, setCommentOne] = useState('');
	const [ICSIMethod, setICSIMethod] = useState('');
	const [OPDate, setOPDate] = useState('');
	const [totalNumberOfOocyte, setTotalNumberOfOocyte] = useState('');
	const [numberOfOocyteInseminated, setNumberOfOocyteInseminated] =
		useState('');
	const [numberOfOocyteInjected, setNumberOfOocyteInjected] = useState('');
	const [commentTwo, setCommentTwo] = useState('');
	const [DR, setDR] = useState('');
	const [witness, setWitness] = useState('');
	const [twoPNOne, setTwoPNOne] = useState('');
	const [threePNOne, setThreePNOne] = useState('');
	const [onePNOne, setOnePNOne] = useState('');
	const [plusOne, setPlusOne] = useState('');
	const [MILOne, setMILOne] = useState('');
	const [MLOne, setMLOne] = useState('');
	const [GVOne, setGVOne] = useState('');
	const [otherOne, setOtherOne] = useState('');
	const [twoPNTwo, setTwoPNTwo] = useState('');
	const [threePNTwo, setThreePNTwo] = useState('');
	const [onePNTwo, setOnePNTwo] = useState('');
	const [plusTwo, setPlusTwo] = useState('');
	const [MILTwo, setMILTwo] = useState('');
	const [MLTwo, setMLTwo] = useState('');
	const [GVTwo, setGVTwo] = useState('');
	const [otherTwo, setOtherTwo] = useState('');
	const [commentThree, setCommentThree] = useState('');

	const handleFormSubmit = async () => {
		const payload = {
			embryologyId: newEmbryologyId,
			time: timeOne,
			mii: MII,
			migv: MIGV,
			frag: FRAG,
			abn: ABN,
			commentOne: commentOne,
			icsiMethod: ICSIMethod,
			opDate: `${OPDate} ${timeTwo}`,
			docyteInjected: numberOfOocyteInjected,
			docyteInseminated: numberOfOocyteInseminated,
			totalDocyte: totalNumberOfOocyte,
			commentTwo: commentTwo,
			witness: witness,
			commentThree: commentThree,
			dayOne: [
				{
					type: 'ivf',
					one_pn: onePNOne,
					two_pn: twoPNOne,
					three_pn: threePNOne,
					plus: plusOne,
					mil: MILOne,
					ml: MLOne,
					gv: GVOne,
					others: otherOne,
				},
				{
					type: 'icsi',
					one_pn: onePNTwo,
					two_pn: twoPNTwo,
					three_pn: threePNTwo,
					plus: plusTwo,
					mil: MILTwo,
					ml: MLTwo,
					gv: GVTwo,
					others: otherTwo,
				},
			],
		};
		try {
			const url = `embryology/icsi/create`;
			const rs = await request(url, 'POST', true, payload);
			if (rs.success) {
				notifySuccess('Save Successfully!');
				setTimeout(() => {
					setTab('assessment');
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
			<h6 className="element-header">ICSI PRE-INJECTION DISSECTION</h6>
			<form>
				<div className="row">
					<div className="col-sm-6"></div>
					<div className="col-sm-6">
						<div className="form-group">
							<div className="">
								<label className="">TIME</label>
								<input
									className="form-control"
									placeholder="Time"
									type="time"
									onChange={e => setTimeOne(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</div>
			</form>
			<table className="table table-striped table-bordered">
				<thead>
					<tr>
						<th></th>
						<th>MII</th>
						<th>MIGV</th>
						<th>FRAG</th>
						<th>ABN</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>NO:</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setMII(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setMIGV(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setFRAG(e.target.value)}
							/>
						</td>
						<td>
							<input
								className="form-control"
								placeholder=""
								type="text"
								onChange={e => setABN(e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td>Comment</td>
						<td colSpan="4">
							<input
								className="form-control"
								placeholder="Comment"
								type="text"
								onChange={e => setCommentOne(e.target.value)}
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<h6 className="element-header">IVF/ICSI RECORD</h6>
			<form>
				<div className="row">
					<div className="col-md-4">
						<div className="">
							<div className="form-check">
								<input
									className="form-check-input"
									name="implant"
									type="radio"
									value="insemination"
									onChange={e => setICSIMethod(e.target.value)}
								/>
								<label className="form-check-label">INSEMINATION</label>
							</div>
						</div>
						<div className="">
							<div className="form-check">
								<input
									className="form-check-input"
									name="implant"
									type="radio"
									value="injection"
									onChange={e => setICSIMethod(e.target.value)}
								/>
								<label className="form-check-label mt-1">INJECTION</label>
							</div>
						</div>
						<div className="">
							<div className="form-check">
								<input
									className="form-check-input"
									name="implant"
									type="radio"
									value="50/50"
									onChange={e => setICSIMethod(e.target.value)}
								/>
								<label className="form-check-label mt-1">50/50</label>
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<div className="form-group">
							<label className="">OP DATE</label>
							<div className="">
								<input
									className="form-control"
									placeholder="OP DATE"
									type="date"
									onChange={e => setOPDate(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<div className="form-group">
							<label className="">TIME:</label>
							<div className="">
								<input
									className="form-control"
									placeholder="Time"
									type="time"
									onChange={e => setTimeTwo(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</div>
			</form>

			<div className="table-responsive">
				<table className="table table-bordered table-lg table-v2 table-striped">
					<thead>
						<tr>
							<th>TOTAL No. OF OCCYTE</th>
							<th>IVF</th>
							<th>ICSI</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<th rowSpan="2">
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setTotalNumberOfOocyte(e.target.value)}
								/>
							</th>
							<th>No of Oocyte Inseminated</th>
							<th>No of Oocyte Injected</th>
						</tr>
						<tr>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setNumberOfOocyteInseminated(e.target.value)}
								/>
							</td>
							<td>
								<input
									className="form-control"
									placeholder=""
									type="text"
									onChange={e => setNumberOfOocyteInjected(e.target.value)}
								/>
							</td>
						</tr>

						<tr>
							<td>COMMENT:</td>
							<td colSpan="2">
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
			<h6 className="element-header">DAY 1</h6>
			<table className="table table-striped table-bordered">
				<thead>
					<tr>
						<td colSpan="5"></td>
						<td colSpan="3">NON-FERTILIZED</td>
						<td>OTHERS</td>
					</tr>
					<tr>
						<td></td>
						<td>2PN</td>
						<td>3PN</td>
						<td>1PN</td>
						<td>+</td>
						<td>MIL</td>
						<td>ML</td>
						<td>GV</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>IVF</td>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
					</tr>

					<tr>
						<td>ICSI</td>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
						<td>
							<input className="form-control" placeholder="" type="text" />
						</td>
					</tr>
					<tr>
						<td>COMMENTS</td>
						<td colSpan="9">
							<input className="form-control" placeholder="" type="text" />
						</td>
					</tr>
				</tbody>
			</table>

			<form>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label>DR</label>
							<input
								className="form-control"
								placeholder="Dr"
								type="text"
								onChange={e => setDR(e.target.value)}
							/>
						</div>
					</div>
					<div className="col-md-6">
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
					{/* <div className="col-md-4">
							<div className="form-group">
								<label>EMBRYOLOGISTS</label>
								<input
									className="form-control"
									placeholder="Embryologists"
									type="text"
								/>
							</div>
						</div> */}
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

export default IcsiRecord;

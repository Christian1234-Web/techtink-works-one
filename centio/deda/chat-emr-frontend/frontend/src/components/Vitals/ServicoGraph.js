import React, { useEffect, useState } from 'react';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import kebabCase from 'lodash.kebabcase';
import { connect } from 'react-redux';

import Reading from '../Patient/Reading';
import { formatDate } from '../../services/utilities';

const unit = '';

const info = {
	title: 'Servico Graph',
	type: kebabCase('Servico Graph'),
	inputs: [
		{ name: 'alert', title: 'Alert', weight: '' },
		{ name: 'action', title: 'Action', weight: '' },
		{ name: 'cervical_dilation', title: 'Cervical Dilation', weight: '' },
		{ name: 'fetal_head_station', title: 'Fetal Head Station', weight: '' },
	],
};

const ServicoGraph = ({ vitals, task, patient }) => {
	const [visible, setVisible] = useState(false);
	const [currentVitals, setCurrentVitals] = useState(null);
	const [data, setData] = useState([]);

	useEffect(() => {
		try {
			let data = [];
			const cloneVitals = [...vitals];
			cloneVitals
				.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
				.forEach((item, index) => {
					const date = formatDate(item.createdAt, 'DD-MMM-YYYY h:mma');
					const items = item.reading.servico_graph.split('/');

					let res = { name: date };
					if (items[0]) {
						res = { ...res, alert: items[0] };
					}
					if (items[1]) {
						res = { ...res, action: items[1] };
					}
					if (items[2]) {
						res = { ...res, cervical_dilation: items[2] };
					}
					if (items[3]) {
						res = { ...res, fetal_head_station: items[3] };
					}

					data = [...data, res];
				});

			if (vitals.length > 0) {
				const lastReading = vitals[0].reading.servico_graph.split('/');
				setCurrentVitals({
					...lastReading,
					_reading: `Alert: ${
						lastReading[0] === '' ? '--' : lastReading[0]
					}, Action: ${
						lastReading[1] === '' ? '--' : lastReading[1]
					}, Cervical Dilation: ${
						lastReading[2] === '' ? '--' : lastReading[2]
					}, Fetal Head Station: ${
						lastReading[3] === '' ? '--' : lastReading[3]
					}`,
				});
			}
			//.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
			setData(data);
		} catch (e) {}
	}, [vitals]);

	return (
		<div className="row vital">
			<div className="col-8">
				<div className="el-chart-w">
					<ResponsiveContainer width="100%" height={300}>
						<LineChart
							data={data}
							margin={{ top: 5, right: 20, bottom: 5, left: 30 }}
						>
							<Line
								connectNulls
								name="alert"
								type="monotone"
								dataKey="alert"
								stroke="#8884d8"
							/>
							<Line
								connectNulls
								name="action"
								type="monotone"
								dataKey="action"
								stroke="#da6482"
							/>
							<Line
								connectNulls
								name="cervical_dilation"
								type="monotone"
								dataKey="cervical_dilation"
								stroke="#dfd66c"
							/>
							<Line
								connectNulls
								name="fetal_head_station"
								type="monotone"
								dataKey="fetal_head_station"
								stroke="#82ca9d"
							/>
							<CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis
								label={{
									value: 'Servico Graph',
									angle: -90,
									position: 'left',
								}}
							/>
							<Tooltip />
							<Legend />
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
			<Reading
				patient={patient}
				visible={visible}
				vital={currentVitals}
				info={info}
				setVisible={setVisible}
				unit={unit}
				task={task}
			/>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		vitals: state.patient.vitals.filter(c => c.readingType === info.title),
	};
};

export default connect(mapStateToProps)(ServicoGraph);

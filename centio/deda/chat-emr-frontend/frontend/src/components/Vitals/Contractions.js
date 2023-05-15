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
	title: 'Contractions',
	type: kebabCase('Contractions'),
	inputs: [
		{ name: 'rate', title: 'Rate of Contraction', weight: '' },
		{ name: 'duration', title: 'Duration of Contractions', weight: 'secs' },
	],
};

const Contractions = ({ vitals, task, patient }) => {
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
					const items = item.reading.contractions.split('/');

					let res = { name: date };
					if (items[0]) {
						res = { ...res, rate: items[0] };
					}
					if (items[1]) {
						res = { ...res, duration: items[1] };
					}

					data = [...data, res];
				});

			if (vitals.length > 0) {
				const lastReading = vitals[0].reading.contractions.split('/');
				setCurrentVitals({
					...lastReading,
					_reading: `Rate of Contraction: ${
						lastReading[0] === '' ? '--' : lastReading[0]
					}, Duration of Contractions: ${
						lastReading[1] === '' ? '--' : `${lastReading[1]}secs`
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
								name="rate"
								type="monotone"
								dataKey="rate"
								stroke="#8884d8"
							/>
							<Line
								connectNulls
								name="duration"
								type="monotone"
								dataKey="duration"
								stroke="#82ca9d"
							/>
							<CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis
								label={{
									value: 'Contractions',
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

export default connect(mapStateToProps)(Contractions);

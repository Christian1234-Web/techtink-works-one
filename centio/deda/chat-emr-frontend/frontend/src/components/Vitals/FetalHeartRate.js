import React, { useEffect, useState } from 'react';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
} from 'recharts';
import kebabCase from 'lodash.kebabcase';
import { connect } from 'react-redux';

import Reading from '../Patient/Reading';
import { formatDate } from '../../services/utilities';

const unit = 'bps';

const info = {
	title: 'Fetal Heart Rate',
	type: kebabCase('Fetal Heart Rate'),
	inputs: [
		{ name: 'fetal_heart_rate', title: 'Fetal Heart Rate', weight: 'bps' },
	],
};

const FetalHeartRate = ({ vitals, task, patient }) => {
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
					const res = { name: date, item: item.reading.fetal_heart_rate };
					data = [...data, res];
				});

			if (vitals.length > 0) {
				let lastReading = vitals[0];
				setCurrentVitals({
					...lastReading,
					_reading: lastReading.reading.fetal_heart_rate,
				});
			}
			setData(data);
		} catch (e) {}
	}, [vitals]);

	return (
		<div className="row vital">
			<div className="col-8">
				<div className="el-chart-w">
					<LineChart
						width={640}
						height={300}
						data={data}
						margin={{ top: 5, right: 20, bottom: 5, left: 30 }}
					>
						<Line
							type="monotone"
							dataKey="item"
							unit={unit}
							name={info.title}
							stroke="#8884d8"
						/>
						<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
						<XAxis dataKey="name" />
						<YAxis
							label={{
								value: `Fetal Heart Rate (${unit})`,
								angle: -90,
								position: 'left',
							}}
						/>
						<Tooltip />
						<Legend />
					</LineChart>
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

export default connect(mapStateToProps)(FetalHeartRate);

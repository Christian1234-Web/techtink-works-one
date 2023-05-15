import React from 'react';
import { Field } from 'redux-form';
import DatePicker from 'react-datepicker';

import { renderTextInput } from '../../services/utilities';

function GynaeHistory(props) {
	const { lmpHx, setLmpHx } = props;
	return (
		<>
			<div className="col-sm-6">
				<Field
					id="menarche"
					name="menarche"
					component={renderTextInput}
					label="Menarche"
					type="text"
					placeholder="Enter menarche"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="menstralCycle"
					name="menstralCycle"
					component={renderTextInput}
					label="Menstral Cycle"
					type="text"
					placeholder="Enter menstral cycle"
				/>
			</div>

			<div className="col-sm-6">
				<div className="form-group">
					<label>LMP</label>
					<div className="custom-date-input">
						<DatePicker
							selected={lmpHx}
							onChange={date => setLmpHx(date, 'lmpHx')}
							peekNextMonth
							showMonthDropdown
							showYearDropdown
							dropdownMode="select"
							dateFormat="dd-MMM-yyyy"
							className="single-daterange form-control"
							placeholderText="Select LMP"
							maxDate={new Date()}
						/>
					</div>
				</div>
			</div>
			<div className="col-sm-6">
				<Field
					id="contraception"
					name="contraception"
					component={renderTextInput}
					label="Contraception"
					type="text"
					placeholder="Enter contraception"
				/>
			</div>

			<div className="col-sm-6">
				<Field
					id="contraceptionMethod"
					name="contraceptionMethod"
					component={renderTextInput}
					label="Method/Type of Contraception"
					type="text"
					placeholder="Enter contraception method"
				/>
			</div>
			<div className="col-sm-6">
				<Field
					id="dysmenorrhea"
					name="dysmenorrhea"
					component={renderTextInput}
					label="Dysmenorrhea"
					type="text"
					placeholder="Enter dysmenorrhea"
				/>
			</div>

			<div className="col-sm-6">
				<Field
					id="abnormalBleeding"
					name="abnormalBleeding"
					component={renderTextInput}
					label="Abnormal Menstrual Bleeding"
					type="text"
					placeholder="Enter abnormal menstrual bleeding"
				/>
			</div>
		</>
	);
}

export default GynaeHistory;

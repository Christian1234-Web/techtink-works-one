import React from 'react';
import { connect } from 'react-redux';

import ModalPayrollHistory from './ModalPayrollHistory';
import ModalCurrentPayroll from './ModalCurrentPayroll';
import ModalEditPayroll from './ModalEditPayroll';
import ModalStaffAppraisal from './ModalStaffAppraisal';

const ModalDialogs = ({
	view_payroll_history,
	current_payroll,
	edit_payroll,
	staff_appraisal,
}) => {
	return (
		<>
			{view_payroll_history && <ModalPayrollHistory />}
			{current_payroll && <ModalCurrentPayroll />}
			{edit_payroll && <ModalEditPayroll />}
			{staff_appraisal && <ModalStaffAppraisal />}
		</>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		view_payroll_history: state.general.view_payroll_history,
		current_payroll: state.general.current_payroll,
		edit_payroll: state.general.edit_payroll,
		staff_appraisal: state.general.staff_appraisal,
	};
};

export default connect(mapStateToProps)(ModalDialogs);

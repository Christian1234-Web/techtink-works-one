import React from 'react';

const CreateTherapyNotes = ({ closeModal }) => {
	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '720px' }}
			>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}
					>
						<span className="os-icon os-icon-close" />
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">Create Staff</h4>
						<div className="form-block">
							<h1>hfhfhf</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateTherapyNotes;

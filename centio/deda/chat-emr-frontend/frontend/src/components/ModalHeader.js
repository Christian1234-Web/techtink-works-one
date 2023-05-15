import React from 'react';

const ModalHeader = ({ closeModal, title }) => {
	return (
		<div className="modal-header faded smaller">
			<div className="modal-title text-center w-100">{title}</div>
			<button className="close" type="button" onClick={closeModal}>
				<span className="os-icon os-icon-close" />
			</button>
		</div>
	);
};

export default ModalHeader;

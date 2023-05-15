import React, { useState } from 'react';

import CreateFreezing from '../Modals/CreateFreezing';

const Freezing = () => {
	const [showModal, setShowModal] = useState(false);

	const newEntry = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		document.body.classList.remove('modal-open');
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper Freezing">
				<div className="element-actions flex-action">
					<a
						className="btn btn-sm btn-secondary text-white ml-3"
						onClick={() => newEntry()}
					>
						New Freezing
					</a>
				</div>
			</div>
			{showModal && <CreateFreezing closeModal={closeModal} />}
		</div>
	);
};

export default Freezing;

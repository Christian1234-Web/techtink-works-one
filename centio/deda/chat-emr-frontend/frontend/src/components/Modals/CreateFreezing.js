import React, { useState } from 'react';

import Sperm from '../IVF/Sperm';
import Oocyte from '../IVF/Oocyte';

const CreateFreezing = ({ closeModal }) => {
	const [tab, setTab] = useState('sperm');

	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-centered"
				style={{ maxWidth: '1024px' }}
			>
				<div className="modal-content text-center">
					<button
						aria-label="Close"
						className="close"
						type="button"
						onClick={closeModal}
					>
						<span className="os-icon os-icon-close"></span>
					</button>
					<div className="onboarding-content with-gradient">
						<h4 className="onboarding-title">New Freezing</h4>
						<div className="os-tabs-w">
							<div className="os-tabs-controls os-tabs-complex">
								<ul className="nav nav-tabs">
									<li className="nav-item">
										<a
											className={`nav-link ${tab === 'sperm' ? 'active' : ''}`}
											onClick={() => setTab('sperm')}
										>
											<span className="tab-label">SPERM</span>
										</a>
									</li>
									<li className="nav-item">
										<a
											className={`nav-link ${tab === 'oocyte' ? 'active' : ''}`}
											onClick={() => setTab('oocyte')}
										>
											<span className="tab-label">OOCYTE / EMB</span>
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="element-box-md p-3">
							<div className="row">
								<div className="col-md-12">
									{tab === 'sperm' && <Sperm closeModal={closeModal} />}
									{tab === 'oocyte' && <Oocyte closeModal={closeModal} />}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateFreezing;

import React from 'react';

const ViewSurvey = ({ closeModal, survey }) => {
	return (
		<div
			className="onboarding-modal modal fade animated show"
			role="dialog"
			style={{ display: 'block' }}
		>
			<div
				className="modal-dialog modal-content modal-centered modal-scroll"
				style={{ maxWidth: '920px' }}
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
						<h4 className="onboarding-title">View Survey</h4>
						<div className="row">
							<div className="col-sm-12 col-lg-12 col-xl-12 col-xxl-12">
								<div className="element-box">
									<table className="table table-striped table-bordered">
										<thead>
											<tr>
												<th>Question</th>
												<th className="text-center">Response</th>
											</tr>
										</thead>
										<tbody>
											{survey.response.map((data, i) => {
												return (
													<tr key={i}>
														<td className="text-left">
															{data?.question?.question}
														</td>
														<td className="text-center">{data?.answer}</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewSurvey;

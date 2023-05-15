import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TableLoading from '../TableLoading';
import { formatDate, request, staffname } from '../../services/utilities';
import { notifyError } from '../../services/notify';
import { startBlock, stopBlock } from '../../actions/redux-block';
import RecordDelivery from '../Modals/RecordDelivery';
import { labourAPI } from '../../services/constants';

const Delivery = ({ patient }) => {
	const [loading, setLoading] = useState(true);
	const [deliveryItem, setDeliveryItem] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const dispatch = useDispatch();

	const labour = useSelector(state => state.sidepanel.item);

	const fetchDelivery = useCallback(async () => {
		try {
			dispatch(startBlock());
			const url = `${labourAPI}/${labour.id}/delivery-record`;
			const rs = await request(url, 'GET', true);
			setDeliveryItem(rs.delivery_record || null);
			dispatch(stopBlock());
		} catch (error) {
			console.log(error);
			dispatch(stopBlock());
			notifyError('error fetching delivery record');
		}
	}, [dispatch, labour]);

	useEffect(() => {
		if (loading) {
			fetchDelivery();
			setLoading(false);
		}
	}, [fetchDelivery, loading]);

	const newEntry = () => {
		document.body.classList.add('modal-open');
		setShowModal(true);
	};

	const closeModal = () => {
		document.body.classList.remove('modal-open');
		setShowModal(false);
	};

	return (
		<div className="col-sm-12">
			<div className="element-wrapper">
				<div className="element-actions flex-action">
					{deliveryItem === null && (
						<a
							className="btn btn-sm btn-secondary text-white ml-3"
							onClick={() => newEntry()}
						>
							Record Delivery
						</a>
					)}
				</div>
				<h6 className="element-header">Delivery Record</h6>
				<div className="element-box p-3 m-0">
					{loading ? (
						<TableLoading />
					) : (
						<div className="table-responsive">
							<table className="table table-hover">
								<tbody>
									<tr>
										<th style={{ width: '40%' }}>Delivery type:</th>
										<td>{deliveryItem?.delivery_type || '--'}</td>
									</tr>
									<tr>
										<th>Is mother alive:</th>
										<td>{deliveryItem?.is_mother_alive || '--'}</td>
									</tr>
									<tr>
										<th>Is baby alive:</th>
										<td>{deliveryItem?.is_baby_alive || '--'}</td>
									</tr>
									<tr>
										<th>Did you administer 10 units of Oxytocin:</th>
										<td>{deliveryItem?.administered_oxytocin || '--'}</td>
									</tr>
									<tr>
										<th>Was placenta delivered completely:</th>
										<td>{deliveryItem?.placenta_delivered || '--'}</td>
									</tr>
									<tr>
										<th>{`Bleeding within normal unit (<500ml):`}</th>
										<td>{deliveryItem?.normal_bleeding || '--'}</td>
									</tr>
									<tr>
										<th>Date of Birth:</th>
										<td>
											{formatDate(deliveryItem?.date_of_birth, 'DD-MMM-YYYY')}
										</td>
									</tr>
									<tr>
										<th>Time of Birth:</th>
										<td>
											{formatDate(
												`${deliveryItem?.date_of_birth} ${deliveryItem?.time_of_birth}`,
												'h:mm a'
											)}
										</td>
									</tr>
									<tr>
										<th>Baby cried immediately after birth:</th>
										<td>{deliveryItem?.baby_cried_immediately || '--'}</td>
									</tr>
									<tr>
										<th>Sex of baby:</th>
										<td>{deliveryItem?.sex_of_baby || '--'}</td>
									</tr>
									<tr>
										<th>APGAR score:</th>
										<td>{deliveryItem?.apgar_score || '--'}</td>
									</tr>
									<tr>
										<th>Weight (kg):</th>
										<td>
											{deliveryItem?.weight
												? `${deliveryItem?.weight}kg`
												: '--'}
										</td>
									</tr>
									<tr>
										<th>Was vitamin k administered:</th>
										<td>{deliveryItem?.administered_vitamin_k || '--'}</td>
									</tr>
									<tr>
										<th>Is mother RH Negative:</th>
										<td>{deliveryItem?.mother_rh_negative || '--'}</td>
									</tr>
									<tr>
										<th>Drugs administered:</th>
										<td>{deliveryItem?.drugs_administered || '--'}</td>
									</tr>
									<tr>
										<th>Trasferred out:</th>
										<td>{deliveryItem?.transferred_to || '--'}</td>
									</tr>
									<tr>
										<th>Comment:</th>
										<td>{deliveryItem?.comment || '--'}</td>
									</tr>
									<tr>
										<th>Pediatrician:</th>
										<td>
											{deliveryItem?.pediatrician
												? staffname(deliveryItem?.pediatrician)
												: '--'}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
			{showModal && (
				<RecordDelivery
					closeModal={closeModal}
					labour_id={labour.id}
					patient={patient}
					update={item => setDeliveryItem(item)}
				/>
			)}
		</div>
	);
};

export default Delivery;

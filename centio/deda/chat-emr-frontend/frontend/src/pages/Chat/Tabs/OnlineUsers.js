import React from 'react';
import { Link } from 'react-router-dom';

//carousel
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

//Import Images
import { staffname } from '../../../services/utilities';
import { activeUser } from '../../../reducers/actions';
import { useDispatch } from 'react-redux';

const OnlineUsers = ({ activeChat }) => {
	const dispatch = useDispatch();
	const responsive = {
		0: { items: 4 },
		1024: { items: 4 },
	};

	function openUserChat(id) {
		dispatch(activeUser(id));
	}

	return (
		<React.Fragment>
			{/* Start user status */}
			<div className="px-4 pb-4 dot_remove" dir="ltr">
				<AliceCarousel
					responsive={responsive}
					disableDotsControls={false}
					disableButtonsControls={false}
					mouseTracking
				>
					{activeChat?.map((e, i) => {
						return (
							<div className="item" key={i}>
								<Link
									to="#"
									className="user-status-box"
									onClick={() => openUserChat(e.id)}
								>
									<div className="avatar-xs mx-auto d-block chat-user-img online">
										<span className="avatar-title rounded-circle bg-soft-primary text-primary">
											{e.first_name.charAt(0)}
										</span>
										{/* <img src={avatar2} alt="user-img" className="img-fluid rounded-circle" /> */}
										<span className="user-status"></span>
									</div>

									<h5 className="font-size-13 text-truncate mt-3 mb-1">
										{staffname(e)}
									</h5>
								</Link>
							</div>
						);
					})}
				</AliceCarousel>
				{/* end user status carousel */}
			</div>
			{/* end user status  */}
		</React.Fragment>
	);
};

export default OnlineUsers;

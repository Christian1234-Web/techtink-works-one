import React from 'react';
import { Link } from 'react-router-dom';

const StoreMenu = () => {
	return (
		<>
			<li>
				<Link to="/store">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Inventory</span>
				</Link>
			</li>
			<li>
				<Link to="/store/vendors">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Vendors</span>
				</Link>
			</li>
			<li>
				<Link to="/store/requisitions">
					<div className="icon-w">
						<div className="os-icon os-icon-layers" />
					</div>
					<span>Requisitions</span>
				</Link>
			</li>
		</>
	);
};

export default StoreMenu;

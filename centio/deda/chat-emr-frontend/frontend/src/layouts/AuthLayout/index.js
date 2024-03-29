import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeLayoutMode } from '../../reducers/actions';

//Import Components
import LeftSidebarMenu from './LeftSidebarMenu';

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.capitalizeFirstLetter.bind(this);
	}

	//function for capital first letter of current page pathname
	capitalizeFirstLetter = string => {
		return string.charAt(1).toUpperCase() + string.slice(2);
	};

	componentDidMount() {
		var getLayoutMode = localStorage.getItem('layoutMode');
		this.props.changeLayoutMode(getLayoutMode);
		if (getLayoutMode) {
			this.props.changeLayoutMode(getLayoutMode);
		} else {
			// this.props.changeLayoutMode(this.props.layout.layoutMode);
		}

		let currentage = this.capitalizeFirstLetter(this.props.location.pathname);

		//set document title according to page path name
		document.title = currentage;
	}

	render() {
		return (
			<React.Fragment>
				<div className="layout-wrapper d-lg-flex">
					{/* left sidebar menu */}
					<LeftSidebarMenu />
					{/* render page content */}
					{this.props.children}
				</div>
			</React.Fragment>
		);
	}
}

Index.propTypes = {
	layoutMode: PropTypes.any,
};

const mapStateToProps = state => {
	const { layoutMode } = state.Layout;
	return { layoutMode };
};

export default withRouter(
	connect(mapStateToProps, { changeLayoutMode })(Index)
);

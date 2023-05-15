import React, { Component } from 'react';
import { Input, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { request, staffname } from '../../services/utilities';
//use sortedContacts variable as global variable to sort contacts
let sortedContacts = [
	{
		group: 'A',
		children: [{ id: 0, name: 'Demo' }],
	},
];

class SelectContact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contacts: this.props.contacts,
			all_contacts: [],
		};
		this.fetchContacts = this.fetchContacts.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			this.setState({
				contacts: this.props.contacts,
			});
		}
	}
	async fetchContacts() {
		try {
			const url = `hr/staffs?page=1&limit=200`;
			const rs = await request(url, 'GET', true);
			let data = rs.result.reduce((r, e) => {
				try {
					let group = e.first_name[0].toUpperCase();
					if (!r[group]) r[group] = { group, children: [e] };
					else r[group].children.push(e);
				} catch (error) {
					console.log(error);
					return sortedContacts;
				}
				return r;
			}, {});
			let result = Object.values(data);
			result.sort(function (a, b) {
				return a.group.localeCompare(b.group);
			});
			this.setState({ all_contacts: result });
			sortedContacts = result;
		} catch (err) {
			console.log(err);
		}
	}

	componentDidMount() {
		this.fetchContacts();
	}

	componentWillUnmount() {
		this.fetchContacts();
	}

	render() {
		const { all_contacts } = this.state;
		return (
			<React.Fragment>
				{all_contacts.map((contact, key) => (
					<div key={key}>
						<div className="p-3 font-weight-bold text-primary">
							{contact.group}
						</div>

						<ul className="list-unstyled contact-list">
							{contact.children.map((child, keyChild) => (
								<li key={keyChild}>
									<div className="form-check">
										<Input
											type="checkbox"
											className="form-check-input"
											onChange={e => this.props.handleCheck(e, child.id)}
											id={'memberCheck' + child.id}
											value={child.name}
										/>
										<Label
											className="form-check-label"
											htmlFor={'memberCheck' + child.id}
										>
											{staffname(child)}
										</Label>
									</div>
								</li>
							))}
						</ul>
					</div>
				))}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	const { contacts } = state.Chat;
	return { contacts };
};

export default connect(mapStateToProps, {})(SelectContact);

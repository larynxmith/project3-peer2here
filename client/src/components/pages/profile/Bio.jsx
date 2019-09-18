import React from 'react'
import axios from 'axios';
import BioEdit from './BioEdit';
import BASE_URL from '../../../constants';

class Bio extends React.Component {
	state = {
		currentTab: 'bio'
	}

	editBio = (e) => {
		// Take me to the BioEdit component
		this.setState({
		  currentTab: 'editBio'
		})
	  }
	
	updateBio = (text) => {
	let body = {
		bio: text
	}
	// Save the new bio into the users db credentials
	axios.put(`${BASE_URL}/profiles/${this.props.user._id}`, body, {
		headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
	})
		.then(response => {
		console.log(response);
		// saving the new token so that the user's edits will be rendered
		localStorage.setItem('authToken', response.data.token);
		this.props.updateUser();

		// Go back to the Bio component that just shows the text
		this.setState({
			currentTab: 'bio'
		})
		console.log("All done master!")
		})
	}

	render () {
		let content;
		let button;

		switch (this.state.currentTab) {
			case 'bio':
			  content = this.props.user.bio
			  button = <button onClick={this.editBio}>Edit</button>
			  break;
			case 'editBio':
			  content = <BioEdit value={this.props.user ? this.props.user.bio : ''} updateBio={this.updateBio} />
			  break;
			default:
			  content = <div>You should not get here - check spelling</div>
		  }

		return (
			<div>
				<h2>Bio</h2>
				<div>
					{content}
				</div>
				{button}
			</div>
		)
	}
}

export default Bio
import React from 'react'
import { render } from 'react-dom'

// Component

var SearchForm = React.createClass({
	getInitialState: function() {
		return {value: ''};
	},
	handleChange: function(event) {
		this.props.onChangeSearch( event.target.value );
		this.setState({value: event.target.value});
	},
	render: function() {
		return (
			<div className="searchForm text-center">
				<input
					type="text"
					className="form-control"
					placeholder="Search"
					value={this.state.value}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
});

module.exports = SearchForm;

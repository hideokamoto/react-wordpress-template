// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

// Component
var Head = React.createClass({
	render: function() {
		return(
			<div className="site-title container">
				<h1>
					<a href={this.props.data.url}>{this.props.data.name}</a>
				</h1>
				<p>{this.props.data.description}</p>
			</div>
		);
	}
});

var Header = React.createClass({
	loadPostsFromServer: function() {
		$.ajax({
			url: this.props.apiPath,
			dataType: 'json',
			cache: false,
			success: function(data) {
				console.log(data);
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {
			data: []
		};
	},
	componentDidMount: function() {
		this.loadPostsFromServer();
	},
	render: function() {
		return (
			<Head data={this.state.data} />
		);
	}
});

module.exports = Header;

// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

// Component
var Title = React.createClass({
	render: function() {
		return(
			<div className="intro title">
				<h1 className="site-title">{this.props.data.name}</h1>
				<p className="site-description">{this.props.data.description}</p>
			</div>
		);
	}
});

var Intro = React.createClass({
	loadPostsFromServer: function() {
		$.ajax({
			type: "GET",
			url: this.props.apiPath,
			dataType: 'json',
			cache: false,
			success: function(data) {
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
			<Title data={this.state.data} />
		);
	}
});

module.exports = Intro;

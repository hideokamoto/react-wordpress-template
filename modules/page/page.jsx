import React from 'react'
import { render } from 'react-dom'

// Component
var Single = React.createClass({
	getPostContent: function() {
		if ( ! this.props.postData ) {
			var content  = {
				title: { rendered : 'Loading...' },
				content: { rendered : '' },
				date: ''
			};
		} else {
			var content = this.props.postData;
			content['date'] = new Date(content.date_gmt).toLocaleDateString();
		}
		return content;
	},
	render: function() {
		var post = this.getPostContent();
		return (
			<div className="postList contentInner">
				<h3 className="postTitle page-header">{post.title.rendered}</h3>
				<p>{post.date}</p>
				<div dangerouslySetInnerHTML={{__html: post.content.rendered}} />
			</div>
		);
	}
});

var Page = React.createClass({
	loadPostsFromServer: function() {
		var apiPath = this.props.apiPath + 'pages/' + this.props.ID + '?_embed';
		$.ajax({
			type: "GET",
			url: apiPath,
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
			data: false
		};
	},
	componentDidMount: function() {
		this.loadPostsFromServer();
	},
	render: function() {
		return (
			<Single postData={this.state.data} />
		);
	}
});

module.exports = Page;

import React from 'react'
import { render } from 'react-dom'
import { Router, Link } from 'react-router'

// Component
var Single = React.createClass({
	getPostContent: function() {
		if ( ! this.props.postData ) {
			var content  = {
				title: {
					rendered : 'Loading...'
				},
				content: {
					rendered : ''
				}
			};
		} else {
			var content = this.props.postData;
		}
		return content;
	},
	render: function() {
		var post = this.getPostContent();
		return (
			<div className="postList contentInner">
				<h3 className="postListTitle">{post.title.rendered}</h3>
				<div dangerouslySetInnerHTML={{__html: post.content.rendered}} />
			</div>
		);
	}
});

var PostSingle = React.createClass({
	mixins: [ Router.State ],
	loadPostsFromServer: function() {
		$.ajax({
			type: "GET",
			url: this.props.apiPath + 'posts?filter[name]=' + this.props.slug,
			dataType: 'json',
			success: function(data) {
				this.setState({data: data[0]});
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

module.exports = PostSingle;

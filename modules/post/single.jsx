import React from 'react'
import { render } from 'react-dom'
import { Router, Link } from 'react-router'

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
		console.log(post);
		return (
			<div className="postList contentInner">
				<h3 className="postTitle page-header">{post.title.rendered}</h3>
				<p>{post.date}</p>
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
			url: this.props.apiPath + 'posts?_embed&filter[name]=' + this.props.slug,
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

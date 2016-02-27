import React from 'react'
import { render } from 'react-dom'
import { Router, Link } from 'react-router'

// Component
var Single = React.createClass({
	getTermData: function() {
		if ( ! this.hasTerm() ) {
			return '';
		}
		var termNodes = this.props.postData['_embedded']['https://api.w.org/term'][1].map(function ( term ) {
			var termPath = '/tag/' + term.slug;
			return (
				<Link to={{ pathname: termPath }} className="termItem">
					{term.name}
				</Link>
			);
		});
		return termNodes;
	},
	hasTerm: function() {
		if ( ! this.props.postData['_embedded']['https://api.w.org/term'] ) {
			return false;
		}
		return true;
	},
	getPostContent: function() {
		if ( ! this.props.postData ) {
			var content  = {
				title: { rendered : 'Loading...' },
				content: { rendered : '' },
				terms: 'No Tags',
				date: ''
			};
		} else {
			var content = this.props.postData;
			content['date'] = new Date(content.date_gmt).toLocaleDateString();
			content['terms'] = this.getTermData();
		}
		return content;
	},
	render: function() {
		var post = this.getPostContent();
		return (
			<div className="postList contentInner">
				<h3 className="postTitle page-header">{post.title.rendered}</h3>
				<p>{post.date}</p>
				<p>Tags: {post.terms}</p>
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
			cache: false,
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

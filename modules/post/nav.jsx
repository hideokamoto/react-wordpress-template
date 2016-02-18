import React from 'react'
import { render } from 'react-dom'

// Component
var PostNav = React.createClass({
	nextPage: function() {
		var page = this.props.page + 1;
		var next = {
			page : page,
			per_page : this.props.perPage * page
		}
		this.props.onClickNextPage( next );
	},
	render: function() {
		return (
			<a className="archiveNext page-header postList" onClick={this.nextPage}>
				<h3>Lead More {this.props.perPage} Posts</h3>
			</a>
		);
	}
});

module.exports = PostNav;

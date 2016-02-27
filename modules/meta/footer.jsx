// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

// Component
var FooterMenu  = require('./menu.jsx');
const CopyRight = React.createClass({
	render: function() {
		return (
			<div className="copyright">
				 Copyright 2016 WP-Kyoto All Rights Reserved.
			</div>
		);
	}
});
var Footer = React.createClass({
	render: function() {
		var menuAPI = this.props.apiPath + 'wp-api-menus/v2/';
		//var footerMenuApi = menuAPI + 'menu-locations/menu-api';
		var footerSubMenuApi = menuAPI + 'menu-locations/sub-menu-api';
		return (
			<div className="footer">
				<FooterMenu apiPath={footerSubMenuApi} prefix='footer'/>
				<div className="footerSubMenuList" >
					<p className="footerSubMenuItem" href="http://wp-kyoto.net/about/">React Themeのテスト中・・・</p>
				</div>
				<CopyRight />
			</div>
		);
	}
});

module.exports = Footer;

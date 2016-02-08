// Define
var rootAPI = 'http://wp-kyoto.net/wp-json/wp/v2/';

// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

//Load Component
var Header = require('../modules/meta/header.jsx');
var Archive = require('../modules/post/archive.jsx');

// Render
ReactDOM.render(
	<Header apiPath={rootAPI}/>,
	document.getElementById('header')
);

ReactDOM.render(
	<Archive apiPath={rootAPI}/>,
	document.getElementById('content')
);

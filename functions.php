<?php
/**
 * Enqueue scripts and styles.
 */
add_theme_support('title-tag');
function oribe_scripts() {
	wp_enqueue_style( 'oribe-bootstrap', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
	wp_enqueue_style( 'oribe-style', get_stylesheet_uri() );
	wp_deregister_script('jquery');
	wp_enqueue_script( 'jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js', array(), '20151228' );
	wp_enqueue_script( 'oribe-scripts', get_template_directory_uri() .'/app.js' , array(), '20151228', true );
}
add_action( 'wp_enqueue_scripts', 'oribe_scripts' );

function oribe_get_helper_scripts() {
	$root = get_home_url();
	$rootApi = path_join( $root, 'wp-json/' );
	$term = $id = $pageType = '';
	if ( is_404() ) {
		$pageType = '404';
	} elseif ( is_home() ) {
		$pageType = 'home';
	} elseif ( is_singular() ) {
		$id = get_the_ID();
		if( is_single() ) {
			$pageType = 'post';
		} elseif ( is_page() ) {
			$pageType = 'page';
		}
	} elseif ( is_archive() ) {
		$pageType = 'archive';
		$term = get_queried_object()->slug;
		if ( is_tag() ) {
			$pageType = 'tag';
		} elseif ( is_category() ) {
			$pageType = 'category';
		}
	}
	$script  = '<script>';
	$script .= "var rootUrl = '{$root}';";
	$script .= "var rootAPI = '{$rootApi}';";
	$script .= "var pageType = '{$pageType}';";
	$script .= "var termType = '{$term}';";
	$script .= "var ID = '{$id}';";
	$script .= '</script>';
	echo $script;
}

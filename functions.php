<?php
/**
 * Enqueue scripts and styles.
 */
function oribe_scripts() {
	wp_enqueue_style( 'oribe-bootstrap', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
	wp_enqueue_style( 'oribe-style', get_stylesheet_uri() );
	wp_deregister_script('jquery');
	wp_enqueue_script( 'jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js', array(), '20151228' );
	wp_enqueue_script( 'oribe-scripts', get_template_directory_uri() .'/app.js' , array(), '20151228', true );
}
add_action( 'wp_enqueue_scripts', 'oribe_scripts' );

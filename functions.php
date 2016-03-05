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

add_action( 'after_setup_theme', 'oribe_register_menu_for_api' );
function oribe_register_menu_for_api() {
	register_nav_menu( 'menu-api', 'For WP API MENU' );
	register_nav_menu( 'sub-menu-api', 'For WP API SUB MENU' );
	register_nav_menu( 'glob-api', 'For WP API GLOB MENU' );
}

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


add_action( 'admin_init', 'oribe_check_plugins' );
function oribe_check_plugins (){
	$messages = false;
	if ( ! oribe_is_activate_plugins( 'rest-api/plugin.php' ) ) {
		$messages[] = sprintf(
			__( 'This Theme need %s Plugin.' , 'oribe' ),
			sprintf(
				'<a href="%s">WP REST API(Version2)</a>',
				__( 'https://wordpress.org/plugins/rest-api/', 'oribe' )
			)
		);
	}
	if ( ! oribe_is_activate_plugins( 'wp-api-menus/wp-api-menus.php' ) ) {
		$messages[] = sprintf(
			__( 'This Theme need %s Plugin.' , 'oribe' ),
			sprintf(
				'<a href="%s">WP API Menus</a>',
				__( 'https://wordpress.org/plugins/wp-api-menus/faq/', 'oribe' )
			)
		);
	}
	if ( $messages ) {
		$html  = "<div class='error'><ul>";
		foreach ( $messages as $message ) {
			$html .= "<li>{$message}</li>";
		}
		$html .= '</ul></div>';
		echo $html;
	}
}

function oribe_is_activate_plugins( $plugin ) {
	$activePlugins = get_option('active_plugins');
	if ( ! array_search( $plugin, $activePlugins ) && file_exists( WP_PLUGIN_DIR. '/'. $plugin ) ) {
		return false;
	} else {
		return true;
	}
}

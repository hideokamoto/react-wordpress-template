<!DOCTYPE html>
<html <?php language_attributes();?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
		<?php wp_head();?>
		<style>
		* { max-width: 100%;height: auto;}
		</style>
		<script>
		<?php
		$root = get_home_url();
		$rootApi = path_join( $root, 'wp-json/' );
		$id = $pageType = '';
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
			//@TODO:カテゴリ・タグアーカイブの処理
			$pageType = 'archive';
		}
		$script = '';
$script = <<<EOM
var rootUrl = "$root";
var rootAPI = "$rootApi";
var pageType = "$pageType";
var ID = "$id";
EOM;
		echo $script;
		?>
		</script>
	</head>
	<body <?php body_class() ;?>>
		<div id="app" class="fullHeight">
		</div>
		<?php wp_footer();?>
	</body>
</html>

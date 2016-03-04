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
		$rootApi = path_join( get_home_url(), 'wp-json/' );
		$script = '';
$script = <<<EOM
var rootAPI = "$rootApi";
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

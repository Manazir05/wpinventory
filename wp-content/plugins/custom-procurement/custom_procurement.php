<?php
/**
 * @package custom procurement
 */
/*
Plugin Name: Custom Procurement System
Plugin URI: https:
Description: A Custom plugin for further functionality support to Custom post/field UI
Version: 1.0
Author: dev-Manazir
Author URI: https://github.com/manazirmustafa/
License: GPLv2 or later
Text Domain: cps
*/

// Make sure we don't expose any info if called directly
if ( !function_exists( 'add_action' ) ) {
	echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
	exit;
}

define( 'PROCUREMENT_VERSION', '1.0' );
define( 'PROCUREMENT__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );


require_once( PROCUREMENT__PLUGIN_DIR . 'column_customize.php' );
include_once( ABSPATH . "wp-config.php");
include_once( ABSPATH . "wp-includes/wp-db.php");

//add_action("wp_head", array('Custom_Column', 'smashing_filter_posts_columns') );


add_filter( 'manage_requisitions_posts_columns', array('Custom_Column', 'cps_filter_posts_columns') );
add_action( 'manage_requisitions_posts_custom_column', array('Custom_Column', 'cps_fill_posts_columns'), 10, 2);
add_filter( 'acf/prepare_field/name=requisition_id', array('Custom_Column','cps_acf_read_only_field'), 10 , 2 );




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
require_once( PROCUREMENT__PLUGIN_DIR . 'custom_api.php' );
include_once( ABSPATH . "wp-config.php");
include_once( ABSPATH . "wp-includes/wp-db.php");



add_filter( 'manage_requisitions_posts_columns', array('Custom_Column', 'cps_filter_posts_columns') );
add_action( 'manage_requisitions_posts_custom_column', array('Custom_Column', 'cps_fill_posts_columns'), 10, 2);
add_filter( 'acf/prepare_field/name=requisition_id', array('Custom_Column','cps_acf_read_only_field'), 10 , 2 );

add_action( 'init', array('Custom_Api','add_requisitions_to_json_api'));
add_action( 'init',  array('Custom_Column','cps_custom_post_status'));
// Using jQuery to add it to post status dropdown
add_action('admin_footer-edit.php',array('Custom_Column','my_custom_status_add_in_quick_edit'));
add_action('admin_footer-post.php', array('Custom_Column','my_custom_status_add_in_post_page'));
add_action('admin_footer-post-new.php', array('Custom_Column','my_custom_status_add_in_post_page'));

add_filter('rest_route_for_post', array('Custom_Api','my_plugin_rest_route_for_post'), 10, 2 );
add_action('rest_api_init', array('Custom_Api','custom_procurement_register_api_endpoints') );
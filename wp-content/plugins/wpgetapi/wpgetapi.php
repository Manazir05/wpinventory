<?php
/**
 * Plugin Name: WPGetAPI
 * Plugin URI:  https://wordpress.org/plugins/wpgetapi/
 * Description: A plugin to connect to and get data from external REST API's.
 * Author: wpgetapi
 * Author URI:  https://wpgetapi.com/
 * Version: 1.3.3
 * Text Domain: wpgetapi
 * Domain Path: /languages/
 * License: GPL2 or later
 * 
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Main Class.
 *
 * @since 1.0.0
 */
final class WpGetApi {

	/**
	 * @var The one true instance
	 * @since 1.0.0
	 */
	protected static $_instance = null;

	public $version = '1.3.3';

	/**
	 * Main Instance.
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * Throw error on object clone.
	 *
	 * @since 1.0.0
	 * @access protected
	 * @return void
	 */
	public function __clone() {
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'wpgetapi' ), '1.0.0' );
	}

	/**
	 * Disable unserializing of the class.
	 * @since 1.0.0
	 */
	public function __wakeup() {
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'wpgetapi' ), '1.0.0' );
	}

	/**
	 * 
	 * @since 1.0.0
	 */
	public function __construct() {

		$this->define_constants();
		$this->includes();

		do_action( 'wpgetapi_loaded' );
	}

	/**
	 * Define Constants.
	 * @since  1.0.0
	 */
	private function define_constants() {
		$this->define( 'WPGETAPIDIR',plugin_dir_path( __FILE__ ) );
		$this->define( 'WPGETAPIURL',plugin_dir_url( __FILE__ ) );
		$this->define( 'WPGETAPIBASENAME', plugin_basename( __FILE__ ) );
		$this->define( 'WPGETAPIVERSION', $this->version );
	}

	/**
	 * Define constant if not already set.
	 * @since  1.0.0
	 */
	private function define( $name, $value ) {
		if ( ! defined( $name ) ) {
			define( $name, $value );
		}
	}


	/**
	 * Include required files.
	 * @since  1.0.0
	 */
	public function includes() {
		
		require_once ( WPGETAPIDIR . '/lib/cmb2/init.php' );

		include_once ( WPGETAPIDIR . 'includes/class-encryption.php' );
		include_once ( WPGETAPIDIR . 'includes/class-admin-options.php' );
		
		include_once ( WPGETAPIDIR . 'includes/functions.php' );
		include_once ( WPGETAPIDIR . 'includes/class-enqueues.php' );
		include_once ( WPGETAPIDIR . 'includes/class-api.php' );

		include_once ( WPGETAPIDIR . 'frontend/functions.php' );
		
	}

}


/**
 * Run the plugin.
 */
function WpGetApi() {
	return WpGetApi::instance();
}
WpGetApi();
<?php
/**
 * Settings Required
 *
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! class_exists( 'WpGetApi_Admin_Options' ) ) :

/**
 * CMB2 Theme Options
 * @version 0.1.0
 */
class WpGetApi_Admin_Options {
	
	/**
	 * Array of metaboxes/fields
	 * @var array
	 */
	public $option_metabox = array();

	/**
	 * Array of metaboxes/fields
	 * @var array
	 */
	public $metabox_id = '';

	/**
	 * Options Page title
	 * @var string
	 */
	protected $title = '';

	/**
	 * Options Page title
	 * @var string
	 */
	protected $menu_title = '';

	/**
	 * Options Tab Pages
	 * @var array
	 */
	public $options_pages = array();

	/**
	 * Holds an instance of the object
	 *
	 * @var Myprefix_Admin
	 **/
	private static $instance = null;

	/**
	 * Constructor
	 * @since 0.1.0
	 */
	private function __construct() {
		// Set our title
		$this->menu_title = __( 'WPGetAPI', 'wpgetapi' );
		$this->title = __( 'WPGetAPI', 'wpgetapi' );
	}

	/**
	 * Returns the running object
	 *
	 * @return Myprefix_Admin
	 **/
	public static function get_instance() {
		if( is_null( self::$instance ) ) {
			self::$instance = new self();
			self::$instance->hooks();
		}
		return self::$instance;
	}
	
	/**
	 * Initiate our hooks
	 * @since 0.1.0
	 */
	public function hooks() {
		add_action( 'admin_init', array( $this, 'init' ) );
		add_action( 'admin_menu', array( $this, 'add_options_pages' ) );

		add_action( 'cmb2_init', array( $this, 'init_custom_fields' ) );
	}

	public function init_custom_fields() {
		require_once WPGETAPIDIR . 'includes/class-fields.php';
		WpGetApi_Parameter_Field::init_parameter();
	}

	/**
	 * Register our setting to WP
	 * @since  0.1.0
	 */
	public function init() {
		$option_tabs = self::option_fields();
		foreach ($option_tabs as $index => $option_tab) {
			register_setting( $option_tab['id'], $option_tab['id'] );
		}
	}


	/**
	 * Get our saved API's from setup
	 * @since  0.1.0
	 */
	public function get_apis() {

		$setup = get_option( 'wpgetapi_setup' );

		if( empty( $setup ) || ! isset( $setup['apis'] ) || empty( $setup['apis'] ) )
			return;

		return $setup['apis'];

	}


	/**
	 * Add the options metabox to the array of metaboxes
	 * @since  0.1.0
	 */
	public function option_fields() {

		//Only need to initiate the array once per page-load
		if ( ! empty( $this->option_metabox ) ) {
			return $this->option_metabox;
		}

		// sale tab
		$option_metabox[] = array(
			'title'      => __( 'Setup', 'wpgetapi' ), 
			'menu_title' => __( 'Setup', 'wpgetapi' ),
			'id'         => 'wpgetapi_setup',
			'desc'       => __( 'Add the details of your API(s) below and hit the Save button.', 'wpgetapi' ),
			'show_on'    => array( 'key' => 'options-page', 'value' => array( 'setup' ), ),
			'show_names' => true,
			'fields'     => $this->setup_fields(),
		);

		// get our saved API's and create as tabs
		if( $this->get_apis() ) {

			foreach ( $this->get_apis() as $index => $api ) {
				
				$name 		= isset( $api['name'] ) && $api['name'] != '' ? sanitize_text_field( $api['name'] ) : 'API ' . absint( $index );
				$api_id 	= isset( $api['id'] ) && $api['id'] != '' ? sanitize_text_field( $api['id'] ) : $name;
				$metabox_id = strtolower( str_replace( '-', '_', sanitize_file_name( 'wpgetapi-' . $api_id ) ) );
				$base_url 	= isset( $api['base_url'] ) && $api['base_url'] != '' ? esc_url_raw( $api['base_url'], array( 'http', 'https' ) ) : '';
				$type 		= isset( $api['auth_type'] ) && $api['auth_type'] != '' ? sanitize_text_field( $api['auth_type'] ) : '';

				// tab
				$option_metabox[] = array(
					'title'      => $name,
					'menu_title' => $name,
					'id'         => $metabox_id,
					'desc'       => '',
					'show_on'    => array( 'key' => 'options-page', 'value' => array( $metabox_id ), ),
					'show_names' => true,
					'fields'     => $this->api_fields( $type, $api_id, $base_url ),
				);

			}

		}

		return $option_metabox;

	}


	public function setup_fields() {

		$fields[] = array(
		    'id'          => 'apis',
		    'type'        => 'group',
		    'name'        => '',
		    'description' => '',
		    'options'     => array(
		        'group_title'   => __( 'API {#}', 'wpgetapi' ), 
		        'add_button'    => __( 'Add API', 'wpgetapi' ),
		        'remove_button' => __( 'Remove API', 'wpgetapi' ),
		        'sortable'      => true, // beta
		    ),
		    'fields'     => array(
				array(
				    'name' => __( 'API Name', 'wpgetapi' ),
				    'id'   => 'name',
				    'type' => 'text',
				    'attributes' => array( 
				    	'required' => true,
				    	'placeholder' => 'New API Name',
				    ),
				    'desc' => __( 'The name of the API you are connecting to.', 'wpgetapi' ),
				),
				array(
				    'name' => __( 'API ID', 'wpgetapi' ),
				    'id'   => 'id',
				    'type' => 'text',
				    'attributes' => array( 
				    	'required' => true,
				    	'placeholder' => 'new_api_name',
				    ),
				    'desc' => __( 'A unique ID for your API. Once this is set you should not change this value.', 'wpgetapi' ),
				),
				array(
				    'name' => __( 'Base URL', 'wpgetapi' ),
				    'id'   => 'base_url',
				    'type' => 'text',
				    'attributes' => array( 
				    	'required' => true,
				    	'placeholder' => 'https://newapiurl.com',
				    ),
				    'desc' => __( 'The base URL of the API you are connecting to.', 'wpgetapi' ),
				),
				
		    )
		);

		return $fields;

	}


	/**
	 * Site wide info on the current sale.
	 * @return sale info array
	 *
	 */
	public function api_fields( $type = '', $api_id = '', $base_url = '' ) {

		$fields = array();

		$fields[] = array(
		    'name' => __( 'Timeout', 'wpgetapi' ),
		    'id'   => 'timeout',
		    'type' => 'text',
		    'desc' => __( 'Timeout of the API call.', 'wpgetapi' ),
		    'attributes' => array(
		    	'placeholder' => '10'
			),
			'before_row' => '<pre class="url"><span>Base URL: </span>' . $base_url . '</pre>',
		);
		$fields[] = array(
		    'name' => __( 'SSL Verify', 'wpgetapi' ),
		    'id'   => 'sslverify',
		    'type' => 'select',
		    'desc' => __( 'This should normally be set to true. If you are having issues, you can try false.', 'wpgetapi' ),
		    'options' => array(
		    	'1' => 'True',
		    	'0' => 'False'
			),
		);
		
		$endpoint_fields = apply_filters( 'wpgetapi_fields_endpoints', array(
			array(
			    'name' => __( 'Unique ID', 'wpgetapi' ),
			    'id'   => 'id',
			    'type' => 'text',
			    'classes' => 'field-id',
			    'attributes' => array( 
			    	'required' => true,
			    	'placeholder' => 'new_endpoint',
			    ),
			    'desc' => __( 'Choose a unique ID for this endpoint. Once this is set you should not change this value.', 'wpgetapi' ),
			    'before_row' => "
			    <pre class='functions'>
			    	Template Function: </span><span>wpgetapi_endpoint( '" . $api_id . "', '<span class='endpoint_id'></span>', array('debug' => false) );</span><br>
			    	Shortcode: <span>[wpgetapi_endpoint api_id='" . $api_id . "' endpoint_id='<span class='endpoint_id'></span>' debug='false']</span>
			    </pre>
			    ",
			),
			array(
			    'name' => __( 'Endpoint', 'wpgetapi' ),
			    'id'   => 'endpoint',
			    'type' => 'text',
			    'classes' => 'field-endpoint',
			    'attributes' => array( 
			    	'required' => true,
			    	'placeholder' => '/newendpoint',
			    ),
			    'desc' => __( 'The endpoint that will be appended to the base URL to get the data. Include slash at beginning.', 'wpgetapi' ),
			),
			array(
			    'name' => __( 'Method', 'wpgetapi' ),
			    'id'   => 'method',
			    'type' => 'select',
			    'classes' => 'field-method',
			    'attributes' => array( 
			    	'required' => true,
			    ),
			    'options' => array( 
			    	'GET' => 'GET',
			    	'POST' => 'POST',
			    ),
			    'desc' => __( 'The request method for this endpoint.', 'wpgetapi' ),
			),
			array(
			    'name' => __( 'Results Format', 'wpgetapi' ),
			    'id'   => 'results_format',
			    'type' => 'select',
			    'classes' => 'field-results-format',
			    'attributes' => array( 
			    	'required' => true,
			    ),
			    'options_cb' => 'wpgetapi_results_format_options',
			    'desc' => __( 'The format of the results.', 'wpgetapi' ),
			),
			array(
			    'name' => __( 'Query String', 'wpgetapi' ),
			    'id'   => 'query_parameters',
			    'type' => 'parameter',
			    'classes' => 'field-query-parameters',
			    'repeatable' => true,
			    'desc' => __( 'Parameters as name/value pairs that will be appended to the URL. ', 'wpgetapi' ),
			),
			array(
			    'name' => __( 'Headers', 'wpgetapi' ),
			    'id'   => 'header_parameters',
			    'type' => 'parameter',
			    'classes' => 'field-header-parameters',
			    'repeatable' => true,
			    'desc' => __( 'Parameters as name/value pairs that will be included in the header. ', 'wpgetapi' ),
			),
			array(
			    'name' => __( 'Body', 'wpgetapi' ),
			    'id'   => 'body_parameters',
			    'type' => 'parameter',
			    'classes' => 'field-body-parameters',
			    'repeatable' => true,
			    'desc' => __( 'Parameters as name/value pairs that will be included in the POST body fields. Only used when POST method is selected. ', 'wpgetapi' ),
			),
			array(
			    'name' => __( 'JSON Encode Body', 'wpgetapi' ),
			    'id'   => 'body_json_encode',
			    'type' => 'select',
			    'classes' => 'field-body-json-encode',
			    'options'     => array(
			        'true'   => __( 'Yes', 'wpgetapi' ), 
			        'false'    => __( 'No', 'wpgetapi' ),
			    ),
			    'desc' => __( 'Do you want to JSON encode the Body parameters above. ', 'wpgetapi' ),
			),
	    ) );


		$fields[] = array(
		    'id'          => 'endpoints',
		    'type'        => 'group',
		    'name'        => __( 'Endpoints', 'wpgetapi' ), 
		    'description' => '',		    
		    'options'     => array(
		        'group_title'   => __( 'Endpoint {#}', 'wpgetapi' ), 
		        'add_button'    => __( 'Add Endpoint', 'wpgetapi' ),
		        'remove_button' => __( 'Remove Endpoint', 'wpgetapi' ),
		        'sortable'      => true, // beta
		    ),
		    'fields' => $endpoint_fields,
		);
		
		return $fields;
		
	}


	public function add_options_pages() {

		$option_tabs = self::option_fields();

		foreach ($option_tabs as $index => $option_tab) {
			if ( $index == 0) {

				$this->options_pages[] = add_menu_page( $this->title, $this->menu_title, 'manage_options', $option_tab['id'], array( $this, 'admin_page_display' ), 'dashicons-editor-code'
				); //Link admin menu to first tab

				add_submenu_page( $option_tabs[0]['id'], $this->menu_title, $option_tab['menu_title'], 'manage_options', $option_tab['id'], array( $this, 'admin_page_display' ) ); //Duplicate menu link for first submenu page
			} else {
				$this->options_pages[] = add_submenu_page( $option_tabs[0]['id'], $this->menu_title, $option_tab['menu_title'], 'manage_options', $option_tab['id'], array( $this, 'admin_page_display' ) );
			}
		}

		foreach ( $this->options_pages as $page ) {
			// Include CMB CSS in the head to avoid FOUC
			add_action( "admin_print_styles-{$page}", array( 'CMB2_Hookup', 'enqueue_cmb_css' ) );
		}

	}

	/**
	 * Admin page markup. Mmply handled by CMB2
	 * @since  0.1.0
	 */
	public function admin_page_display() {

		$option_tabs = self::option_fields(); //get all option tabs
		$tab_forms = array();
		?>

		<div class="wrap wpgetapi">

			<div class="main_content_cell">

				<h2><?php esc_html_e( $this->title, 'wpgetapi' ) ?></h2>
				<!-- Options Page Nav Tabs -->
				<h2 class="nav-tab-wrapper">
					<?php foreach ($option_tabs as $option_tab) :
						$tab_slug = $option_tab['id'];
						$nav_class = 'nav-tab';
						if ( $tab_slug == $_GET['page'] ) {
							$nav_class .= ' nav-tab-active'; //add active class to current tab
							$tab_forms[] = $option_tab; //add current tab to forms to be rendered
						}
					?>
					<a class="<?php esc_attr_e( $nav_class ); ?>" href="<?php esc_url( menu_page_url( $tab_slug ) ); ?>"><?php esc_attr_e( $option_tab['title'], 'wpgetapi' ); ?></a>
					<?php endforeach; ?>
				</h2>
				<!-- End of Nav Tabs -->

				<?php foreach ($tab_forms as $tab_form) : //render all tab forms (normaly just 1 form) ?>
				
					<div id="<?php esc_attr_e($tab_form['id']); ?>" class="cmb-form group">
						<div class="metabox-holder">
							<div class="pmpbox pad">
								<h3 class="title"><?php esc_html_e($tab_form['title'], 'wpgetapi'); ?></h3>
								<div class="desc"><?php echo wp_kses_post( $tab_form['desc'] ); ?></div>
								<?php cmb2_metabox_form( $tab_form, $tab_form['id'] ); ?>
							</div>
						</div>
					</div>

				<?php endforeach; ?>

			</div>

			<div class="sidebar_cell">
				<div class="box">
					<h3>Help & Tips</h3>
					<p><a target="_blank" href="https://wpgetapi.com/docs">View The Docs</a></p>
					<p>Using the Template Function within your theme is the most flexible option. It does require basic knowledge of PHP.</p>
					<p>Trying to 'echo' the data when using the 'JSON (as array data)' option will result in a PHP warning. You will need to use 'var_dump' instead to see the output.</p>
					<p>Using the Shortcode within a page (or post) becomes more flexible when used in conjunction with our <a target="_blank" href="https://wpgetapi.com/downloads/pro-plugin">WPGetAPI Pro</a> plugin extension.</p>

					<p>You can easily get nested data from the array using our <a target="_blank" href="https://wpgetapi.com/downloads/pro-plugin">WPGetAPI Pro</a> plugin extension using either Shortcode or Template Function.</p>

				</div>
				<div class="box">
					<h3>Contact Us</h3>
					<p>Please <a target="_blank" href="https://wpgetapi.com/">visit our website</a> for any questions, help or feature requests. We are more than happy to help you set up your API.</p>
				</div>
			</div>

		</div>

		<?php

	}

	/**
	 * Public getter method for retrieving protected/private variables
	 * @since  0.1.0
	 * @param  string  $field Field to retrieve
	 * @return mixed          Field value or exception is thrown
	 */
	public function __get( $field ) {
		// Allowed fields to retrieve
		if ( in_array( $field, array( 'key', 'fields', 'title', 'options_pages' ), true ) ) {
			return $this->{$field};
		}
		if ( 'option_metabox' === $field ) {
			return $this->option_fields();
		}
		throw new Exception( 'Invalid property: ' . $field );
	}

}

/**
 * Helper function to get/return the WpGetApi_Admin_Options object
 * @since  0.1.0
 * @return WpGetApi_Admin_Options object
 */
function wpgetapi_admin_options() {
	return WpGetApi_Admin_Options::get_instance();
}

// Get it started
wpgetapi_admin_options();

endif;
<?php

/**
 * Enqueue scripts and styles.
 */
function wpgetapi_admin_scripts_styles() {

    $v = time();

    wp_enqueue_style( 'wpgetapi-style', WPGETAPIURL .'assets/css/wpgetapi-admin.css', false, $v );
    wp_enqueue_script( 'wpgetapi-script', WPGETAPIURL .'assets/js/wpgetapi-admin.js', array( 'jquery' ), $v, true );

}
add_action( 'admin_enqueue_scripts', 'wpgetapi_admin_scripts_styles' );
<?php

class Custom_Menu {
    
    public static function cps_remove_menus_for_demo_user() {
        
        if( is_user_logged_in() ) {
            
            // $user = wp_get_current_user();
            // $roles = $user->roles;

            // check all menu slugs
            //echo '<pre>' . print_r( $GLOBALS[ 'menu' ], TRUE) . '</pre>';
            
            $user_id = get_current_user_id();

            if($user_id == '4') {
                remove_menu_page( 'index.php' );
                remove_menu_page( 'edit.php' );
                remove_menu_page( 'users.php' );
                remove_menu_page( 'upload.php' );
                remove_menu_page( 'post-new.php' );
                remove_menu_page( 'edit.php?post_type=page' );
                remove_menu_page( 'themes.php' );
                remove_menu_page( 'plugins.php' );
                remove_menu_page( 'tools.php' );
                remove_menu_page( 'options-general.php' );
                // plugin generated menus
                remove_menu_page( 'edit.php?post_type=acf-field-group' );
                remove_menu_page( 'cptui_main_menu' );
                remove_menu_page( 'woocommerce' );
                remove_menu_page( 'woocommerce-marketing' );
                remove_menu_page( 'create_roles' );
            }

        } 
    }

}



?>
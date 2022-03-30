<?php


class Custom_Api {


    public static function add_requisitions_to_json_api(){
        global $wp_post_types;
        $wp_post_types['requisitions']->show_in_rest = true;
    }

    public static function procurement_get_all_requisitions() {
        $args = array (
            'post_type' => 'requisitions',
            'post_status' => array('publish', 'pending', 'draft', 'future', 'private', 'inherit', 'trash','req-cancel','approved')
        );
         
        $items = array();
         
        if ( $posts = get_posts( $args ) ) {
            foreach ( $posts as $post ) {

                $product_data = array();

                $products = get_post_meta( $post->ID, 'product_name', true );
                foreach ( $products as $product ) {                
                    if ( ! $product ) {
                        _e( 'n/a' );  
                    } else {
                        $product_data[] = get_the_title( $product );                  
                    }
                }

                $department_meta = get_post_meta( $post->ID, 'department', true );                
                if ( ! $department_meta ) {
                    $department_list =  'n/a'; 
                } else {
                    $department_list = get_terms(
                        array(
                        'term_taxonomy_id' =>  $department_meta,
                        'fields' => 'names'
                        )
                    );
                }

                $items[] = array(
                    'id' => $post->ID,
                    'requisition_id' => get_post_meta( $post->ID , 'requisition_id', true ),
                    'title' => $post->post_title,
                    'author' => get_the_author_meta( 'display_name', $post->post_author ),
                    'products' => $product_data,
                    'departments' => $department_list,
                    'total_number' => get_post_meta( $post->ID, 'total_number', true ),
                    'reason' => get_post_meta( $post->ID, 'reason', true ),
                    'budget' => get_post_meta( $post->ID, 'budget', true ),
                    'details' => get_post_meta( $post->ID, 'details', true ),  
                    'date' => $post->post_date,
                    'requisition_status' => $post->post_status                  
                );
            }
        }
        return $items;
    }

    public static function procurement_by_requisition_id( $data ) {

        $requisition_id = $data['requisition_id'];       
        $items = array();
        $post_id = 0;
        
        global $wpdb; 
        $sql = "SELECT post_id FROM wp_postmeta WHERE meta_key='requisition_id' AND meta_value={$requisition_id} ";
        $results = $wpdb->get_results($sql);
        foreach($results as $result) {
            $post_id = $result->post_id;
        }
        
        $post = get_post( $post_id ); 

        if ( $post && $post->post_type == 'requisitions' ) {            

                $product_data = array();
                $products = get_post_meta( $post->ID, 'product_name', true );
                foreach ( $products as $product ) {                
                    if ( ! $product ) {
                        _e( 'n/a' );  
                    } else {
                        $product_data[] = get_the_title( $product );                  
                    }
                }

                $department_meta = get_post_meta( $post->ID, 'department', true );                
                if ( ! $department_meta ) {
                    $department_list =  'n/a'; 
                } else {
                    $department_list = get_terms(
                        array(
                        'term_taxonomy_id' =>  $department_meta,
                        'fields' => 'names'
                        )
                    );
                }

                $items = array(
                    'id' => $post->ID,
                    'requisition_id' => get_post_meta( $post->ID , 'requisition_id', true ),
                    'title' => $post->post_title,
                    'author' => get_the_author_meta( 'display_name', $post->post_author ),
                    'products' => $product_data,
                    'departments' => $department_list,
                    'total_number' => get_post_meta( $post->ID, 'total_number', true ),
                    'reason' => get_post_meta( $post->ID, 'reason', true ),
                    'budget' => get_post_meta( $post->ID, 'budget', true ),
                    'details' => get_post_meta( $post->ID, 'details', true ), 
                    'date' => $post->post_date                  
                );

                return $items;          
        } else {

            return new WP_Error( 'no_posts', __('No requisition found'), array( 'status' => 404 ) );
        }        

    }

    public static function procurement_requisitions_by_status ( WP_REST_Request $request ) {
        
        $status = $request->get_param( 'status' );
        $args = array (
            'post_type' => 'requisitions',
            'post_status' => $status
        );
         
        $items = array();

        if(in_array($status, get_post_stati()) ) {

            if ( $posts = get_posts( $args ) ) {
                foreach ( $posts as $post ) {
    
                    $product_data = array();
    
                    $products = get_post_meta( $post->ID, 'product_name', true );
                    foreach ( $products as $product ) {                
                        if ( ! $product ) {
                            _e( 'n/a' );  
                        } else {
                            $product_data[] = get_the_title( $product );                  
                        }
                    }
    
                    $department_meta = get_post_meta( $post->ID, 'department', true );                
                    if ( ! $department_meta ) {
                        $department_list =  'n/a'; 
                    } else {
                        $department_list = get_terms(
                            array(
                            'term_taxonomy_id' =>  $department_meta,
                            'fields' => 'names'
                            )
                        );
                    }
    
                    $items[] = array(
                        'id' => $post->ID,
                        'requisition_id' => get_post_meta( $post->ID , 'requisition_id', true ),
                        'title' => $post->post_title,
                        'author' => get_the_author_meta( 'display_name', $post->post_author ),
                        'products' => $product_data,
                        'departments' => $department_list,
                        'total_number' => get_post_meta( $post->ID, 'total_number', true ),
                        'reason' => get_post_meta( $post->ID, 'reason', true ),
                        'budget' => get_post_meta( $post->ID, 'budget', true ),
                        'details' => get_post_meta( $post->ID, 'details', true ),  
                        'date' => $post->post_date,
                        'requisition_status' => $post->post_status,   
                    );
                }
            }
        } else {
            return new WP_Error( 'no_posts', __('No requisition found'), array( 'status' => 404 ) );
        }   

        return $items;
    }


    public static function custom_procurement_register_api_endpoints() {
        register_rest_route( 'custom_procurement/v1', '/requisitions', array(
          'methods' => 'GET',
          'callback' => __CLASS__ . '::procurement_get_all_requisitions',
        ) );
        register_rest_route( 'custom_procurement/v1', '/requisitions/(?P<requisition_id>\d+)', array(
          'methods' => 'GET',
          'callback' => __CLASS__ . '::procurement_by_requisition_id',
        ) );
        register_rest_route( 'custom_procurement/v1', '/requisitions/status=(?P<status>[a-zA-Z-]+)', array(
            'methods' => 'GET',
            'callback' => __CLASS__ . '::procurement_requisitions_by_status',
        ) );
    }
       
      
}
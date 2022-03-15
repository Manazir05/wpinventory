<?php


class Custom_Column {


    public static function cps_filter_posts_columns( $columns ) {
        $columns = array(
            'cb' => $columns['cb'],
            'title' => __( 'Title' ),
            'requisition_id' => __( 'Requisition ID' ),
            'date' => __( 'Published At' ),
            'product_name' => __( 'Product Name' ),
            'total_number' => __( 'Total Number', 'cps' ),
            'department' => __( 'Department', 'cps' ),
            'reason' => __( 'Reason', 'cps' ),
            'budget' => __( 'Budget', 'cps' ),
            'details' => __( 'Details', 'cps' )
          );
        return $columns;
    }


    public static function cps_fill_posts_columns( $column, $post_id ) {
        
        if( $column === 'requisition_id' ) {
            
            $req_id = get_post_meta( $post_id, 'requisition_id', true );

            if ( ! $req_id ) {
                _e( 'n/a' );  
            } else {
                //echo '$ ' . number_format( $price, 0, '.', ',' ) . ' p/m';
                echo '#' .$req_id;
            }
        }

        if( $column === 'details' ) {
            
            $detailed = get_post_meta( $post_id, 'details', true );

            if ( ! $detailed ) {
                _e( 'n/a' );  
            } else {
                //echo '$ ' . number_format( $price, 0, '.', ',' ) . ' p/m';
                echo $detailed;
            }
        }

        if( $column === 'product_name' ) {
            
            // products
            $products = get_post_meta( $post_id, 'product_name', true );

            foreach ( $products as $product ){
                
                if ( ! $product ) {
                    _e( 'n/a' );  
                } else {
                    //produce list if multiple products
                    $post_data = get_post($product);
                    echo $post_data->post_title.' ';
                }
            }
        }

        //total number of products
        if( $column === 'total_number' ) {
            
            // products
            $number = get_post_meta( $post_id, 'total_number', true );

            if ( ! $number ) {
                _e( 'n/a' );  
            } else {
                echo $number;
            }
            
        }

        //reason of requisition
        if( $column === 'reason' ) {
            
            $reason = get_post_meta( $post_id, 'reason', true );

            if ( ! $reason ) {
                _e( 'n/a' );  
            } else {
                echo $reason;
            }
            
        }

        //budget of requisition
        if( $column === 'budget' ) {
            
            $budget = get_post_meta( $post_id, 'budget', true );

            if ( ! $budget ) {
                _e( 'n/a' );  
            } else {
                echo $budget;
            }
            
        }

        //department(s) requesting for requisition
        if( $column === 'department' ) {
            
            // products
            $department_meta = get_post_meta( $post_id, 'department', true );
            //$departments = get_terms( 'department' );

            
            if ( ! $department_meta ) {
                _e( 'n/a' );  
            } else {
                foreach ( $department_meta as $department ) {
                    //echo $department;
                    $dept_data = get_terms(
                        array(
                        'term_taxonomy_id' => $department,
                        'fields' => 'names'
                        )
                    );
                    echo $dept_data[0].' ';
                }              
            }
            
        }
    }


    /**
     * Change ACF field to be read-only.
     *
     * Set requisition ID while making new requisition
     * 
     * @param array $field Field attributes.
     *
     * @return array
     */
    
    public static function cps_acf_read_only_field( $field ) {
        
        global $wpdb;
        global $post;
 
        $sql = "SELECT max(cast(meta_value as unsigned)) as max_req_id FROM wp_postmeta WHERE meta_key='requisition_id' ";
        $results = $wpdb->get_results($sql);
        
        $req_state = get_post($post);
      
        if( $req_state->post_status == "publish" || $req_state->post_status == "draft" ) {
            $field['readonly'] = true;
        } else {            
            foreach ($results as $result) {
                $field['value'] = $result->max_req_id + 1;
                $field['readonly'] = true;	
            }
        }  

        // echo $req_state->post_status;

        return $field;      
    }
      
      
}



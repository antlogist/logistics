<?php 
  $env = file_get_contents ( '../../env.json' );
  $siteEnv = json_decode ( $env, true );
  
  if ( $_GET[ 'order_token' ] ) {
    $order_token = $_GET[ 'order_token' ];
    $api_url = $siteEnv[ 'api_url' ] . '/api/v1/get-order-details?token=' . $siteEnv[ 'api_token' ];
    $data = [ "order_token" => $order_token ];
    $data_string = json_encode ( $data );
    $ch = curl_init ( $api_url );
    curl_setopt ( $ch, CURLOPT_CUSTOMREQUEST, "POST" );
    curl_setopt ( $ch, CURLOPT_POSTFIELDS, $data_string );
    curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
    curl_setopt ( $ch, CURLOPT_HTTPHEADER, [
          'Content-Type: application/json',
          'Content-Length: ' . strlen ( $data_string ) ]
    );
    $result = curl_exec ( $ch );
    $result = json_decode ( $result );

//    echo "<pre>";
//    print_r($result->data);
//    echo "</pre>";
    
    return $result->data;
  }
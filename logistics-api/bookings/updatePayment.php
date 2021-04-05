<?php
// HTTP-headers 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// $session_id = isset($_GET['sessionId']) ? $_GET['sessionId'] : die();

// DB connection and object including
include_once '../config/database.php';

// Calendar object included
include_once '../objects/bookings.php';

// Get DB connection
$database = new Database();
$db = $database->getConnection();

// Object init
$bookings = new Bookings($db);

$bookings->order_token = isset($_GET['order_token']) ? $_GET['order_token'] : die();
$bookings->payment_status = 'Paid';

if ($bookings->update_payment_status()) {
  
  // Set answer code - 200 OK 
  http_response_code(200);
    
  // Success message
  echo json_encode(array("message" => "Record was updated"), JSON_UNESCAPED_UNICODE);
  
} else {
  
  // Set answer code 503. Service unavailable 
  http_response_code(503);
  
  // Error message
  echo json_encode(array("message" => "Record was not updated"), JSON_UNESCAPED_UNICODE);
}


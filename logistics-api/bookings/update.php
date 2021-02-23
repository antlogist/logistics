<?php
// HTTP-headers 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");


$session_id = isset($_GET['sessionId']) ? $_GET['sessionId'] : die();

// DB connection and object including
include_once '../config/database.php';

// Calendar object included
include_once '../objects/bookings.php';

// Get DB connection
$database = new Database();
$db = $database->getConnection();

// Object init
$bookings = new Bookings($db);

$bookings->id = isset($_GET['id']) ? $_GET['id'] : die();
$bookings->status = isset($_GET['status']) ? $_GET['status'] : die();

if ($bookings->update()) {
  
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

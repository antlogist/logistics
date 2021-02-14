<?php
// HTTP headers 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get DB connection
include_once '../config/database.php';

// Calendar object included
include_once '../objects/calendar.php';

// Get DB connection
$database = new Database();
$db = $database->getConnection();

// Object init
$calendar = new Calendar($db);

// Get id
$data = json_decode(file_get_contents("php://input"));

// Set date id
$calendar->date_id = $data->date_id;

// Date deletion
if ($calendar->delete()) {

    // Answer code - 200 ok 
    http_response_code(200);

    // Notification
    echo json_encode(array("message" => "Date was deleted"), JSON_UNESCAPED_UNICODE);
}

// Notify about problem
else {

    // Answer code - 503 Service unavailable 
    http_response_code(503);

    // Notification 
    echo json_encode(array("message" => "Unable to delete entry."));
}
?>
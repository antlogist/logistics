<?php
// HTTP headers 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get DB connection
include_once '../config/database.php';

// Closed object included
include_once '../objects/calendar.php';

$database = new Database();
$db = $database->getConnection();

$calendar = new Calendar($db);
 
// Get sended data
$data = json_decode(file_get_contents("php://input"));
 
// If data is not empty
if (
    !empty($data->date) &&
    !empty($data->date_title)
) {

    // set calendar properties
    $calendar->date = $data->date;
    $calendar->date_title = $data->date_title;

    // Record creation
    if($calendar->create()) {

        // Set answer code - 201 Created 
        http_response_code(201);

        // Notification
        echo json_encode(array("message" => "Record created."), JSON_UNESCAPED_UNICODE);
    }

    // Notify if unsuccessfull 
    else {

        // Set answer code - 503 Service unavailable
        http_response_code(503);

        // Notification 
        echo json_encode(array("message" => "Unable to create entry."), JSON_UNESCAPED_UNICODE);
    }
}

// Notify about empty fields
else {

    // Set answer code - 400 Wrong request
    http_response_code(400);

    // Notification
    echo json_encode(array("message" => "Unable to create entry. Empty fields"), JSON_UNESCAPED_UNICODE);
}
?>
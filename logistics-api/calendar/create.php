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
include_once '../objects/closed.php';

$database = new Database();
$db = $database->getConnection();

$closed = new Closed($db);
 
// Get sended data
$data = json_decode(file_get_contents("php://input"));
 
// If data is not empty
if (
    !empty($data->cal_date) &&
    !empty($data->date_title)
) {

    // set calendar properties
    $closed->cal_date = $data->cal_date;
    $closed->date_title = $data->date_title;

    // Record creation
    if($closed->create()) {

        // Set answer code - 201 Created 
        http_response_code(201);

        // Notification
        echo json_encode(array("message" => "Record created."), JSON_UNESCAPED_UNICODE);
    }

    // Notify if unsuccessfull 
    else {

        // Set answer code - 503 Service unavailable
        http_response_code(503);

        // сообщим пользователю 
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
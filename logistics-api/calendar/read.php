<?php
// HTTP-headers 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// DB connection and object including
include_once '../config/database.php';
include_once '../objects/calendar.php';

// Get DB connection
$database = new Database();
$db = $database->getConnection();

// Object init
$calendar = new Calendar($db);

$calendar->month = isset($_GET['month']) ? $_GET['month'] : die();
 
// Closed dates request
$stmt = $calendar->read();
$num = $stmt->rowCount();

// If records qty more than 0
if ($num>0) {

    // Dates array
    $dates_arr=array();
    $dates_arr["dates"]=array();

    // Get content of the table
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // Row extraction 
        extract($row);

        $date_item=array(
            "date_id" => $date_id,
            "date" => $date,
            "date_title" => html_entity_decode($date_title),
            "month" => $month,
        );

        array_push($dates_arr["dates"], $date_item);
    }

    // Set answer code - 200 OK 
    http_response_code(200);

    // Calendar data output in JSON format
    echo json_encode($dates_arr);
} else {

    // Set answer code 404 
    http_response_code(404);

    // Notification 'Records not found'
    echo json_encode(array("message" => "Records not found"), JSON_UNESCAPED_UNICODE);
}

<?php
// HTTP-headers 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// DB connection and object including
include_once '../config/database.php';
include_once '../objects/closed.php';

// Get DB connection
$database = new Database();
$db = $database->getConnection();

// Object init
$closed = new Closed($db);
 
// Closed dates request
$stmt = $closed->read();
$num = $stmt->rowCount();

// If records qty more than 0
if ($num>0) {

    // Dates array
    $dates_arr=array();
    $dates_arr["records"]=array();

    // Get content of the table
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // Row extraction 
        extract($row);

        $date_item=array(
            "date_id" => $date_id,
            "cal_date" => $cal_date,
            "date_title" => html_entity_decode($date_title),
        );

        array_push($dates_arr["records"], $date_item);
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

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

$bookings->start_date = isset($_GET['start_date']) ? $_GET['start_date'] : die();
$bookings->end_date = isset($_GET['end_date']) ? $_GET['end_date'] : die();
 
// Closed dates request
$stmt = $bookings->read();
$num = $stmt->rowCount();

// If records qty more than 0
if ($num>0) {

    // Dates array
    $orders_arr=array();
    $orders_arr["orders"]=array();

    // Get content of the table
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // Row extraction 
        extract($row);

        $order_item=array(          
          "id" => $id,
          "name" => html_entity_decode($name),
          "phone" => html_entity_decode($phone),
          "email" => html_entity_decode($email),
          "address" => html_entity_decode($address),
          "date" => $date,
          "timeslot" => $timeslot,
          "status" => $status,
        );

        array_push($orders_arr["orders"], $order_item);
    }

    // Set answer code - 200 OK 
    http_response_code(200);

    // Calendar data output in JSON format
    echo json_encode($orders_arr);
} else {

    // Set answer code 404 
    http_response_code(404);

    // Notification 'Records not found'
    echo json_encode(array("message" => "Records not found"), JSON_UNESCAPED_UNICODE);
}

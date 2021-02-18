<?php
class Bookings {

    // Table 'bookings' connection
    private $conn;
    private $table_name = "bookings";
  

    // Object properties
    public $id;
    public $name;
    public $phone;
    public $email;
    public $address;
    public $date;
    public $timeslot;
    public $status;
    public $start_date;
    public $end_date;

    // DB connection constructor
    public function __construct($db){
        $this->conn = $db;
    }

    // Read method
    function read(){

        // Select all of the records
        $query = "SELECT
                    id, name, phone, email, address, date, timeslot, status, orderId
                FROM
                    " . $this->table_name . "
                WHERE
                  date BETWEEN '" . $this->start_date . "' AND '" . $this->end_date . "'
                ORDER BY
                    date DESC";

        // Request preparing
        $stmt = $this->conn->prepare($query);

        // Request execution 
        $stmt->execute();

        return $stmt;
    }
}
?>
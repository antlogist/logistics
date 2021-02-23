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
                  id, name, phone, email, address, date, timeslot, status, order_id, order_token
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
  
  // Update method
  function update() {
    
    // Request for updating the record
    $query = "UPDATE
            " . $this->table_name . "
            SET
                status = ?
            WHERE
                id = ?";
    
      // Request preparing
      $stmt = $this->conn->prepare($query);
    
      // Sanitization 
      $this->status=htmlspecialchars(strip_tags($this->status));
      
      // Parameters binding
      $stmt->bindParam("1", $this->status);
      $stmt->bindParam("2", $this->id);
    
        // Query execution 
        if ($stmt->execute()) {
            return true;
        }

        return false;
  }
}
?>
<?php
class Calendar {

    // Table 'calendar_closed' connection
    private $conn;
    private $table_name = "calendar_closed";
  

    // Object properties
    public $date_id;
    public $date;
    public $date_title;
    public $month;

    // DB connection constructor
    public function __construct($db){
        $this->conn = $db;
    }

    // Read method
    function read(){

        // Select all of the records
        $query = "SELECT
                    date_id, date, date_title, month
                FROM
                    " . $this->table_name . "
                WHERE
                  month = '" . $this->month . "'
                ORDER BY
                    date DESC";

        // Request preparing
        $stmt = $this->conn->prepare($query);

        // Request execution 
        $stmt->execute();

        return $stmt;
    }
  
    function create(){

        // Record query
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    date_id=:date_id, date=:date, date_title=:date_title, month=:month";

        // Query preparation 
        $stmt = $this->conn->prepare($query);

        // Sanitization 
        $this->date=htmlspecialchars(strip_tags($this->date));
        $this->date_title=htmlspecialchars(strip_tags($this->date_title));

        // Parameters binding
        $stmt->bindParam(":date_id", $this->date_id);
        $stmt->bindParam(":date", $this->date);
        $stmt->bindParam(":date_title", $this->date_title);
        $stmt->bindParam(":month", $this->month);

        // Query execution 
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
  
    function delete(){

        // Delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE date_id = ?";

        // Query preparation  
        $stmt = $this->conn->prepare($query);

        // Sanitization 
        $this->date_id=htmlspecialchars(strip_tags($this->date_id));

        // Bind date id for the deletion 
        $stmt->bindParam(1, $this->date_id);

        // Request execution
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?>
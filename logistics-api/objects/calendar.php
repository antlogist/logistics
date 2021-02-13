<?php
class Calendar {

    // Table 'closed' connection
    private $conn;
    private $table_name = "calendar_closed";
  

    // Object properties
    public $date_id;
    public $date;
    public $date_title;

    // DB connection constructor
    public function __construct($db){
        $this->conn = $db;
    }

    // Read method
    function read(){

        // Select all of the records
        $query = "SELECT
                    date_id, date, date_title
                FROM
                    " . $this->table_name . "
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
                    date=:date, date_title=:date_title";

        // Query preparation 
        $stmt = $this->conn->prepare($query);

        // Sanitization 
        $this->date=htmlspecialchars(strip_tags($this->date));
        $this->date_title=htmlspecialchars(strip_tags($this->date_title));

        // Parameters binding
        $stmt->bindParam(":date", $this->date);
        $stmt->bindParam(":date_title", $this->date_title);

        // Query execution 
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?>
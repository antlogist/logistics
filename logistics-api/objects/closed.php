<?php
class Closed {

    // Table 'closed' connection
    private $conn;
    private $table_name = "calendar_closed";
  

    // Object properties
    public $date_id;
    public $cal_date;
    public $date_title;

    // DB connection constructor
    public function __construct($db){
        $this->conn = $db;
    }

    // Read method
    function read(){

        // Select all of the records
        $query = "SELECT
                    date_id, cal_date, date_title
                FROM
                    " . $this->table_name . "
                ORDER BY
                    cal_date DESC";

        // подготовка запроса 
        $stmt = $this->conn->prepare($query);

        // выполняем запрос 
        $stmt->execute();

        return $stmt;
    }
}
?>
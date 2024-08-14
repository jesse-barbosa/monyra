<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

class Conexao {
    protected $conn;

    public function __construct() {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "dbmonyra";

        // Cria conexão
        $this->conn = new mysqli($servername, $username, $password, $dbname);

        // Verifica conexão
        if ($this->conn->connect_error) {
            die("Erro na conexão: " . $this->conn->connect_error);
        }
    }

    public function getConnection() {
        return $this->conn;
    }

    public function close() {
        $this->conn->close();
    }
}
?>

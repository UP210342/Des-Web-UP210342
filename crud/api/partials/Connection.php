<?php

$host = "localhost";
$dbName = "toDoApp;";
$user = "root";
$password = "password";
$protocol = "mysql:host={$host};dbname={$dbName}";
try {
  // Generación de la Conexion a la base de datos
  $conn = new PDO($protocol, $user, $password);
} catch (PDOException $e) {
  die($e->getMessage());
}
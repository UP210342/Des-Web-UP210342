<?php

include "./partials/Connection.php";
$titulo = $_POST['title'];
$idusuario = $_POST['users'];
$idtarea = $_GET['id'];


try {
$agregar = $conn->prepare("update task set title=?, idUser=? where id = ?");
$agregar->execute([$titulo, $idusuario, $idtarea]);


} catch (PDOException $e) {
    die($e->getMessage());
}


//prueba


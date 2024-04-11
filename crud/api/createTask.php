<?php
include "./partials/Connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Verificar si los datos requeridos están presentes y no son nulos
        if (isset($_POST['users'], $_POST['title'])) {
            $userId = $_POST['users'];
            $taskTitle = $_POST['title'];
            $completed = isset($_POST['completed']) ? $_POST['completed'] : 0; // Si 'completed' no está presente, establecerlo en 0
            $sql = "INSERT INTO task (title, idUser, completed) VALUES (?, ?, ?)";
            $state = $conn->prepare($sql);
            $state->execute([$taskTitle, $userId, $completed]);
            $lastInsertId = $conn->lastInsertId();

            echo json_encode(["jaló" => true]);
        } else {
            echo json_encode(["NO jaló" => "Datos incompletos"]);
        }
    } catch (PDOException $e) {
        die($e->getMessage());
    }
}
?>

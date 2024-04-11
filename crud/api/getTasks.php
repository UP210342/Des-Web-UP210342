<?php
include "./partials/Connection.php";
try {
    // Obtener el ID del usuario seleccionado
    $selectedUserId = isset($_GET['userId']) ? $_GET['userId'] : null;

    // Validar que se haya seleccionado un usuario
    if ($selectedUserId) {
        $SQL = "SELECT u.id, u.firstname, t.id, t.title, t.idUser
                FROM user u 
                INNER JOIN task t ON u.id = t.idUser
                WHERE u.id = :selectedUserId;";

        // Preparar la consulta
        $stmt = $conn->prepare($SQL);
        $stmt->bindParam(':selectedUserId', $selectedUserId);
        $stmt->execute();

        $json = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($json, [
                "iduser" => $row['idUser'],
                "name" => $row['firstname'],
                "idtask" => $row['id'],
                "title" => $row['title'],
            ]);
        }

        echo json_encode($json);
    } else {
        echo json_encode(["error" => "No se ha seleccionado un usuario"]);
    }
} catch (PDOException $e) {
    die($e->getMessage());
}
?>

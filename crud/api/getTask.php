<?php

include "./partials/Connection.php";

try{
    $SQL = "select * from `task`;";

    $state = $conn -> query($SQL);

    $json = [];
    while($row = $state->fetch(PDO::FETCH_ASSOC)){
        array_push($json, [
            "id" => $row['id'],
            "title" => $row['title'],
        ]);
    }

    echo json_encode($json);
    
}catch(PDOException $e){
    die($e->getMessage());
}
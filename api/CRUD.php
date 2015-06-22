<?php
session_start();
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$user = 'root';
$password = 'noomi';
try {
    $handler = new PDO('mysql:host=127.0.0.1;dbname=StarApple', $user, $password);
    $handler->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo $e->getMessage();
    die();
}

$data = json_decode(file_get_contents("php://input"));


if(isset($data)){
        if($data->action == "add") {
        $sql = "INSERT INTO vacatures (titel, tekst) VALUES (:titel, :tekst)";
        $query = $handler->prepare($sql);
        $query->execute(array(
            ':titel' => $data->titel,
            ':tekst' => $data->tekst
        ));
        echo "saved!";
    }

    if($data->action == "login"){
        $sql = "SELECT * FROM user WHERE name = :user";
        $query = $handler->prepare($sql);
        $query->execute(array(
            ':user' => $data->username
        ));
        $row = $query->fetch(PDO::FETCH_OBJ);
        
        if(isset($row)){
           if($data->password == $row->password){
                $_SESSION['loggedIn'] = true;
                $respond = array(
                    'loginStatus' => 1
                );  
               echo json_encode($respond);               
           } else {
                $respond = array(
                    'loginStatus' => 0
                );  
               echo json_encode($respond);
           }
        }
    }
}
if($_SESSION['loggedIn']){
    if($data->action == "getVacatures"){
        $sql = "SELECT * FROM vacatures";
        $query = $handler->prepare($sql);
        $query->execute();
        $row = $query->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($row);
    } else if ($data->action == "delVacature"){
        $sql = "DELETE FROM vacatures WHERE id = :id";
        $query = $handler->prepare($sql);
        $query->execute(array(
            ':id' => $data->vacatureId
        ));
        
    } else if($data->action == "editVacature") {
        $sql = "UPDATE vacatures SET titel = :titel, tekst = :tekst WHERE id = :id";
        $query = $handler->prepare($sql);
        $query->execute(array(
            ':titel' => $data->titel,
            ':tekst' => $data->tekst,
            ':id' => $data->id
        ));
    }
}

?>
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: auth");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

try{
    $db = new PDO(
        'mysql:host=localhost;dbname=twitter;charset=utf8',
        'root'
    );    
    $db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(Exception $e){
    die(print_r($e));
}
$json = json_decode(file_get_contents('php://input'), true);
require 'auth.php';

if($authentification){
    if(array_key_exists('other', $_GET) && $_GET['other'] && array_key_exists('content', $_GET) && $_GET['content']){
        $sqlPostMessage = "INSERT INTO `message` (`message_id`, `envoyeur`, `receveur`, `content`, `date_creation`) 
        VALUES (NULL, :userID, :other, :content, current_timestamp())";
        $postMessage = $db->prepare($sqlPostMessage);
        $sqlParams = [
            "userID" => $userId,
            "other" => $_GET['other'],
            "content" => $_GET['content']
        ];
        $postMessage->execute($sqlParams);
        echo 0;
    }
}else{
    echo "Le token fourni via le setRequestHeader est invalide";
}

?>

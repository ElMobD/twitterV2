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
require 'auth.php';

if($authentification){
    $sqlKnowMessage ="SELECT DISTINCT user.*
    FROM user
    WHERE user.user_id IN (
        SELECT envoyeur FROM message WHERE receveur = :id
        UNION
        SELECT receveur FROM message WHERE envoyeur = :id
    ) AND user.user_id <> :id;
    ";
    $knowMessage = $db->prepare($sqlKnowMessage);
    $knowMessage->execute([
        "id" => $userId
    ]);
    $retour = $knowMessage->fetchAll();
    $retour = json_encode($retour);
    echo $retour;
}else{
    echo "ou";
}
?>
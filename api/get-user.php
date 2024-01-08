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
    $sqlGetUser = "SELECT user_id,mail,pseudo,bio,pp_link,identifiant FROM user where user.user_id =:id";
    $getUser = $db->prepare($sqlGetUser);
    $getUser->execute([
        "id" => $userId
    ]);
    $retour = $getUser->fetchAll();
    $retour = json_encode($retour);
    echo $retour;
}
?>
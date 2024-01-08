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
    $sqlGetUserTweet = "SELECT pseudo,mail 
    FROM user JOIN following ON user.user_id=following.followed
    WHERE following.follower=:id";
    $getUserTweet = $db->prepare($sqlGetUserTweet);
    $getUserTweet->execute([
        "id" => $userId
    ]);
    $retour = $getUserTweet->fetchAll();
    $retour = json_encode($retour);
    echo $retour;
}else{
    echo "Le token fourni via le setRequestHeader est invalide";
}
?>

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

    $sqlGetAllTweet = "SELECT tweet.user_id, tweet_id, content, origin_id, img_link, pp_link, pseudo FROM tweet join user on tweet.user_id=user.user_id";
    $getAllTweet = $db->prepare($sqlGetAllTweet);
    $getAllTweet->execute();
    $retour = $getAllTweet->fetchAll();
    $retour = json_encode($retour);
    echo $retour;

?>
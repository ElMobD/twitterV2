<?php
header("Access-Control-Allow-Origin: *");
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

    $sqlGetRamdomTweet = "SELECT tweet.user_id, user.pp_link, tweet_id, content, origin_id, img_link ,user.pseudo
    FROM tweet 
    JOIN user
    on tweet.user_id=user.user_id
    ORDER BY RAND() LIMIT 5";
    $getRamdomTweet = $db->prepare($sqlGetRamdomTweet);
    $getRamdomTweet->execute();
    $retour = $getRamdomTweet->fetchAll();
    $retour = json_encode($retour);
    echo $retour;

?>
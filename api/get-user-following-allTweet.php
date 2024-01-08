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
    $sqlGetUserTweet = "SELECT tweet.user_id, user.pp_link, tweet_id, content, origin_id, img_link ,user.pseudo
    FROM tweet 
    join following on tweet.user_id = following.followed 
    join user on tweet.user_id = user.user_id
    where following.follower =:id ";
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

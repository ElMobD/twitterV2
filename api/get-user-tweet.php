<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: userID");
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

foreach(getallheaders() as $name => $value){
    if($name == "userID"){
        $sqlGetUserTweet = "SELECT user.user_id, tweet_id, content, origin_id, img_link, pseudo, user.pp_link FROM tweet join user on tweet.user_id = user.user_id where user.user_id =:id";
        $getUserTweet = $db->prepare($sqlGetUserTweet);
        $getUserTweet->execute([
            "id" => $value
        ]);
        $retour = $getUserTweet->fetchAll();
        $retour = json_encode($retour);
        echo $retour;
    }
}

    



?>
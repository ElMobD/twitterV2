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



if(array_key_exists('answer', $_GET) && $_GET['answer']){
    $sql = "SELECT pseudo from user 
    join tweet 
    on tweet.user_id = user.user_id
    where tweet.tweet_id = :tweet";
    
    $request = $db->prepare($sql);
    $request->execute([
        "tweet" => $_GET['answer']
    ]);
    $retour = $request->fetchAll();
    $retour = json_encode($retour);
    echo $retour;
    
};



?>

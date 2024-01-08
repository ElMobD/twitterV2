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
        $sqlGetUser = "SELECT user_id,mail,pseudo,bio,pp_link,identifiant FROM user where user.user_id =:id";
    $getUser = $db->prepare($sqlGetUser);
    $getUser->execute([
        "id" => $value
    ]);
    $retour = $getUser->fetchAll();
    $retour = json_encode($retour);
    echo $retour;
    }
}

    



?>
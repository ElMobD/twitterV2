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
        $sqlGetStat = "SELECT 
        (SELECT COUNT(*) FROM following WHERE followed = :id) AS follower,
        (SELECT COUNT(*) FROM following WHERE follower = :id) AS followed
        FROM dual";
        $getStat = $db->prepare($sqlGetStat);
        $getStat->execute([
            "id" => $value
        ]);
        $retour = $getStat->fetchAll();
        $retour = json_encode($retour);
        echo $retour;
    }
}



?>

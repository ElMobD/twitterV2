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

    $sql = "SELECT user_id, mail, pseudo, bio, pp_link, identifiant
    FROM user
    WHERE user_id NOT IN (
      SELECT followed
      FROM following
      WHERE follower = :id
    ) AND user_id != :id
    ";
    $request = $db->prepare($sql);
    $sqlParams = [
        "id" => $userId,
    ];
    $request->execute($sqlParams);
    $retour = $request->fetchAll();
    echo json_encode($retour);
}else{
    echo "Le token fourni via le setRequestHeader est invalide";
}

?>

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

if(array_key_exists('value', $_GET) && $_GET['value']){
    $sql = "SELECT user_id, mail, pseudo, bio, pp_link, identifiant
    FROM user
    WHERE pseudo LIKE '%".$_GET['value']."%'";
    $request = $db->prepare($sql);
    $request->execute();
    $retour = $request->fetchAll();
    echo json_encode($retour);
}
?>

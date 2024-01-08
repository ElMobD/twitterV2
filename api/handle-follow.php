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
$json = json_decode(file_get_contents('php://input'), true);
require 'auth.php';

if($authentification){
    if(array_key_exists('other', $_GET) && $_GET['other'] && array_key_exists('boolean', $_GET)){
        if($_GET['boolean'] === "true"){
            $sql = "DELETE FROM following where follower = :id && followed = :other";
            $request = $db->prepare($sql);
            $sqlParams =[
                "id" => $userId,
                "other" => $_GET['other']
            ];
            $request->execute($sqlParams);
            echo 1;
        }else if($_GET['boolean'] === "false"){
            $sql = "INSERT INTO `following` (`following_id`, `follower`, `followed`) 
            VALUES (NULL, :id, :other)";
            $request = $db->prepare($sql);
            $sqlParams =[
                "id" => $userId,
                "other" => $_GET['other']
            ];
            $request->execute($sqlParams);
            echo 0;
        }
        
    }
}else{
    echo 0;
    //echo "Le token fourni via le setRequestHeader est invalide";
}

?>

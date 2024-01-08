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
    if(array_key_exists('tweet', $_GET) && $_GET['tweet']){
        $sql = "DELETE FROM tweet where tweet_id = :id";
        $request = $db->prepare($sql);
        $sqlParams = [
            "id" => $_GET['tweet']
        ];
        $request->execute($sqlParams);
    }else{
        echo 99;
    }
}else{
    echo 123;
}
?>
        
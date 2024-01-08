<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
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
if($json['pseudo'] != null && $json['password'] != null){
    $sqlUser = 'SELECT pseudo,password,user_id FROM user WHERE pseudo=:pseudo';
    $getUser = $db->prepare($sqlUser);
    $sqlParams = [
    'pseudo' => $json["pseudo"]
    ];
$getUser->execute($sqlParams);
$retour = $getUser->fetchAll();
    if(password_verify($json['password'],$retour[0]['password'])){
        $token = openssl_random_pseudo_bytes(16);
        //Convert the binary data into hexadecimal representation.
        $token = bin2hex($token);
        $sqlInsertToken = 'INSERT INTO `session` (`session_id`, `token`, `user_id`) VALUES (NULL,:token,:user_id);';
        $insertToken = $db->prepare($sqlInsertToken);
        $sqlParams = [
            'token' => $token,
            'user_id' => $retour[0]['user_id'],
        ];
        $insertToken->execute($sqlParams);
        echo json_encode(["token" => $token]); 
    }else{
        echo 222;
    }
}else{
    echo 111;
}
/*
if($json['pseudo'] != null && $json['password'] != null){
    $sqlUser = 'SELECT pseudo,password,user_id FROM user WHERE pseudo=:pseudo && password=:password';
    $getUser = $db->prepare($sqlUser);
    $sqlParams = [
    'pseudo' => $json["pseudo"],
    'password' => $json["password"],
    ];
$getUser->execute($sqlParams);
$retour = $getUser->fetchAll();
    if($retour[0]['pseudo'] == $json['pseudo'] && $retour[0]['password'] == $json['password']){
        $token = openssl_random_pseudo_bytes(16);
        //Convert the binary data into hexadecimal representation.
        $token = bin2hex($token);
        $sqlInsertToken = 'INSERT INTO `session` (`session_id`, `token`, `user_id`) VALUES (NULL,:token,:user_id);';
        $insertToken = $db->prepare($sqlInsertToken);
        $sqlParams = [
            'token' => $token,
            'user_id' => $retour[0]['user_id'],
        ];
        $insertToken->execute($sqlParams);
        echo json_encode(["token" => $token]); 
    }else{
        echo 222;
    }
}else{
    echo 111;
}
*/ 
?>

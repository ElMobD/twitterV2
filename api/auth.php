<?php
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

$authentification = false;
foreach(getallheaders() as $name => $value){
    if($name == "auth"){
        $sqlGetSession = "SELECT * FROM session where token=:token";
        $getSession = $db->prepare($sqlGetSession);
        $leToken = [
            "token" => $value
        ];
        $getSession->execute($leToken);
        $result= $getSession->fetchAll();
        if($result[0]["token"]){
            $authentification = true;
            $userId = $result[0]["user_id"];
        }else {
            echo "token-invalid";
        }
    }
}

?>

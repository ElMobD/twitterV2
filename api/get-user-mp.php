<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: auth, other");
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
foreach(getallheaders() as $name => $value){
    if($name == "other"){
        $test = $value;
    }
}

if($authentification){
    $sqlGetConv = "SELECT message.*, 
        CASE WHEN message.envoyeur = :id THEN true ELSE false END AS sent
        FROM message
        JOIN user AS user1 ON message.envoyeur = user1.user_id
        JOIN user AS user2 ON message.receveur = user2.user_id
        WHERE (message.envoyeur = :id AND message.receveur = :other)
        OR (message.envoyeur = :other AND message.receveur = :id)
        ORDER BY message.date_creation ASC";
    $getConv = $db->prepare($sqlGetConv);
    $sqlParams = [
        "id" => $userId,
        "other" => $test
    ];
    $getConv->execute($sqlParams);
    $retour = $getConv->fetchAll();
    echo json_encode($retour);
}else{
    echo "Le token n'est pas bon frérot.";
}



/*

SELECT message.*, 
       CASE WHEN message.envoyeur = 1 THEN true ELSE false END AS sent
FROM message
JOIN user AS user1 ON message.envoyeur = user1.user_id
JOIN user AS user2 ON message.receveur = user2.user_id
WHERE (message.envoyeur = 1 AND message.receveur = 52)
   OR (message.envoyeur = 52 AND message.receveur = 1)
ORDER BY message.date_creation ASC;


*/

?>




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
        $sql = "SELECT user_id, mail, pseudo, bio, pp_link, identifiant from user 
        join following
        on user.user_id = following.followed
        where :id = following.follower";
    
        $request = $db->prepare($sql);
        $request->execute([
            "id" => $value
        ]);
        $retour = $request->fetchAll();
        $retour = json_encode($retour);
        echo $retour;
    }
}


?>
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


    if(array_key_exists('count', $_GET) && $_GET['count']){
        $sql = "SELECT COUNT(*)as nbrLike from fav where tweet_id = :tweetId";
        $request = $db->prepare($sql);
        $sqlParams = [
            "tweetId" => $_GET['count']
        ];
        $request->execute($sqlParams);
        $retour = $request->fetchAll();
        echo json_encode($retour);
        return;
    }else if(array_key_exists('comment', $_GET) && $_GET['comment']){
        $sql = "SELECT COUNT(*)as nbrComment from tweet where origin_id = :tweetId";
        $request = $db->prepare($sql);
        $sqlParams = [
            "tweetId" => $_GET['comment']
        ];
        $request->execute($sqlParams);
        $retour = $request->fetchAll();
        echo json_encode($retour);
        return;
    }else if(array_key_exists('likeEnable', $_GET) && $_GET['likeEnable']){
        if($_GET['likeEnable'] == "false"){
            require "auth.php";
            if($authentification){
                if(array_key_exists('tweet', $_GET) && $_GET['tweet']){
                    $sql = "INSERT INTO `fav` (`fav_id`, `user_id`, `tweet_id`) 
                    VALUES (NULL, :id, :tweet)";
                    $request = $db->prepare($sql);
                    $sqlParams = [
                        "id" => $userId,
                        "tweet" => $_GET['tweet']
                    ];
                    $request->execute($sqlParams);
                };
            }
        }else if($_GET['likeEnable'] == "true"){
            require "auth.php";
            if($authentification){
                if(array_key_exists('tweet', $_GET) && $_GET['tweet']){
                    $sql = "DELETE FROM `fav` WHERE user_id = :id && tweet_id = :tweet";
                    $request = $db->prepare($sql);
                    $sqlParams = [
                        "id" => $userId,
                        "tweet" => $_GET['tweet']
                    ];
                    $request->execute($sqlParams);
                };
            }
        }
    }else if(array_key_exists('verif', $_GET) && $_GET['verif']){
        require "auth.php";
        if($authentification){
            if(array_key_exists('tweet', $_GET) && $_GET['tweet']){
                $sql = "SELECT * FROM fav WHERE tweet_id = :tweet && user_id = :id";
                $request = $db->prepare($sql);
                $sqlParams = [
                    "id" => $userId,
                    "tweet" => $_GET['tweet']
                ];
                $request->execute($sqlParams);
                $retour = $request->fetchAll();
                echo json_encode($retour);
            };
        }
    }
?>
        
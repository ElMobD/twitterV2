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
    if(isset($_FILES['file'])){
        $destination = "C:/xampp/htdocs/SAE401/image/";
        if (!file_exists($destination)) {
            die(json_encode(33));
        };
        if (!is_writable($destination)) {
            die(json_encode(['message' => 'Le dossier de destination n\'a pas les permissions nécessaires pour écrire des fichiers.']));
        };
        if (!is_uploaded_file($_FILES['file']['tmp_name']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
            die(json_encode(['message' => 'Erreur lors du téléchargement du fichier.']));
        };
        $file_name = $destination . basename($_FILES['file']['name']);
        if (move_uploaded_file($_FILES['file']['tmp_name'], $file_name)) {
            $name = $_FILES['file']['name'];
            if(isset($_POST['content']) && isset($_POST['origin'])){
                if($_POST['origin'] == "false"){
                    $_POST['origin'] = NULL;
                }
                $sqlPostTweet = "INSERT INTO tweet (tweet_id,user_id,content,date_creation, origin_id, img_link) 
                VALUES (NULL, :id,:content, current_timestamp(), :origin, :link)";
                $postTweet = $db->prepare($sqlPostTweet);
                $params = [
                    'id' => $userId,
                    'content' => $_POST["content"],
                    'origin' => $_POST["origin"],
                    'link' => "http://localhost/SAE401/image/".$name
                ];
                $postTweet->execute($params);
                return;
            }
        } else {
            echo json_encode(['message' => 'Erreur lors du téléchargement du fichier.']);
        };

    }else{
        if($json['content'] != null && $json['replied'] != null){
            if($json['replied'] == "NULL"){
                $json['replied'] = NULL;
            }
            $sqlPostTweet = "INSERT INTO tweet (tweet_id,user_id,content,date_creation, origin_id, img_link) 
            VALUES (NULL, :id,:content, current_timestamp(), :replied, NULL)";
            $postTweet = $db->prepare($sqlPostTweet);
            $params = [
                'id' => $userId,
                'content' => $json["content"],
                'replied' => $json["replied"]
            ];
            $postTweet->execute($params);
            return;
        }else {
            echo 333;
        }
    }
}
/*
if(isset($_FILES['file'])){
        $destination = "/Applications/XAMPP/xamppfiles/htdocs/SAE401/image/";
        die(json_encode(33));
    }else{
        if($json['content'] != null && $json['replied'] != null){
            if($json['replied'] == "NULL"){
                $json['replied'] = NULL;
            }
            $sqlPostTweet = "INSERT INTO tweet (tweet_id,user_id,content,date_creation, origin_id, img_link) 
            VALUES (NULL, :id,:content, current_timestamp(), :replied, NULL)";
            $postTweet = $db->prepare($sqlPostTweet);
            $params = [
                'id' => $userId,
                'content' => $json["content"],
                'replied' => $json["replied"]
            ];
            $postTweet->execute($params);
            return;
        }else {
            echo 333;
        }
    }
*/ 
?>

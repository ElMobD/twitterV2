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
$json = file_get_contents('php://input');
require 'auth.php';
if(array_key_exists('profil', $_GET) && $_GET['profil']){
    if($_GET['profil'] == "true"){
        
    }
    if($authentification){
        if(isset($_FILES['file'])) {
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
                $sql = "UPDATE user 
                SET pseudo = :pseudo, 
                bio = :bio,
                pp_link = :link WHERE user_id = :userId ";
                
                $request = $db->prepare($sql);
                
                $sqlParams = [
                    "pseudo" => $_POST['pseudo'],
                    "bio" => $_POST['bio'],
                    "link" => "http://localhost/SAE401/image/".$name,
                    "userId" => $userId
                ];

                //echo json_encode(['message' => $sqlParams]);
                $request->execute($sqlParams);
                
    
            } else {
                echo json_encode(['message' => 'Erreur lors du téléchargement du fichier.']);
            };
        
        } else {
                $sql = "UPDATE user 
                SET pseudo = :pseudo, 
                bio = :bio
                WHERE user_id = :userId ";
                
                $request = $db->prepare($sql);
                
                $sqlParams = [
                    "pseudo" => $_POST['pseudo'],
                    "bio" => $_POST['bio'],
                    "userId" => $userId
                ];

                //echo json_encode(['message' => $sqlParams]);
                $request->execute($sqlParams);
                
        }
    }
}

?>

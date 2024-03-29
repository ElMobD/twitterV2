import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import Tweet from "../components/Tweet";




function Profil({ 
    getUserTweet, 
    userTweet, 
    handleReply , 
    user,
    getUserFollow, 
    token, 
    handleModal, 
    handleEditProfil
}){

    const userID = useParams();
    const navigate = useNavigate();
    const [follower, setFollower] = useState();
    const [followed, setFollowed] = useState();
    const [userProfil, setUserProfil] = useState({});
    const [userFollow, setUserFollow] = useState([]);
    const [isFollowed, setIsFollowed] = useState(false);

    function tableauVide(tableau) {
        if (tableau.length === 0) {
          return true; // le tableau est vide
        } else {
          return false; // le tableau n'est pas vide
        }
    }
    async function asynFollow(token, boolean){
        const response = fetch('http://localhost/SAE401/site/handle-follow.php?other='+userProfil.user_id+'&boolean='+boolean, 
            {
                method: "POST",
                headers: {'auth': token}
            }
        );
        const json = await (await response).json();
        getStat(userID.userID);
    }
    function handleFollow(token, boolean){
        asynFollow(token,boolean);
    }
    async function getStat(userID) {
        const response = await fetch('http://localhost/SAE401/site/get-user-stat.php',{
            method: 'GET',
            headers: {'userID': userID},
        });
        const json = await response.json();
        setFollower(json[0].follower);
        setFollowed(json[0].followed);
    }
    async function getUser(userID) {
        const response = await fetch('http://localhost/SAE401/site/get-user-v2.php',{
            method: 'GET',
            headers: {'userID': userID},
        });
        const json = await response.json();
        setUserProfil(json[0]);
    }
    function handleSub(tab){
        tab.forEach(element => {
            if(element.pseudo === userProfil.pseudo){
                setIsFollowed(true);
            }
        });
    }
    function subV2(){
        if(isFollowed === true){
            setIsFollowed(false);
            handleFollow(token, true);
        }else if(isFollowed === false){
            setIsFollowed(true);
            handleFollow(token, false);
        }
    };
    function getTweetLike(id,callback){
        if(callback){
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = ()=>{
              if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    var reponse = httpRequest.responseText;
                    reponse = JSON.parse(reponse);
                    callback(reponse[0].nbrLike);
                }else{
                    alert("Problème avec la requête");
                }
            }
            };
            httpRequest.open('GET', 'http://localhost/SAE401/site/get-tweet-stat.php?count='+id, true);
            httpRequest.send();
        }
    }
    function getTweetComment(id,callback){
        if(callback){
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = ()=>{
              if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    var reponse = httpRequest.responseText;
                    reponse = JSON.parse(reponse);
                    callback(reponse[0].nbrComment);
                }else{
                    alert("Problème avec la requête");
                }
            }
            };
            httpRequest.open('GET', 'http://localhost/SAE401/site/get-tweet-stat.php?comment='+id, true);
            httpRequest.send();
        }
    }
    useEffect(()=>{
        getUserTweet(userID.userID);
          getStat(userID.userID);
          getUser(userID.userID);
          getUserFollow(token, (json)=>{setUserFollow(json)});
    },[userID.userID]);
    useEffect(()=>{
        handleSub(userFollow);
    },[userFollow]);
    return(
        <>
            <div className="profilpage">
                <div className="header">
                    <div className="banner">
                        <div className="banner-wallpaper">
                            {userProfil.pp_link !== "null" && userProfil.pp_link ? (<div className="pp" style={{ backgroundImage: `url(${userProfil.pp_link})` }}></div>)
                            :(<div className="pp" style={{ backgroundImage: `url(${"/src/ressources/logoEmpty.png"})` }}></div>)}
                        </div>
                    </div>
                    <div className="info">

                        <div className="perso">
                        {userID.userID === user.user_id ? (<button id="isFollow" onClick={()=>{handleEditProfil()}}>Modifier</button>) : (<button id="isFollow" onClick={()=>{
                            if(token){
                                subV2();
                            }else{
                                alert("Veuillez vous connecter");
                                navigate("/login");
                            }
                            }}>{isFollowed ? ("Se désabonner"):("Suivre +")}</button>)}
                            <p id="pseudo">{userProfil.pseudo}</p>
                            <p>{userProfil.identifiant}</p>
                            <p>{userProfil.bio ? (<>{userProfil.bio}</>) : ("Pas de bio")}</p>
                            <div className="foll-ering">
                                <NavLink to={"/profil/"+userID.userID+"/following"}><span>{followed} abonnement</span></NavLink>
                                <NavLink to={"/profil/"+userID.userID+"/follower"}><span>{follower} abonnées</span></NavLink>
                            </div>
                        </div>
                        <div className="post">
                            {userID.userID === user.user_id ? 
                            undefined 
                            : 
                            (<NavLink to={"/message/"+userID.userID}><button>Message</button></NavLink>)}
                        </div>
                    </div>
                </div>
                <div className="userTweet">
                {tableauVide(userTweet) === false ? 
                (userTweet.map((tweet)=>{
                    return <Tweet 
                    key={tweet.tweet_id}
                    tweet={tweet.tweet_id}
                    pseudo={tweet.pseudo}
                    content={tweet.content} 
                    handleReply={handleReply} 
                    user={tweet.user_id}
                    userConn={user}
                    token={token}
                    getTweetLike={getTweetLike}
                    getTweetComment={getTweetComment}
                    img_link={tweet.img_link}
                    pp_link={tweet.pp_link}
                    origin_id={tweet.origin_id}
                    handleModal={handleModal}
                    />
                }) ) : (
                <>
                    <div className="tweetVide">Aucun Tweet</div>
                </>)}
            </div>
            </div>
        </>
    );
}
export default Profil;
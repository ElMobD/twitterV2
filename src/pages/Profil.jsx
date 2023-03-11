import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Tweet from "../components/Tweet";
function Profil({ getUserTweet, userTweet, handleReply , user, getUserFollow, token}){
    const userID = useParams();
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
                        <div className="pp">

                        </div>
                        {userID.userID === user.user_id ? undefined : (<button onClick={subV2}>{isFollowed ? ("Se désabonner"):("Suivre")}</button>)}
                    </div>
                    <div className="info">
                        <div className="perso">
                            <p>{userProfil.pseudo}</p>
                            <p>{userProfil.identifiant}</p>
                            <p>{userProfil.bio}</p>
                            <span>{followed} abonnement</span> <span>{follower} abonnées</span>
                        </div>
                        <div className="post">
                            <button>Tweet</button>
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
                    />;
                }) ) : (
                <>
                    <div>Aucun Tweet</div>
                </>)}
            </div>
            </div>
        </>
    );
}
export default Profil;
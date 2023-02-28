import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tweet from "../components/Tweet";
function Profil({ getUserTweet, userTweet, handleReply }){
    const userID = useParams();
    const [follower, setFollower] = useState();
    const [followed, setFollowed] = useState();
    const [userProfil, setUserProfil] = useState({});
    function tableauVide(tableau) {
        if (tableau.length === 0) {
          return true; // le tableau est vide
        } else {
          return false; // le tableau n'est pas vide
        }
      }
    async function getStat(userID) {
        const response = await fetch('http://localhost/SAE401/site/get-user-stat.php',{
            method: 'GET',
            headers: {'userID': userID},
        });
        const json = await response.json();
        console.log(json[0]);
        setFollower(json[0].follower);
        setFollowed(json[0].followed);
    }
    async function getUser(userID) {
        const response = await fetch('http://localhost/SAE401/site/get-user-v2.php',{
            method: 'GET',
            headers: {'userID': userID},
        });
        const json = await response.json();
        console.log(json[0]);
        setUserProfil(json[0]);
    }
    useEffect(()=>{
        getUserTweet(userID.userID);
          getStat(userID.userID);
          getUser(userID.userID);
    },[]);

    return(
        <>
            <div className="profilpage">
                <div className="header">
                    <div className="banner" onClick={()=>{console.log(userProfil)}}>
                        <div className="pp">

                        </div>
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
                            <button>Message</button>
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
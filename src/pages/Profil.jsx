import { useEffect } from "react";
import Tweet from "../components/Tweet";
function Profil({user, token, getUserTweet, userTweet }){
    function tableauVide(tableau) {
        if (tableau.length === 0) {
          return true; // le tableau est vide
        } else {
          return false; // le tableau n'est pas vide
        }
      }
      
    useEffect(()=>{
        getUserTweet(token);
    },[]);
    return(
        <>
            <div className="profilpage">
                <div className="header">
                    <div className="banner">
                        <div className="pp">

                        </div>
                    </div>
                    <div className="info">
                        <div className="perso">
                            <p>{user.pseudo}</p>
                            <p>{user.bio}
                            </p>
                            <span>200 abonnement</span> <span>200 abonnées</span>
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
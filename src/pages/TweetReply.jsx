import { useEffect, useState } from "react";
import { useParams} from 'react-router-dom';
import Tweet from "../components/Tweet";
import { NavLink } from 'react-router-dom';

function TweetReply({ handleReply,tweetSpawn, token, handleModal}){
    const [userT, setUserT] = useState([]);
    const tweetID = useParams();
    const [reply, setReply] = useState([]);

    function tabVide (tab){
        if(tab.length === 0){
            return true;
        }else{
            return false;
        }
    };
    async function getAllTweet(tweetID){
        const response = await fetch("http://localhost/SAE401/site/get-all-tweet.php",{
            method: 'GET',
        });
        const json = await response.json();
        test(tweetID,json);
    };
    function test(tweetID,reponse){
        var allReply = reponse.filter((replyer)=> replyer.origin_id === tweetID);
        setReply(allReply);
        getUserTweet(tweetID,reponse);
    };
    function getUserTweet(tweetID, reponse){
        var replied = reponse.filter((replieder)=> replieder.tweet_id === tweetID);
        setUserT(replied);
    }
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
    useEffect(()=>{
        getAllTweet(tweetID.tweetID);
    },[tweetID]);
    
    return (
        <>
        <div className="tweetReply">
            <div className="replied">
               <div className="replied-sous">
                <NavLink to={"/profil/"}>
                    <div className="replied-head">
                        <div className="replied-head-pp">
                            {tabVide(userT) === false ? (<div className="the-head-replied-pp" style={{ backgroundImage: `url(${userT[0].pp_link})` }}></div>)
                            :(<div className="the-head-replied-pp" style={{ backgroundImage: `url(${"/src/ressources/logoEmpty.png"})` }}></div>)}
                        </div>
                        <div className="replied-author">
                            {tabVide(userT) === false ? userT[0].pseudo : "Le tableau est vide"}
                        </div>
                    </div>
                </NavLink>
                    <div className="replied-body">
                        <div className="replied-content">
                            {tabVide(userT) === false ? userT[0].content : "Le tableau est vide"}
                        </div>
                        {userT.map((info)=>{
                            return (
                                <div key={info.tweet_id+100}>
                                    {info.img_link ? (<div className="replied-img"></div>):undefined}
                                </div>
                            );
                        })}
                        <div className="replied-actions">
                            <button onClick={()=>{tweetSpawn(userT[0].tweet_id)}}>Répondre</button>
                            <button>Retweet</button>
                            <button>Like</button>
                        </div>
                    </div>
               </div>
            </div>
            <div className="reply">
            {tabVide(reply) !== true ? 
            (reply.map((tweet) =>{
                return <Tweet 
                            key={tweet.tweet_id}
                            tweet={tweet.tweet_id}
                            pseudo={tweet.pseudo}
                            identifiant={tweet.identifiant}
                            content={tweet.content}
                            user={tweet.user_id}
                            img_link={tweet.img_link}
                            token={token}
                            pp_link={tweet.pp_link}
                            getTweetLike={getTweetLike}
                            handleReply={handleReply}
                            handleModal={handleModal}
                        />
            })) : (<>Aucune Réponse à ce Tweet</>)}
            </div>

        </div>
        </>
    );
}
export default TweetReply;

/*

function test(id){
        getAllTweet();
       // var allReply  = allTweets.filter((replyer)=> replyer.origin_id === id);
        //setReply(allReply);
       getTweetReplied(id);
    };
    function getTweetReplied(id){
        console.log(id, allTweets);
        var replied = allTweets.filter((replieder)=> replieder.tweet_id === id);
        console.log(replied);
        setNewReplied(replied);
    };*/
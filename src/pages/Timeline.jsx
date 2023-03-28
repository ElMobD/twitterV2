import { useEffect, useState } from "react";
import Tweet from "../components/Tweet";

function Timeline({tweets, handleReply, token, handleModal}){

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

    return (
        <>
            <div className="homepage">
                {tweets.map((tweet)=>{
                    getTweetLike(tweet);
                    return  <Tweet   
                                key={tweet.tweet_id} 
                                tweet={tweet.tweet_id}
                                pseudo={tweet.pseudo} 
                                identifiant={tweet.identifiant}
                                content={tweet.content}
                                user={tweet.user_id}
                                img_link={tweet.img_link}
                                getTweetLike={getTweetLike}
                                handleReply={handleReply}
                                token={token}
                                handleModal={handleModal}
                            />
                })}
            </div>
        </>
    );
}
export default Timeline;
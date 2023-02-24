import { useEffect, useState } from "react";
import { useParams} from 'react-router-dom';
import Tweet from "../components/Tweet";

function TweetReply({details, allTweets, handleReply}){
    const [newReplied, setNewReplied] = useState(details);
    const tweetID = useParams();
    const [reply, setReply] = useState([]);
    function test(id){
        console.log(newReplied);
        var allReply  = allTweets.filter((replyer)=> replyer.origin_id === id);
        setReply(allReply);
        getTweetReplied(id);
    }
    function tabVide (tab){
        if(tab.length === 0){
            return true;
        }else{
            return false;
        }
    }
    function getTweetReplied(id){
       var replied = allTweets.filter((replieder)=> replieder.tweet_id === id);
       setNewReplied(replied);
    };
    useEffect(()=>{
        test(tweetID.tweetID);
    },[tweetID]);
    
    return (
        <div className="tweetReply">
            <div className="replied">
                <div className="tweetHead">{tabVide(newReplied) === false ? newReplied[0].pseudo : null}</div>
                <div className="content">{ tabVide(newReplied) === false ? newReplied[0].content: null}</div>
                <button>Répondre</button>
            </div>
            <div className="reply">
            {tabVide(reply) !== true ? 
            (reply.map((tweet) =>{
                return <Tweet 
                            key={tweet.tweet_id}
                            tweet={tweet.tweet_id}
                            pseudo={tweet.pseudo}
                            content={tweet.content}
                            handleReply={handleReply}
                        />
            })) : (<>Aucune Réponse à ce Tweet</>)}
            </div>
        </div>
    );
}
export default TweetReply;
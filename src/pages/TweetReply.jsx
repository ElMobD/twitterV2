import { useEffect, useState } from "react";
import { useParams} from 'react-router-dom';
import Tweet from "../components/Tweet";
import ReplyForm from "../components/replyForm";

function TweetReply({details, allTweets, handleReply, postTweet,token}){
    const [newReplied, setNewReplied] = useState(details);
    const [showForm, setShowForm] = useState(false);
    const tweetID = useParams();
    const [reply, setReply] = useState([]);
    function test(id){
        var allReply  = allTweets.filter((replyer)=> replyer.origin_id === id);
        setReply(allReply);
        getTweetReplied(id);
    };
    function tabVide (tab){
        if(tab.length === 0){
            return true;
        }else{
            return false;
        }
    };
    function getTweetReplied(id){
       var replied = allTweets.filter((replieder)=> replieder.tweet_id === id);
       setNewReplied(replied);
    };
    function replySpawn(){
        if(showForm === false){
            setShowForm(true);
        }else if(showForm === true){
            setShowForm(false);
        }
    };
    useEffect(()=>{
        test(tweetID.tweetID);
    },[tweetID]);
    
    return (
        <>
        {showForm ? (<ReplyForm replySpawn={replySpawn} postTweet={postTweet} token={token} repliedID={tweetID}/>):undefined}
        <div className="tweetReply">
            <div className="replied">
                <div className="tweetHead">{tabVide(newReplied) === false ? newReplied[0].pseudo : null}</div>
                <div className="content">{ tabVide(newReplied) === false ? newReplied[0].content: null}</div>
                <button onClick={replySpawn}>Répondre</button>
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
        </>
    );
}
export default TweetReply;
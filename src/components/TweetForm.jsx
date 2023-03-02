import { useState } from 'react';

function TweetForm({tweetSpawn, postTweet, token}){
    const [replyContent, setReplyContent] = useState("");
    const [nbrChar, setNbrChar] = useState(255);

    function handleContent(event){
        setReplyContent(event.target.value);
        countChar(event.target.value.length);
    };
    function countChar(nbr){
        setNbrChar(() =>{
            const bruh = 255 - nbr;
            return bruh;
        })
    };
    function post(){
        postTweet(token, replyContent, false);
        tweetSpawn();
    };
    return (
        <div className="tweet-filtre">
            <div className="tweet-form">
                <div className="tweet-head">
                    <button onClick={tweetSpawn}>X</button>
                </div>
                <div className="tweet-body">
                    <textarea maxLength={255} value={replyContent} placeholder={"Écrivez quelque chose..."} onChange={(event)=>{handleContent(event)}}></textarea>
                    <button onClick={post}>Poster</button> <p>Caractère restant : <span>{nbrChar}</span></p>
                </div>
            </div>
        </div>
    );
};
export default TweetForm;
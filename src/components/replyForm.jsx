import { useState } from "react";

function ReplyForm({replySpawn, token, postTweet, repliedID}){
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
    }
    function postReply(){
        console.log(replyContent);
        console.log(repliedID.tweetID);
        postTweet(token, replyContent,repliedID.tweetID);
        replySpawn();
    }
    return (
        <div className="reply-filtre">
            <div className="reply-form">
                <div className="reply-head">
                    <button onClick={replySpawn}>X</button>
                </div>
                <div className="reply-body">
                    <textarea maxLength={255} value={replyContent} placeholder={"Écrivez quelque chose..."} onChange={(event)=>{handleContent(event)}}></textarea>
                    <button onClick={postReply}>Répondre</button> <p>Caractère restant : <span>{nbrChar}</span></p>
                </div>
            </div>
        </div>
    );
};
export default ReplyForm;
function Tweet({pseudo, content, handleReply, tweet}){
    return (
        <>
            <div className="tweet">
                <div className="tweetHead">{pseudo}</div>
                <div className="content">{content}</div>
                <button onClick={()=>{handleReply(tweet)}}>reply</button>
                <button>retweet</button>
                <button>like</button>
            </div>
        </>
    );
}
export default Tweet;
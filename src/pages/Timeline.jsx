import Tweet from "../components/Tweet";
function Timeline({tweets, handleReply}){
    return (
        <>
            <div className="homepage">
                {tweets.map((tweet)=>{
                    return <Tweet 
                                key={tweet.tweet_id} 
                                tweet={tweet.tweet_id}
                                pseudo={tweet.pseudo} 
                                content={tweet.content}
                                handleReply={handleReply} 
                            />
                })}
            </div>
        </>
    );
}
export default Timeline;
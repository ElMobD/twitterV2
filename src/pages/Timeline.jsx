import Tweet from "../components/Tweet";
function Timeline({tweets, handleReply}){
    return (
        <>
            <div className="homepage">
                {tweets.map((tweet)=>{;
                    return <Tweet 
                                key={tweet.tweet_id} 
                                tweet={tweet.tweet_id}
                                pseudo={tweet.pseudo} 
                                identifiant={tweet.identifiant}
                                content={tweet.content}
                                user={tweet.user_id}
                                img_link={tweet.img_link}
                                handleReply={handleReply}
                            />
                })}
            </div>
        </>
    );
}
export default Timeline;
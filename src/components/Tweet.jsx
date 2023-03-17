import { useNavigate } from 'react-router-dom';
function Tweet({pseudo, content, handleReply, tweet, user, img_link}){
    const navigate = useNavigate();
    const url = window.location.href;
    return (
        <>
            <div className="tweet">
                <div className="tweet-center">
                <div className="tweetHead" onClick={
                        ()=>{
                            console.log(user);
                                            if(url === "http://localhost:5181/profil/"+user){
                                                console.log("C'est dejà l'url.");
                                            }else{
                                                navigate("/profil/"+user);
                                            }
                        }
                    }>
                        <div className="pp"></div>
                        <p>{pseudo}</p>
                    </div>
                    <div className="tweetBody">
                        <div className="content">{content}</div>
                        {img_link ? (<div className='tweet-picture'></div>): undefined}
                        <div className="tweet-actions">
                            <button onClick={()=>{handleReply(tweet)}}>reply</button>
                            <button>retweet</button>
                            <button>like</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Tweet;

//"/profil/"+user
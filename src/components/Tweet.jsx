import { NavLink } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
function Tweet({pseudo, content, handleReply, tweet, user}){
    const navigate = useNavigate();
    const url = window.location.href;
    return (
        <>
            <div className="tweet">
                
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
 
                <div className="content">{content}</div>
                <button onClick={()=>{handleReply(tweet)}}>reply</button>
                <button>retweet</button>
                <button>like</button>
            </div>
        </>
    );
}
export default Tweet;

//"/profil/"+user
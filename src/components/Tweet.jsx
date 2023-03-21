import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Tweet({pseudo, content, handleReply, tweet, user, img_link, getTweetLike, token}){
    const navigate = useNavigate();
    const url = window.location.href;
    const [like, setLike] = useState();
    const [isLike, setIsLike] = useState(false);


    useEffect(()=>{
        getTweetLike(tweet, (number)=>{
            number = parseInt(number);
            setLike(number);
        });
        verifIsLike(token);
    },[]);
    function tableauVide(tableau) {
        if (tableau.length === 0) {
          return true; // le tableau est vide
        } else {
          return false; // le tableau n'est pas vide
        }
    }
    async function postLikeTweet(token){
        const response = await fetch("http://localhost/SAE401/site/get-tweet-stat.php?likeEnable=false&tweet="+tweet,{
            method: 'POST',
            headers: {'auth': token}
        });
        //const json = await response.json();
    };
    async function deleteLikeTweet(token){
        const response = await fetch("http://localhost/SAE401/site/get-tweet-stat.php?likeEnable=true&tweet="+tweet,{
            method: 'POST',
            headers: {'auth': token}
        });
        //const json = await response.json();
    };
    async function verifIsLike(token){
        const response = await fetch("http://localhost/SAE401/site/get-tweet-stat.php?verif=true&tweet="+tweet,{
            method: 'POST',
            headers: {'auth': token}
        });
        const json = await response.json();
        if(tableauVide(json)){
            return;
        }else{
            setIsLike(true);
        }
    };
    function handleLike(token){
        if(token){
            if(isLike === true){
               setLike(like - 1);
               setIsLike(false);
               deleteLikeTweet(token);
            }else if(isLike === false){
                setLike(like + 1);
                setIsLike(true);
                postLikeTweet(token);
            }
        }
    }
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
                            {isLike ? 
                            (<button className='liked' onClick={()=>{handleLike(token)}}>like {like}</button>)
                            :
                            (<button onClick={()=>{handleLike(token)}}>like {like}</button>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Tweet;

//"/profil/"+user
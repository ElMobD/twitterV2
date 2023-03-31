import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";





function Tweet({pseudo, content, handleReply, tweet, user, img_link, getTweetLike, 
    token,handleModal, userConn, pp_link, origin_id, getTweetComment}){
    const navigate = useNavigate();
    const url = window.location.href;
    const [like, setLike] = useState();
    const [comment, setCommment] = useState();
    const [isLike, setIsLike] = useState(false);
    const [answer, setAnswer] = useState();
    const userConnePseudo = userConn ? userConn.pseudo : undefined;


    useEffect(()=>{
        getTweetLike(tweet, (number)=>{
            number = parseInt(number);
            setLike(number);
        });
        getTweetComment(tweet,(number)=>{
            number = parseInt(number);
            setCommment(number);
        });
        if(token){
            verifIsLike(token);
        }
        if(origin_id){
            getAnswer(origin_id);
        }
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
    async function getAnswer(tweetID){
        const response = await fetch("http://localhost/SAE401/site/get-tweet.php?answer="+tweetID,{
            method: 'GET'
        });
        const json = await response.json();
        setAnswer(json[0].pseudo);
    }
    return (
        <>
            <div className="tweet">
                {origin_id && origin_id !== "null" ? (
                    <NavLink to={origin_id && origin_id !== "null" ? "/reply/"+origin_id:undefined}>
                        <div className='tweet-anwser'>Replying to <span>{answer}</span></div>
                    </NavLink>
                ) : undefined}
                <div className="other-actions">
                    {userConnePseudo === pseudo ? (<FiMoreHorizontal  onClick={(event)=>{handleModal(event,tweet)}}/>): undefined}
                    
                </div>
                <div className="tweet-center">
                <div className="tweetHead" onClick={
                        ()=>{
                                            if(url === "http://localhost:5181/profil/"+user){
                                                console.log("C'est dejà l'url.");
                                            }else{
                                                navigate("/profil/"+user);
                                            }
                        }
                    }>
                        {pp_link ? (<div className="pp" style={{ backgroundImage: `url(${pp_link})` }}></div>)
                        :(<div className="pp" style={{ backgroundImage: `url(${"/src/ressources/logoEmpty.png"})` }}></div>)}
                        <p>{pseudo}</p>
                    </div>
                    <div className="tweetBody">
                        <div className="content">{content}</div>
                        {img_link ? (<div className='tweet-picture' style={{ backgroundImage: `url(${img_link})` }}></div>): undefined}
                        <div className="tweet-actions">
                            <div><FaRegCommentDots onClick={()=>{handleReply(tweet)}}/><span>{comment}</span></div>
                            <AiOutlineRetweet/>
                            {isLike ? 
                            (<div><FcLike onClick={()=>{handleLike(token)}}/><span className='liked'>{like}</span></div>)
                            :
                            (<div><FcLikePlaceholder onClick={()=>{if(token){
                                handleLike(token);
                            }else{
                                alert("Veuillez vous connecter");
                                navigate("/login");
                            }}}/><span>{like}</span></div>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Tweet;

//<button onClick={(event)=>{handleModal(event)}}>Supprimer</button>
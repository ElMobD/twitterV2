import { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useParams} from 'react-router-dom';
import Tweet from "../components/Tweet";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { MdOutlineQuestionAnswer } from "react-icons/md";


function TweetReply({ handleReply,tweetSpawn, token, handleModal}){
    const navigate = useNavigate();
    const [userT, setUserT] = useState([]);
    const tweetID = useParams();
    const [reply, setReply] = useState([]);
    const [nbrReply, setNbrReply] = useState();
    const [like, setLike] = useState();
    const [answer, setAnswer] = useState();
    const [isLike, setIsLike] = useState(false);

    function tabVide (tab){
        if(tab.length === 0){
            return true;
        }else{
            return false;
        }
    };
    async function getAllTweet(tweetID){
        const response = await fetch("http://localhost/SAE401/site/get-all-tweet.php",{
            method: 'GET',
        });
        const json = await response.json();
        test(tweetID,json);
    };
    function test(tweetID,reponse){
        var allReply = reponse.filter((replyer)=> replyer.origin_id === tweetID);
        setReply(allReply);
        getUserTweet(tweetID,reponse);
    };
    function getUserTweet(tweetID, reponse){
        var replied = reponse.filter((replieder)=> replieder.tweet_id === tweetID);
        setUserT(replied);
    }
    function getTweetLike(id,callback){
        if(callback){
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = ()=>{
              if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    var reponse = httpRequest.responseText;
                    reponse = JSON.parse(reponse);
                    callback(reponse[0].nbrLike);
                }else{
                    alert("Problème avec la requête");
                }
            }
            };
            httpRequest.open('GET', 'http://localhost/SAE401/site/get-tweet-stat.php?count='+id, true);
            httpRequest.send();
        }else{
            console.log("error");
        }
    }
    function getTweetComment(id,callback){
        if(callback){
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = ()=>{
              if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    var reponse = httpRequest.responseText;
                    reponse = JSON.parse(reponse);
                    callback(reponse[0].nbrComment);
                }else{
                    alert("Problème avec la requête");
                }
            }
            };
            httpRequest.open('GET', 'http://localhost/SAE401/site/get-tweet-stat.php?comment='+id, true);
            httpRequest.send();
        }
    }
    async function getAnswer(tweetID){
        const response = await fetch("http://localhost/SAE401/site/get-tweet.php?answer="+tweetID,{
            method: 'GET'
        });
        const json = await response.json();
        setAnswer(json[0].pseudo);
    }
    if(tabVide(userT) === false && userT[0].origin_id){
        getAnswer(userT[0].origin_id);
    }
    useEffect(()=>{
        getAllTweet(tweetID.tweetID);
    },[tweetID]);
    
    return (
        <>
        <div className="tweetReply">
            <div className="replied">
                <NavLink to={tabVide(userT) === false && userT[0].origin_id && userT[0].origin_id !== "null" ? "/reply/"+userT[0].origin_id :undefined}>
                    {tabVide(userT) === false && userT[0].origin_id && userT[0].origin_id !== "null" ?
                    (<div className="answer">Replying to <span>{answer ? answer : undefined}</span></div>):undefined}
                </NavLink>
               <div className="replied-sous">
                <NavLink to={tabVide(userT) === false ? "/profil/"+userT[0].user_id : undefined}>
                    <div className="replied-head">
                        <div className="replied-head-pp">
                            {tabVide(userT) === false && userT[0].pp_link && userT[0].pp_link !== 'null' ? 
                            (<div className="the-head-replied-pp" style={{ backgroundImage: `url(${userT[0].pp_link})` }}></div>)
                            :(<div className="the-head-replied-pp" style={{ backgroundImage: `url(${"/src/ressources/logoEmpty.png"})` }}></div>)}
                        </div>
                        <div className="replied-author">
                            {tabVide(userT) === false ? userT[0].pseudo : "Le tableau est vide"}
                        </div>
                    </div>
                </NavLink>
                    <div className="replied-body">
                        <div className="replied-content">
                            {tabVide(userT) === false ? userT[0].content : "Le tableau est vide"}
                        </div>
                        {userT.map((info)=>{
                            return (
                                <div key={info.tweet_id+100}>
                                    {info.img_link ? (<div className="replied-img"></div>):undefined}
                                </div>
                            );
                        })}
                        <div className="replied-actions">
                            <div className="nbrReply">
                                <MdOutlineQuestionAnswer onClick={()=>{
                                    if(token){
                                        tweetSpawn(userT[0].tweet_id)
                                    }else{
                                        alert("Veuillez vous connecter");
                                        navigate("/login");
                                    }
                                    }}/>
                                <span>{nbrReply}</span>
                            </div>
                            <AiOutlineRetweet/>
                            <div className="nbrLike">
                                <FcLikePlaceholder/>
                                <span>{like}</span>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
            <div className="reply">
            {tabVide(reply) !== true ? 
            (reply.map((tweet) =>{
                return <Tweet 
                            key={tweet.tweet_id}
                            tweet={tweet.tweet_id}
                            pseudo={tweet.pseudo}
                            identifiant={tweet.identifiant}
                            content={tweet.content}
                            user={tweet.user_id}
                            img_link={tweet.img_link}
                            token={token}
                            pp_link={tweet.pp_link}
                            getTweetLike={getTweetLike}
                            getTweetComment={getTweetComment}
                            handleReply={handleReply}
                            handleModal={handleModal}
                            origin_id={tweet.origin_id}
                        />
            })) : (<>Aucune Réponse à ce Tweet</>)}
            </div>

        </div>
        </>
    );
}
export default TweetReply;

/*

function test(id){
        getAllTweet();
       // var allReply  = allTweets.filter((replyer)=> replyer.origin_id === id);
        //setReply(allReply);
       getTweetReplied(id);
    };
    function getTweetReplied(id){
        console.log(id, allTweets);
        var replied = allTweets.filter((replieder)=> replieder.tweet_id === id);
        console.log(replied);
        setNewReplied(replied);
    };*/
import { useState } from 'react';

function TweetForm({tweetSpawn, postTweet, token, tweetID, user}){
    const [replyContent, setReplyContent] = useState("");
    const [nbrChar, setNbrChar] = useState(255);
    const [image, setImage] = useState();

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
    function post(tweetID, file){
        var origin = false;
        if(tweetID){
            origin = tweetID;
        };
        if(file){
            postImage(file, replyContent, origin);
        }else{
            postTweet(token, replyContent, origin);
        }
        tweetSpawn();
    };
    const verif =(event)=>{
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        setImage(formData);
    }
    async function postImage(file,content,origin){
        var data = file;
        data.append('content', content);
        data.append('origin', origin);
        if(data){
            const response = await fetch('http://localhost/SAE401/site/post-user-tweet.php',{
                method: 'POST',
                headers: {'auth': token},
                body: data
            });
            const json = await response.json();
            console.log(json);
        }
    };
    return (
        <div className="tweet-filtre">
            <div className="tweet-form">
                <div className="tweet-head">
                    <div className="tweet-head-sous">
                        <button className='tweetformquit' onClick={tweetSpawn}>X</button>
                        <p>Écrire un tweet</p>
                    </div>
                </div>
                <div className="tweet-body">
                    <div className="tweet-body-pp">
                       {user.pp_link ? ( <div className="pp" style={{ backgroundImage: `url(${user.pp_link})` }}></div>):( <div className="pp" style={{ backgroundImage: `url(${"/src/ressources/logoEmpty.png"})` }}></div>)}
                    </div>
                    <div className="tweet-body-content">
                        <textarea maxLength={255} value={replyContent} placeholder={"Écrivez quelque chose..."} onChange={(event)=>{handleContent(event)}}></textarea>
                    </div>      
                </div>
                <div className="tweet-form-valid">
                    <button onClick={()=>{post(tweetID, image)}}>Tweet</button> 
                    {nbrChar < 255 ? (<div className='nbr-char green'>{nbrChar}</div>): undefined}
                    {nbrChar < 170 ? (<div className='nbr-char yellow'>{nbrChar}</div>): undefined}
                    {nbrChar < 85 ? (<div className='nbr-char orange'>{nbrChar}</div>): undefined}
                    {nbrChar < 30 ? (<div className='nbr-char red'>{nbrChar}</div>): undefined}
                    <input type="file" onChange={verif}/>
                </div>
            </div>
        </div>
    );
};
export default TweetForm;

import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';


function Chat({token}){
    const userID = useParams();
    const [author, setAuthor] = useState({});
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("");

    const handleMessage = (event)=>{
        setMessage(event.target.value);
    }
    async function getConv(token,other) {
        const response = await fetch('http://localhost/SAE401/site/get-user-mp.php',{
            method: 'GET',
            headers: {'auth':token, 'other':other},
        });
        const json = await response.json();
        setChat(json);
    }


    async function getAuthorHead(userID, token) {
        const response = await fetch('http://localhost/SAE401/site/get-user-v2.php',{
            method: 'GET',
            headers: {'userID': userID},
        });
        const json = await response.json();
        setAuthor(json[0]);
        getConv(token, userID);
    }

    async function postMessage(otherID, token, content) {
        if(content){
            const reponse = await fetch('http://localhost/SAE401/site/post-message.php?other='+otherID+'&content='+content,
            {
                 methode: 'GET',
                 headers: {'auth': token},
            });
            const json = await reponse.json();
            console.log(json);
            setMessage("");
        }else{
            console.log("le message est vide bro");
        }
    }


    useEffect(()=>{
        getAuthorHead(userID.mpID, token);
    },[userID]);




    return (
            <div className="chatCard">
                <div className="chathead">
                    <div className="pp-chat">

                    </div>
                    <p>{author.pseudo}</p>
                </div>
                <div className="the-chat">
                    {chat.map((chat)=>{
                        return (
                            <div key={chat.message_id}>
                                {chat.sent === "1" ?
                                    (<div className='chatBox right-chat'>{chat.content}</div>)
                                    :
                                    (<div className='chatBox left-chat'>{chat.content}</div>)
                                }
                            </div>
                        );
                    })}
                </div>
                <div className="mpForm">
                    <button onClick={()=>{postMessage(userID.mpID,token,message)}}>Send</button>
                    <input type="text" placeholder='Écrire un message...' value={message} onChange={(event)=>{handleMessage(event)}}></input>
                </div>
            </div>
    );
}
export default Chat;
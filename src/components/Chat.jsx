import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { BsSendFill} from "react-icons/bs";



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
            setChat((curr) =>{
                var copyChat = curr;
                var newChat = {
                    content: content,
                    sent: "1",
                    message_id: Date.now()
                };
                copyChat.push(newChat);
                return copyChat;
            });
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
                        {author.pp_link ? (<div className="the-chat-pp" style={{ backgroundImage: `url(${author.pp_link})` }}></div>)
                        :(<div className="the-chat-pp" style={{ backgroundImage: `url(${"/src/ressources/logoEmpty.png"})` }}></div>)}
                    </div>
                    <p>{author.pseudo}</p>
                </div>
                <div className="the-chat">
                    {chat.map((chat)=>{
                        return (
                            <div key={chat.message_id} className="chat-box-general">
                                {chat.sent === "1" ?
                                    (<div className='chatBox right-chat'>
                                        <div className="chatbox-interieur">
                                            {chat.content}
                                        </div>
                                    </div>)
                                    :
                                    (<div className='chatBox left-chat'>
                                        <div className="chatbox-interieur">
                                            {chat.content}
                                        </div>
                                    </div>)
                                }
                            </div>
                        );
                    })}
                </div>
                <div className="mpForm">
                    <BsSendFill onClick={()=>{postMessage(userID.mpID,token,message)}}/>
                    <input type="text" placeholder='Écrire un message...' value={message} onChange={(event)=>{handleMessage(event)}}></input>
                </div>
            </div>
    );
}
export default Chat;
import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';


function Chat({token}){
    const userID = useParams();
    const [author, setAuthor] = useState({});
    const [chat, setChat] = useState([]);

    async function getConv(token,other) {
        const response = await fetch('http://localhost/SAE401/site/get-user-mp.php',{
            method: 'GET',
            headers: {'auth':token, 'other':other},
        });
        const json = await response.json();
        console.log(json);
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
                            <>
                                {chat.sent === "1" ?
                                    (<div className='chatBox right-chat'>{chat.content}</div>)
                                    :
                                    (<div className='chatBox left-chat'>{chat.content}</div>)
                                }
                            </>
                        );
                    })}
                </div>
            </div>
    );
}
export default Chat;
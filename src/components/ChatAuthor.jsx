import { useEffect, useState } from 'react';
import { NavLink} from 'react-router-dom';
import Author from './Author';

function ChatAuthor({token}){
    const [author, setAuthor] = useState([]);
    async function getAuthor(token) {
        const response = await fetch('http://localhost/SAE401/site/konw-user-message.php',{
            method: 'GET',
            headers: {'auth': token},
        });
        const json = await response.json();
        console.log(json);
        setAuthor(json);
    }
    useEffect(()=>{
        getAuthor(token);
    },[token]);
    return (
            <div className="chatAuthorCard">
                <div className="vosMP">
                    <p>Vos Messages</p>
                </div>
                <div className="author">
                      {author.map((author) =>{
                            
                           return (
                                <NavLink to={"/message/"+author.user_id} key={author.user_id}>
                                    <Author author={author.pseudo}/>
                                </NavLink>
                            );
                        })}
                </div>
            </div>
    );
}
export default ChatAuthor;
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
function Right({token}){
    const [randUser, setRandUser] = useState([]);
    const [search, setSearch] = useState("");
    const [userSearch, setUserSearch] = useState([]);
    function handleSearch(event){
        setSearch(event.target.value);
        if(event.target.value.length >= 3){
            getUser(event.target.value);
        }
    }
    async function getUser(value) {
        if(value.length >= 3){
          const response = await fetch('http://localhost/SAE401/site/search-user.php?value='+value, {
            method: 'GET',
          });
          const json = await response.json();
          setUserSearch(json);
        }else{
          console.log("C'est pas au dessus de 3");
        }
    }
    async function getRandomUser(token) {
        if(token){
          const response = await fetch('http://localhost/SAE401/site/get-random-user.php', {
            method: 'GET',
            headers: {'auth': token},
          });
          const json = await response.json();
          setRandUser(json);
        }else{
          console.log("Y'a pas de token brow");
        }
    }
    async function follow(token, user) {
        if(token && user){
          const response = await fetch('http://localhost/SAE401/site/handle-follow.php?other='+user+'&boolean=false', {
            method: 'GET',
            headers: {'auth': token},
          });
          const json = await response.json();
        }
        getRandomUser(token);
    };
    useEffect(()=>{
        getRandomUser(token);
    }, [])
    return (
        <>
            <div className="right">
                <div className="tendance">
                    <h1>Tendance</h1>
                    <div className="tend-card">
                        <div className="user-search">
                            <input type="text" value={search} onChange={(event)=>{handleSearch(event)}}/>
                        </div>
                        <div className="user-search-result">
                            {userSearch.map((user)=>{
                                return (
                                    <NavLink to={"/profil/"+user.user_id}>
                                        <div className="user-search-div" key={user.user_id}>
                                            {user.pseudo}
                                        </div>
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="sugg">
                    <h1>Profils suggérée</h1>
                    <div className="sugg-render">
                        {token === null ? 
                        (
                        <>
                            <div className="suggFalse">Vous devez vous connecter pour accéder au profils suggérée. Pour vous connecter, cliquez <NavLink to="/login">ici</NavLink>.
                            </div>
                        </>
                        ):(
                        <>
                            <div className="suggTrue">
                                {randUser.map((user)=>{
                                    return (
                                        <div className='rand-user' key={user.user_id}>
                                            <NavLink to={"/profil/"+user.user_id}>
                                                <div className="rand-user-left">
                                                    <div className="rand-user-pp">

                                                    </div>
                                                </div>
                                            </NavLink>
                                                <div className="rand-user-center">
                                                    {user.pseudo}
                                                </div>
                                            <div className="rand-user-right" onClick={()=>{follow(token, user.user_id)}}>
                                                +
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Right;
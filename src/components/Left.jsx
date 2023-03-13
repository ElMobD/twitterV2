import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Left({token, user, logout, tweetSpawn}){
    const navigate = useNavigate();
    const url = window.location.href;
    return (
        <>
            <div className="left">
                <div className="left-sous">
                <NavLink to="/">
                        <div className="logo">

                        </div>
                    </NavLink>
                    {token ? (<div className="explo-mess">
                        <button className='classic-button'>Explorer</button>
                        <NavLink to={"/message"}><button className='classic-button'>Message</button></NavLink>
                        <NavLink to={"/profil/"+user.user_id}><button className='classic-button'>Profil</button></NavLink>
                        <button onClick={tweetSpawn}>Tweeter</button>
                    </div>):undefined}
                    <div className="left-bottom">
                        <div className="sous">
                            {token === null ? 
                            (
                            <div className='logSign'>
                                <NavLink to="/signin"><button id='signBut'>Inscription</button>
                                </NavLink>
                                <NavLink to="/login"><button id='logBut'>Connexion</button>
                                </NavLink>
                            </div>
                            ) : (
                            <>
                                <div className="profil">
                                    
                                        <div className="user-profil" onClick={()=>{
                                                console.log(url);
                                                if(url === "http://localhost:5181/profil/"+user.user_id){
                                                    console.log("C'est dejà l'url.");
                                                }else{
                                                    navigate("/profil/"+user.user_id);
                                                }
                                            }}>
                                            <div className="photo">

                                            </div>
                                            <p>{user.pseudo}</p>
                                        </div>
                                    
                                    <div className="logout">
                                        <button onClick={logout}>Déconnexion</button>
                                    </div>
                                </div>
                            </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Left;
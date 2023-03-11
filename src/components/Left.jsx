import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

function Left({token, user, logout, tweetSpawn}){
    const navigate = useNavigate();
    const url = window.location.href;
    return (
        <>
            <div className="left">
                <NavLink to="/">
                    <Logo/>
                </NavLink>
                <div className="left-bottom">
                    <div className="sous">
                        {token === null ? 
                        (
                        <div className='logSign'>
                            <NavLink to="/signin"><button>Inscription</button>
                            </NavLink>
                            <NavLink to="/login"><button>Connexion</button>
                            </NavLink>
                        </div>
                        ) : (
                        <>
                            <div className="explo-mess">
                                <p>Explorer</p>
                                <NavLink to={"/message"}><p>Message</p></NavLink>
                               <button onClick={tweetSpawn}>Tweeter</button>
                            </div>
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
        </>
    );
}
export default Left;
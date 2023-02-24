import { NavLink } from 'react-router-dom';
import Logo from './Logo';
function Left({token, user, logout }){
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
                                <p>Message</p>
                            </div>
                            <div className="profil">
                                <NavLink to="/profil">
                                    <div className="user-profil">
                                        <div className="photo">

                                        </div>
                                        <p>{user.pseudo}</p>
                                    </div>
                                </NavLink>
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
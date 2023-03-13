import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
function Login({pseudo, password, handlePassword, handlePseudo, login}){
    const [error, setError] = useState("");
    const dontMatch = (error)=>{
        setError(error);
    };
    return (
        <>
            <div className="loginpage">
                <div className="login-card">
                   <div className="login-head">
                        <h1>Se connecter</h1>
                   </div>
                    <div className="login-field">
                        <div className="field">
                            <label>Pseudo</label>
                            <input type="text" value={pseudo} onChange={handlePseudo}/>
                        </div>
                        <div className="field">
                            <label>Mot de passe</label>
                            <input type="password" value={password} onChange={handlePassword}/>
                        </div>
                        <div className="login-button">
                            <button onClick={() =>{login(pseudo,password, dontMatch)}}>Connexion</button>
                        </div>
                        
                    </div>
                    <div className="login-error-type">
                        {error ? (<>{error}</>):undefined}
                    </div>
                    <div className="login-text">
                            <p>Vous n'avez pas encore de compte ? <NavLink to="/signin">Inscrivez Vous.</NavLink></p>
                            <p>Retour vers page d'accueil. <NavLink to="/">Ici</NavLink></p>
                        </div>
                </div>
            </div>
        </>
    );
}
export default Login;

/*
<p>Pseudo</p>
                    <input type="text" value={pseudo} onChange={handlePseudo}/>
                    <p>Mot de passe</p>
                    <input type="password" value={password} onChange={handlePassword}/>
                    <button onClick={() =>{login(pseudo,password)}}>send</button>
                    <p>Vous n'avez pas encore de compte ? <NavLink to="/signin">Inscrivez Vous.</NavLink></p>
                    <p>Retour vers page d'accueil. <NavLink to="/">Ici</NavLink></p>
*/
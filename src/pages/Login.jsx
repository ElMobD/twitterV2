import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
function Login({pseudo, password, handlePassword, handlePseudo, login}){
    return (
        <>
            <div className="loginpage">
                <div className="login-card">
                    <h1>Se connecter</h1>
                    <p>Pseudo</p>
                    <input type="text" value={pseudo} onChange={handlePseudo}/>
                    <p>Mot de passe</p>
                    <input type="password" value={password} onChange={handlePassword}/>
                    <button onClick={() =>{login(pseudo,password)}}>send</button>
                    <p>Vous n'avez pas encore de compte ? <NavLink to="/signin">Inscrivez Vous.</NavLink></p>
                    <p>Retour vers page d'accueil. <NavLink to="/">Ici</NavLink></p>
                </div>
            </div>
        </>
    );
}
export default Login;
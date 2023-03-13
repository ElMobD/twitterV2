import { useState } from 'react';
import { NavLink } from 'react-router-dom';
function Signin({pseudo,mail,password,identifiant, handleIdentifiant, handleMail,handlePassword,handlePseudo,register}){
    const [mailError, setMailError] = useState(true);
    const [pseudoError, setPseudoError] = useState(true);
    const [idenError, setIdenError] = useState(true);
    const [passwordError, setPasswordError] = useState(true);
    const errorMail = (value)=>{
       if(value.length >= 5 ){
        setMailError(false);
       }else if(value.length < 5){
        setMailError(true);
        return;
       }
    };
    const errorPseudo = (value)=>{
        if(value.length >= 5 ){
        }else if(value.length < 5){
        }
     };
     const errorIden = (value)=>{
        if(value.charAt(0) !== "@"){
            setIdenError(true);
            return;
        }else if(value.length < 5){
            setIdenError(true);
            return;
        }else if(value.charAt(0) === "@"){
            setIdenError(false);
        }else if(value.length >= 5){
            setIdenError(false);
        }
     };
     const errorPassword = (value)=>{
        if(value.length >= 5 ){
        }else if(value.length < 5){
        }
     };
    return (
        <>
            <div className="signpage">
                <div className="sign-card">
                    <div className="sign-head">
                        <h1>S'inscrire</h1>
                    </div>
                    <div className="sign-field">
                        <div className="field">
                            <label>Adresse-mail</label>
                            <input type="text" value={mail} onChange={(event)=>{handleMail(event,errorMail)}}/>
                            {mailError ? (<div className='error'>Y'a une erreur</div>):(<div className='good'>Tout est bon</div>)}
                        </div>
                        <div className="field">
                            <label>Pseudo</label>
                            <input type="text" value={pseudo} onChange={(event) =>{handlePseudo(event, errorPseudo)}}/>
                            {pseudoError ? (<div className='error'>Y'a une erreur</div>):(<div className='good'>Tout est bon</div>)}
                        </div>
                        <div className="field">
                            <label>Identifiant</label>
                            <input type="text"  value={identifiant} onChange={(event)=>{handleIdentifiant(event,errorIden)}}/>
                            {idenError ? (<div className='error'>Y'a une erreur</div>):(<div className='good'>Tout est bon</div>)}
                        </div>
                        <div className="field">
                            <label>Mot de passe</label>
                            <input type="password"  value={password} onChange={(event)=>{handlePassword(event, errorPassword)}}/>
                            {passwordError ? (<div className='error'>Y'a une erreur</div>):(<div className='good'>Tout est bon</div>)}
                        </div>
                    </div>
                    <div className="sign-button">
                        <button onClick={()=>{register(mail,pseudo,identifiant,password)}}>Inscription</button>
                    </div>
                    <div className="sign-text">
                        <p>Vous avez déjà un compte ?<NavLink to="/login">Connectez Vous.</NavLink></p>
                        <p>Retour vers page d'accueil. <NavLink to="/">Ici</NavLink></p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Signin;

/*
<div className="sign-bottom">
                        <p>Vous avez déjà un compte ?<NavLink to="/login">Connectez Vous.</NavLink></p>
                        <p>Retour vers page d'accueil. <NavLink to="/">Ici</NavLink></p>
</div>
*/ 
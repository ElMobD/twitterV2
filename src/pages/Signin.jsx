import { NavLink } from 'react-router-dom';
function Signin({pseudo,mail,password,handleMail,handlePassword,handlePseudo,signin}){

    return (
        <>
            <div className="signpage">
                <div className="sign-card">
                    <h1>Register</h1>
                    <label>Mail :</label>
                    <input type="text" value={mail} onChange={handleMail}/>
                    <label>Pseudo :</label>
                    <input type="text" value={pseudo} onChange={handlePseudo}></input>
                    <label>Password :</label>
                    <input type="password" value={password} onChange={handlePassword}></input>
                    <button onClick={signin}>send</button>
                    <p>Vous avez déjà un compte ?<NavLink to="/login">Connectez Vous.</NavLink></p>
                    <p>Retour vers page d'accueil. <NavLink to="/">Ici</NavLink></p>
                </div>
            </div>
        </>
    );
}
export default Signin;
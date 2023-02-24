import { NavLink } from 'react-router-dom';
function Right({token}){
    return (
        <>
            <div className="right">
                <div className="tendance">
                    <h1>Tendance</h1>
                </div>
                <div className="sugg">
                    <h1>Profils suggérée</h1>
                    <div className="sugg-render">
                        {token === null ? (<><div className="suggFalse">Vous devez vous connecter pour accéder au profils suggérée. Pour vous connecter, cliquez <NavLink to="/login">ici</NavLink>.</div></>
                        ):(
                        <><div className="suggTrue"></div></>)}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Right;
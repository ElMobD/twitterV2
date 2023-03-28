import { useEffect } from "react";

function Modal({top,left, tweet, deleteTweet}){
    return(
        <div className="modal" style={{ top: top, left: left }}>
           <div className="sous-modal">
                Êtes vous sûr de vouloir supprimer le tweet ? 
                <button onClick={()=>{deleteTweet(tweet)}}>Confirmer</button>
           </div>
        </div>
    );
}
export default Modal;
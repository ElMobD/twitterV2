import { useState } from 'react';

function EditProfil({token, handleEditProfil, user}){
    const [pseudo, setPseudo] = useState(user.pseudo);
    const [bio, setBio] = useState(user.bio);
    const [user_pp, setUser_pp] = useState(user.pp_link);
    const [theFile, setTheFile] = useState();
    const [error, setError] = useState("");
    const handlePseudo = (event)=>{
        setPseudo(event.target.value);
    }
    const handleBio = (event)=>{
        setBio(event.target.value);
    }
    const save = (pp,pseudo,bio)=>{
        if(pp){
            var data = pp;
            data.append('pseudo', pseudo);
            data.append('bio', bio);
            update(data);
        }else{
            const data = new FormData();
            data.append('pseudo', pseudo);
            data.append('bio', bio);
            update(data);
        }
    }
    const verif =(event)=>{
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        setTheFile(formData);
    }
    const update= async (data)=>{
        const response = await fetch('http://localhost/SAE401/site/update.php?profil=true',{
                method: 'POST',
                headers: {'auth': token},
                body: data
        });
        handleEditProfil();
        setPseudo("");
        setBio('');
    };
    return (
        <div className="edit-modal">
            <div className="edit-modal-head">
                <button id="close-edit" onClick={handleEditProfil}>X</button>
                <p>Modifier son profil</p>
                <button id="save" onClick={()=>{save(theFile,pseudo,bio)}}>Enregistrer</button>
            </div>
            <div className="edit-modal-body">
                    <div className="change change-pseudo">
                        <label>Pseudo</label>
                        <input type="text" value={pseudo} onChange={handlePseudo}/>
                    </div>
                    <div className="change change-bio">
                        <label>Bio</label>
                        <textarea maxLength={1000} value={bio ? bio:""} onChange={handleBio}/>
                    </div>
                    <div className="change change-pp">
                        <label>Choisissez une image pour votre photo de profil</label>
                        {user_pp ? (<div className='user-pp-img' style={{ backgroundImage: `url(${"/src/ressources/logoEmpty.png"})` }}></div>):undefined}
                        <input type="file" onChange={verif} encType="multipart/form-data"></input>
                        <div className="file-error">{error}</div>
                    </div>
            </div>
        </div>
    );
};
export default EditProfil;
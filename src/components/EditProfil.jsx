function EditProfil({token, handleEditProfil}){
    return (
        <div className="edit-modal">
            <div className="edit-modal-head">
                <button id="close-edit" onClick={handleEditProfil}>X</button>
                <p>Modifier son profil</p>
                <button id="save">Enregistrer</button>
            </div>
            <div className="edit-modal-body">
                    
            </div>
        </div>
    );
};
export default EditProfil;
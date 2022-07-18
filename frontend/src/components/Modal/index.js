import React, {useRef} from 'react';


const Modal = () => {

    return (
        <form className="modal-content">
            <div className="container">
                <p>Voulez vous vraiment supprimer ce poste ?</p>
                <div className="btn-group">
                    <button type="button" className="cancelbtn">Annuler</button>
                    <button type="button" className="deletebtn">Suprimer</button>
                </div>
            </div>
        </form>
    );
};
export default Modal;

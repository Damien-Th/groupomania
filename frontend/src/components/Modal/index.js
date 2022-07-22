import React, {useContext, useState} from 'react';
import { instanceAxios } from '../../api/Axios';
import { UserContext,  } from '../../context';

const Modal = (props) => {

    const { CurrentUser } = useContext(UserContext)

    const user = props.user
    const setModalActive = props.setModalActive
    const setUser = props.setUser
    const setUserData = props.setUserData
 
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [biography, setBiography] = useState(user.biography);


    const handleUser = (e) => {

        e.preventDefault();

        if(CurrentUser.id !== user.id) {
            if(CurrentUser.is_admin === false) return;
        }

        instanceAxios({
            method: "PUT",
            url: `/api/user/${user.id}`,
            data: {
                first_name: firstName,
                last_name: lastName,
                biography: biography,
            },
        }).then(() =>  { 
            alert('Les modifications ont été effectuées !');
            setModalActive(false)
            setUser({})
            instanceAxios.get('/api/user')
            .then(response => setUserData(response.data));
        })
        .catch((err) => console.log(err));
    }

    const cancel = (e) => {
        e.preventDefault();
        setModalActive(false)
        setUser({})
    }

    return (
        <form onSubmit={handleUser} action="" method="POST" className="form-change-modal">
            <div className="modal-wrapper">
                <div className="firstname-wrapper border">
                    <label htmlFor="firstname"></label>
                    <input onChange={(e) => setFirstName(e.target.value)} placeholder="Prénon" type="text" value={firstName} name="firstname" id="firstname" required/>
                </div>
                <div className="lastname-wrapper border">
                    <label htmlFor="lastname"></label>
                    <input onChange={(e) => setLastName(e.target.value)} placeholder="Nom" type="text" value={lastName} name="lastname" id="lastname" required/>
                </div>
            </div>
            <div className="biography-wrapper">
                <label htmlFor="biography"></label>
                <textarea onChange={(e) => setBiography(e.target.value)} className="textarea" value={biography} placeholder="Biographie" name="biography">
                </textarea>
            </div>
            <div className="btn-submit btn-wrapper">
                <input className='submit' onClick={handleUser} type="submit" value="Modifer"/>
                <input className='cancel' onClick={cancel} type="submit" value="Annuler"/>
            </div>
        </form>
    );

};
export default Modal;

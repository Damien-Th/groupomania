import React, {useState, useContext, useEffect, useRef} from "react";
import NavBar from '../components/NavBar';
import { useLocation, useNavigate } from 'react-router-dom'
import  Aside from '../components/Aside';
import { UserContext} from '../context'
import axios, { instanceAxios } from '../api/Axios';
import {ErrorPwd} from './../components/ErrorMessage';

const Setting  = () => {

 

    const { CurrentUser, setHasValidToken } = useContext(UserContext)

    const [UserData, setUserData] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [verifPassword, setVerifPassword] = useState('');
    const [picture, setPicture] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [biography, setBiography] = useState('');


    const pwdError = useRef();


    const navigate = useNavigate();

    const location = useLocation();
    let urlsplit = location.pathname.split("/setting/");
    const slug = urlsplit[1]

    const URL_SERVER = process.env.REACT_APP_URL_SERVER;
    const avatar = URL_SERVER + `/images/avatars/default.png`


    //-----//

    const handlePassword = (e) => {
        e.preventDefault();

        if(newPassword === "" || verifPassword === "") {
            pwdError.current.textContent = 'Veuillez entrer un mot de passe';
            return
        }

        const resultPwd = ErrorPwd(newPassword)
        pwdError.current.textContent = resultPwd[0];

        if(newPassword !== verifPassword) {
            pwdError.current.textContent = 'Les mots de passe doivent être identiques';
            return
        }

        instanceAxios({
            method: "PUT",
            url: `/api/user/${UserData.id}`,
            data: {
                email: UserData.email,
                password: newPassword
            },
        }).then(res =>  { console.log('sucess')})
        .catch((err) => console.log(err));
    }

    ////----///

    const slugIsValid = (AllUserSlug, slug) => AllUserSlug.filter((UserSlug) => UserSlug.slug === slug)
   
    useEffect(() => {
   
    
        instanceAxios.get('/api/user/slug')
        .then(res => {

            const result = slugIsValid(res.data, slug)

            if(result.length === 0) {
                navigate('/')
                return
            } 

            console.log(result[0])

            setIsValid(true) 

            instanceAxios.get(`/api/user/${result[0].id}`)
            .then(res => {
                console.log(CurrentUser.slug, res.data.slug)
                if(CurrentUser.slug !== res.data.slug) {
                    navigate('/')
                    return
                } 
                setUserData(res.data)
                setLastName(UserData.last_name)
                setFirstName(UserData.first_name)
                setBiography(UserData.biography)
                setPicture(picture)
            })

        })
          
    }, [navigate, UserData.slug]);

    const handleUser = (e) => {

        e.preventDefault();


        instanceAxios({
            method: "PUT",
            url: `/api/user/${UserData.id}`,
            data: {
                email: UserData.email,
                password: newPassword,
                first_name: firstName,
                last_name: lastName,
                biography: biography,
            },
        }).then(res =>  { console.log('sucess')})
        .catch((err) => console.log(err));

        // const formData = new FormData()
        // formData.append("type", 'avatar')
        // formData.append("user_id", UserData.id)
        // formData.append("picutre", picture)

        // axios.put(`/api/user`, formData)
        // .then((res) =>  {
        //     console.log('sucesss')
        // })
        // .catch((err) => console.log(err));

    }


    const handleAccordion = (e) => {

        let isActive = false;
        if(e.target.classList.contains("active")) isActive = true

        const accordions = document.querySelectorAll('.accordion')
        accordions.forEach(accordion => { 
            accordion === e.target && isActive ? accordion.classList.remove('active') : accordion.classList.add('active');
            if(accordion !== e.target) accordion.classList.remove('active');
        });
    }

    const deleteAccount = (userId) => {
        instanceAxios.delete(`/api/user/${userId}`)
        .then(() => {
            instanceAxios.get('/api/auth/clear')
            .then(res => {
                setHasValidToken(false)
            })
            .catch((err) => console.log(err));
        });
    }


    return (<div className='setting'>

        <NavBar/>

        <main className='container'>

            <Aside home={true}/>

            {isValid && <div className='setting-content'>
               

                <div className="accordion-container boxShadow boderRaduis">
                    <button onClick={handleAccordion} className="accordion active">Profil</button>
                    <div className="panel">
                        <span>Modifier mon profil</span>
                        <form onChange={handleUser} action="" method="POST" className="form-change-profil">
                            <div className="image-form-wrapper">
                                <div className='avatar-wrapper avatar_medium'>
                                    <img alt="avatar" src={avatar}></img>
                                </div>
                                <input accept="image/png, image/gif, image/jpeg, image/jpg" type="file" />
                            </div>
                            <div className="profil-wrapper">
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
                                <input onClick={handleUser} type="submit" value="Modifer"/>
                            </div>
                        </form>
                    </div>

                    <button onClick={handleAccordion} className="accordion">Sécurité</button>
                    <div className="panel">
                        <span>Changer de mot de passe</span>
                        <form onSubmit={handlePassword} action="" method="POST" className="form-change-password">
                            <div className="newPwd-wrapper border">
                                <label htmlFor="newPwd"></label>
                                <input onChange={(e) => setNewPassword(e.target.value)} placeholder="Nouveau mot de passe" value={newPassword} type="password" name="newPwd" id="newPwd" required/>
                            </div>
                            <div className="verifNewPwd-wrapper border">
                                <label htmlFor="verifNewPwd"></label>
                                <input onChange={(e) => setVerifPassword(e.target.value)} placeholder="Confirmer le nouveau mot de passe" value={verifPassword} type="password" name="verifNewPwd" id="verifNewPwd" required/>
                            </div>
                            <div className="btn-wrapper">
                                <input onClick={handlePassword} type="submit" value="Enregistrer"/>
                            </div>
                        </form>
                        <div className="error-msg" ref={pwdError}></div>
                    </div>

                    <button onClick={handleAccordion} className="accordion">Compte</button>
                    <div className="panel">
                        <span>Supprimer le compte</span>
                        <p>Si vous souhaitez effacer complètement votre compte, nous pouvons nous en charger. 
                            Rappelez-vous cependant que vous ne pourrez réactiver votre compte ni récupérer son cotenu ou ses informatiosn. 
                            Si vous voulez tout de même supprimer votre compte, cliquez sur Supprimer mon compte</p>
                        <div className="btn-wrapper">
                            <button onClick={() => deleteAccount(UserData.id)} className='delete-btn'>Supprimer mon compte</button>
                        </div>
                    </div>
                </div>

            </div>}

        </main>

    </div>);
};

export default Setting ;
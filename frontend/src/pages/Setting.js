import React, {useState, useContext, useEffect, useRef} from "react";
import NavBar from '../components/NavBar';
import { useLocation, useNavigate } from 'react-router-dom'
import  Aside from '../components/Aside';
import { UserContext} from '../context'
import axios, { instanceAxios } from '../api/Axios';
import {ErrorPwd} from './../components/ErrorMessage';

const Setting  = () => {

    const { CurrentUser, setCurrentUser, setHasValidToken } = useContext(UserContext)

    const [UserData, setUserData] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [verifPassword, setVerifPassword] = useState('');
    const [preview, setPreview] =useState('');
    const [newPicture, setNewPicture] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [biography, setBiography] = useState(UserData.biography);

    const pwdError = useRef();
    const pwdSuccess = useRef();
    const modifError = useRef();
    const modifSuccess = useRef();

    const navigate = useNavigate();

    const location = useLocation();
    let urlsplit = location.pathname.split("/setting/");
    const slug = urlsplit[1]

    const URL_SERVER = process.env.REACT_APP_URL_SERVER;
    const avatar = URL_SERVER + `/images/avatars/default.png`

    const slugIsValid = (AllUserSlug, slug) => AllUserSlug.filter((UserSlug) => UserSlug.slug === slug)


   //Secure setting only The
    useEffect(() => {
   
        instanceAxios.get('/api/user/slug')
        .then(res => {

            const result = slugIsValid(res.data, slug)

            if(result.length === 0) {
                navigate('/')
                return
            } 

            setIsValid(true) 

            instanceAxios.get(`/api/user/${result[0].id}`)
            .then(res => {
            
                if(CurrentUser.slug !== res.data.slug) {
                    navigate('/')
                    return
                } 
                setUserData(res.data)
                setLastName(res.data.last_name)
                setFirstName(res.data.first_name)
                setBiography(res.data.biography)
            })

        })
          
    }, [slug]);


    const handlePassword = (e) => {
        e.preventDefault();

        if(newPassword === "" || verifPassword === "") {
            pwdError.current.textContent = 'Veuillez entrer un mot de passe';
            return
        }

        const resultPwd = ErrorPwd(newPassword)
        pwdError.current.textContent = resultPwd[0];

        if(!resultPwd[1]) return

        if(newPassword !== verifPassword) {
            pwdError.current.textContent = 'Les mots de passe doivent être identiques';
            return
        }

        instanceAxios({
            method: "PUT",
            url: `/api/user/${UserData.id}`,
            data: {
                password: newPassword,
            },
        }).then(res =>  { 
            setNewPassword('')
            setVerifPassword('')
            pwdSuccess.current.textContent = 'Les modifications ont été effectuées !';
            setTimeout(() => {
                pwdSuccess.current.textContent = '';
              }, "3500")

        })
        .catch((err) => console.log(err));
    }


    const handleUser = (e) => {

        e.preventDefault();

        instanceAxios({
            method: "PUT",
            url: `/api/user/${UserData.id}`,
            data: {
                first_name: firstName,
                last_name: lastName,
                biography: biography,
            },
        }).then(res =>  { 
            instanceAxios.get(`/api/user/${UserData.id}`)
            .then(res => {
                setCurrentUser(res.data)
                setUserData(res.data)
                setPreview('')
                modifSuccess.current.textContent = 'Les modifications ont été effectuées !';
                setTimeout(() => {
                    modifSuccess.current.textContent = '';
                  }, "3500")
                
            });
        })
        .catch((err) => console.log(err));

        if(newPicture !== '') {
            const formData = new FormData()
            formData.append("type", 'avatar')
            formData.append("user_id", UserData.id)
            formData.append("image", newPicture)
    
            axios.put(`/api/user/avatar/${UserData.id}`, formData)
            .then((res) =>  {
                instanceAxios.get(`/api/user/${UserData.id}`)
                .then(res => {
                    setCurrentUser(res.data)
                    setUserData(res.data)
                    setPreview('')
                    modifSuccess.current.textContent = 'Les modifications ont été effectuées !';
                    setTimeout(() => {
                        modifSuccess.current.textContent = '';
                      }, "3500")
                    
                });
            })
            .catch((err) => console.log(err));
        }

    }

    const deleteAccount = (userId) => {
        instanceAxios.delete(`/api/user/${userId}`)
        .then(() => {
            instanceAxios.get('/api/auth/signout')
            .then(res => {
                setHasValidToken(false)
            })
            .catch((err) => console.log(err));
        });
    }

        useEffect(() => {

        if(newPicture) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result)
            reader.readAsDataURL(newPicture);
            return
        }
        setPreview(null);

    }, [newPicture])

    const clearImage = (e) => {
        e.preventDefault();
        setPreview(null); 
        setNewPicture('')
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

    return (<div className='setting'>

        <NavBar/>

        <main className='container'>

            <Aside home={true}/>

            {isValid && <div className='setting-content'>
               
                <div className="accordion-container boxShadow boderRaduis">
                    <button onClick={handleAccordion} className="accordion active">Profil</button>
                    <div className="panel">
                        <span>Modifier mon profil</span>
                        <form onSubmit={handleUser} action="" method="POST" className="form-change-profil">
                            <div className="image-form-wrapper">
                                <div className='avatar-wrapper avatar_medium'>
                                    {!preview && UserData.image === 'default.jpg' && <img alt="avatar" src={avatar}></img>}
                                    {!preview && UserData.image !== 'default.jpg' && <img alt="avatar" src={`${URL_SERVER}/images/user_${UserData.id}/avatar/${UserData.image}`}></img>}
                                    {preview && <img alt="preview" src={preview}/>}
                                </div>
                                {!preview && <input onChange={(e) => setNewPicture(e.target.files[0])}  accept="image/png, image/gif, image/jpeg, image/jpg" type="file" />}
                                {!preview && <p className="upload">Upload</p>}
                                {preview && <button className="clearImage-btn" onClick={clearImage}>Retirer l'image</button>}
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
                            <div className="error-msg" ref={modifError}></div>
                            <div className="sucess-msg" ref={modifSuccess}></div>
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
                        <div className="sucess-msg" ref={pwdSuccess}></div>
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
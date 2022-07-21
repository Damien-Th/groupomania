import React, {useState, useContext, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { instanceAxios } from '../../api/Axios'
import PaswordInput from './../Form/PasswordInput'
import { FaUserAlt } from 'react-icons/fa';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { UserContext} from '../../context';
import {ErrorEmail, ErrorPwd, ErrorName} from './../ErrorMessage';

const SignUpForm = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');

    const mailMsg = useRef();
    const pwdMsg = useRef();
    const lastNameMsg = useRef();
    const firstNameMsg = useRef();
    const submitMsg = useRef();

    const { setHasValidToken } = useContext(UserContext)


    const formValidator = () => {
        const resultEmail = ErrorEmail(email)
        const resultPwd = ErrorPwd(password)
        const resultLastName = ErrorName(lastName)
        const resultFirstName = ErrorName(firstName)

        mailMsg.current.textContent = resultEmail[0];
        pwdMsg.current.textContent = resultPwd[0];
        lastNameMsg.current.textContent = resultLastName[0];
        firstNameMsg.current.textContent = resultFirstName[0];

        if(resultEmail[1] && resultPwd[1] && resultLastName[1] && resultFirstName[1]) return true

        return false
    }

    const handleLogin = (e) => {
        e.preventDefault();

        let isValid = formValidator()

        if(!isValid) return

        let firstname = firstName.charAt(0).toUpperCase() + firstName.slice(1)
        let lastname = lastName.toUpperCase()
 
        instanceAxios({
            method: "POST",
            url: "/api/auth/signup",
            data: {
                email,
                lastName: lastname,
                firstName: firstname,
                password,
            },
        })
        .then(() =>  {
            instanceAxios({
                method: "POST",
                url: "/api/auth/signin",
                data: {
                    email,
                    password,
                },
            })
            .then(() => {
                setHasValidToken(true)
                navigate('/')
            })
            .catch((err) => {
                let error = err.response.data.error
                if(err.response.status === 429) error = ' Trop de tentatives'
                submitMsg.current.textContent = error
            })
        })
        .catch((err) => {
            let message = err.response.data.error.errors[0].message;
            if(message === 'email must be unique') message = 'Cette adresse email est déjà utilisée';
            submitMsg.current.textContent = message
        })
            
    };
    return (
        <div className='SignUpForm'>
            <form className='formSign' action="" onSubmit={handleLogin}>
                <div className='Form-input style-input style-input-1'>
                    <FaUserAlt/>
                    <label htmlFor='email'></label>
                    <input placeholder="Adresse e-mail" type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
                <div ref={mailMsg} className='error-msg error-email'></div>
                <div className='Form-input style-input'>
                    <MdDriveFileRenameOutline/>
                    <label htmlFor="firstName"></label>
                    <input placeholder="Prénom" type="text" id="firstName" name="first_Name" onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
                </div>
                <div ref={firstNameMsg} className='error-msg error-pwd'></div>
                <div className='Form-input style-input'>
                    <MdDriveFileRenameOutline/>
                    <label htmlFor="lastName"></label>
                    <input placeholder="Nom" type="text" id="lastName" name="last_Name" onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                </div>
                <div ref={lastNameMsg} className='error-msg error-pwd'></div>
                <div className='Form-input style-input style-input-2'>
                    <PaswordInput placeHolder='Mot de passe' pwd={password} setPwd={setPassword}/>
                </div>
                <div ref={pwdMsg} className='error-msg error-pwd'></div>
                <p className='agree-terms'>En cliquant sur S’inscrire, vous acceptez nos Conditions générales</p>
                <div className="Form-input-btn Form-input-btn style-input">
                    <input type="submit" value="S’inscrire"/>
                </div>
                <div ref={submitMsg} className='error-msg error-submit'></div>
            </form>
        </div>
    );
};
export default SignUpForm;
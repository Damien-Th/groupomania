import React, {useState, useContext, useRef} from 'react';
import { instanceAxios } from '../../api/Axios'
import { useNavigate } from 'react-router-dom';
import PaswordInput from './../Form/PasswordInput'
import { FaUserAlt } from 'react-icons/fa';
import { UserContext} from '../../context';

const SignInForm = () => {
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitMsg = useRef();

    const navigate = useNavigate();
    const { setHasValidToken } = useContext(UserContext)

    const handleLogin = (e) => {
        e.preventDefault();

        if(password === '') {
            submitMsg.current.textContent = 'Veuillez entrer un mot de passe valide'
            return
        }

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
        } )
    };

    return (
        <div className='SignInForm'>
            <form className='formSign' action="" onSubmit={handleLogin}>
                <div className='Form-input style-input style-input-1'>
                    <FaUserAlt/>
                    <label htmlFor='email'></label>
                    <input autoComplete="current-email" placeholder="Adresse e-mail" type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
                <div className='Form-input style-input style-input-2'>
                    <PaswordInput autoComplete="current-password" pwd={password} setPwd={setPassword}/>
                </div>
                <div onClick={handleLogin} className="Form-input-btn style-input">
                    <input type="submit" value="Se connecter"/>
                </div>
                <div ref={submitMsg} className='error-msg error-submit'></div>
            </form>
        </div>
    );
};
export default SignInForm;

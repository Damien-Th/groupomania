import React, {useState} from 'react';
import PaswordInput from './../Form/PasswordInput'
import { FaUserAlt } from 'react-icons/fa';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
       
    };
    return (
        <div className='ForgotPassword'>
            <form action="" onSubmit={handleLogin}>
                <div className='Form-input style-input'>
                    <FaUserAlt/>
                    <label htmlFor='email'></label>
                    <input placeholder="Adresse e-mail" type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
                <div className='Form-input style-input style-input-2'>
                    <PaswordInput placeHolder='Nouveau mot de passe' pwd={password} setPwd={setPassword}/>
                </div>
                <div className='Form-input style-input style-input-2'>
                    <PaswordInput inputId='2' placeHolder='Confirmer le mot de passe' pwd={password} setPwd={setPassword}/>
                </div>
                <div className="Form-input-btn style-input">
                    <input type="submit" value="Se connecter"/>
                </div>
            </form>
        </div>
    );
};
export default ForgotPassword;

import React, {useState} from 'react';
import axios from 'axios';
const  URL_SERVER = process.env.REACT_APP_URL_SERVER;

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: `${URL_SERVER}/api/auth/signin`,
            withCredentials: true,
            data: {
                email,
                password,
            },
        })
        .then((res) => {
            if(res.data.errors) {
                console.log("error")
            }else {
                console.log("success")
            }
        })
        .catch((err) => {
            console.log(err);
        })
    };
    return (
        <div className='SignInForm'>
        <form action="" onSubmit={handleLogin}>
            <div className='SignInForm-input'>
                <label htmlFor='email'></label>
                <input placeholder="Adresse e-mail" type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div className='SignInForm-input'>
                <label htmlFor="userPwd"></label>
                <input placeholder="Mot de passe" type="text" id="userPwd" name="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <div className="SignInForm-btn">
                <input type="submit" value="Se connecter"/>
            </div>
        </form>
    </div>
    );
};
export default SignInForm;
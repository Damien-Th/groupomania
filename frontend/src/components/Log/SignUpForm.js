import React, {useState} from 'react';
import axios from 'axios';
const  URL_SERVER = process.env.REACT_APP_URL_SERVER;

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: `${URL_SERVER}/api/auth/signup`,
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
                axios({
                    method: "POST",
                    url: `${URL_SERVER}/api/auth/signin`,
                    withCredentials: true,
                    data: {
                        email,
                        password,
                    },
                })
                .then(() =>  {
                    window.location = '/';
                });
            }
        })
        .catch((err) => {
            console.log(err);
        })
    };
    return (
        <div className='SignUpForm'>
        <form action="" onSubmit={handleLogin}>
            <div className='SignUpForm-input'>
                <label htmlFor='email'></label>
                <input placeholder="Adresse e-mail" type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div className='SignUpForm-input'>
                <label htmlFor="userPwd"></label>
                <input placeholder="Mot de passe" type="text" id="userPwd" name="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <div className="SignUpForm-btn">
                <input type="submit" value="Se connecter"/>
            </div>
        </form>
    </div>
    );
};
export default SignUpForm;
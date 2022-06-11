import React, {useState} from 'react';
import { instanceAxios } from '../../api/Axios'
import { useNavigate } from 'react-router-dom';
import PaswordInput from './../Form/PasswordInput'
import { FaUserAlt } from 'react-icons/fa';

const SignInForm = () => {
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();
        instanceAxios({
            method: "POST",
            url: "/api/auth/signin",
            data: {
                email,
                password,
            },
        })
        .then((res) => {
            if(res.data.errors) {
                console.log("error")
            }else {
                instanceAxios.defaults.headers.common['authorization'] = `Bearer ${res.data.accessToken}`
                instanceAxios.get("/api/post")
                .then((res) => {
                    if(res.data.errors) {
                        console.log("error")
                    }else {
                        navigate('/')
                    }
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    };
    return (
        <div className='SignInForm'>
            <form action="" onSubmit={handleLogin}>
                <div className='Form-input style-input'>
                    <FaUserAlt/>
                    <label htmlFor='email'></label>
                    <input placeholder="Adresse e-mail" type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
                <div className='Form-input style-input style-input-2'>
                    <PaswordInput pwd={password} setPwd={setPassword}/>
                </div>
                <div className="Form-input-btn style-input">
                    <input type="submit" value="Se connecter"/>
                </div>
            </form>
        </div>
    );
};
export default SignInForm;

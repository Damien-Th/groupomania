import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { instanceAxios } from '../../api/Axios'
import PaswordInput from './../Form/PasswordInput'
import { FaUserAlt } from 'react-icons/fa';
import { MdDriveFileRenameOutline } from 'react-icons/md';


const SignUpForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [nickName, setNickName] = useState('');

    // const formData = new FormData()
    // formData.append("signin_img", image)
    // formData.append('email', email)
    // formData.append('password', password )

    const handleLogin = (e) => {
        e.preventDefault();
 
        instanceAxios({
            method: "POST",
            url: "/api/auth/signup",
            data: {
                email,
                password,
            },
        })
        .then((res) =>  {
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
        });
            
    };
    return (
        <div className='SignUpForm'>
            <form action="" onSubmit={handleLogin}>
                <div className='Form-input style-input'>
                    <FaUserAlt/>
                    <label htmlFor='email'></label>
                    <input placeholder="Adresse e-mail" type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
                <div className='Form-input style-input'>
                    <MdDriveFileRenameOutline/>
                    <label htmlFor="userName"></label>
                    <input placeholder="Nom complet" type="text" id="userName" name="userName" onChange={(e) => setUserName(e.target.value)} value={userName}/>
                </div>
                <div className='Form-input style-input'>
                    <MdDriveFileRenameOutline/>
                    <label htmlFor="nickName"></label>
                    <input placeholder="Nom d'utilisateur" type="text" id="nickName" name="nickName" onChange={(e) => setNickName(e.target.value)} value={nickName}/>
                </div>
                <div className='Form-input style-input style-input-2'>
                    <PaswordInput placeHolder='Mot de passe' pwd={password} setPwd={setPassword}/>
                </div>
                <p>En cliquant sur S’inscrire, vous acceptez nos Conditions générales</p>
                <div className="Form-input-btn Form-input-btn style-input">
                    <input type="submit" value="S’inscrire"/>
                </div>
            </form>
        </div>
    );
};
export default SignUpForm;
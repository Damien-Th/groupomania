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
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');

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
                lastName,
                firstName,
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
                    <label htmlFor="lastName"></label>
                    <input placeholder="Nom" type="text" id="lastName" name="last_Name" onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                </div>
                <div className='Form-input style-input'>
                    <MdDriveFileRenameOutline/>
                    <label htmlFor="firstName"></label>
                    <input placeholder="Prénom" type="text" id="firstName" name="first_Name" onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
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
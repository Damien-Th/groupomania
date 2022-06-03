import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { instanceAxios } from '../../api/Axios'


const SignUpForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');

    const inputImage = (e) => {
        setImage(e)
        console.log('is ' + image)
        console.log(e.target.files[0].name)
    }

    const formData = new FormData()
    formData.append("signin_img", image)
    formData.append('email', email)
    formData.append('password', password )

    const handleLogin = (e) => {
        e.preventDefault();
 
        axios.post('/api/auth/signup', formData)
        .then((res) => {
            if(res.data.errors) {
                console.log("error")
            }else {
                instanceAxios({
                    method: "POST",
                    url: "/api/auth/signin",
                    data: {
                        email,
                        password,
                    },
                })
                .then((res) =>  {
                    instanceAxios.defaults.headers.common['authorization'] = `Bearer ${res.data.accessToken}`
                    instanceAxios.get("/api/post")
                    .then((res) => {
                        if(res.data.errors) {
                            console.log("error")
                        }else {
                            navigate('/')
                        }
                    })
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
            <div>
            <input type="file" id="signin_img" name="signin_img" accept="image/png, image/jpeg" onChange={(e) => inputImage(e.target.value)} value={image}/>
            </div>
            <div className="SignUpForm-btn">
                <input type="submit" value="Se connecter"/>
            </div>
        </form>
    </div>
    );
};
export default SignUpForm;
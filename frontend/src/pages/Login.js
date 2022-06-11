import React from 'react';
import Log from '../components/Log';

const Login = () => {
    return (
        <div className='login-page'>
            <div className='img-container'>
                <img src="/uploads/login-page.jpg" alt="building"/>
                <div className='img-container--content'>
                    <div className='img-container--content__img'>
                        <img src="/icons/icon-left-font-monochrome-white.svg" alt="groupomania-logo"/>
                    </div>
                    <p className='img-container--content__text'>Bienvenue sur notre réseau social interne</p>
                </div>
            </div>
            <div className='log-container'>
                <div className='log-container__icon'>
                    <img src="/icons/logo_custom.png" alt="logo-groupomania"/>
                </div>
                <Log />
            </div>
        </div>
    );
};

export default Login;
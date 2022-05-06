import React from 'react';
import Log from '../components/Log';

const Profil = () => {
    return (
        <div className='profil-page'>
            <div className='img-container'>
                <img src="./uploads/login-page.jpg" alt="bike-urban"/>
            </div>
            <div className='log-container'>
                <div className='log-container__icon'>
                    <img src="./icons/icon-above-font.svg" alt="logo-groupomania"/>
                </div>
                <Log />
            </div>
        </div>
    );
};

export default Profil;
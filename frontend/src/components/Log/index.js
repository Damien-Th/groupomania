import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Log = () => {
    const [SignUpModal, setSignUpModal] = useState(true);
    const [SignInModal, setSignInModal] = useState(false);

    const handleModals = (e) => {
        if(e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true);
            return;
        }
        if(e.target.id === "login") {
            setSignInModal(true);
            setSignUpModal(false);
            return;
        }
    }

    return (
        <div className='connection-form'>
            <div className='form-container'>
                <ul>
                    <li onClick={handleModals} id="register" className={SignUpModal ? 'active-btn' : null}>S'inscrire</li>
                    <li onClick={handleModals} id="login" className={SignInModal ? 'active-btn' : null}>Se connecter</li>
                </ul>
                {SignUpModal && <SignUpForm/>}
                {SignInModal && <SignInForm />}
            </div>
        </div>
    );
};

export default Log;
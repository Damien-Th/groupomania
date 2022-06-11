import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
// import ForgotPassword from './ForgotPassword';


const Log = () => {
    const [SignUpModal, setSignUpModal] = useState(false);
    const [SignInModal, setSignInModal] = useState(true);
    // const [ForgotPwdModal, setForgotPwdModal] = useState(false);

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
        // setForgotPwdModal(true)
    }

    return (
        <div className='connection-form'>
            <div className='form-container'>
                {SignUpModal && <SignUpForm/>}
                {SignInModal && <SignInForm />}
                {/* {ForgotPwdModal && <ForgotPassword />} */}
                {SignInModal && <p onClick={handleModals}>Mot de passe oublié ?</p>}
                <p className={SignUpModal ? 'active-btn' : null}>Vous n'avez pas encore de compte ?<span id="register" onClick={handleModals}> créez-en un</span></p>
                <p className={SignInModal ? 'active-btn' : null}>Vous avez déjà un compte ?<span id="login" onClick={handleModals}> Connectez vous</span></p>
            </div>
        </div>
    );
};

export default Log;
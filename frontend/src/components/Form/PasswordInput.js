import React, {useState} from 'react';
import { AiFillLock } from 'react-icons/ai';
import { BiHide, BiShowAlt } from 'react-icons/bi';

const PaswordInput  = (props) => {

    const [ShowPassword, setShowPwd] = useState(false);
    const [pwdType, setPwdType] = useState('password');

    const toggleHover = (OnOff, type) => {
        setShowPwd(OnOff)
        setPwdType(type)
    }

    return (
        <React.Fragment>
            <AiFillLock/>
            <label htmlFor={`userPwd${props.pwd2}`}></label>
            <input autoComplete="current-password" placeholder="Mot de passe" type={pwdType} id="userPwd" className="pwdInput" name="password" onChange={(e) => props.setPwd(e.target.value)} value={props.password}/>
            {!ShowPassword && <span onMouseEnter={() => toggleHover(true, 'text')}><BiHide/></span>}
            {ShowPassword && <span onMouseLeave={() => toggleHover(false, 'password')}><BiShowAlt/></span> }
        </React.Fragment>
    )
  
}

export default PaswordInput;
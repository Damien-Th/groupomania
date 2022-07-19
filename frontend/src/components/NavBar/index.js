import React, {useRef, useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { VscThreeBars } from 'react-icons/vsc';
import OnClickOutside from '../../hooks/OnClickOutside';
import { UserContext} from '../../context';
import { AiOutlineClose } from 'react-icons/ai';

const NavBar = () => {

    const icon = useRef()
    const [active, setActive] = useState(false);
    const [activeMobile, setActiveMobile] = useState(false);
    const menu = useRef()


    const { CurrentUser } = useContext(UserContext)

    const handleMenu = () => setActive(active => !active)
    const handleMenuMobile = () => setActiveMobile(active => !active)


    OnClickOutside(menu, icon, () => setActive(false));


    const URL_SERVER = process.env.REACT_APP_URL_SERVER;
    let avatar

    CurrentUser.image === 'default.jpg' ? avatar = URL_SERVER + '/images/avatars/default.png' : avatar = URL_SERVER + `/images/user_${CurrentUser.id}/avatar/${CurrentUser.image}`

    

    return (
        <header className="banner">
            <div className="container">
                <Link className="logo-wrapper desktop" to="/">
                    <img src="/icons/logo_title_red.svg" alt="groupomania-logo"/>
                </Link>
                <Link className="logo-wrapper mobile" to="/">
                    <img src="/icons/icon-red.svg" alt="groupomania-logo"/>
                </Link>
                <nav>
                    <ul className="profil-menu">
                        <li className='menu-item'>
                            <div className='profil-info'>
                                <div className='profil-info__img avatar-wrapper avatar_small'>
                                    <img src={avatar} alt="avatar_user"/>
                                </div>
                                <span>{CurrentUser.first_name} {CurrentUser.last_name}</span>
                                <span onClick={handleMenu} ref={icon} className='icon-menu desktop'><IoMdArrowDropdownCircle/></span>
                                <span onClick={handleMenuMobile} ref={icon} className='icon-menu mobile'><VscThreeBars/></span>
                            </div>
                         
                            <ul ref={menu} className={`sub-menu-desktop ${active ? 'active' : ''}`}>
                                <li>
                                    <Link className="profil_link" to={`/profil/${CurrentUser.slug}`}>
                                        <span>Mon profil</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="account_link" to={`/setting/${CurrentUser.slug}`}>
                                        <span>Paramètre</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="logout_link" to="/logout ">
                                        <span>Déconnexion</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
            <ul className={`sub-menu-mobile ${activeMobile ? 'active' : ''}`}>
                <li>
                    <Link className="profil_link" to={`/profil/${CurrentUser.slug}`}>
                        <span>Mon profil</span>
                    </Link>
                </li>
                <li>
                    <Link className="account_link" to={`/setting/${CurrentUser.slug}`}>
                        <span>Paramètre</span>
                    </Link>
                </li>
                <li>
                    <Link className="logout_link" to="/logout ">
                        <span>Déconnexion</span>
                    </Link>
                </li>
            </ul>
            <div onClick={handleMenuMobile} className={`navbar-close ${activeMobile ? 'active' : ''}`}><AiOutlineClose/></div>
        </header>
    );

};
export default NavBar;

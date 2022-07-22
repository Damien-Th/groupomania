import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext} from '../../context';

const UserInscrit = (props) => {

    const { CurrentUser } = useContext(UserContext)

    const lastUser = props.lastUser
    const URL_SERVER = process.env.REACT_APP_URL_SERVER;
    let avatar

    lastUser.image === 'default.jpg' ? avatar = URL_SERVER + '/images/avatars/default.png' : avatar = URL_SERVER + `/images/user_${lastUser.id}/avatar/${lastUser.image}`

    if(CurrentUser.id === lastUser.id) return

    return (
        <Link className="profil_link wrapper" to={`/profil/${lastUser.slug}`}>
            <div className='avatar-wrapper'>
                <img alt="avatar" src={avatar}/>
            </div>
            <p>{lastUser.first_name} {lastUser.last_name}</p>
        </Link>
    );
};
export default UserInscrit;

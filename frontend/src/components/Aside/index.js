import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { instanceAxios } from '../../api/Axios';
import { UserContext} from '../../context';
import UserInscrit from '../GetData/UserInscrit';

const Aside = (props) => {

    const { CurrentUser, setHasValidToken } = useContext(UserContext)


    const URL_SERVER = process.env.REACT_APP_URL_SERVER;
    const background = URL_SERVER + '/images/background/default.jpg'

    let avatar
    CurrentUser.image === 'default.jpg' ? avatar = URL_SERVER + '/images/avatars/default.png' : avatar = URL_SERVER + `/images/user_${CurrentUser.id}/avatar/${CurrentUser.image}`


    const home = props.home
    const UserData = props.UserData

    const [lastUsers, setLastUsers] = useState([]);

    useEffect(() => {

        instanceAxios.get('/api/user/last')
        .then(res => setLastUsers(res.data))
        .catch(res => setHasValidToken(false));

    }, [])

    return (
        <div className='aside'>
            <div className='aside-info'>
                <div className='aside-info--background'>
                    <img alt="background" src={background}/>
                </div>
                <div className='aside-info--avatar avatar-wrapper avatar_big'>
                    <img alt="avatar" src={avatar}></img>
                </div>
                <div className='aside-info--content'>
                    <p className='fullname'>{home ? CurrentUser.first_name : UserData.first_name } {home ? CurrentUser.last_name: UserData.first_name}</p>
                    <p className='biography'>{home ? CurrentUser.biography : UserData.biography}</p>
                    {home && <Link className="profil_link" to={`/profil/${CurrentUser.slug}`}>
                        <span>Mon profil</span>
                    </Link>}
                </div>
            </div>
            <div className='aside-userList'>
                <span className='aside-title wrapper'>Les derniers inscrits</span>
                {lastUsers.map((lastUser, index) => <div className='item-list' key={'lastUsers ' + index}>
                    <UserInscrit lastUser={lastUser}/>
                </div>)}
            </div>
        </div>
    );

};
export default Aside;

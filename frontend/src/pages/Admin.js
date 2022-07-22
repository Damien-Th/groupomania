import React, { useEffect, useState, useContext, useRef } from 'react';
import { instanceAxios } from '../api/Axios';
import {ImBin} from 'react-icons/im';
import {AiFillEdit, AiOutlineSearch} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Modal from '../components/Modal';
import { UserContext,  } from '../context';

const Admin = () => {

    const [UserData, setUserData] = useState([]);
    const [ModalActive, setModalActive] = useState(false);
    const [user, setUser] = useState({});
    const [inputSearch, setInputSearch] = useState("");
    const navigate = useNavigate();

    const URL_SERVER = process.env.REACT_APP_URL_SERVER;
    const avatar = URL_SERVER + '/images/avatars/default.png'

    const { CurrentUser } = useContext(UserContext)

    useEffect(() => {
        instanceAxios.get('/api/user')
        .then(response => setUserData(response.data));
    }, []);

    const deleteUSer = (userId) => {
        
        if(CurrentUser.id !== userId) {
            if(CurrentUser.is_admin === false) return;
        }

        if (!window.confirm("Voulez vous vraimment supprimer cet utilisateur ?")) return;
        instanceAxios.delete(`/api/user/${userId}`)
        .then(() =>  {
            instanceAxios.get('/api/user')
            .then(response => {
                setUserData(response.data)
                if (response.data.length === 0) navigate('/logout')
                if(CurrentUser.id === userId) navigate('/logout')
            });
        });
    };

    const handleIsAdmin = (e, user) => {

        if(CurrentUser.id !== user.id) {
            if(CurrentUser.is_admin === false) return;
        }

        let admin_value = e.target.value;
        admin_value === 'true' ? admin_value = false : admin_value = true;

        instanceAxios({
            method: "PUT",
            url: `/api/user/active/${user.id}`,
            data: {
                is_admin: admin_value
            },
        })
        .then(() => {  
            instanceAxios.get('/api/user')
            .then(response => setUserData(response.data));
        })

    }

    const editUSer = (user) => {
        setModalActive(true)
        setUser(user)
        return user
    }

    return (

        <div className='admin'>

            <NavBar UserData={UserData}/> 

            <main className='container'>

                {ModalActive && <Modal setUserData={setUserData} setModalActive={setModalActive} setUser={setUser} user={user}/>}

                {!ModalActive && <div className='admin-container'>
                    <span className='admin-container__title'>Liste des Utilisateurs</span>
                    <div className="search">
                        <AiOutlineSearch/>
                        <input placeholder='Filtrer par adreses Email' type="search" onChange={(e) => setInputSearch(e.target.value.toLowerCase())} />
                    </div>
                    <table className='myTable'>
                        <thead>
                            <tr>
                                <th>Utilisateur</th>
                                <th className='mobile'>Nom complet</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th className='action' >Action</th>
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {UserData.filter((data) => data.email.toLowerCase().includes(inputSearch)).map(
                                User => <tr key={'UserData_' + User.id}>
                                <td className='avatar' key={'UserImg_' + User.id}>
                                    <div className='avatar-wrapper avatar_small'>
                                        {User.image === 'default.jpg' && <img alt="avatar" src={avatar}></img>}
                                        {User.image !== 'default.jpg' && <img alt="avatar" src={`${URL_SERVER}/images/user_${User.id}/avatar/${User.image}`}></img>}
                                    </div>
                                </td>
                                <td className='mobile' key={'UserFullName_' + User.id}>{User.first_name} {User.last_name}</td>
                                <td key={'UserEmails_' + User.id}>{User.email}</td>
                                <td key={'UserIsAdmins_' + User.id}>
                                    <div className={`switch-btn ${'is_' + User.is_admin}`}>
                                        <label htmlFor={`buttonGroup${User.id}`}></label>
                                        <input onChange={(e) => handleIsAdmin(e, User)} id={`buttonGroup${User.id}`} type="checkbox" value={User.is_admin}/>
                                    </div>
                                </td> 
                                <td>
                                <div onClick={() => editUSer(User)} className='icon-editor'>
                                    <AiFillEdit/>
                                </div>
                                <div className='icon-remove' onClick={() => deleteUSer(User.id)}><ImBin/></div>
                                </td> 
                            </tr>
                            )}
                        </tbody>
                    </table >
                </div >}
            </main>
        </div>
        
    );
};

export default Admin;
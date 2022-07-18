import React, { useEffect, useState, useContext } from 'react';
import { instanceAxios } from '../api/Axios';
import {ImBin} from 'react-icons/im';
import {AiFillEdit, AiOutlineSearch} from 'react-icons/ai';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { UserContext,  } from '../context';
import { Link } from 'react-router-dom';

const Admin = () => {

    const [UserData, setUserData] = useState([]);
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

    return (

        <div className='admin'>

            <NavBar UserData={UserData}/> 

            <main className='container'>

                <div className='admin-container'>
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
                                        <img alt="avatar" src={avatar}></img>
                                    </div>
                                </td>
                                <td className='mobile' key={'UserFullName_' + User.id}>{User.last_name} {User.first_name}</td>
                                <td key={'UserEmails_' + User.id}>{User.email}</td>
                                <td key={'UserIsAdmins_' + User.id}>
                                    <div className={`switch-btn ${'is_' + User.is_admin}`}>
                                        <label htmlFor={`buttonGroup${User.id}`}></label>
                                        <input onChange={(e) => handleIsAdmin(e, User)} id={`buttonGroup${User.id}`} type="checkbox" value={User.is_admin}/>
                                    </div>
                                </td> 
                                <td>
                                <Link className='icon-editor' to={`/setting/${User.slug}`}>
                                    <AiFillEdit/>
                                </Link>
                                <div className='icon-remove' onClick={() => deleteUSer(User.id)}><ImBin/></div>
                                </td> 
                            </tr>
                            )}
                        </tbody>
                    </table >
                </div >
            </main>
        </div>
        
    );
};

export default Admin;
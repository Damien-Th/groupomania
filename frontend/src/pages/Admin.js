

import React, { useEffect, useState } from 'react';
import { instanceAxios } from '../api/Axios';
import {ImBin} from 'react-icons/im';
import {AiFillEdit} from 'react-icons/ai';
import jwt_decode from "jwt-decode";

const Admin = () => {

    const [UserData, setUserData] = useState([]);
    const [AdminData, setAdminData] = useState({});

    useEffect(() => {
   
        instanceAxios.get('/api/refresh')
        .then((res) =>  {
            const Admin = jwt_decode(res.data.accessToken);
            instanceAxios.defaults.headers.common['authorization'] = `Bearer ${res.data.accessToken}`
            instanceAxios.get(`/api/admin/${Admin.id}`)
            .then(response => setAdminData(response.data));
            instanceAxios.get('/api/admin')
            .then(response => setUserData(response.data));
        })
        .catch(() => window.location.href = "/login");
    
      }, []);

      console.log(AdminData)

    const deleteUSer = (userId) => {
        instanceAxios.delete(`/api/admin/${userId}`)
        .then(() =>  {
            instanceAxios.get('/api/admin')
            .then(response => setUserData(response.data));
        });
    };

    const EditUSer = (user_Id, types) => {

        types.forEach(type => {
            const input_Id = `#${type}_${user_Id}`;
            const table_input = document.querySelector(`${input_Id}`);
            const editable = table_input.classList.contains("editable");
    
            if(editable) {
                table_input.classList.remove("editable"); 
                table_input.readOnly = true;
                return;
            }
    
            table_input.classList.add("editable");
            table_input.readOnly = false;
        });
    };


    const handleEditor = (e, user, type) => {

        if(!e) {
            const input_Id = `#${type}_${user.id}`;
            const input_parent = document.querySelector(`${input_Id}`);
            if(input_parent === null) return
            if(type === 'email') input_parent.value = user.email;
            if(type === 'password') input_parent.value = user.password;
            return;
        } 

        let email_req = '';
        let password_req = '';
        type === 'email' ? email_req = e.target.value : email_req = user.email;
        type === 'password' ? password_req = e.target.value : password_req = user.password;
        
        instanceAxios({
            method: "PUT",
            url: `/api/user/${user.id}`,
            data: { 
                email: email_req,
                password: password_req
            },
        })
        .then(() => {  
            instanceAxios.get('/api/admin')
            .then(response => {
                setUserData(response.data);
            })
        })
        .catch((err) => {
            console.log(err);
            setUserData(UserData);
        })
        
    };

    const handleIsAdmin = (e, user) => {

        let admin_value = e.target.value;
        admin_value === 'true' ? admin_value = false : admin_value = true;

        instanceAxios({
            method: "PUT",
            url: `/api/admin/${user.id}`,
            data: {
                is_admin: admin_value
            },
        })
        .then((res) => {  
            instanceAxios.get('/api/admin')
            .then(response => setUserData(response.data));
        })

    }

    return (
        <div>
            <div className='adminPanel-Wrapper'>
                <div className='myTable'>
                    <table className='myTable-content'>
                        <thead>
                            <tr>
                                <th>Utilisateur</th>
                                <th>Nom complet</th>
                                <th>Email</th>
                                <th>Mot de passe</th>
                                <th>Biographie</th>
                                <th>Admin</th>
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {UserData.map(User => <tr key={'UserData_' + User.id}>
                                <td key={'UserImg_' + User.id}>{User.user_img}</td>
                                <td key={'UserFullName_' + User.id}>{User.last_name} {User.first_name}</td>
                                <td key={'UserEmails_' + User.id}>
                                    <input readOnly className='input-readOnly'
                                    type="Email" id={`email_${User.id}`} name="email" 
                                    onBlur={(e) => handleEditor(e, User, 'email')}/>
                                    {handleEditor(false, User, 'email')}
                                </td>
                                <td key={'UserPassword_' + User.id}>
                                    <form>
                                        <input readOnly className='input-readOnly' autoComplete=""
                                        type="password" id={`password_${User.id}`} name="password"
                                        onBlur={(e) => handleEditor(e, User, 'password')}/>
                                    </form>
                                    {handleEditor(false, User, 'password')} 
                                </td>
                                <td key={'UserBiography_' + User.id}>{User.bio}</td>
                                <td key={'UserIsAdmins_' + User.id}>
                                    <div className={`switch-btn ${'is_' + User.is_admin}`}>
                                        <label htmlFor={`buttonGroup${User.id}`}></label>
                                        <input onChange={(e) => handleIsAdmin(e, User)} id={`buttonGroup${User.id}`} type="checkbox" value={User.is_admin}/>
                                    </div>
                                </td> 
                                <td className='icon-editor' onClick={() => EditUSer(User.id, ['email', 'password'])}><AiFillEdit/></td> 
                                <td className='icon-remove' onClick={() => deleteUSer(User.id)}><ImBin/></td> 
                            </tr>
                            )}
                        </tbody>
                    </table >
                </div>
            </div>
        </div >
    );
};

export default Admin;
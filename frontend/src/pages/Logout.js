import {useEffect, useContext} from 'react';
import { instanceAxios } from '../api/Axios';
import { UserContext} from '../context';
import { useNavigate } from 'react-router-dom';

const Logout  = () => {

    const { setHasValidToken } = useContext(UserContext)

    const navigate = useNavigate();



    useEffect(() => {

        instanceAxios.get('/api/auth/signout')
        .then(res => {
            setHasValidToken(false)
            navigate('/login')
        })
        .catch((err) => console.log(err));

    }, []);

};

export default Logout ;
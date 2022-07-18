import {useEffect, useContext} from 'react';
import { instanceAxios } from '../api/Axios';
import { UserContext} from '../context'

const Logout  = () => {

    const { setHasValidToken } = useContext(UserContext)


    useEffect(() => {

        instanceAxios.get('/api/auth/clear')
        .then(res => {
            setHasValidToken(false)
        })
        .catch((err) => console.log(err));

    }, [setHasValidToken]);

};

export default Logout ;
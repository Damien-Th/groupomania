import {useState, useEffect } from 'react';
import { instanceAxios } from './../../api/Axios';

const UserComments  = () => {

    const [UserComments, setUserComment] = useState([]);

    useEffect(() => {

        instanceAxios.get('/api/comment/')
        .then(res => setUserComment(res.data));

    });

    console.log(UserComments)
}

export default UserComments;
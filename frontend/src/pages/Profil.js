import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { instanceAxios } from '../api/Axios';
import NavBar from '../components/NavBar';
import Aside from '../components/Aside';
import PostContent from '../components/GetData/PostContent';
import { UserContext,  } from '../context';

const Profil  = () => {

    const [UserData, setUserData] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [allPost, setallPost] = useState([]);
    const [UserComments, setUserComments] = useState([]);

    const navigate = useNavigate();

    const location = useLocation();
    let urlsplit = location.pathname.split("/profil/");
    const slug = urlsplit[1]



    const { CurrentUser } = useContext(UserContext)


    const slugIsValid = (AllUserSlug, slug) => AllUserSlug.filter((UserSlug) => UserSlug.slug === slug)
   
    useEffect(() => {
   
    
        instanceAxios.get('/api/user/slug')
        .then(res => {

            const result = slugIsValid(res.data, slug)

            if(result.length === 0) {
                navigate('/')
                return
            } 

            setIsValid(true) 

            instanceAxios.get(`/api/user/${result[0].id}`)
            .then(res => {
                setUserData(res.data)

                const UserId = res.data.id

                instanceAxios.get(`/api/post/user/${UserId}`)
                .then(res => {
                    setallPost(res.data)
                })
            })

        })
          
    }, [navigate, slug]);


    useEffect(() => {
        instanceAxios.get('/api/comment/')
        .then(res => setUserComments(res.data))
    }, [setUserComments]);


    return (
        <div className='profil'>
            {isValid && <NavBar UserData={UserData}/> }
            <main className='container'>

                {isValid && <Aside UserData={UserData} home={false}/>}
                {isValid && <div className='profil-content'> 

                    {allPost.map( Post => <div className='post-container' key={'PostData ' + Post.id}>
                        <PostContent PostData={allPost} setPostData={setallPost} PostUser={Post} setUserComments={setUserComments} UserComments={UserComments} User={UserData} />   
                    </div>)}
                    
                </div>}
            </main>
        </div>
    );
};

export default Profil;
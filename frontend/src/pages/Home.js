import React , {useState, useEffect } from 'react';
import { instanceAxios } from '../api/Axios';
import PostContent from '../components/GetData/PostContent';
import PostInput from '../components/Form/Postinput';
import NavBar from '../components/NavBar';
import  Aside from '../components/Aside';

const Home = () => {

   
    const [PostData, setPostData] = useState([]);
    const [UserComments, setUserComments] = useState([]);

    useEffect(() => {
        instanceAxios.get('/api/post')
        .then(res =>  setPostData(res.data))
        instanceAxios.get('/api/comment/')
        .then(res => setUserComments(res.data))
    }, [setUserComments, setPostData]);

    return (
        <div className='home'>

            <NavBar/>

            <main className='container'>

                <Aside home={true}/>

                <div className='home-content'>
                    <PostInput setPostData={setPostData} />

                    {PostData.map( Post => <div className='post-container' key={'PostData ' + Post.id}>
                        <PostContent PostData={PostData} setPostData={setPostData} PostUser={Post} setUserComments={setUserComments} UserComments={UserComments} />   
                    </div>)}
                </div>

            </main>
        </div>
    );
};

export default Home;
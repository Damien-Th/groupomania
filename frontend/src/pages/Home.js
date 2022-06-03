import React , { useEffect, useState } from 'react';
import { instanceAxios } from '../api/Axios';
import PostContainer from '../components/PostContainer';
import Button from '../components/Button';
import { FaRegHeart, FaHeart, FaRegCommentDots } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';


const Home = () => {

    const [PostData, setPostData] = useState([]);
    const [UserData, setUserData] = useState([]);
    const heart = <FaRegHeart />
    const comment = <FaRegCommentDots />
    const share = <FiShare2 />


    useEffect(() => {
       
        instanceAxios.get('/api/post')
        .then(res =>  setPostData(res.data));

        instanceAxios.get('/api/user')
        .then(res => setUserData(res.data));
    }, []);

 

    return (
        <div className='home-wrapper'>
            <div className='sidebar-container'>

            </div>
            <div className='container'>

            {UserData.map(User =>  <React.Fragment key={'UserData ' + User.id}>

                {PostData.filter(Posts => Posts.user_id === User.id).map(Post => <div className='post-wrapper' key={'PostData_' + Post.id}>

                    <div className='post-wrapper__picture'>
                    </div>

                    <div>
                        <div className='post-wrapper__info'>
                        {User.username}
                        {'@'+User.username.replace(/ /g, '')}
                        </div>
                        <PostContainer content={Post.content}/>   
                        <div className='like-comment--count'>
                            <FaHeart />
                            <span>commentaire</span>
                        </div>
                        <div className='btn-container'>
                            <Button icon={heart} class="btn-primary" content="Like"/>   
                            <Button icon={comment} class="btn-primary" content="Partager"/>   
                            <Button icon={share} class="btn-primary" content="Commenter"/>   
                        </div> 
                    </div>
        
                </div>       
                )}

            </React.Fragment>      
            )}

            </div>
        </div>
    );
};

export default Home;
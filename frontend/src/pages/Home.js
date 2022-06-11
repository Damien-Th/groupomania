import React , {useState, useEffect } from 'react';
import { instanceAxios } from '../api/Axios';
import PostContainer from '../components/GetData/PostContainer';
// import CommentPost from '../components/Form/CommentPost';
import Button from '../components/Button';
import { FaRegHeart, FaHeart, FaRegCommentDots } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';

const Home = () => {



    const [PostData, setPostData] = useState([]);
    const heart = <FaRegHeart />
    const comment = <FaRegCommentDots />
    const share = <FiShare2 />

    useEffect(() => {
        instanceAxios.get('/api/post')
        .then(res =>  setPostData(res.data));

    }, []);

    return (
        <div className='home-wrapper'>
            <div className='sidebar-container'>

            </div>
            <div className='container'>

            {PostData.map(Post =>  <div className='post-wrapper' key={'PostData ' + Post.id}>

                    <div className='post-wrapper__picture'>
                    </div>

                    <div>
                        <div className='post-wrapper__info'>
                        {Post.User.username}
                        {'@'+Post.User.username.replace(/ /g, '')}
                        </div>
                        <PostContainer content={Post.content}/>   
                        <div className='like-comment--count'>
                            <FaHeart />
                            <span>commentaire</span>
                        </div>
                        <div className='btn-container'>
                            <Button icon={heart} class="btn-primary" content="Like"/>   
                            <Button icon={comment} class="btn-primary" content="Partager"/>
                            <Button icon={share} class="btn-primary" post_id={Post.id} content="Commenter"/>
                        </div> 
                    </div>
        
                </div>       
                )}
            </div>
        </div>
    );
};

export default Home;
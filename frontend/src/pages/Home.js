import React , {useState, useEffect } from 'react';
import { instanceAxios } from '../api/Axios';
import PostContainer from '../components/GetData/PostContainer';
// import CommentPost from '../components/Form/CommentPost';
// import CommentPost from '../components/GetData/UserComments';
import Button from '../components/Button';
import { FaRegHeart, FaHeart, FaRegCommentDots } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
// import UserComments from '../components/GetData/UserComments';

const Home = () => {

    const [PostData, setPostData] = useState([]);
    const [UserComments, setUserComments] = useState([]);
    const heart = <FaRegHeart />
    const comment = <FaRegCommentDots />
    const share = <FiShare2 />


    useEffect(() => {

        instanceAxios.get('/api/refresh')
        .then(res =>  res.data)
        .catch(() => window.location.href = "/login");

        instanceAxios.get('/api/post')
        .then(res =>  setPostData(res.data));

        instanceAxios.get('/api/comment/')
        .then(res => setUserComments(res.data));

    }, []);


    const getcomment = (userId, postId) => {
        UserComments.filter((commentUser) => {
            if(commentUser.post_id === postId && commentUser.user_id === userId) return commentUser.content
            return null
        })
    }

        console.log(UserComments)

    return (
        <div className='home-wrapper'>
            <div className='sidebar-container'>

            </div>
            <div className='container'>

                {PostData.map(Post => <div key={'PostData ' + Post.id}>
                    <div className='post-wrapper' >

                            <div className='post-wrapper__picture'>
                            </div>

                            <div>
                                <div className='post-wrapper__info'>
                                {Post.User.last_name} {Post.User.first_name}
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
                    <div>
                        commententaire utilisateur

                        {getcomment(Post.User.id, Post.id)}
                        {console.log(getcomment(Post.User.id, Post.id))}


                    </div>  

                </div>)}
            </div>
        </div>
    );
};

export default Home;
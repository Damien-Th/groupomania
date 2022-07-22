import React, {useState, useRef, useContext} from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import axios, { instanceAxios } from '../../api/Axios';
import OnClickOutside from '../../hooks/OnClickOutside';
import Like from '../../components/Button/Like';
import { formatDistance, subDays, format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { UserContext} from '../../context';
import Comment from '../../components/GetData/Comment';
import { FaRegCommentDots } from 'react-icons/fa';
import ModifyComment from '../Modal/ModifyComment';


const PostContent  = (props) => {

    const UserComments = props.UserComments;
    const setUserComments = props.setUserComments;
    const PostUser = props.PostUser;
    const PostData = props.PostData;
    const setPostData = props.setPostData;

    const [displayModal, setDisplayModal] = useState(false);
    const [text, setText] = useState(PostUser.content);
    const [editComment, setEditComment] = useState(false);
    const [image, setImage] = useState(PostUser.image);

    const { CurrentUser } = useContext(UserContext)

    const modal = useRef();
    const icon = useRef();
    const countcomment = useRef();

    const URL_SERVER = process.env.REACT_APP_URL_SERVER;
    let avatar
    let avatarUser
    CurrentUser.image === 'default.jpg' ? avatar = URL_SERVER + '/images/avatars/default.png' : avatar = URL_SERVER + `/images/user_${CurrentUser.id}/avatar/${CurrentUser.image}`
    PostUser.User.image === 'default.jpg' ? avatarUser = URL_SERVER + '/images/avatars/default.png' : avatarUser = URL_SERVER + `/images/user_${PostUser.User.id}/avatar/${PostUser.User.image}`
    let postImage = URL_SERVER + `/images/user_${PostUser.user_id}/post/`

    const handleModal = () => setDisplayModal(!displayModal)

    OnClickOutside(modal, icon, () => setDisplayModal(false));

    const [content, setContent] = useState('');

    const handleCommentInput = (e) => {
        e.preventDefault();

        const data = {
            post_id: PostUser.id,
            user_id: CurrentUser.id,
            content: content
        }

        const User = CurrentUser
     
        instanceAxios.post('/api/comment', data)
        .then((res) =>  {
            countComment(PostUser.id)
            setContent('')
            const newObj = {User, ...res.data.comment}
            setUserComments(UserComments => [...UserComments, newObj]) 
        })
        .catch((err) => console.log(err));
        
    };

    const removePost = (post) => {

        const postId = post.id

        if(CurrentUser.id !== parseInt(post.user_id)) {
            console.log(CurrentUser.id, post.user_id)
            if(CurrentUser.is_admin === false) return;
        }

        if (!window.confirm("Voulez vous vraimment supprimer ce post ?")) return;

        instanceAxios.delete(`/api/post/${postId}`)
        .then(() => {
            const arr = PostData.filter((item) => item !== PostUser);
            setPostData(arr);
        });
     
    }

    const countComment = (postId) => {
        instanceAxios.get(`/api/comment/post/${postId}`)
        .then(response => {
            if(countcomment.current === undefined || countcomment.current === null) return
            response.data.count > 0 ? countcomment.current.textContent = response.data.count : countcomment.current.textContent = response.data.count = '';
        });
    }

    const formatDate = (postDate) => {

        const date = new Date(postDate)
        let lesOneDay = isLessThan24HourAgo(date)

        if(lesOneDay) return dateDiff(date)
        return format(date, 'dd LLL yyy', { locale: fr })
    }


    function isLessThan24HourAgo(date) {

        const twentyFourHrInMs = 24 * 60 * 60 * 1000;
        const twentyFourHoursAgo = Date.now() - twentyFourHrInMs;

        return date > twentyFourHoursAgo;
    }

    const dateDiff = (value) => {
        return formatDistance(subDays(value, 0), new Date(), { locale: fr }).replace('environ', '')
    }

    const handleEdit = () => {
        setDisplayModal(false)
        setEditComment(true)
    }

    return ( 
    
        <React.Fragment>
            <div className='post-wrapper' >
                                    
                <div className='post-info'>
                    <div className='avatar-wrapper avatar_big'>
                        <img alt="avatar" src={avatarUser}></img>
                    </div>
                    <div className='info-wrapper'>
                        {PostUser.User.first_name} {PostUser.User.last_name}
                        <p className='info-time' >{formatDate(PostUser.createdAt)}</p>
                    </div>
                    {(CurrentUser.is_admin === true || PostUser.User.id === CurrentUser.id) && !editComment &&<div className='icon-modal' ref={icon} onClick={handleModal}><BiDotsVerticalRounded/>
                        {displayModal && <div className='modal-wrapper' ref={modal}>
                            <ul>
                                <li onClick={handleEdit}>Modifier</li>
                                <li onClick={() => removePost(PostUser)}>Supprimer</li>
                            </ul>
                        </div>}
                    </div>}
                </div>

                {!editComment && <div className='post-content'>
                    <p className='text' >{text}</p>
                    {image && <div className='image-post'>
                        <img alt="pics" src={`${postImage}${image}`}/>
                    </div>}
                </div>}

                {editComment && <div className='post-content'>
                    {editComment && <ModifyComment postImage={postImage} setText={setText} setImage={setImage} PostUser={PostUser} text={text} image={image} setEditComment={setEditComment}/>}
                </div>}
                
                <div className='btn-container'>
                    <Like Content={PostUser} Type='post'/>
                    <div>
                        <FaRegCommentDots />
                        <span ref={countcomment}></span>    
                        {countComment(PostUser.id)}                 
                    </div>
                </div> 
                        
            </div>
            
            <div className='comment-InputForm'>

                <div className='comment_input'>
                    <div className='avatar-wrapper avatar_medium'>
                        <img alt="avatar" src={avatar}></img>
                    </div>
                    <form className='CommentForm' onSubmit={handleCommentInput}>
                        <input className='input_text' placeholder="Ajoute un commentaire" type="text" id="name" name="user_name" value={content} onChange={(e) => setContent(e.target.value)}/>
                    </form>       
                </div>
               
            </div>

            <div className='comment-Container'>
                {UserComments.filter((commentUser) => commentUser.post_id === PostUser.id).map(comments => 
                    <div className='comment-Content' key={'Comment ' + comments.id}>
                        < Comment UserComments={UserComments} setUserComments={setUserComments}  comments={comments}/>
                    </div>
                )}
            </div>  
        </React.Fragment>
    )
}

export default PostContent;
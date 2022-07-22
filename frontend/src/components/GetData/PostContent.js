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


const PostContent  = (props) => {

    const UserComments = props.UserComments;
    const setUserComments = props.setUserComments;
    const PostUser = props.PostUser;
    const PostData = props.PostData;
    const setPostData = props.setPostData;

    const [displayModal, setDisplayModal] = useState(false);
    const [text, setText] = useState(PostUser.content);
    const [newText, setNewText] = useState(text);
    const [editText, setEditText] = useState(false);
    const [editImage, setEditImage] = useState(false);
    const [image, setImage] = useState(PostUser.image);
    const [newImage, setNewImage] = useState(image);

    const { CurrentUser } = useContext(UserContext)

    const modal = useRef();
    const icon = useRef();
    const countcomment = useRef();

    const URL_SERVER = process.env.REACT_APP_URL_SERVER;
    let avatar
    let avatarUser
    CurrentUser.image === 'default.jpg' ? avatar = URL_SERVER + '/images/avatars/default.png' : avatar = URL_SERVER + `/images/user_${CurrentUser.id}/avatar/${CurrentUser.image}`
    PostUser.User.image === 'default.jpg' ? avatarUser = URL_SERVER + '/images/avatars/default.png' : avatarUser = URL_SERVER + `/images/user_${PostUser.User.id}/avatar/${PostUser.User.image}`
    const postImage = URL_SERVER + `/images/user_${PostUser.user_id}/post/${image}`

    const handleModal = () => setDisplayModal(!displayModal)

    OnClickOutside(modal, icon, () => setDisplayModal(false));

    const [content, setContent] = useState('');

    const handlePostInput = (e) => {
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

        if(CurrentUser.id !== post.user_id) {
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

    const editPost = (e) => {
        setNewText(e.target.value)
    }

    const submitText = (e, post) => {
        e.preventDefault()

        
        if(CurrentUser.id !== post.user_id) {
            if(CurrentUser.is_admin === false) return;
        }


        instanceAxios({
            method: "PUT",
            url: `/api/post/text/${post.id}`,
            data: {
                content: newText
            },
        })
        .then(() => {  
            setText(newText);
            setEditText(false);
        })

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

    const submitImage = (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("user_id", PostUser.user_id)
        formData.append("type", 'post')
        formData.append("image", newImage)

        axios.put(`/api/post/image/${PostUser.id}`, formData)
        .then((res) =>  {
            e.target.reset()
            setImage(res.data.PostUser.image)
        })
        .catch((err) => console.log(err));
    };


    const handleEdit = () => {
        setDisplayModal(false)
        setEditText(true)
        setEditImage(true)
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
                    <div className='icon-modal' ref={icon} onClick={handleModal}><BiDotsVerticalRounded/>
                        {displayModal && <div className='modal-wrapper' ref={modal}>
                            <ul>
                                <li onClick={handleEdit}>Modifier</li>
                                <li onClick={() => removePost(PostUser)}>Supprimer</li>
                            </ul>
                        </div>}
                    </div>
                </div>

                <div className='post-content'>
                    {!editText && <p className='text' >{text}</p>}
                    {editText && <form onSubmit={(e) => submitText(e, PostUser)}>
                        <input onChange={(e) => editPost(e, PostUser.id)} defaultValue={newText}></input>
                        </form>}
            
                        {image && <div className='image-post'>
                            <img alt="pics" src={postImage}/>
                            {editImage && <button>Change</button>}
                        </div>}

                        {!PostUser.image && editImage && 
                            <form className='CommentPost' onSubmit={submitImage}>
                                <input accept="image/png, image/gif, image/jpeg, image/jpg" className='' type="file" name="avatar" onChange={(e) => setNewImage(e.target.files[0])}/>
                                <input type="submit" value="Envoyer le formulaire"/>
                            </form>
                        }
                    
                </div>

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
                    <form className='CommentForm' onSubmit={handlePostInput}>
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
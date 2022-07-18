import React, {useState, useRef, useContext} from 'react';
import { instanceAxios } from '../../api/Axios';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { UserContext} from '../../context';

const Like  = (props) => {

const Content = props.Content
const Type = props.Type

const [contentIsLiked, setContentIsLiked] = useState(false);
const likeCount = useRef()

const { CurrentUser } = useContext(UserContext)

const countContentLike = (contentId) => {
    
    instanceAxios.get(`/api/like/${Type}/${contentId}`)
    .then(response => {
        const dataCount = response.data.count;
        if(likeCount.current === null ||likeCount.current === undefined) return
        dataCount.count > 0 ? likeCount.current.textContent = dataCount.count : likeCount.current.textContent = '';
        if(dataCount.count >= 0) {
            const isLiked = isPostLiked(dataCount.rows, contentId)
            isLiked ? setContentIsLiked(true) : setContentIsLiked(false)
        }
    });
}


const handleLike = (type, contentId, userId) => {

    const data = {
        type: type,
        type_id: contentId,
        user_id: userId
    }
 
    instanceAxios.post('/api/like', data)
    .then(() => countContentLike(contentId))
    .catch((err) => console.log(err));
}

const isPostLiked = (dataLike, contentId) => {
    return dataLike.some((likes) => likes.type === Type && likes.type_id === contentId && likes.user_id === CurrentUser.id)
}

countContentLike(Content.id)

    return (
        <div className='like-wrapper'>
            <span onClick={() => handleLike(Type, Content.id, CurrentUser.id)}>{contentIsLiked ? <FaHeart/> : <FaRegHeart />}</span>
            <span ref={likeCount}></span>
        </div>
    )
  
}

export default Like;
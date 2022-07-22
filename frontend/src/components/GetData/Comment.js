import React, {useContext, useState} from 'react';
import Like from '../../components/Button/Like';
import { UserContext} from '../../context';
import { instanceAxios } from '../../api/Axios';
import { formatDistance, subDays, format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Comment = (props) => {

    const comments = props.comments
    const setUserComments = props.setUserComments
    const UserComments = props.UserComments
    

    const [content, setContent] = useState(comments.content);
    const [isEdit, setIsEdit] = useState(false);


    const URL_SERVER = process.env.REACT_APP_URL_SERVER;
    let avatar

    comments.User.image === 'default.jpg' ? avatar = URL_SERVER + '/images/avatars/default.png' : avatar = URL_SERVER + `/images/user_${comments.User.id}/avatar/${comments.User.image}`

    const { CurrentUser } = useContext(UserContext)


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

    const handleComment = (e) => {
        e.preventDefault();

        if(CurrentUser.id !== comments.user_id) {
            if(CurrentUser.is_admin === false) return;
        }

        const data = {
            content: content
        }

        instanceAxios.put(`/api/comment/${comments.id}`, data)
        .then((res) =>  {
            setContent('')
            setIsEdit(false)
            setContent(content)
        })
        .catch((err) => console.log(err));
        
    };

    const removeComment = (commentId) => {

        if(CurrentUser.id !== comments.user_id) {
            if(CurrentUser.is_admin === false) return;
        }

        if (!window.confirm("Voulez vous vraimment supprimer ce commentaire ?")) return;

   
        instanceAxios.delete(`/api/comment/${commentId}`)
        .then(() => {
            const arr = UserComments.filter((item) => item !== comments);
            setUserComments(arr);
        })
        .catch((err) => console.log(err));
     
    }

    return (
        <React.Fragment>
            <div className='comment-wrapper'>
                <div className='avatar-wrapper avatar_medium'>
                    <img alt="avatar" src={avatar}></img>
                </div>
                <div className='comment-content'>
                  
                    <p>{comments.User.first_name} {comments.User.last_name}</p>
                    <p className='info-time'>{formatDate(comments.createdAt)}</p>
                   
                    {!isEdit && <p className='underline'>{content}</p>}
                    {isEdit && <form onSubmit={handleComment} action="" method="POST" className="form-change-profil">
                        <div className="comment-wrapper">
                            <label htmlFor="comment"></label>
                            <input onChange={(e) => setContent(e.target.value)} type="text" value={content} name="comment" id="comment" required/>
                        </div>
                    </form>}
                </div>
            </div>
            <div className='btn-wrapper'>
                {(CurrentUser.is_admin === true || CurrentUser.id === comments.User.id) && <div className='handle-wrapper'>
                    <p onClick={() => setIsEdit(true)} className='edit-btn'>Modifer</p>
                    <p className='remove-btn' onClick={() => removeComment(comments.id)}>Supprimer</p>
                </div>}
                <Like Content={comments} Type='comment'/>
            </div>
        </React.Fragment>
    );
};
export default Comment;
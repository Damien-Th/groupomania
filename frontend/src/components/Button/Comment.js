import React, {useRef} from 'react';
import { FaRegCommentDots } from 'react-icons/fa';

const Comment  = (props) => {


    const PostId = props.PostId.id;
    const countcomment = useRef();

    return (
        <div>
            <FaRegCommentDots />
            <span ref={countcomment} id={`countComment_${PostId}`}></span>    
            {/* {props.countComment(PostId)}    */}
            {props.countComment(PostId, countcomment)}                 
        </div>
    )
  
}

export default Comment;
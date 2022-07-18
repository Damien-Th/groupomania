import React, {useState} from 'react';
import axios from '../../api/Axios';
import { BsCardImage } from 'react-icons/bs';
// import { instanceAxios } from '../../api/Axios';

const Postinput  = (props) => {

    const [content, setContent] = useState(props.post.content);
    const [image, setImage] = useState('');
  
    const handlePostInput = (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('content', content)
        formData.append("type", 'post')
        formData.append("image", image)

        axios.put(`/api/post/${props.post.id}`, formData)
        .then(res =>  {
            // setContent('');
            // instanceAxios.get('/api/post/')
            // .then(res => props.setPostData(res.data))  
        })
        .catch((err) => console.log(err));
    };

    return (
        <form className='CommentPost' onSubmit={handlePostInput}>
            <input className='input_text' placeholder="Ajoute un Poste" type="text" id="name" name="user_name" value={content} onChange={(e) => setContent(e.target.value)}/>
            <div className='input_file--wrapper'>
                <input className='input_file--wrapper__input' type="file" id="avatar" name="avatar" onChange={(e) => setImage(e.target.files[0])}/>
                <BsCardImage/>
            </div>
        </form>
    )
  
}

export default Postinput;
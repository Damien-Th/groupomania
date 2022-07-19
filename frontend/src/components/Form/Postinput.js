import React, {useEffect, useRef, useState, useContext} from 'react';
import axios from '../../api/Axios';
import { BsCardImage } from 'react-icons/bs';
import handleImageUpload from '../../hooks/ResizeImage';
import { UserContext} from '../../context';

const Postinput  = (props) => {

    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [preview, setPreview] =useState('');
    const type = 'post';

    const setPostData = props.setPostData;

    const { CurrentUser } = useContext(UserContext)

    let avatar
    const URL_SERVER = process.env.REACT_APP_URL_SERVER;
    CurrentUser.image === 'default.jpg' ? avatar = URL_SERVER + '/images/avatars/default.png' : avatar = URL_SERVER + `/images/user_${CurrentUser.id}/avatar/${CurrentUser.image}`

    const imageUploader = useRef()


    useEffect(() => {

        if(image) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result)
            reader.readAsDataURL(image);
            return
        }
        setPreview(null);

    }, [image])

    const handlePostInput = (e) => {
        e.preventDefault();

        if(content === '' && !image) {
            window.alert("Veuillez ajouter une image et/ou du texte");
            return
        } 

        const formData = new FormData()
        formData.append('content', content.toString())
        formData.append("user_id", CurrentUser.id)
        formData.append("type", type)
        formData.append("image", image)

        const User = CurrentUser;
     
        axios.post('/api/post', formData)
        .then((res) =>  {
            // e.target.reset()
            setContent('');
            setPreview(null)
            setImage('')
            const newObj = {User, ...res.data.post}
            setPostData(PostData => [newObj, ...PostData])
        })
        .catch((err) => console.log(err));
    };

    const clearImage = (e) => {
        setPreview(null); 
        setImage('');
        imageUploader.current.value = null
    }

   
    return (
        <div className='post_input'>

            <div className='post_input__form'>

                <div className='avatar-wrapper'>
                    <img alt="avatar" src={avatar}/>
                </div>

                <form onSubmit={handlePostInput}>
                    <input className='input_text' placeholder="Ajoute un Poste" type="text" id="name" name="user_name" value={content} onChange={(e) => setContent(e.target.value)}/>
                    <div className='input_file--wrapper'>
                        <input ref={imageUploader} accept="image/png, image/gif, image/jpeg, image/jpg" className='input_file--wrapper__input' type="file" id="avatar" name="avatar" onChange={(e) => handleImageUpload(e, setImage, 1024)}/>
                        <BsCardImage/>
                    </div>
                </form>

            </div>
            
            {image &&<div className='post_input__preview'>
                <img alt="preview" src={preview}/>
            </div>}

            <div className='btn-wrapper'>
                { image && <button className='clearImage-btn'  onClick={clearImage} >Retirer l'image</button>}
                <button className='publish-btn' onClick={handlePostInput} >Publier</button>
            </div>


        </div>
     
    )
  
}

export default Postinput;
import React, {useContext, useEffect, useState} from 'react';
import axios, { instanceAxios } from '../../api/Axios';
import { UserContext,  } from '../../context';
import handleImageUpload from '../../hooks/ResizeImage';

const ModifyPost = (props) => {

    const { CurrentUser } = useContext(UserContext)

    const image = props.image
    const setImage = props.setImage
    const setText = props.setText
    const text = props.text
    const setEditComment = props.setEditComment
    const PostUser = props.PostUser
    const postImage = props.postImage

    const [originalImage, setOriginalImage] = useState(image);
    const [newText, setNewText] = useState(text);
    const [newImage, setNewImage] = useState('');
    const [preview, setPreview] =useState('');

    useEffect(() => {

        if(newImage) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result)
            reader.readAsDataURL(newImage);
            return
        }

        setPreview(null);

    }, [newImage, setNewImage])



    const submitComment = (e) => {
        e.preventDefault();

        if(CurrentUser.id !== parseInt(PostUser.user_id)) {
            if(CurrentUser.is_admin === false) return;
        }

        if(!newText && !newImage) return

        instanceAxios({
            method: "PUT",
            url: `/api/post/text/${PostUser.id}`,
            data: {
                content: newText
            },
        })
        .then(() => {
            setText(newText)
            setEditComment(false)
        })

        if(newImage !== image) {
            
            const formData = new FormData()
            formData.append("user_id", PostUser.user_id)
            formData.append("type", 'post')
            formData.append("image", newImage)

            axios.put(`/api/post/image/${PostUser.id}`, formData)
            .then((res) =>  {
                setImage(res.data.post.image)
                setPreview('')
                setNewImage('')
                setEditComment(false)
            })
        }
 
    };

    const cancel = () => {
        setNewText(text)
        setNewImage('')
        setImage(originalImage)
        setEditComment(false)
        setPreview('')
    }

    const removeImage = () => {
        setNewImage('')
        setImage('')
        setPreview('')
    }


    return (<form onSubmit={submitComment}>

        <label htmlFor="edit_post"></label>
        <input id='edit_post' placeholder='Votre texte' className='editPost' onChange={(e) => setNewText(e.target.value)} defaultValue={text}></input>

  
        <div className='image-post'>
            {image && <img alt="pics" src={`${postImage}${image}`}/>}
            {preview && <img alt="preview" src={preview}/>}
            {(!image && !newImage) && <div className='emptyImage'></div>}
        </div>

        <div className='post-image'>
            {(!image && !newImage) && <label htmlFor="edit_image"></label>}
            {(!image && !newImage) && <input id='edit_image' accept="image/png, image/gif, image/jpeg, image/jpg" className='edit_image' type="file" name="edit_img" onChange={(e) => handleImageUpload(e, setNewImage, 1024)}/>}
            {(!image && !newImage) && <p className='upload-btn' >Upload</p>}
            {(image || newImage) && <span className='remove-btn' onClick={removeImage}>Supprimer l'image</span>}
        </div>

        <div className='btn-wrapper'>
            <input type="submit" value="Modifer"/>
            <p onClick={cancel}>Annuler</p>
        </div>
    </form>);

};

export default ModifyPost;
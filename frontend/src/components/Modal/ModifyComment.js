import React, {useContext, useEffect, useState} from 'react';
import axios, { instanceAxios } from '../../api/Axios';
import { UserContext,  } from '../../context';

const ModifyComment = (props) => {

    const { CurrentUser } = useContext(UserContext)

    const image = props.image
    const setImage = props.setImage
    const setText = props.setText
    const text = props.text
    const setEditComment = props.setEditComment
    const PostUser = props.PostUser
    const postImage = props.postImage

    const [newText, setNewText] = useState(text);
    const [newImage, setNewImage] = useState(image);
    const [rmImage , setRmImage] = useState(false);

    // const [preview, setPreview] =useState('');

    // useEffect(() => {

    //     if(image) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => setPreview(reader.result)
    //         reader.readAsDataURL(image);
    //         return
    //     }
    //     setPreview(null);

    // }, [image])



    const submitComment = (e) => {
        e.preventDefault();

        if(CurrentUser.id !== parseInt(PostUser.user_id)) {
            if(CurrentUser.is_admin === false) return;
        }

        instanceAxios({
            method: "PUT",
            url: `/api/post/text/${PostUser.id}`,
            data: {
                content: newText
            },
        })
        .then(() => {  
            setText(newText);
            setTimeout(() => {
                setEditComment(false);
            }, "200")
           
        })

        if(newImage !== image) {
            
            const formData = new FormData()
            formData.append("user_id", PostUser.user_id)
            formData.append("type", 'post')
            formData.append("image", newImage)

            axios.put(`/api/post/image/${PostUser.id}`, formData)
            .then((res) =>  {
                setImage(res.data.post.image)
            })
            .catch((err) => {
                   setTimeout(() => {
                setEditComment(false);
            }, "200")
            });
        }
 
    };

    const cancel = () => {
        setNewText(text)
        setNewImage(image)
        setEditComment(false)
    }

    const removeImage = () => {
        setNewImage('')
        setRmImage(true)
    }


    return (<form onSubmit={submitComment}>
        <input className='editComment' onChange={(e) => setNewText(e.target.value)} defaultValue={text}></input>

        {(image && !rmImage) && <div className='image-post'>
            <img alt="pics" src={`${postImage}${image}`}/>
        </div>}
       
        {(image && !rmImage) && <div className='CommentPost'>
            <input accept="image/png, image/gif, image/jpeg, image/jpg" className='' type="file" name="avatar" onChange={(e) => setNewImage(e.target.files[0])}/>
            <p>Modifier l'image</p>
        </div>}

        <span onClick={removeImage}>Supprimer l'image</span>

        {/* {image &&<div className='post_input__preview'>
                <img alt="preview" src={preview}/>
        </div>} */}

        <div className='btn-wrapper'>
            <input type="submit" value="Modifer"/>
            <p onClick={cancel}>Annuler</p>
        </div>
    </form>);

};
export default ModifyComment;
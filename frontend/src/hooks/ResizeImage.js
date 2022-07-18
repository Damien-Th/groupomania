import imageCompression from 'browser-image-compression';

const handleImageUpload = async (event, setImage, size) => {

    const imageFile = event.target.files[0];

    if(event.target.files[0].type === "image/gif") return setImage(event.target.files[0])

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: size,
      useWebWorker: true
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);

      return setImage(compressedFile); 
    } catch (error) {
      console.log(error);
    }
  
  }

  export default handleImageUpload;
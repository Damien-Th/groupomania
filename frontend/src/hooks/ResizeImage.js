import imageCompression from 'browser-image-compression';

const handleImageUpload = async (event, setImage, size) => {

    const imageFile = event.target.files[0];

    if(imageFile.type === "image/gif") return setImage(imageFile)

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: size,
      useWebWorker: true
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);

      return setImage(compressedFile); 
    } catch (error) {}
  
  }

  export default handleImageUpload;
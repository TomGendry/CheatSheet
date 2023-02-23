import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUploadCloud } from 'react-icons/fi'

function Uploader({setFile, file}) {
  const [imageTemp, setImageTemp] = useState(null)
  const {getRootProps, getInputProps} = useDropzone({
    multiple: false,
    accept: 'image/jpeg, image/png, image/gif',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        console.log("Invalid file type");
        return null;
      }
      setFile(file);
      setImageTemp(file);
    }
  })

  useEffect(() => {
    if (file) {
      setImageTemp(file)
    }
  }, [file]);

  return (
    <div className="w-full text-center">
        <div 
        {...getRootProps()}
        className="px-6 py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer">
            <input {...getInputProps()}/>
            {imageTemp && (
              <img className='mx-auto h-24 w-auto mb-3' alt={imageTemp.name} src={URL.createObjectURL(imageTemp)}/>
            )}
            <span className="mx-auto flex-colo text-subMain text-3xl">
                <FiUploadCloud />
            </span>
            <p className="text-sm mt-2">Drag your image here</p>
            <em className='text-xs text-border'>
                (only .jpg and .png files will be accepted)
            </em>
        </div>
    </div>
  )
}

export default Uploader

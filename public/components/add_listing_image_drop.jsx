import React, { Component } from 'react';
import Dropzone from 'react-dropzone';


const ImageDrop = (props) => {

  const onDrop = (acceptedFiles, rejectedFiles) => {
    props.setImages(acceptedFiles)
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
  }

  return (
      <div>
        <Dropzone onDrop={onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
  );
  
}

export default ImageDrop;


import React, { Component } from 'react';
import request from 'superagent';
import Dropzone from 'react-dropzone';
import { Button } from 'react-bootstrap';

const CLOUDINARY_UPLOAD_PRESET = 'wdrjd71q';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/canopydev/image/upload';

class ImageDrop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: []
    };

    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    console.log('ACC ', acceptedFiles);
    this.handleImageUpload(acceptedFiles);
  }

  onFormSubmit(event) {
    event.preventDefault();
    const sendImage = request.post('/api/images')
      .send({
        listing_id: this.props.listingId,
        images: this.state.images
      });
    sendImage.end();
    this.props.setActiveListing();
  }

  handleImageUpload(files) {
    const upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('file', files[0]);
    upload.end((err, res) => {
      if (err) { console.log('Cloudinary Error: ', err); }
      console.log('CLOUDINARY URL ', res.body.secure_url);
      this.setState({
        images: [...this.state.images, res.body.secure_url]
      });
      this.props.setImages({ ref: res.body.secure_url, id: res.body.secure_url });
    });
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div className="imageDrop">Drop images here, or click to select files to upload.</div>
          <div>
            {this.state.images.map((img) => {
              return <img key={img} src={img} alt="" />;
            })}
          </div>
        </Dropzone>
        <Button onClick={this.onFormSubmit} type="submit">
          Submit
        </Button>
      </div>
    );
  }
}

export default ImageDrop;

import React, { Component } from 'react';
import request from 'superagent';
import Dropzone from 'react-dropzone';
import { Button, Modal, ProgressBar } from 'react-bootstrap';
import { browserHistory } from 'react-router';

const CLOUDINARY_UPLOAD_PRESET = 'wdrjd71q';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/canopydev/image/upload';

class ImageDrop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      button: true,
      showModal: false,
      count: 0,
      active: 'warning'
    };

    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.showModal = this.showModal.bind(this);
    this.closeModalAndShowListing = this.closeModalAndShowListing.bind(this);
    this.closeModalAndShowProfile = this.closeModalAndShowProfile.bind(this);
  }

  closeModalAndShowListing(event) {
    event.preventDefault();
    this.setState({ showModal: false });
    this.props.setActiveListing();
  }

  closeModalAndShowProfile(event) {
    event.preventDefault();
    this.setState({ showModal: false });
    browserHistory.push(`/content/profile/${this.props.hostId}`);
  }

  showModal() {
    this.setState({ showModal: true });
  }

  onDrop(acceptedFiles, rejectedFiles) {
    console.log('ACC ', acceptedFiles);
    this.setState({ button: true, count: 0, active: 'active' });
    this.handleImageUpload(acceptedFiles);
  }

  onFormSubmit(event) {
    event.preventDefault();
    const sendImage = request.post('/api/images')
      .send({
        listing_id: this.props.listingId,
        images: this.state.images
      });
    sendImage.end(() => {
      this.showModal();
    });
  }

  handleImageUpload(files) {
    const upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('file', files[0]);
    upload.end((err, res) => {
      if (err) { console.log('Cloudinary Error: ', err); }
      console.log('CLOUDINARY URL ', res.body.secure_url);
      this.setState({
        images: [...this.state.images, res.body.secure_url],
        button: false,
        count: 100,
        active: 'success'
      });
      this.props.setImages({ ref: res.body.secure_url, id: res.body.secure_url });
    });
  }

  render() {
    return (
      <div>
        <Modal show={this.state.showModal}>
          <Modal.Header closeButton>
            <Modal.Title>Listing Posted!</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={this.closeModalAndShowListing}>View Listing</Button>
            <Button onClick={this.closeModalAndShowProfile}>Back to Profile</Button>
          </Modal.Footer>
        </Modal>
        <div className="container-fluid" style={{ textAlign: 'center' }}>
          <div className="row">
            <div className="col-md-6">
              <Dropzone className="Dropzone" onDrop={this.onDrop}>
                <div>Drop images here, or click to select files to upload.</div>
              </Dropzone>
            </div>
            <div className="col-md-6">
              <h1> Dropped Images:</h1>
              {this.state.images.map((img) => {
                return <img className="droppedPics" key={img} src={img} alt="" />;
              })}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Button onClick={this.onFormSubmit} type="submit" disabled={this.state.button}>
                Submit
              </Button>
            </div>
            <div className="col-md-6">
              <ProgressBar bsStyle={this.state.active} now={this.state.count} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageDrop;

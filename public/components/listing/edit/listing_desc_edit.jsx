import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import request from 'superagent';
import { browserHistory } from 'react-router';
import { Modal, Button, ProgressBar } from 'react-bootstrap';
import Dropzone from 'react-dropzone';

import selectListing from '../../../actions/select_listing';

const CLOUDINARY_UPLOAD_PRESET = 'wdrjd71q';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/canopydev/image/upload';

class ListingDescEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.activeListing.id,
      beds: this.props.activeListing.beds,
      baths: this.props.activeListing.baths,
      cats: this.props.activeListing.cats,
      dogs: this.props.activeListing.dogs,
      host_id: this.props.activeListing.host_id,
      laundry: this.props.activeListing.laundry,
      parking: this.props.activeListing.parking,
      rent: this.props.activeListing.rent,
      smoking: this.props.activeListing.smoking,
      sqFoot: this.props.activeListing.sqFoot,
      street: this.props.activeListing.street,
      term: this.props.activeListing.term,
      unitNumber: this.props.activeListing.unitNumber,
      availableDate: this.props.activeListing.availableDate.slice(0, 10),
      images: this.props.activeListing.images,
      newListing: {},
      showUpdateModal: false,
      showRemoveModal: false,
      count: 0,
      active: 'warning'
    };

    this.updateStreet = this.updateStreet.bind(this);
    this.updateUnit = this.updateUnit.bind(this);
    this.updateBeds = this.updateBeds.bind(this);
    this.updateBaths = this.updateBaths.bind(this);
    this.updateRent = this.updateRent.bind(this);
    this.updateSqFoot = this.updateSqFoot.bind(this);
    this.updateAvailableDate = this.updateAvailableDate.bind(this);

    this.updateListing = this.updateListing.bind(this);
    this.closeModalAndShowListing = this.closeModalAndShowListing.bind(this);
    this.closeModalAndShowProfile = this.closeModalAndShowProfile.bind(this);

    this.removeListing = this.removeListing.bind(this);
    this.closeRemoveModal = this.closeRemoveModal.bind(this);
    this.closeRemoveModalAndRemoveListing = this.closeRemoveModalAndRemoveListing.bind(this);

    this.removeImage = this.removeImage.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  updateStreet(event) { this.setState({ street: event.target.value }); }
  updateUnit(event) { this.setState({ unit: event.target.value }); }
  updateBeds(event) { this.setState({ beds: event.target.value }); }
  updateBaths(event) { this.setState({ baths: event.target.value }); }
  updateRent(event) { this.setState({ rent: event.target.value }); }
  updateSqFoot(event) { this.setState({ sqFoot: event.target.value }); }
  updateAvailableDate(event) { this.setState({ availableDate: event.target.value }); }

  updateListing() {
    const updateImages = request.post('/api/updateListingImages')
                                .send({ images: this.state.images, listing_id: this.state.id });

    updateImages.end((err, res) => {
      const updateListing = request.post('/api/updateListing')
                            .send(this.state);

      updateListing.end((err, res) => {
        if (err) { console.log('Error updating listing: ', err); }
        this.setState({ showUpdateModal: true, newListing: res.body });
      });
    });
  }

  closeModalAndShowListing(event) {
    event.preventDefault();
    this.setState({ showUpdateModal: false });
    this.props.selectListing(this.state.newListing);
    browserHistory.push(`/content/listing/${this.state.newListing.id}`);
  }

  closeModalAndShowProfile(event) {
    event.preventDefault();
    this.setState({ showUpdateModal: false });
    browserHistory.push(`/content/profile/${this.state.newListing.host_id}`);
  }

  closeRemoveModal() {
    this.setState({ showRemoveModal: false });
  }

  closeRemoveModalAndRemoveListing() {
    const removeListing = request.post('/api/removeListing')
                                 .send({ id: this.state.id });

    removeListing.end((err) => {
      if (err) { console.log('Error removing listing: ', err); }
      this.setState({ showRemoveModal: false });
      browserHistory.push(`/content/profile/${this.state.host_id}`);
    });
  }

  removeImage(ref) {
    for (let i = 0; i < this.state.images.length; i++) {
      if (this.state.images[i].ref === ref) {
        const newImageList = this.state.images.slice(0, i).concat(this.state.images.slice(i + 1));
        this.setState({ images: newImageList })
      }
    }
  }

  removeListing() {
    this.setState({ showRemoveModal: true })
  }

  onDrop(acceptedFiles, rejectedFiles) {
    console.log('ACC ', acceptedFiles);
    this.setState({ count: 0, active: 'active' });
    this.handleImageUpload(acceptedFiles);
  }

  handleImageUpload(files) {
    const upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('file', files[0]);
    upload.end((err, res) => {
      if (err) { console.log('Cloudinary Error: ', err); }
      console.log('CLOUDINARY URL ', res.body.secure_url);
      this.setState({
        images: [...this.state.images, { ref: res.body.secure_url }],
        count: 100,
        active: 'success'
      });
    });
  }

  render() {
    return (
      <div>
        <Modal show={this.state.showRemoveModal}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you wanto to remove this listing?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={this.closeRemoveModal}>Cancel</Button>
            <Button onClick={this.closeRemoveModalAndRemoveListing}>Yes</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showUpdateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Listing Updated!</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={this.closeModalAndShowListing}>View Listing</Button>
            <Button onClick={this.closeModalAndShowProfile}>Back to Profile</Button>
          </Modal.Footer>
        </Modal>
        <div className="listingInfo">
          <div className="details">
            <h3>{this.props.activeListing.city.name}, {this.props.activeListing.city.state} {this.props.activeListing.zip}</h3><br />
            <form action="javascript:void(0)">
              Street: <input value={this.state.street} onChange={this.updateStreet} /><br />
              Unit: <input value={this.state.unit} onChange={this.updateUnit} /><br />
              Beds: <input value={this.state.beds} onChange={this.updateBeds} /><br />
              Baths: <input value={this.state.baths} onChange={this.updateBaths} /><br />
              Rent: <input value={this.state.rent} onChange={this.updateRent} /><br />
              Sq. Footage: <input value={this.state.sqFoot} onChange={this.updateSqFoot} /><br />
              Date Available: <input value={this.state.availableDate} onChange={this.updateAvailableDate} /><br />
            </form>
          </div>
        </div>
        <div>
          <Dropzone className="Dropzone" onDrop={this.onDrop}>
            <div>Drop images here, or click to select files to upload.</div>
          </Dropzone>
        </div>
        <div style={{ position: 'relative' }}>
          <h3> Dropped Images:</h3>
            {this.state.images.map((img) => {
              return (
                <div style={{ display: 'inline-block' }}>
                  <div onClick={() => { this.removeImage(img.ref); }}>X</div>
                  <img className="droppedPics" key={img.ref} src={img.ref} alt="" />
                </div>
              )
            })}
        </div>
        <div>
          <ProgressBar bsStyle={this.state.active} now={this.state.count} />
        </div>
        <Button onClick={this.updateListing}>Submit Updates</Button>
        <Button onClick={this.removeListing}>Remove Listing</Button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectListing }, dispatch);
}

export default connect(null, mapDispatchToProps)(ListingDescEdit);

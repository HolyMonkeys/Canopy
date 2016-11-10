import React, { Component } from 'react';

import CurrentPicture from './listing_pic_current';

class ListingPics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: this.props.listingimages[0].image.ref
    };
    this.updateCurrentImage = this.updateCurrentImage.bind(this);
  }

  updateCurrentImage(event) {
    this.setState({
      currentImage: event.target.src
    });
  }

  render() {
    return (
      <div>
        <CurrentPicture img_ref={this.state.currentImage} />
        {this.props.listingimages.map((listingimage) => (
          <img
            className="smallPics"
            key={listingimage.id}
            src={listingimage.image.ref}
            onClick={this.updateCurrentImage}
          />
        ))}
      </div>
    );
  }
}

export default ListingPics;

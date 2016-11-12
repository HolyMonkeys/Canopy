import React, { Component } from 'react';

import CurrentPicture from './listing_pic_current';

class ListingPics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: this.props.images[0].ref
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
        <CurrentPicture image={this.state.currentImage} />
        {this.props.images.map((image) => (
          <img
            className="smallPics"
            key={image.id}
            src={image.ref}
            onClick={this.updateCurrentImage}
          />
        ))}
      </div>
    );
  }
}

export default ListingPics;

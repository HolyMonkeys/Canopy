import React, { Component } from 'react';

class ListingPics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: (this.props.images.length) ? this.props.images[0].ref : ''
    };

    this.updateCurrentImage = this.updateCurrentImage.bind(this);
  }

  updateCurrentImage(event) {
    this.setState({
      currentImage: event.target.src
    });
  }

  render() {
    if (!this.props.images.length){
      return (<div>
        No photos available
      </div>);
    }
    return (
      <div>
        <div><img className="curPic" key={this.state.currentImage} src={this.state.currentImage} /></div>
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

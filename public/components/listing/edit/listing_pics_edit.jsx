// import React, { Component } from 'react';
// import { Carousel } from 'react-bootstrap';
//
// class ListingPics extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       index: 0,
//       direction: null
//     };
//     this.handleSelect = this.handleSelect.bind(this);
//   }
//
//   handleSelect(selectedIndex, e) {
//     this.setState({
//       index: selectedIndex,
//       direction: e.direction
//     });
//   }
//
//   render() {
//     if (!this.props.images.length){
//       return (<div>
//         No photos available
//       </div>);
//     }
//     return (
//      <Carousel className="listingPics" activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
//        {this.props.images.map((image) => (
//         <Carousel.Item>
//           <img
//             alt="900x500"
//             key={image.id}
//             src={image.ref}
//           />
//            <Carousel.Caption>
//           </Carousel.Caption>
//         </Carousel.Item>
//         ))}
//       </Carousel>
//     );
//   }
// }
//
// export default ListingPics;

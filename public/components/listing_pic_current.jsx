import React from 'react';

const CurrentPicture = ({ image }) => {
  return (
    <div>
      <img className="curPic" src={image} />
    </div>
  );
};

export default CurrentPicture;

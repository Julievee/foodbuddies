import React from 'react';

const PlaceDetails = ({ place }) => {
  return (
    <div>
      <h1>{place.name}</h1>
      <h4>{place.address}</h4>
      <a alt = "" href = {place.website}>{place.website}</a>
      <img alt="" src={place.photo ? place.photo.images.medium.url : null} />
    </div>



  );
}


export default PlaceDetails;

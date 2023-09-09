import React, { useState } from 'react';

function Categories() {
  // Define an array of dummy image URLs
  const initialImages = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',


    // Add more dummy image URLs as needed
  ];

  // Create a state variable to store the images
  const [images, setImages] = useState(initialImages);

  return (
    <div className='container'>
      <div className='row'>
        {images.map((image, index) => (
          <div key={index} className='col-md-3'>
            <div className='card mt-5'>
              <img src={image} alt={`Image ${index}`} className='card-img-top' />
              <div className='card-body'>
                <h5 className='card-title hidden-title'>Image {index}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;

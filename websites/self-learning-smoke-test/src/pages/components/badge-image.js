import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
const BadgeImage = ({ imageId }) => {
  const [imageData, setImageData] = useState('');

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await fetch(
          `https://learning-api.commercetools.vercel.app/api/badges/image/${imageId}`,
          {
            credentials: 'include',
          }
        );
        const data = await response.json();
        setImageData(data.image);
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchImageData();
  }, [imageId]);

  return <img src={`data:image/png;base64,${imageData}`} alt="Badge" />;
};

BadgeImage.propTypes = {
  imageId: PropTypes.string.isRequired,
};

export default BadgeImage;
